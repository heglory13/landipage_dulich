"use client";

import { MessageSquare, Clock } from "lucide-react";
import Link from "next/link";

const starkingHref = "/ho-chi-minh/massage/%ED%98%B8%EC%B9%98%EB%AF%BC-%EC%8A%A4%ED%83%80%ED%82%B9-%EB%A7%88%EC%82%AC%EC%A7%80-%EB%95%8C%EB%B0%80%EC%9D%B4-%EC%84%B8%EC%8B%A0-%EC%B6%94%EC%B2%9C-1%EA%B5%B0-4641";

export function Personalization() {
  return (
    <section className="py-24 md:py-32 bg-background">
      <div className="max-w-[1800px] mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="max-w-3xl mb-20 md:mb-28">
          <p className="text-sm tracking-[0.3em] uppercase text-muted-foreground mb-4">
            Massage Highlights
          </p>
          <h2 className="cartoon-section-title font-serif text-4xl md:text-5xl lg:text-6xl tracking-tight leading-[1.1] mb-6">
            최근 등록된
            <span className="italic text-accent"> 마사지 글</span>
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            호치민 달밤 마사지 게시판의 이미지와 제목을 기준으로
            각 카드의 내용이 함께 표시됩니다.
          </p>
        </div>

        {/* Grid Layout */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Large Feature Card */}
          <div className="md:col-span-2 lg:col-span-2 lg:row-span-2 relative group overflow-hidden" style={{ boxShadow: "rgba(14, 63, 126, 0.04) 0px 0px 0px 1px, rgba(42, 51, 69, 0.04) 0px 1px 1px -0.5px, rgba(42, 51, 70, 0.04) 0px 3px 3px -1.5px, rgba(42, 51, 70, 0.04) 0px 6px 6px -3px, rgba(14, 63, 126, 0.04) 0px 12px 12px -6px, rgba(14, 63, 126, 0.04) 0px 24px 24px -12px" }}>
            <div className="aspect-[16/9] lg:aspect-auto lg:h-full relative">
              <img
                src="/vietdalbam/upload/7cbef2dbd83149e28f5f6fd2970e7a07.thumbnail.webp"
                alt="호치민 스타킹 마사지 때밀이 세신 추천"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/90 via-foreground/40 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 text-background">
                
                <h3 className="font-serif text-3xl md:text-4xl mb-3">
                  호치민 스타킹 마사지
                </h3>
                <p className="text-background/80 leading-relaxed mb-6 max-w-xl">
                  때밀이 세신 추천 글입니다. 1군 지역 마사지 게시물로
                  2026.06.03에 등록되었습니다.
                </p>
                <Link
                  href={starkingHref}
                  className="inline-flex items-center text-sm tracking-[0.2em] uppercase hover:text-accent transition-colors duration-300"
                >
                  글 보기 <span className="ml-2">→</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Service Cards */}
          <div className="bg-card p-8 lg:p-10 space-y-6" style={{ boxShadow: "rgba(14, 63, 126, 0.04) 0px 0px 0px 1px, rgba(42, 51, 69, 0.04) 0px 1px 1px -0.5px, rgba(42, 51, 70, 0.04) 0px 3px 3px -1.5px, rgba(42, 51, 70, 0.04) 0px 6px 6px -3px, rgba(14, 63, 126, 0.04) 0px 12px 12px -6px, rgba(14, 63, 126, 0.04) 0px 24px 24px -12px" }}>
            <MessageSquare className="w-10 h-10 text-accent" />
            <h3 className="font-serif text-2xl md:text-3xl">
              1군 마사지
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              스타킹 마사지, 모네스파, 해피 마사지처럼 1군 중심
              게시글을 함께 확인할 수 있습니다.
            </p>
            <Link
              href="/ho-chi-minh/massage?q=1%EA%B5%B0"
              className="inline-flex items-center text-sm tracking-[0.15em] uppercase hover:text-accent transition-colors duration-300 pt-2"
            >
              지금 살펴보기
            </Link>
          </div>

          <div className="bg-accent text-accent-foreground p-8 lg:p-10 space-y-6" style={{ boxShadow: "rgba(14, 63, 126, 0.04) 0px 0px 0px 1px, rgba(42, 51, 69, 0.04) 0px 1px 1px -0.5px, rgba(42, 51, 70, 0.04) 0px 3px 3px -1.5px, rgba(42, 51, 70, 0.04) 0px 6px 6px -3px, rgba(14, 63, 126, 0.04) 0px 12px 12px -6px, rgba(14, 63, 126, 0.04) 0px 24px 24px -12px" }}>
            <Clock className="w-10 h-10" />
            <h3 className="font-serif text-2xl md:text-3xl">
              7군 마사지
            </h3>
            <p className="text-accent-foreground/80 leading-relaxed">
              딸기 스파, 유리 스파, 루나 마사지 등 7군 게시글과
              이미지가 이어집니다.
            </p>
            <Link
              href="/ho-chi-minh/massage?q=7%EA%B5%B0"
              className="inline-flex items-center text-sm tracking-[0.15em] uppercase hover:opacity-80 transition-opacity duration-300 pt-2"
            >
              일정 선택하기
            </Link>
          </div>

          {/* Image Card */}
          <div className="md:col-span-2 lg:col-span-1 relative group overflow-hidden" style={{ boxShadow: "rgba(14, 63, 126, 0.04) 0px 0px 0px 1px, rgba(42, 51, 69, 0.04) 0px 1px 1px -0.5px, rgba(42, 51, 70, 0.04) 0px 3px 3px -1.5px, rgba(42, 51, 70, 0.04) 0px 6px 6px -3px, rgba(14, 63, 126, 0.04) 0px 12px 12px -6px, rgba(14, 63, 126, 0.04) 0px 24px 24px -12px" }}>
            <img
              src="/vietdalbam/upload/937d1fb3d5404d10b6fc1147975c6ea8.thumbnail.webp"
              alt="호치민 5군 블랙핑크 마사지"
              className="h-full min-h-[320px] w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-8 text-background">
              <h3 className="font-serif text-3xl mb-2">블랙핑크 마사지</h3>
              <p className="text-background/75 leading-relaxed">
                호치민 5군 BLACKPINK MASSAGE 게시물입니다.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
