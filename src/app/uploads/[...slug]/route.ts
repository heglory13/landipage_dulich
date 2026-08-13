import { readFile } from "node:fs/promises";
import path from "node:path";

const contentTypes = new Map([
  [".jpg", "image/jpeg"],
  [".jpeg", "image/jpeg"],
  [".png", "image/png"],
  [".webp", "image/webp"],
  [".gif", "image/gif"],
  [".svg", "image/svg+xml"],
]);

function safeUploadPath(segments: string[]) {
  const cleaned = segments.filter(Boolean);
  if (!cleaned.length) return null;
  if (cleaned.some((segment) => segment === "." || segment === ".." || segment.includes("\\"))) return null;

  const uploadsRoot = path.join(process.cwd(), "public", "uploads");
  const absolutePath = path.join(uploadsRoot, ...cleaned);
  const relativePath = path.relative(uploadsRoot, absolutePath);

  if (relativePath.startsWith("..") || path.isAbsolute(relativePath)) return null;
  return absolutePath;
}

export async function GET(_: Request, context: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await context.params;
  const filePath = safeUploadPath(slug);
  if (!filePath) return new Response("Not Found", { status: 404 });

  try {
    const file = await readFile(filePath);
    const extension = path.extname(filePath).toLowerCase();
    return new Response(file, {
      status: 200,
      headers: {
        "Content-Type": contentTypes.get(extension) ?? "application/octet-stream",
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch {
    return new Response("Not Found", { status: 404 });
  }
}
