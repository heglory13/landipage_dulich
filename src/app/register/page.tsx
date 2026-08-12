import type { Metadata } from "next";
import Link from "next/link";
import { AuthForm } from "@/components/auth-form";

export const metadata: Metadata = {
  title: "회원가입 | 호치민 게임",
  description: "호치민 게임 계정을 만들고 여행 정보를 더 편리하게 이용하세요.",
};

export default function RegisterPage() {
  return (
    <main className="grid min-h-screen bg-secondary/30 lg:grid-cols-2">
      <section className="relative hidden overflow-hidden bg-primary lg:block">
        <img src="/images/ho-chi-minh-game-promo.png" alt="호치민 게임" className="h-full w-full object-cover object-top opacity-70" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-transparent" />
        <div className="absolute inset-x-12 bottom-12 text-white">
          <p className="text-xs uppercase tracking-[0.4em] text-white/55">Join Ho Chi Minh Game</p>
          <h2 className="mt-5 max-w-xl font-serif text-5xl font-bold leading-tight">여행 정보부터<br />특별한 이벤트까지.</h2>
        </div>
      </section>
      <section className="flex items-center justify-center px-6 py-16 md:px-12">
        <div className="w-full max-w-md rounded-2xl bg-card p-7 shadow-[0_20px_60px_rgba(30,26,20,0.1)] md:p-10">
          <Link href="/" className="brand-logo font-serif text-xl !text-accent [-webkit-text-stroke:1.25px_#6f6557]">호치민 게임</Link>
          <p className="mt-10 text-xs uppercase tracking-[0.4em] text-muted-foreground">Create Account</p>
          <h1 className="mt-4 font-serif text-4xl font-bold">회원가입</h1>
          <p className="mt-4 text-sm leading-7 text-muted-foreground">간단한 정보로 계정을 만들고 호치민 게임을 시작하세요.</p>
          <AuthForm mode="register" />
        </div>
      </section>
    </main>
  );
}
