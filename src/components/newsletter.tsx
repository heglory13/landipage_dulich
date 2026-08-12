"use client";

import React from "react"

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export function Newsletter() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("호치민 게임 뉴스레터 등록:", email);
    setEmail("");
  };

  return (
    <section className="py-24 md:py-32 bg-secondary/50 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-accent/20 to-transparent" />
      <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-accent/20 to-transparent" />

      <div className="max-w-[1800px] mx-auto px-6 md:px-12 relative">
        <div className="max-w-2xl mx-auto text-center">
          <div className="space-y-6 mb-10">
            <p className="text-sm tracking-[0.3em] uppercase text-muted-foreground">
              소식 받기
            </p>
            <h2 className="cartoon-section-title font-serif text-4xl md:text-5xl lg:text-6xl tracking-tight">
              혜택을
              <span className="italic text-accent"> 가장 먼저</span>
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              호치민 게임의 이벤트, 공연 일정, 바우처와
              최신 추천 일정을 가장 먼저 받아보세요.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <label htmlFor="newsletter-email" className="sr-only">
                이메일 주소
              </label>
              <input
                id="newsletter-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="이메일을 입력하세요"
                required
                className="w-full h-14 px-6 bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-accent transition-colors duration-300 text-base"
              />
            </div>
            <button
              type="submit"
              className="group inline-flex items-center justify-center gap-3 bg-primary text-primary-foreground px-8 h-14 text-sm tracking-[0.2em] uppercase hover:bg-primary/90 transition-all duration-300 min-w-[180px]"
            >
              구독하기
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
            </button>
          </form>

          <p className="text-sm text-muted-foreground mt-6">
            구독하면{" "}
            <Link href="/privacy" className="underline hover:text-accent transition-colors duration-300">
              개인정보 처리방침
            </Link>
            에 동의하는 것으로 간주됩니다.
          </p>
        </div>
      </div>
    </section>
  );
}
