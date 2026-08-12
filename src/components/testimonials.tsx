"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

const testimonials = [
  {
    id: 1,
    quote:
      "호치민 린체리 마사지 Spa Linh Cherry (1군)",
    author: "린체리 마사지",
    title: "2024.09.27 · 이미지 +1",
    image: "/vietdalbam/upload/2cf14d0efb2c44a188696e3a5047ac36.thumbnail.webp",
  },
  {
    id: 2,
    quote:
      "호치민 센 마사지 푸미흥 건전 마사지 (7군)",
    author: "센 마사지",
    title: "2024.05.19",
    image: "/vietdalbam/upload/510a6d628b714ac68d7352f4b11d6b58.thumbnail.webp",
  },
  {
    id: 3,
    quote:
      "호치민 키위 마사지 (KIWI SPA) 로컬 마사지 (7군)",
    author: "키위 마사지",
    title: "2024.05.15 · 이미지 +2",
    image: "/vietdalbam/upload/e1a1b16c3770440392bcf92c1cb611a0.thumbnail.webp",
  },
];

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prev = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  const current = testimonials[currentIndex];

  return (
    <section className="py-24 md:py-32 bg-secondary/30">
      <div className="max-w-[1800px] mx-auto px-6 md:px-12">
        <div className="grid lg:grid-cols-[1fr,2fr] gap-12 lg:gap-24">
          {/* Left - Title */}
          <div className="space-y-6">
            <p className="text-sm tracking-[0.3em] uppercase text-muted-foreground">
              Related
            </p>
            <h2 className="cartoon-section-title font-serif text-4xl md:text-5xl tracking-tight">
              관련 마사지
              <span className="block italic text-accent">게시글</span>
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              린체리, 센 마사지, 키위 마사지 이미지는 각 게시글의
              실제 제목과 날짜를 함께 보여줍니다.
            </p>

            {/* Navigation */}
            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={prev}
                className="w-12 h-12 border border-border flex items-center justify-center hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors duration-300"
                aria-label="이전 후기"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={next}
                className="w-12 h-12 border border-border flex items-center justify-center hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors duration-300"
                aria-label="다음 후기"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Right - Testimonial */}
          <div className="relative">
            {/* Quote icon */}
            <Quote className="absolute -top-4 -left-4 w-16 h-16 text-accent/20" />

            <div className="bg-card p-8 md:p-12 relative">
              <div className="space-y-8">
                <p className="font-serif text-2xl md:text-3xl lg:text-4xl leading-snug text-balance">
                  "{current.quote}"
                </p>

                <div className="flex items-center gap-4 pt-4 border-t border-border">
                  <img
                    src={current.image || "/placeholder.svg"}
                    alt={current.author}
                    className="w-14 h-14 object-cover"
                  />
                  <div>
                    <p className="font-medium">{current.author}</p>
                    <p className="text-sm text-muted-foreground">
                      {current.title}
                    </p>
                  </div>
                </div>
              </div>

              {/* Indicator */}
              <div className="absolute bottom-8 right-8 flex gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={`indicator-${index}-${testimonials[index].id}`}
                    type="button"
                    onClick={() => setCurrentIndex(index)}
                    className={`w-2 h-2 transition-all duration-300 ${
                      index === currentIndex
                        ? "bg-accent w-8"
                        : "bg-border hover:bg-muted-foreground"
                    }`}
                    aria-label={`후기 ${index + 1}로 이동`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
