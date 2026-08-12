import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Compass, RefreshCw, ShieldCheck, Sparkles } from "lucide-react";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";

export const metadata: Metadata = {
  title: "소개 | 호치민 게임",
  description: "호치민 게임이 여행 정보와 현지 콘텐츠를 소개하는 방식과 가치를 확인하세요.",
};

const values = [
  {
    icon: ShieldCheck,
    title: "확인하기 쉬운 정보",
    description: "숙소, 마사지, 가라오케, 클럽과 맛집 정보를 카테고리별로 정리해 한눈에 비교할 수 있도록 돕습니다.",
  },
  {
    icon: Compass,
    title: "여행자 중심의 선택",
    description: "처음 방문하는 여행자도 지역과 목적에 맞는 장소를 빠르게 찾을 수 있도록 핵심 정보를 제공합니다.",
  },
  {
    icon: RefreshCw,
    title: "꾸준한 업데이트",
    description: "새로운 장소, 공지사항, 이벤트와 서비스 소식을 지속적으로 반영해 최신 흐름을 전합니다.",
  },
];

const categories = ["숙소 & 풀빌라", "가라오케", "마사지", "클럽", "맛집", "이벤트 & 서비스"];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Header />

      <section className="px-6 pb-20 pt-32 md:px-12 md:pb-28 md:pt-40">
        <div className="mx-auto grid max-w-[1600px] items-end gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="mb-6 text-xs uppercase tracking-[0.45em] text-muted-foreground">About Ho Chi Minh Game</p>
            <h1 className="cartoon-page-title font-serif text-5xl leading-[1.05] md:text-7xl xl:text-8xl">
              호치민의 여행을
              <span className="mt-2 block italic text-accent">더 쉽고 즐겁게</span>
            </h1>
            <p className="mt-10 max-w-2xl text-base leading-8 text-muted-foreground md:text-lg md:leading-9">
              호치민 게임은 베트남 여행에 필요한 장소와 현지 소식을 보기 쉽게 정리하는 여행 정보 플랫폼입니다.
              복잡한 검색 대신, 여행자가 실제로 궁금해하는 정보에 빠르게 도달할 수 있는 경험을 만듭니다.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/ho-chi-minh/accommodation"
                className="inline-flex min-h-12 items-center gap-3 bg-primary px-7 py-4 text-sm font-semibold text-primary-foreground transition hover:bg-accent hover:text-accent-foreground"
              >
                추천 장소 보기 <ArrowUpRight className="size-4" />
              </Link>
              <Link
                href="/event"
                className="inline-flex min-h-12 items-center gap-3 border border-border px-7 py-4 text-sm font-semibold transition hover:border-accent hover:text-accent"
              >
                이벤트 확인하기
              </Link>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-[2rem] bg-primary">
            <img
              src="/hero-poster.jpg"
              alt="호치민의 밤 풍경"
              className="aspect-[4/3] w-full object-cover opacity-80"
            />
            <div className="absolute inset-x-5 bottom-5 rounded-2xl border border-white/15 bg-black/55 p-6 text-white backdrop-blur-md md:inset-x-8 md:bottom-8 md:p-8">
              <Sparkles className="size-7 text-accent" />
              <p className="mt-4 font-serif text-2xl font-bold md:text-3xl">여행의 시작부터 특별한 밤까지</p>
              <p className="mt-3 text-sm leading-6 text-white/65">호치민에서 필요한 정보와 즐길 거리를 한곳에 모았습니다.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-secondary/30 px-6 py-20 md:px-12 md:py-28">
        <div className="mx-auto max-w-[1600px]">
          <div className="grid gap-8 md:grid-cols-3">
            {values.map((value) => {
              const Icon = value.icon;
              return (
                <div key={value.title} className="rounded-2xl bg-card p-8 shadow-[0_12px_35px_rgba(30,26,20,0.06)] md:p-10">
                  <Icon className="size-10 text-accent" />
                  <h2 className="mt-7 font-serif text-2xl font-bold">{value.title}</h2>
                  <p className="mt-4 text-sm leading-7 text-muted-foreground md:text-base">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="px-6 py-20 md:px-12 md:py-28">
        <div className="mx-auto grid max-w-[1600px] gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-muted-foreground">What We Curate</p>
            <h2 className="cartoon-section-title mt-5 font-serif text-4xl leading-tight md:text-6xl">
              필요한 순간에
              <span className="block italic text-accent">필요한 정보</span>
            </h2>
          </div>
          <div className="grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2">
            {categories.map((category, index) => (
              <div key={category} className="flex min-h-28 items-center justify-between bg-card p-6 md:p-8">
                <span className="font-serif text-xl font-bold md:text-2xl">{category}</span>
                <span className="text-sm text-muted-foreground">0{index + 1}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-primary px-6 py-20 text-primary-foreground md:px-12 md:py-28">
        <div className="mx-auto flex max-w-[1200px] flex-col items-center text-center">
          <p className="text-xs uppercase tracking-[0.4em] text-primary-foreground/50">Our Direction</p>
          <h2 className="mt-6 max-w-4xl font-serif text-4xl leading-tight md:text-6xl">
            더 편리한 호치민 여행을 위한<br />신뢰할 수 있는 길잡이
          </h2>
          <p className="mt-8 max-w-2xl text-sm leading-7 text-primary-foreground/65 md:text-base">
            호치민 게임은 여행자가 시간을 덜 쓰고 더 좋은 선택을 할 수 있도록 콘텐츠와 이용 경험을 계속 개선합니다.
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
}
