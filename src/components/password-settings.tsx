"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { KeyRound } from "lucide-react";

export function PasswordSettings() {
  const [message, setMessage] = useState("");
  const [pending, setPending] = useState(false);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setPending(true); setMessage("");
    const form = new FormData(event.currentTarget);
    if (form.get("newPassword") !== form.get("confirmPassword")) { setMessage("새 비밀번호 확인이 일치하지 않습니다."); setPending(false); return; }
    const response = await fetch("/api/auth/change-password", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ currentPassword: form.get("currentPassword"), newPassword: form.get("newPassword") }) });
    const result = await response.json() as { error?: string };
    setMessage(response.ok ? "비밀번호가 변경되었습니다." : result.error ?? "변경에 실패했습니다.");
    if (response.ok) event.currentTarget.reset(); setPending(false);
  }
  return <section className="mt-10 rounded-3xl border border-border bg-card p-6 shadow-sm md:p-9"><div className="flex items-center gap-3"><KeyRound className="size-6 text-accent"/><div><p className="text-xs tracking-[.2em] text-muted-foreground">SECURITY</p><h2 className="mt-1 text-xl font-bold">비밀번호 변경</h2></div></div><form onSubmit={submit} className="mt-6 grid gap-4 md:grid-cols-3"><input required type="password" name="currentPassword" placeholder="현재 비밀번호" className="h-12 rounded-xl border border-input bg-background px-4 outline-none focus:border-accent"/><input required type="password" name="newPassword" placeholder="새 비밀번호" className="h-12 rounded-xl border border-input bg-background px-4 outline-none focus:border-accent"/><input required type="password" name="confirmPassword" placeholder="새 비밀번호 확인" className="h-12 rounded-xl border border-input bg-background px-4 outline-none focus:border-accent"/><div className="md:col-span-3 flex flex-wrap items-center justify-between gap-4"><Link href="/forgot-password" className="text-sm text-muted-foreground underline">비밀번호를 잊으셨나요?</Link><button disabled={pending} className="rounded-xl bg-primary px-6 py-3 text-sm font-bold text-primary-foreground disabled:opacity-50">{pending?"변경 중...":"비밀번호 변경"}</button></div>{message?<p className="md:col-span-3 rounded-lg bg-secondary p-3 text-sm">{message}</p>:null}</form></section>;
}
