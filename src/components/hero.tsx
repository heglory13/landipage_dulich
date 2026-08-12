"use client";

import { ArrowRight, Volume2, VolumeX } from "lucide-react";
import { useEffect, useState } from "react";

export function Hero() {
  const [scrollY, setScrollY] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const [settings, setSettings] = useState({ hero_eyebrow: "호치민 게임 2026", hero_title_line1: "꿈보다", hero_title_accent: "더", hero_title_line2: "놀라운 즐거움", hero_description: "베트남 전역의 호치민 게임에서 여행, 엔터테인먼트, 쇼와 특별 혜택이 어우러진 여정을 만나보세요.", hero_poster: "/hero-poster.jpg" });

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    fetch("/api/site-settings", { cache: "no-store" }).then((response) => response.json()).then((data) => { if (data.settings) setSettings((current) => ({ ...current, ...data.settings })); }).catch(() => undefined);
  }, []);

  return (
    <section className="relative h-screen overflow-hidden">
      {/* Full-bleed background video with parallax */}
      <div
        className="absolute inset-0"
        style={{ transform: `translateY(${scrollY * 0.3}px)` }}
      >
        <video
          autoPlay
          loop
          muted={isMuted}
          playsInline
          preload="auto"
          poster={settings.hero_poster}
          className="absolute inset-0 w-full h-[120%] object-cover"
          src="/video_3_minutes.mp4"
        />
      </div>

      <button
        type="button"
        onClick={() => setIsMuted((muted) => !muted)}
        className="absolute right-6 top-24 md:right-12 z-20 grid size-12 place-items-center border border-white/30 bg-black/20 text-white backdrop-blur-sm transition-colors duration-300 hover:border-white hover:bg-black/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        aria-label={isMuted ? "Bật âm thanh" : "Tắt âm thanh"}
        title={isMuted ? "Bật âm thanh" : "Tắt âm thanh"}
      >
        {isMuted ? (
          <VolumeX className="size-5" aria-hidden="true" />
        ) : (
          <Volume2 className="size-5" aria-hidden="true" />
        )}
      </button>

      {/* Decorative vertical lines */}
      <div className="absolute inset-0 hidden lg:flex justify-between px-12 pointer-events-none">
        <div className="w-px h-full bg-white/[0.06]" />
        <div className="w-px h-full bg-white/[0.06]" />
        <div className="w-px h-full bg-white/[0.06]" />
        <div className="w-px h-full bg-white/[0.06]" />
        <div className="w-px h-full bg-white/[0.06]" />
      </div>

      {/* Animated accent line */}
      <div
        className="absolute left-12 top-0 w-px bg-[#b8a88f]/40 hidden lg:block animate-in slide-in-from-top duration-1000"
        style={{
          height: "40%",
          animationDelay: "1200ms",
          animationFillMode: "both",
        }}
      />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-end pb-16 md:pb-24 lg:pb-32">
        <div className="max-w-[1800px] mx-auto px-6 md:px-12 w-full">
          <div className="grid lg:grid-cols-12 gap-8 items-end">
            {/* Main headline area */}
            <div className="lg:col-span-8 space-y-8">
              {/* Season tag */}
              <div
                className="flex items-center gap-4 animate-in fade-in slide-in-from-left-8 duration-700"
                style={{ animationDelay: "300ms", animationFillMode: "both" }}
              >
                <div className="w-12 h-px bg-[#b8a88f]" />
                <p className="text-sm tracking-[0.4em] uppercase text-white/60">
                  {settings.hero_eyebrow}
                </p>
              </div>

              {/* Main title */}
              <h1
                className="cartoon-display font-serif text-5xl md:text-7xl lg:text-8xl xl:text-[9rem] leading-[0.88] tracking-tight text-white animate-in fade-in slide-in-from-bottom-8 duration-1000"
                style={{ animationDelay: "500ms", animationFillMode: "both" }}
              >
                {settings.hero_title_line1}
                <br />
                <span className="italic text-[#b8a88f]">
                  {settings.hero_title_accent}
                </span>{" "}
                {settings.hero_title_line2}
              </h1>

              {/* Subtitle */}
              <p
                className="text-white/50 text-lg md:text-xl max-w-xl leading-relaxed animate-in fade-in slide-in-from-bottom-4 duration-700"
                style={{ animationDelay: "800ms", animationFillMode: "both" }}
              >
                {settings.hero_description}
              </p>

              {/* CTA Buttons */}
              <div
                className="flex flex-col sm:flex-row gap-4 pt-4 animate-in fade-in slide-in-from-bottom-4 duration-700"
                style={{ animationDelay: "1000ms", animationFillMode: "both" }}
              >
                <button
                  type="button"
                  className="group inline-flex items-center justify-center gap-3 bg-white text-[#1a1a1a] px-10 py-5 text-sm tracking-[0.25em] uppercase min-h-12 hover:bg-[#b8a88f] hover:text-[#1a1a1a] transition-all duration-500"
                >
                  여행지 둘러보기
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-300" />
                </button>
                <button
                  type="button"
                  className="inline-flex items-center justify-center gap-3 border border-white/30 text-white px-10 py-5 text-sm tracking-[0.25em] uppercase min-h-12 hover:border-white hover:bg-white/10 transition-all duration-500 backdrop-blur-sm"
                >
                  지금 예매하기
                </button>
              </div>
            </div>

            {/* Right side - floating card */}
            <div
              className="lg:col-span-4 hidden lg:flex flex-col items-end gap-8 animate-in fade-in slide-in-from-right-8 duration-700"
              style={{ animationDelay: "1100ms", animationFillMode: "both" }}
            >
              {/* Stats card */}
              <div
                className="bg-white/5 backdrop-blur-md border border-white/10 p-8 max-w-[280px] w-full"
                style={{
                  boxShadow:
                    "rgba(14, 63, 126, 0.04) 0px 0px 0px 1px, rgba(42, 51, 69, 0.04) 0px 1px 1px -0.5px, rgba(42, 51, 70, 0.04) 0px 3px 3px -1.5px, rgba(42, 51, 70, 0.04) 0px 6px 6px -3px, rgba(14, 63, 126, 0.04) 0px 12px 12px -6px, rgba(14, 63, 126, 0.04) 0px 24px 24px -12px",
                }}
              >
                <p className="text-[10px] tracking-[0.4em] uppercase text-white/40 mb-4">
                  호치민 게임 한눈에
                </p>
                <div className="space-y-6">
                  <div>
                    <p className="font-serif text-4xl text-[#b8a88f]">7</p>
                    <p className="text-sm text-white/50 mt-1">
                      주요 여행지
                    </p>
                  </div>
                  <div className="w-full h-px bg-white/10" />
                  <div>
                    <p className="font-serif text-4xl text-[#b8a88f]">59+</p>
                    <p className="text-sm text-white/50 mt-1">
                      체험 & 쇼
                    </p>
                  </div>
                  <div className="w-full h-px bg-white/10" />
                  <div>
                    <p className="font-serif text-4xl text-[#b8a88f]">1900</p>
                    <p className="text-sm text-white/50 mt-1">핫라인 6677</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        
      </div>

      {/* Bottom decorative border */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#b8a88f]/30 to-transparent" />
    </section>
  );
}
