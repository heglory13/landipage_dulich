"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Search, X } from "lucide-react";

const searchItems = [
  { title: "호치민 숙소 & 풀빌라", description: "아파트, 풀빌라와 숙박 정보", href: "/ho-chi-minh/accommodation", keywords: "숙소 풀빌라 아파트 accommodation hotel" },
  { title: "호치민 가라오케", description: "호치민 가라오케 추천 정보", href: "/ho-chi-minh/karaoke", keywords: "노래방 karaoke ktv" },
  { title: "호치민 마사지", description: "마사지와 스파 추천 목록", href: "/ho-chi-minh/massage", keywords: "마사지 스파 massage spa" },
  { title: "호치민 클럽", description: "클럽과 라운지 정보", href: "/ho-chi-minh/club", keywords: "클럽 라운지 club nightlife" },
  { title: "호치민 바 & 주점", description: "바, 펍과 주점 정보", href: "/ho-chi-minh/bar", keywords: "바 주점 펍 bar pub" },
  { title: "호치민 맛집", description: "레스토랑과 현지 맛집", href: "/ho-chi-minh/restaurant", keywords: "맛집 식당 레스토랑 restaurant food" },
  { title: "호치민 이발소 & 미용실", description: "이발소, 헤어와 뷰티 정보", href: "/ho-chi-minh/salon", keywords: "이발소 미용실 헤어 salon beauty" },
  { title: "호치민 골프", description: "골프장과 골프 여행 정보", href: "/ho-chi-minh/golf", keywords: "골프 golf" },
  { title: "호치민 여행지", description: "호치민 명소와 여행 정보", href: "/ho-chi-minh/travel", keywords: "여행 관광 명소 travel" },
  { title: "다낭", description: "Đà Nẵng 여행 정보", href: "/da-nang/accommodation", keywords: "다낭 danang da nang" },
  { title: "나트랑", description: "Nha Trang 여행 정보", href: "/nha-trang/accommodation", keywords: "나트랑 nha trang" },
  { title: "달랏", description: "Đà Lạt 여행 정보", href: "/da-lat/accommodation", keywords: "달랏 dalat da lat" },
  { title: "붕따우", description: "Vũng Tàu 여행 정보", href: "/vung-tau", keywords: "붕따우 vung tau" },
  { title: "푸꾸옥", description: "Phú Quốc 여행 정보", href: "/phu-quoc", keywords: "푸꾸옥 phu quoc" },
  { title: "공지사항", description: "호치민 게임의 중요 안내", href: "/notice", keywords: "공지 알림 notice" },
  { title: "이벤트", description: "진행 중인 이벤트와 혜택", href: "/event", keywords: "이벤트 프로모션 할인 event promotion" },
  { title: "여행 서비스", description: "예약과 여행 편의 서비스", href: "/service", keywords: "서비스 예약 공항 service booking" },
  { title: "소개", description: "호치민 게임 소개", href: "/about", keywords: "소개 about" },
  { title: "문의 및 지원", description: "문의 접수와 자주 묻는 질문", href: "/support", keywords: "문의 지원 연락 contact support faq" },
];

export function openSearchModal() {
  window.dispatchEvent(new Event("ho-chi-minh-game-open-search"));
}

export function SearchModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const open = () => setIsOpen(true);
    window.addEventListener("ho-chi-minh-game-open-search", open);
    return () => window.removeEventListener("ho-chi-minh-game-open-search", open);
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    document.body.style.overflow = "hidden";
    const timer = window.setTimeout(() => inputRef.current?.focus(), 50);
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.clearTimeout(timer);
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen]);

  const results = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return searchItems.slice(0, 8);
    return searchItems.filter((item) => `${item.title} ${item.description} ${item.keywords}`.toLowerCase().includes(normalized));
  }, [query]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[115] flex justify-center overflow-y-auto bg-black/70 p-4 pt-[10vh] backdrop-blur-sm" role="dialog" aria-modal="true" aria-label="사이트 검색" onClick={() => setIsOpen(false)}>
      <div className="h-fit w-full max-w-2xl overflow-hidden rounded-2xl bg-card shadow-2xl" onClick={(event) => event.stopPropagation()}>
        <div className="flex items-center gap-3 border-b border-border p-4 md:p-5">
          <Search className="size-5 shrink-0 text-muted-foreground" />
          <input
            ref={inputRef}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="지역, 마사지, 숙소, 이벤트 검색"
            className="h-11 min-w-0 flex-1 bg-transparent text-base outline-none placeholder:text-muted-foreground"
          />
          <button type="button" onClick={() => setIsOpen(false)} className="grid size-10 shrink-0 place-items-center rounded-full bg-secondary text-muted-foreground hover:text-foreground" aria-label="검색 닫기">
            <X className="size-5" />
          </button>
        </div>

        <div className="max-h-[62vh] overflow-y-auto p-3 md:p-4">
          <p className="px-3 pb-3 text-xs uppercase tracking-[0.25em] text-muted-foreground">
            {query ? `검색 결과 ${results.length}개` : "빠른 검색"}
          </p>
          {results.length ? (
            <div className="grid gap-1">
              {results.map((item) => (
                <Link key={item.href} href={item.href} onClick={() => setIsOpen(false)} className="group flex items-center justify-between gap-4 rounded-xl px-3 py-4 transition hover:bg-secondary/70 md:px-4">
                  <span className="min-w-0">
                    <span className="block font-bold">{item.title}</span>
                    <span className="mt-1 block truncate text-sm text-muted-foreground">{item.description}</span>
                  </span>
                  <ArrowUpRight className="size-4 shrink-0 text-muted-foreground transition group-hover:text-accent" />
                </Link>
              ))}
            </div>
          ) : (
            <div className="px-4 py-14 text-center">
              <p className="font-bold">검색 결과가 없습니다.</p>
              <p className="mt-2 text-sm text-muted-foreground">다른 지역명이나 카테고리를 입력해보세요.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
