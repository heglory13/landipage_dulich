"use client";

import { useState } from "react";
import { Award, ChevronLeft, ChevronRight, Star } from "lucide-react";

const features = [
  {
    publication: "숙소 & 풀빌라",
    quote: "여행 인원과 일정에 맞는 아파트, 호텔과 프라이빗 풀빌라를 한곳에서 확인하세요.",
    year: "호치민 · 다낭 · 붕따우",
  },
  {
    publication: "가라오케 & 클럽",
    quote: "지역별 인기 KTV와 클럽의 위치, 이용 방법과 예약 정보를 꼼꼼하게 안내합니다.",
    year: "호치민 · 다낭 · 나트랑 · 달랏",
  },
  {
    publication: "마사지 & 스파",
    quote: "여행의 피로를 풀어 줄 마사지와 스파를 비교하고 취향에 맞는 업소를 찾아보세요.",
    year: "베트남 주요 여행지",
  },
  {
    publication: "맛집 & 한식당",
    quote: "현지 맛집부터 익숙한 한식당까지 실제 여행 동선에 맞춰 한눈에 비교할 수 있어 편리했어요.",
    year: "호치민 · 다낭 · 나트랑",
  },
  {
    publication: "바 & 라운지",
    quote: "분위기와 위치가 정리되어 있어 처음 방문하는 지역에서도 원하는 스타일의 바를 쉽게 찾았습니다.",
    year: "도심 나이트라이프",
  },
  {
    publication: "이발소 & 미용실",
    quote: "매장 이름과 지도 위치가 함께 제공되어 예약한 곳을 헷갈리지 않고 바로 찾아갈 수 있었어요.",
    year: "여행 중 편리한 관리",
  },
  {
    publication: "골프 & 액티비티",
    quote: "스크린 골프와 필드 정보를 지역별로 확인할 수 있어 남는 시간을 알차게 계획했습니다.",
    year: "다낭 · 호치민",
  },
  {
    publication: "지역별 여행 정보",
    quote: "도시마다 필요한 정보가 카테고리로 나뉘어 있어 여러 사이트를 돌아다닐 필요가 없었습니다.",
    year: "호치민 · 다낭 · 나트랑 · 달랏",
  },
  {
    publication: "지도 & 위치 안내",
    quote: "업소 이름과 정확한 지도 위치를 함께 확인할 수 있어 이동 시간을 줄이고 일정도 편해졌어요.",
    year: "빠르고 정확한 길 찾기",
  },
];

const awards = [
  { name: "숙소 & 풀빌라", organization: "아파트 · 호텔 · 프라이빗 빌라", year: "편안한 휴식" },
  { name: "가라오케 · 클럽 · 바", organization: "KTV · 라운지 · 현지 나이트라이프", year: "즐거운 밤" },
  { name: "마사지 · 이발소", organization: "스파 · 풋마사지 · 여행 피로 회복", year: "힐링 시간" },
];

export function Press() {
  const pageSize = 3;
  const pageCount = Math.ceil(features.length / pageSize);
  const [reviewPage, setReviewPage] = useState(0);
  const visibleFeatures = features.slice(reviewPage * pageSize, (reviewPage + 1) * pageSize);

  return (
    <section className="py-24 md:py-32 bg-background">
      <div className="max-w-[1800px] mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="text-center mb-20 md:mb-28">
          <p className="text-sm tracking-[0.3em] uppercase text-muted-foreground mb-4">
            추천 콘텐츠
          </p>
          <h2 className="cartoon-section-title font-serif text-4xl md:text-5xl lg:text-6xl tracking-tight">
            베트남 <span className="italic text-accent">여행 가이드</span>
          </h2>
        </div>

        <div className="space-y-16 lg:space-y-24">
          {/* Press Quotes */}
          <div className="grid gap-8 md:grid-cols-3 lg:gap-10">
            {visibleFeatures.map((feature, index) => (
              <div
                key={feature.publication}
                className="bg-card p-8 lg:p-10 space-y-6"
                style={{ boxShadow: "rgba(14, 63, 126, 0.04) 0px 0px 0px 1px, rgba(42, 51, 69, 0.04) 0px 1px 1px -0.5px, rgba(42, 51, 70, 0.04) 0px 3px 3px -1.5px, rgba(42, 51, 70, 0.04) 0px 6px 6px -3px, rgba(14, 63, 126, 0.04) 0px 12px 12px -6px, rgba(14, 63, 126, 0.04) 0px 24px 24px -12px" }}
              >
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                  ))}
                </div>
                <p className="font-serif text-xl md:text-2xl leading-snug italic">
                  "{feature.quote}"
                </p>
                <div className="pt-4 border-t border-border">
                  <p className="text-sm tracking-[0.2em] uppercase">
                    {feature.publication}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {feature.year}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 flex items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => setReviewPage((page) => (page - 1 + pageCount) % pageCount)}
              className="grid size-11 place-items-center border border-border bg-card transition-colors hover:bg-foreground hover:text-background"
              aria-label="이전 리뷰"
            >
              <ChevronLeft className="size-5" />
            </button>
            <div className="flex items-center gap-2" aria-label="리뷰 페이지">
              {Array.from({ length: pageCount }, (_, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setReviewPage(index)}
                  className={`h-2.5 rounded-full transition-all ${reviewPage === index ? "w-8 bg-accent" : "w-2.5 bg-border hover:bg-muted-foreground"}`}
                  aria-label={`리뷰 ${index + 1} 페이지`}
                  aria-current={reviewPage === index ? "page" : undefined}
                />
              ))}
            </div>
            <button
              type="button"
              onClick={() => setReviewPage((page) => (page + 1) % pageCount)}
              className="grid size-11 place-items-center border border-border bg-card transition-colors hover:bg-foreground hover:text-background"
              aria-label="다음 리뷰"
            >
              <ChevronRight className="size-5" />
            </button>
          </div>

          {/* Awards Section */}
          <div className="bg-primary text-primary-foreground p-12 lg:p-16" style={{ boxShadow: "rgba(14, 63, 126, 0.04) 0px 0px 0px 1px, rgba(42, 51, 69, 0.04) 0px 1px 1px -0.5px, rgba(42, 51, 70, 0.04) 0px 3px 3px -1.5px, rgba(42, 51, 70, 0.04) 0px 6px 6px -3px, rgba(14, 63, 126, 0.04) 0px 12px 12px -6px, rgba(14, 63, 126, 0.04) 0px 24px 24px -12px" }}>
            <div className="flex flex-col md:flex-row md:items-center gap-12">
              <div className="md:w-1/3">
                <Award className="w-12 h-12 text-accent mb-6" />
                <h3 className="font-serif text-3xl md:text-4xl mb-4">
                  인기 카테고리
                </h3>
                <p className="text-primary-foreground/70 leading-relaxed">
                  지역별 숙소부터 가라오케, 클럽, 바와 마사지까지 여행 중
                  필요한 정보와 추천 업소를 카테고리별로 만나보세요.
                </p>
              </div>
              <div className="md:w-2/3 space-y-6">
                {awards.map((award, index) => (
                  <div
                    key={index}
                    className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 py-6 border-b border-primary-foreground/20 last:border-0"
                  >
                    <div>
                      <p className="font-serif text-xl mb-1">{award.name}</p>
                      <p className="text-sm text-primary-foreground/60">
                        {award.organization}
                      </p>
                    </div>
                    <p className="text-accent text-lg">{award.year}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Logo Strip */}
          <div className="border-y border-border py-12">
            <p className="text-center text-sm tracking-[0.3em] uppercase text-muted-foreground mb-10">
              하이라이트
            </p>
            <div className="flex flex-wrap items-center justify-center gap-12 lg:gap-20 opacity-40">
              <div className="font-serif text-2xl tracking-wider">숙소&풀빌라</div>
              <div className="font-serif text-2xl tracking-wider">가라오케</div>
              <div className="font-serif text-2xl tracking-wider">클럽</div>
              <div className="font-serif text-2xl tracking-wider">바&주점</div>
              <div className="font-serif text-2xl tracking-wider">마사지</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
