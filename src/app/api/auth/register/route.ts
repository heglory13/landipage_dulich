import { createSession, hashPassword } from "@/lib/auth";
import { database } from "@/lib/database";

type AuthBody = { name?: string; email?: string; password?: string };

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({})) as AuthBody;
  const name = body.name?.trim() ?? "";
  const email = body.email?.trim().toLowerCase() ?? "";
  const password = body.password ?? "";

  if (name.length < 2) return Response.json({ error: "이름은 2자 이상 입력해주세요." }, { status: 400 });
  if (!/^\S+@\S+\.\S+$/.test(email)) return Response.json({ error: "올바른 이메일 주소를 입력해주세요." }, { status: 400 });
  if (password.length < 8 || !/[A-Za-z]/.test(password) || !/[0-9]/.test(password)) {
    return Response.json({ error: "비밀번호는 영문과 숫자를 포함해 8자 이상이어야 합니다." }, { status: 400 });
  }
  const existing = database.prepare("SELECT id FROM users WHERE email = ?").get(email);
  if (existing) return Response.json({ error: "이미 등록된 이메일입니다. 로그인해주세요." }, { status: 409 });

  const passwordData = hashPassword(password);
  const result = database.prepare("INSERT INTO users (name, email, password_hash, password_salt) VALUES (?, ?, ?, ?)")
    .run(name, email, passwordData.hash, passwordData.salt);
  const id = Number(result.lastInsertRowid);
  await createSession(id);
  return Response.json({ user: { id, name, email, role: "user" } }, { status: 201 });
}
