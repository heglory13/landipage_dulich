import { getCurrentUser } from "@/lib/auth";
import { database } from "@/lib/database";

export async function POST(request: Request) {
  const body = await request.json() as { name?: string; contact?: string; topic?: string; message?: string };
  const name = body.name?.trim() ?? "";
  const contact = body.contact?.trim() ?? "";
  const topic = body.topic?.trim() ?? "";
  const message = body.message?.trim() ?? "";
  if (!name || !contact || !topic || message.length < 5) {
    return Response.json({ error: "필수 항목을 정확히 입력해주세요." }, { status: 400 });
  }
  const user = await getCurrentUser();
  const result = database.prepare("INSERT INTO inquiries (user_id, name, contact, topic, message) VALUES (?, ?, ?, ?, ?)")
    .run(user?.id ?? null, name, contact, topic, message);
  return Response.json({ id: Number(result.lastInsertRowid), ok: true }, { status: 201 });
}
