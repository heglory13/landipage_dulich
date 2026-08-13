import { createSession, isAdminEmail, verifyPassword } from "@/lib/auth";
import { database } from "@/lib/database";

type UserRow = { id: number; name: string; email: string; role: "user" | "admin"; password_hash: string; password_salt: string };

const attempts = new Map<string, { count: number; resetAt: number }>();
const maxAttempts = 8;
const attemptWindow = 15 * 60 * 1000;

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({})) as { email?: string; password?: string };
  const email = body.email?.trim().toLowerCase() ?? "";
  const password = body.password ?? "";
  const forwardedFor = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  const key = `${forwardedFor ?? "local"}:${email}`;
  const now = Date.now();
  if (attempts.size > 1_000) {
    for (const [attemptKey, value] of attempts) if (value.resetAt <= now) attempts.delete(attemptKey);
  }
  const current = attempts.get(key);
  const attempt = !current || current.resetAt <= now ? { count: 0, resetAt: now + attemptWindow } : current;
  if (attempt.count >= maxAttempts) {
    return Response.json(
      { error: "로그인 시도가 너무 많습니다. 잠시 후 다시 시도해주세요." },
      { status: 429, headers: { "Retry-After": String(Math.ceil((attempt.resetAt - now) / 1000)) } },
    );
  }
  const user = database.prepare("SELECT id, name, email, role, password_hash, password_salt FROM users WHERE email = ?")
    .get(email) as UserRow | undefined;

  if (!user || !verifyPassword(password, user.password_salt, user.password_hash)) {
    attempt.count += 1;
    attempts.set(key, attempt);
    return Response.json({ error: "이메일 또는 비밀번호가 올바르지 않습니다." }, { status: 401 });
  }

  attempts.delete(key);
  const role = isAdminEmail(user.email) ? "admin" : user.role;
  if (role !== user.role) {
    database.prepare("UPDATE users SET role = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?").run(role, user.id);
  }
  await createSession(user.id);
  return Response.json({ user: { id: user.id, name: user.name, email: user.email, role } });
}
