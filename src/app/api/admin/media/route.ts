import { randomBytes } from "node:crypto";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { requireAdmin, isSameOrigin } from "@/lib/admin";

const allowed = new Map([["image/jpeg", "jpg"], ["image/png", "png"], ["image/webp", "webp"], ["image/gif", "gif"]]);

export async function POST(request: Request) {
  try { await requireAdmin(); } catch { return Response.json({ error: "권한이 없습니다." }, { status: 403 }); }
  if (!isSameOrigin(request)) return Response.json({ error: "잘못된 요청입니다." }, { status: 403 });
  const form = await request.formData().catch(() => null);
  const file = form?.get("file");
  if (!(file instanceof File) || !allowed.has(file.type) || file.size === 0 || file.size > 5 * 1024 * 1024) {
    return Response.json({ error: "JPG, PNG, WEBP, GIF 이미지만 최대 5MB까지 업로드할 수 있습니다." }, { status: 400 });
  }
  const bytes = Buffer.from(await file.arrayBuffer());
  const signatures = file.type === "image/jpeg" ? bytes[0] === 0xff && bytes[1] === 0xd8 : file.type === "image/png" ? bytes.subarray(0, 8).equals(Buffer.from([137,80,78,71,13,10,26,10])) : file.type === "image/gif" ? bytes.subarray(0, 3).toString() === "GIF" : bytes.subarray(8, 12).toString() === "WEBP";
  if (!signatures) return Response.json({ error: "이미지 파일이 올바르지 않습니다." }, { status: 400 });
  const directory = path.join(process.cwd(), "public", "uploads", "admin");
  await mkdir(directory, { recursive: true });
  const filename = `${Date.now()}-${randomBytes(6).toString("hex")}.${allowed.get(file.type)}`;
  await writeFile(path.join(directory, filename), bytes, { flag: "wx" });
  return Response.json({ url: `/uploads/admin/${filename}` }, { status: 201 });
}
