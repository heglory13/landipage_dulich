import { createHash, randomInt } from "node:crypto";
import { database } from "@/lib/database";
import { sendPasswordResetOtp } from "@/lib/mailer";

export async function POST(request: Request) {
  const body = await request.json() as { email?: string };
  const email = body.email?.trim().toLowerCase() ?? "";
  const user = database.prepare("SELECT id FROM users WHERE email = ?").get(email) as { id: number } | undefined;
  if (!user) return Response.json({ error: "등록된 이메일을 찾을 수 없습니다." }, { status: 404 });
  const recent = database.prepare("SELECT created_at FROM password_reset_otps WHERE user_id = ? ORDER BY id DESC LIMIT 1").get(user.id) as { created_at: string } | undefined;
  if (recent && Date.now() - new Date(`${recent.created_at}Z`).getTime() < 60_000) return Response.json({ error: "인증번호는 1분 후 다시 요청할 수 있습니다." }, { status: 429 });
  const code = String(randomInt(0, 1_000_000)).padStart(6, "0");
  const codeHash = createHash("sha256").update(code).digest("hex");
  if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) return Response.json({ error: "Gmail 발송 설정이 필요합니다. 관리자에게 문의해주세요." }, { status: 503 });
  try { await sendPasswordResetOtp(email, code); } catch { return Response.json({ error: "이메일 발송에 실패했습니다. Gmail 설정을 확인해주세요." }, { status: 502 }); }
  database.prepare("UPDATE password_reset_otps SET used_at = CURRENT_TIMESTAMP WHERE user_id = ? AND used_at IS NULL").run(user.id);
  database.prepare("INSERT INTO password_reset_otps (user_id, code_hash, expires_at) VALUES (?, ?, ?)").run(user.id, codeHash, new Date(Date.now() + 10 * 60_000).toISOString());
  return Response.json({ ok: true });
}
