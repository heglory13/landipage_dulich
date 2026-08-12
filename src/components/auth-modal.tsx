"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { AuthForm } from "@/components/auth-form";

type AuthMode = "login" | "register";

export function openAuthModal(mode: AuthMode = "login") {
  window.dispatchEvent(new CustomEvent<AuthMode>("ho-chi-minh-game-open-auth", { detail: mode }));
}

export function AuthModal() {
  const [mode, setMode] = useState<AuthMode | null>(null);

  useEffect(() => {
    const open = (event: Event) => setMode((event as CustomEvent<AuthMode>).detail ?? "login");
    const close = () => setMode(null);

    window.addEventListener("ho-chi-minh-game-open-auth", open);
    window.addEventListener("ho-chi-minh-game-auth-change", close);

    const params = new URLSearchParams(window.location.search);
    const requestedMode = params.get("auth");
    if (requestedMode === "login" || requestedMode === "register") {
      setMode(requestedMode);
      params.delete("auth");
      const query = params.toString();
      window.history.replaceState(null, "", `${window.location.pathname}${query ? `?${query}` : ""}${window.location.hash}`);
    }

    return () => {
      window.removeEventListener("ho-chi-minh-game-open-auth", open);
      window.removeEventListener("ho-chi-minh-game-auth-change", close);
    };
  }, []);

  useEffect(() => {
    if (!mode) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMode(null);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [mode]);

  if (!mode) return null;

  const isRegister = mode === "register";

  return (
    <div
      className="fixed inset-0 z-[110] grid place-items-center overflow-y-auto bg-black/70 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label={isRegister ? "회원가입" : "로그인"}
      onClick={() => setMode(null)}
    >
      <div
        className="relative my-auto w-full max-w-md rounded-2xl bg-card p-7 shadow-2xl md:p-10"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          onClick={() => setMode(null)}
          className="absolute right-4 top-4 grid size-10 place-items-center rounded-full bg-secondary text-muted-foreground transition hover:bg-primary hover:text-primary-foreground"
          aria-label="닫기"
        >
          <X className="size-5" />
        </button>

        <p className="brand-logo font-serif text-xl !text-accent [-webkit-text-stroke:1.25px_#6f6557]">호치민 게임</p>
        <p className="mt-9 text-xs uppercase tracking-[0.4em] text-muted-foreground">
          {isRegister ? "Create Account" : "Welcome Back"}
        </p>
        <h2 className="mt-4 font-serif text-4xl font-bold">{isRegister ? "회원가입" : "로그인"}</h2>
        <p className="mt-4 text-sm leading-7 text-muted-foreground">
          {isRegister
            ? "간단한 정보로 계정을 만들고 호치민 게임을 시작하세요."
            : "계정에 로그인하고 호치민 게임을 더 편리하게 이용하세요."}
        </p>
        <AuthForm mode={mode} onModeChange={setMode} />
      </div>
    </div>
  );
}
