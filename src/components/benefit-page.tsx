import Link from "next/link";
import { ArrowUpRight, CalendarDays, Megaphone, Sparkles } from "lucide-react";
import { noticePosts } from "@/data/notice-posts";
import { eventPosts } from "@/data/event-posts";
import { servicePosts } from "@/data/service-posts";

type BenefitKind = "notice" | "event" | "service";

type BenefitPost = {
  title: string;
  category: string;
  date: string;
  description: string;
  href: string;
  image?: string;
};

const benefitPages: Record<
  BenefitKind,
  {
    eyebrow: string;
    label: string;
    title: string;
    accent: string;
    description: string;
    posts: BenefitPost[];
  }
> = {
  notice: {
    eyebrow: "DALBAM NOTICE",
    label: "공지사항",
    title: "달밤 소식과",
    accent: "이용 안내",
    description:
      "달밤에서 꼭 확인해야 할 업데이트, 이용 방법, 공지 사항을 한곳에 모았습니다.",
    posts: noticePosts.map((post) => ({
      title: post.title,
      category: post.category,
      date: post.date,
      description: post.description,
      href: `/notice/${post.slug}`,
      image: post.images?.[0]?.src,
    })),
  },
  event: {
    eyebrow: "DALBAM EVENT",
    label: "이벤트",
    title: "진행 중인 혜택과",
    accent: "프로모션",
    description:
      "가라오케, 마사지, 바&주점, 예약 서비스에서 진행되는 달밤 추천 혜택을 확인하세요.",
    posts: eventPosts.map((post) => ({
      title: post.title,
      category: post.category,
      date: post.date,
      description: post.description,
      href: `/event/${post.slug}`,
      image: post.images[0]?.src,
    })),
  },
  service: {
    eyebrow: "DALBAM SERVICE",
    label: "서비스",
    title: "여행을 더 편하게",
    accent: "빠르게 연결",
    description:
      "공항 패스트트랙, 예약 문의, 현지 이동에 필요한 편의 서비스를 정리했습니다.",
    posts: servicePosts.map((post) => ({
      title: post.title,
      category: post.category,
      date: post.date,
      description: post.description,
      href: `/service/${post.slug}`,
      image: post.images[0]?.src,
    })),
  },
};

const tabItems: Array<{ kind: BenefitKind; label: string; href: string }> = [
  { kind: "notice", label: "공지사항", href: "/notice" },
  { kind: "event", label: "이벤트", href: "/event" },
  { kind: "service", label: "서비스", href: "/service" },
];

const POSTS_PER_PAGE = 6;

export function BenefitPage({
  kind,
  currentPage = 1,
}: {
  kind: BenefitKind;
  currentPage?: number;
}) {
  const page = benefitPages[kind];
  const totalPages = Math.max(1, Math.ceil(page.posts.length / POSTS_PER_PAGE));
  const safePage = Math.min(Math.max(currentPage, 1), totalPages);
  const paginatedPosts = page.posts.slice(
    (safePage - 1) * POSTS_PER_PAGE,
    safePage * POSTS_PER_PAGE,
  );
  const pageHref = tabItems.find((item) => item.kind === kind)?.href ?? "/";

  return (
    <section className="bg-background px-6 pt-28 pb-20 text-foreground md:px-12 md:pt-36 md:pb-28">
      <div className="mx-auto max-w-[1800px]">
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <div>
            <p className="mb-5 text-xs uppercase tracking-[0.55em] text-muted-foreground md:text-sm">
              {page.eyebrow}
            </p>
            <h1 className="cartoon-page-title font-serif text-5xl leading-[1.05] md:text-7xl xl:text-8xl">
              {page.title}
              <span className="mt-2 block font-serif italic text-accent">
                {page.accent}
              </span>
            </h1>
          </div>
          <div className="max-w-2xl lg:justify-self-end">
            <p className="text-lg leading-8 text-muted-foreground md:text-xl md:leading-9">
              {page.description}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              {tabItems.map((tab) => (
                <Link
                  key={tab.kind}
                  href={tab.href}
                  className={`min-h-12 px-6 py-3 text-sm font-semibold transition-colors md:px-8 ${
                    tab.kind === kind
                      ? "bg-accent text-accent-foreground"
                      : "bg-card text-foreground hover:bg-accent hover:text-accent-foreground"
                  }`}
                >
                  {tab.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-14 border-t border-border pt-10 md:mt-20 md:pt-14">
          <div className="grid gap-6 lg:grid-cols-3">
            <article className="flex min-h-[360px] flex-col justify-between bg-primary p-8 text-primary-foreground md:p-10">
              <div>
                <Sparkles className="mb-8 h-9 w-9 text-accent" />
                <p className="mb-4 text-xs uppercase tracking-[0.4em] text-primary-foreground/50">
                  {page.label}
                </p>
                <h2 className="font-serif text-4xl leading-tight md:text-5xl">
                  필요한 정보를
                  <span className="block text-accent">한눈에</span>
                </h2>
              </div>
              <p className="mt-10 max-w-sm text-sm leading-7 text-primary-foreground/65">
                달밤의 게시글, 지도, 예약 정보를 더 빠르게 찾을 수 있도록 카테고리별로 정리했습니다.
              </p>
            </article>

            <div className="grid gap-6 lg:col-span-2 md:grid-cols-2">
              {paginatedPosts.map((post) => (
                <Link
                  key={post.title}
                  href={post.href}
                  className={`group relative flex min-h-[320px] overflow-hidden p-7 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl md:p-8 ${
                    post.image
                      ? "bg-primary text-primary-foreground"
                      : "bg-card text-foreground"
                  }`}
                >
                  {post.image ? (
                    <>
                      <img
                        src={post.image}
                        alt={post.title}
                        className="absolute inset-0 h-full w-full object-cover opacity-45 blur-[1.5px] saturate-75 transition duration-700 group-hover:scale-105 group-hover:opacity-55"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/85 to-primary/55" />
                    </>
                  ) : null}
                  <div className="relative z-10 flex h-full flex-col justify-between">
                    <div>
                    <div className="mb-8 flex items-center justify-between gap-4">
                      <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-accent">
                        <Megaphone className="h-4 w-4" />
                        {post.category}
                      </span>
                      <ArrowUpRight
                        className={`h-5 w-5 transition group-hover:text-accent ${
                          post.image ? "text-primary-foreground/70" : "text-muted-foreground"
                        }`}
                      />
                    </div>
                    <h3 className="font-serif text-2xl leading-snug md:text-3xl">
                      {post.title}
                    </h3>
                    <p
                      className={`mt-5 line-clamp-5 text-sm leading-7 md:text-base ${
                        post.image ? "text-primary-foreground/75" : "text-muted-foreground"
                      }`}
                    >
                      {post.description}
                    </p>
                    </div>
                  <div
                    className={`mt-8 flex items-center gap-2 border-t pt-5 text-sm ${
                      post.image
                        ? "border-primary-foreground/25 text-primary-foreground/70"
                        : "border-border text-muted-foreground"
                    }`}
                  >
                    <CalendarDays className="h-4 w-4" />
                    <span>{post.date}</span>
                  </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
          {totalPages > 1 ? (
            <nav
              className="mt-12 flex items-center justify-center gap-3"
              aria-label={`${page.label} pagination`}
            >
              {Array.from({ length: totalPages }, (_, index) => {
                const pageNumber = index + 1;
                return (
                  <Link
                    key={pageNumber}
                    href={pageNumber === 1 ? pageHref : `${pageHref}?page=${pageNumber}`}
                    className={`flex h-12 w-12 items-center justify-center text-sm font-semibold transition-colors ${
                      pageNumber === safePage
                        ? "bg-primary text-primary-foreground"
                        : "bg-card text-foreground hover:bg-accent hover:text-accent-foreground"
                    }`}
                  >
                    {pageNumber}
                  </Link>
                );
              })}
            </nav>
          ) : null}
        </div>

        <div className="mt-12 grid gap-6 rounded-[32px] bg-card p-8 shadow-sm md:grid-cols-[1fr_auto] md:items-center md:p-10">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-muted-foreground">
              DALBAM GUIDE
            </p>
            <h2 className="mt-3 font-serif text-3xl md:text-4xl">
              인기 게시글도 함께 둘러보세요
            </h2>
          </div>
          <Link
            href="/ho-chi-minh/massage"
            className="inline-flex min-h-12 items-center justify-center gap-2 border border-foreground px-7 text-sm font-semibold uppercase tracking-[0.25em] transition hover:bg-foreground hover:text-background"
          >
            추천 글 보기
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
