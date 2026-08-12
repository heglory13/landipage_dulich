"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, Eye, EyeOff, LockKeyhole, Mail, UserRound } from "lucide-react";

type AuthMode = "login" | "register";

export function AuthForm({ mode, onModeChange }: { mode: AuthMode; onModeChange?: (mode: AuthMode) => void }) {
  const router = useRouter();
  const [error, setError] = useState("");
  const [isPending, setIsPending] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const isRegister = mode === "register";

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setIsPending(true);

    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") ?? "").trim();
    const email = String(form.get("email") ?? "").trim().toLowerCase();
    const password = String(form.get("password") ?? "");
    const confirmPassword = String(form.get("confirmPassword") ?? "");

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setError("올바른 이메일 주소를 입력해주세요.");
      setIsPending(false);
      return;
    }

    if (password.length < 8 || !/[A-Za-z]/.test(password) || !/[0-9]/.test(password)) {
      setError("비밀번호는 영문과 숫자를 포함해 8자 이상이어야 합니다.");
      setIsPending(false);
      return;
    }

    if (isRegister) {
      if (name.length < 2) {
        setError("이름은 2자 이상 입력해주세요.");
        setIsPending(false);
        return;
      }
      if (password !== confirmPassword) {
        setError("비밀번호 확인이 일치하지 않습니다.");
        setIsPending(false);
        return;
      }

    }

    try {
      const response = await fetch(isRegister ? "/api/auth/register" : "/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(isRegister ? { name, email, password } : { email, password }),
      });
      const result = await response.json() as { error?: string; user?: { role?: "user" | "admin" } };
      if (!response.ok) {
        setError(result.error ?? "요청을 처리하지 못했습니다.");
        setIsPending(false);
        return;
      }
      window.dispatchEvent(new Event("ho-chi-minh-game-auth-change"));
      const next = new URLSearchParams(window.location.search).get("next");
      const safeNext = next?.startsWith("/") && !next.startsWith("//") ? next : "/";
      router.push(result.user?.role === "admin" ? "/admin" : safeNext);
      router.refresh();
    } catch {
      setError("서버에 연결할 수 없습니다. 잠시 후 다시 시도해주세요.");
      setIsPending(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-9 space-y-5">
      {isRegister ? (
        <label className="grid gap-2 text-sm font-semibold">
          이름
          <span className="relative">
            <UserRound className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <input required name="name" autoComplete="name" placeholder="이름을 입력해주세요" className="h-13 w-full rounded-lg border border-input bg-background pl-11 pr-4 outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20" />
          </span>
        </label>
      ) : null}

      <label className="grid gap-2 text-sm font-semibold">
        이메일
        <span className="relative">
          <Mail className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <input required type="email" name="email" autoComplete="email" placeholder="email@example.com" className="h-13 w-full rounded-lg border border-input bg-background pl-11 pr-4 outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20" />
        </span>
      </label>

      <label className="grid gap-2 text-sm font-semibold">
        비밀번호
        <span className="relative">
          <LockKeyhole className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <input required type={showPassword ? "text" : "password"} name="password" autoComplete={isRegister ? "new-password" : "current-password"} placeholder="영문, 숫자 포함 8자 이상" className="h-13 w-full rounded-lg border border-input bg-background pl-11 pr-12 outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20" />
          <button type="button" onClick={() => setShowPassword((visible) => !visible)} className="absolute right-3 top-1/2 grid size-8 -translate-y-1/2 place-items-center text-muted-foreground hover:text-foreground" aria-label={showPassword ? "비밀번호 숨기기" : "비밀번호 보기"}>
            {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
          </button>
        </span>
      </label>

      {isRegister ? (
        <label className="grid gap-2 text-sm font-semibold">
          비밀번호 확인
          <span className="relative">
            <LockKeyhole className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <input required type={showPassword ? "text" : "password"} name="confirmPassword" autoComplete="new-password" placeholder="비밀번호를 다시 입력해주세요" className="h-13 w-full rounded-lg border border-input bg-background pl-11 pr-4 outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20" />
          </span>
        </label>
      ) : null}

      {error ? <p className="rounded-lg bg-red-50 p-4 text-sm text-red-700" role="alert">{error}</p> : null}

      <button disabled={isPending} type="submit" className="flex min-h-13 w-full items-center justify-center gap-3 rounded-lg bg-primary px-6 py-4 text-sm font-bold text-primary-foreground transition hover:bg-accent hover:text-accent-foreground disabled:cursor-wait disabled:opacity-60">
        {isPending ? "처리 중..." : isRegister ? "회원가입" : "로그인"}
        {!isPending ? <ArrowRight className="size-4" /> : null}
      </button>
      {!isRegister ? <div className="text-right"><Link href="/forgot-password" className="text-xs text-muted-foreground underline underline-offset-4">비밀번호를 잊으셨나요?</Link></div> : null}

      <p className="text-center text-sm text-muted-foreground">
        {isRegister ? "이미 계정이 있으신가요?" : "아직 계정이 없으신가요?"}{" "}
        {onModeChange ? (
          <button type="button" onClick={() => onModeChange(isRegister ? "login" : "register")} className="font-bold text-foreground underline decoration-accent underline-offset-4">
            {isRegister ? "로그인" : "회원가입"}
          </button>
        ) : (
          <Link href={isRegister ? "/login" : "/register"} className="font-bold text-foreground underline decoration-accent underline-offset-4">
            {isRegister ? "로그인" : "회원가입"}
          </Link>
        )}
      </p>
    </form>
  );
}
