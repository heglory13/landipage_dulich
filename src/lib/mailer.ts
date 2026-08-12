import "server-only";

import nodemailer from "nodemailer";

export async function sendPasswordResetOtp(email: string, code: string) {
  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_APP_PASSWORD;
  if (!user || !pass) throw new Error("Gmail SMTP is not configured");

  const transporter = nodemailer.createTransport({ service: "gmail", auth: { user, pass } });
  await transporter.sendMail({
    from: `호치민 게임 <${user}>`,
    to: email,
    subject: `[호치민 게임] 비밀번호 재설정 인증번호 ${code}`,
    text: `비밀번호 재설정 인증번호는 ${code}입니다. 인증번호는 10분 동안 유효합니다. 본인이 요청하지 않았다면 이 메일을 무시해주세요.`,
    html: `<div style="font-family:Arial,sans-serif;max-width:520px;margin:auto;padding:32px;border:1px solid #ddd;border-radius:16px"><h2>호치민 게임</h2><p>비밀번호 재설정 인증번호입니다.</p><p style="font-size:34px;font-weight:700;letter-spacing:8px;color:#9b896c">${code}</p><p>10분 안에 입력해주세요. 본인이 요청하지 않았다면 이 메일을 무시해주세요.</p></div>`,
  });
}
