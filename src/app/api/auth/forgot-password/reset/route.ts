import { createHash } from "node:crypto";
import { database } from "@/lib/database";
import { hashPassword } from "@/lib/auth";

type OtpRow = { id: number; code_hash: string; expires_at: string; attempts: number; user_id: number };

export async function POST(request: Request) {
  const body = await request.json() as { email?: string; code?: string; newPassword?: string };
  const email = body.email?.trim().toLowerCase() ?? "";
  const code = body.code?.trim() ?? "";
  const newPassword = body.newPassword ?? "";
  if (!/^\d{6}$/.test(code)) return Response.json({ error: "6자리 인증번호를 입력해주세요." }, { status: 400 });
  if (newPassword.length < 8 || !/[A-Za-z]/.test(newPassword) || !/[0-9]/.test(newPassword)) return Response.json({ error: "새 비밀번호는 영문과 숫자를 포함해 8자 이상이어야 합니다." }, { status: 400 });
  const otp = database.prepare(`SELECT password_reset_otps.id, password_reset_otps.code_hash, password_reset_otps.expires_at, password_reset_otps.attempts, password_reset_otps.user_id FROM password_reset_otps JOIN users ON users.id = password_reset_otps.user_id WHERE users.email = ? AND password_reset_otps.used_at IS NULL ORDER BY password_reset_otps.id DESC LIMIT 1`).get(email) as OtpRow | undefined;
  if (!otp || new Date(otp.expires_at).getTime() < Date.now()) return Response.json({ error: "인증번호가 만료되었거나 존재하지 않습니다." }, { status: 400 });
  if (otp.attempts >= 5) return Response.json({ error: "인증 시도 횟수를 초과했습니다. 새 인증번호를 요청해주세요." }, { status: 429 });
  const actualHash = createHash("sha256").update(code).digest("hex");
  if (actualHash !== otp.code_hash) { database.prepare("UPDATE password_reset_otps SET attempts = attempts + 1 WHERE id = ?").run(otp.id); return Response.json({ error: "인증번호가 올바르지 않습니다." }, { status: 400 }); }
  const password = hashPassword(newPassword);
  database.prepare("UPDATE users SET password_hash = ?, password_salt = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?").run(password.hash, password.salt, otp.user_id);
  database.prepare("UPDATE password_reset_otps SET used_at = CURRENT_TIMESTAMP WHERE id = ?").run(otp.id);
  database.prepare("DELETE FROM sessions WHERE user_id = ?").run(otp.user_id);
  return Response.json({ ok: true });
}
