import { getCurrentUser, hashPassword, verifyPassword } from "@/lib/auth";
import { database } from "@/lib/database";

type UserPassword = { password_hash: string; password_salt: string };

export async function POST(request: Request) {
  const user = await getCurrentUser();
  if (!user) return Response.json({ error: "로그인이 필요합니다." }, { status: 401 });
  const body = await request.json() as { currentPassword?: string; newPassword?: string };
  const currentPassword = body.currentPassword ?? "";
  const newPassword = body.newPassword ?? "";
  if (newPassword.length < 8 || !/[A-Za-z]/.test(newPassword) || !/[0-9]/.test(newPassword)) return Response.json({ error: "새 비밀번호는 영문과 숫자를 포함해 8자 이상이어야 합니다." }, { status: 400 });
  const stored = database.prepare("SELECT password_hash, password_salt FROM users WHERE id = ?").get(user.id) as UserPassword;
  if (!verifyPassword(currentPassword, stored.password_salt, stored.password_hash)) return Response.json({ error: "현재 비밀번호가 올바르지 않습니다." }, { status: 400 });
  const password = hashPassword(newPassword);
  database.prepare("UPDATE users SET password_hash = ?, password_salt = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?").run(password.hash, password.salt, user.id);
  database.prepare("DELETE FROM sessions WHERE user_id = ? AND token_hash NOT IN (SELECT token_hash FROM sessions WHERE user_id = ? ORDER BY created_at DESC LIMIT 1)").run(user.id, user.id);
  return Response.json({ ok: true });
}
