import Link from "next/link";
import { ChevronLeft, ChevronRight, MapPin, Search } from "lucide-react";
import { notFound } from "next/navigation";

import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { LiveTravelWidgets } from "@/components/live-travel-widgets";
import { RecentActivityTabs } from "@/components/recent-activity-tabs";
import { CategorySearch } from "@/components/category-search";
import archivedCategories from "@/data/vietdalbam/categories.json";
import archivedPosts from "@/data/vietdalbam/posts.json";
import { getPublicCmsPosts } from "@/lib/public-cms-posts";

const routeCategories = {
  accommodation: { source: null, label: "숙소&풀빌라", heading: "달랏 숙소&풀빌라" },
  karaoke: { source: "dalatktv", label: "가라오케", heading: "달랏 가라오케" },
  club: { source: null, label: "클럽", heading: "달랏 클럽" },
  bar: { source: null, label: "바&주점", heading: "달랏 바&주점" },
  salon: { source: null, label: "이발소&미용실", heading: "달랏 이발소&미용실" },
  massage: { source: null, label: "마사지", heading: "달랏 마사지" },
  golf: { source: null, label: "골프", heading: "달랏 골프" },
  travel: { source: null, label: "여행지", heading: "달랏 여행지" },
  restaurant: { source: null, label: "맛집", heading: "달랏 맛집" },
} as const;

type RouteCategory = keyof typeof routeCategories;
type ArchivedPost = {
  href: string;
  title: string;
  imageUrl: string | null;
  summary: string;
};
type ArchivedCategory = {
  slug: string;
  posts: ArchivedPost[];
};
type ArticlePost = ArchivedPost & { category: string; html: string; text?: string };
type FilterOption = readonly [value: string, label: string];

const categories = archivedCategories as ArchivedCategory[];
const articles = archivedPosts as ArticlePost[];
const navItems = Object.entries(routeCategories) as [RouteCategory, (typeof routeCategories)[RouteCategory]][];
const sidebarNavItems = [
  { key: "accommodation", label: "숙소&풀빌라", href: "/da-lat/accommodation" },
  { key: "karaoke", label: "가라오케", href: "/da-lat/karaoke" },
  { key: "club", label: "클럽", href: "/da-lat/club" },
  { key: "bar", label: "바&주점", href: "/da-lat/bar" },
  { key: "salon", label: "이발소&미용실", href: "/da-lat/salon" },
  { key: "massage", label: "마사지", href: "/da-lat/massage" },
  { key: "golf", label: "골프", href: "/da-lat/golf" },
  { key: "travel", label: "여행지", href: "/da-lat/travel" },
  { key: "restaurant", label: "맛집", href: "/da-lat/restaurant" },
] as const;
const categoryBanners: Partial<Record<RouteCategory, string[]>> = {
  karaoke: ["/vietdalbam/upload/karaoke-korean-banner.webp", "/vietdalbam/upload/karaoke-local-banner.webp"],
};
const categoryFilters: Record<RouteCategory, FilterOption[]> = {
  accommodation: [["all", "전체"]],
  karaoke: [["all", "전체"], ["korean", "한인"], ["local", "로컬"]],
  club: [["all", "전체"]],
  bar: [["all", "전체"]],
  salon: [["all", "전체"]],
  massage: [["all", "전체"]],
  golf: [["all", "전체"]],
  travel: [["all", "전체"]],
  restaurant: [["all", "전체"]],
};
const recentPosts = [
  ["Đà Lạt Karaoke", "달랏 빅토리 가라오케", "최근", "/da-lat/karaoke/달랏-빅토리-가라오케｜한국식-로컬-ktv-추천-4320"],
  ["Đà Lạt Karaoke", "달랏 퀸 가라오케", "최근", "/da-lat/karaoke/달랏-가라오케-추천-퀸-가라오케-karaoke-4068"],
] as const;

const recentComments = [
  ["Đà Lạt Karaoke", "위치 확인 부탁드려요", "12 phút trước", "/da-lat/karaoke/달랏-빅토리-가라오케｜한국식-로컬-ktv-추천-4320"],
  ["Đà Lạt Karaoke", "가격 정보 궁금합니다", "28 phút trước", "/da-lat/karaoke/달랏-가라오케-추천-퀸-가라오케-karaoke-4068"],
] as const;
const eventItems = [
  ["2026년 5월 달랏 달밤 1:1 이벤트", "2026.04.29"],
  ["2025년 12월 달랏 달밤 정모 안내", "2025.11.20"],
  ["2025년 11월 달랏 달밤 정모 안내", "2025.10.23"],
  ["2025년 10월 달랏 달밤 이벤트", "2025.09.17"],
  ["2025년 9월 달밤 정모 안내", "2025.08.22"],
  ["[달밤 궁상] 달랏 프라이빗 파티", "2025.04.16"],
] as const;
const serviceItems = [
  ["달밤 다낭 VIP 패스트트랙", "2024.06.29"],
  ["달밤 호치민 VIP 패스트트랙", "2024.06.28"],
  ["달밤 나트랑 VIP 패스트트랙", "2024.07.02"],
  ["달밤 하노이 VIP 패스트트랙", "2024.08.07"],
] as const;
const daLatWeatherLocations = [
  { key: "seoul", name: "Seoul", latitude: 37.5665, longitude: 126.978 },
  { key: "daLat", name: "Đà Lạt", latitude: 11.9404, longitude: 108.4583 },
];

function isRouteCategory(category: string): category is RouteCategory {
  return category in routeCategories;
}

function localImage(post: ArchivedPost) {
  if (post.imageUrl?.startsWith("/uploads/")) return post.imageUrl;
  if (post.imageUrl?.startsWith("/upload/")) {
    const fileName = post.imageUrl
      .replace("/upload/", "")
      .replace("?thumbnail", "")
      .replace(/\.webp$/, ".thumbnail.webp");
    return `/vietdalbam/upload/${fileName}`;
  }
  const article = articles.find((item) => item.href === post.href);
  return article?.html.match(/<img[^>]+src="(\/vietdalbam\/crawl\/[^"]+)"/i)?.[1] ?? null;
}

function postDate(summary: string) {
  return summary.match(/\d{4}\.\d{2}\.\d{2}/)?.[0] ?? "";
}

function postSlug(post: ArchivedPost) {
  return post.href.split("/").at(-1) ?? "";
}

function postSearchText(post: ArchivedPost) {
  return post.title.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}

function matchesFilter(category: RouteCategory, post: ArchivedPost, filter: string) {
  if (filter === "all") return true;
  const text = postSearchText(post);
  if (category === "karaoke") return filter === "korean" ? /한인|한국|korean/i.test(text) : /로컬|local|victory|queen|빅토리|퀸/i.test(text);
  return true;
}

export function generateStaticParams() {
  return Object.keys(routeCategories).map((category) => ({ category }));
}

export default async function DaLatCategoryPage({
  params,
  searchParams,
}: {
  params: Promise<{ category: string }>;
  searchParams: Promise<{ page?: string; q?: string; filter?: string; type?: string; nav?: string }>;
}) {
  const { category: rawCategory } = await params;
  if (!isRouteCategory(rawCategory)) notFound();
  const category = routeCategories[rawCategory];
  const archive = category.source ? categories.find((item) => item.slug === category.source) : undefined;

  const query = await searchParams;
  const filterOptions = categoryFilters[rawCategory];
  const selectedFilter = filterOptions.some(([value]) => value === (query.filter ?? query.type)) ? (query.filter ?? query.type ?? "all") : "all";
  const searchText = query.q ?? "";
  const cmsPosts = getPublicCmsPosts([`dalat${rawCategory==="karaoke"?"ktv":rawCategory==="accommodation"?"room":rawCategory==="restaurant"?"food":rawCategory}`]);
  const allPosts = [...cmsPosts, ...(archive?.posts??[])];
  const filteredPosts = allPosts.filter((post) => {
    const text = postSearchText(post);
    const keyword = searchText.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();
    return (!keyword || text.includes(keyword)) && (post.href.startsWith("/article/") || matchesFilter(rawCategory, post, selectedFilter));
  });
  const pageSize = 9;
  const totalPages = Math.max(1, Math.ceil(filteredPosts.length / pageSize));
  const currentPage = Math.min(Math.max(Number(query.page) || 1, 1), totalPages);
  const visiblePosts = filteredPosts.slice((currentPage - 1) * pageSize, currentPage * pageSize);
  const banners = categoryBanners[rawCategory] ?? archive?.posts.slice(0, 2).map((post) => localImage(post)).filter((image): image is string => Boolean(image)) ?? [];
  const pageHref = (page: number) => {
    const params = new URLSearchParams({ page: String(page) });
    if (searchText) params.set("q", searchText);
    if (selectedFilter !== "all") params.set("filter", selectedFilter);
    return `?${params.toString()}#category-list`;
  };
  const filterHref = (filter: string) => {
    const params = new URLSearchParams();
    if (searchText) params.set("q", searchText);
    if (filter !== "all") params.set("filter", filter);
    return `?${params.toString()}#category-list`;
  };

  return <main className="min-h-screen overflow-x-hidden bg-[#f3f1ec]">
    <Header />
    <section className="border-b border-border bg-secondary/50 px-4 pb-12 pt-28 sm:px-6 md:px-10 md:pb-16 md:pt-32">
      <div className="mx-auto max-w-[1740px]">
        <nav className="mb-8 flex items-center gap-2 text-xs tracking-[.12em] text-muted-foreground">
          <Link href="/">홈</Link><ChevronRight className="h-3.5 w-3.5" /><span>달랏</span><ChevronRight className="h-3.5 w-3.5" /><span className="text-foreground">{category.label}</span>
        </nav>
        <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_340px]">
          <div className="min-w-0 space-y-5">
            <div className="grid grid-cols-1 gap-1 overflow-hidden sm:grid-cols-2">
              {banners.map((banner, index) => <div key={banner} className="aspect-[180/57] overflow-hidden bg-neutral-900">
                <img src={banner} alt={`${category.label} banner ${index + 1}`} className="h-full w-full object-cover" />
              </div>)}
            </div>
            <div className="rounded-2xl bg-card px-6 py-7 shadow-[0_10px_30px_rgba(30,26,20,.06)] md:px-10 md:py-8">
              <p className="text-xs tracking-[.28em] text-muted-foreground uppercase">Đà Lạt · {category.label}</p>
              <h1 className="mt-3 font-serif text-3xl leading-tight md:text-5xl">Đà Lạt <span className="cartoon-page-title italic text-accent">{category.label}</span></h1>
            </div>
          </div>
          <div className="hidden h-fit rounded-2xl bg-card p-3 shadow-[0_10px_30px_rgba(30,26,20,.08)] lg:block">
            <a href="https://t.me/+A3VGGGBdkFllYWE9" target="_blank" rel="noreferrer" className="block aspect-[2268/720] overflow-hidden rounded-t-xl"><img src="/vietdalbam/upload/0e4942bd4a4e4ac699bd991fe4133439.webp" alt="달밤 텔레방" className="h-full w-full object-cover" /></a>
            <a href="https://open.kakao.com/o/gziI3pyh" target="_blank" rel="noreferrer" className="block aspect-[2268/720] overflow-hidden rounded-b-xl"><img src="/vietdalbam/upload/f5d0a13573ff441e95560ae9955acfd7.webp" alt="달밤 단톡방" className="h-full w-full object-cover" /></a>
          </div>
        </div>
      </div>
    </section>
    <section id="category-list" className="scroll-mt-24 py-10 md:py-14">
      <div className="mx-auto grid max-w-[1800px] gap-8 px-4 sm:px-6 md:px-10 lg:grid-cols-[320px_minmax(0,1fr)]">
        <aside className="order-2 h-fit space-y-6 lg:order-1 lg:sticky lg:top-28">
          <div className="bg-card">
            <div className="border-b border-border px-6 py-6"><p className="text-xs tracking-[.25em] text-muted-foreground uppercase">Destination</p><h2 className="mt-2 font-serif text-2xl">Đà Lạt</h2></div>
            <nav>{sidebarNavItems.map((item) => <Link key={item.key} href={item.href} className={`flex items-center justify-between border-b border-border/70 px-6 py-4 text-sm ${item.key === rawCategory ? "bg-foreground text-background" : "hover:bg-secondary"}`}>{item.label}<ChevronRight className="h-4 w-4" /></Link>)}</nav>
          </div>
          <RecentActivityTabs posts={recentPosts} comments={recentComments} />
          <section className="rounded-2xl bg-card p-5 shadow-[0_8px_25px_rgba(30,26,20,.05)]"><div className="mb-5 flex items-center justify-between"><h3 className="font-semibold">Sự kiện</h3><Link href="#" className="text-xs">Xem thêm</Link></div><ul className="space-y-3">{eventItems.map(([title, date]) => <li key={title} className="flex min-w-0 gap-3 text-xs"><span className="min-w-0 flex-1 truncate">{title}</span><span className="shrink-0 text-muted-foreground">{date}</span></li>)}</ul></section>
          <section className="rounded-2xl bg-card p-5 shadow-[0_8px_25px_rgba(30,26,20,.05)]"><div className="mb-5 flex items-center justify-between"><h3 className="font-semibold">Dịch vụ</h3><Link href="#" className="text-xs">Xem thêm</Link></div><ul className="space-y-3">{serviceItems.map(([title, date]) => <li key={`${title}-${date}`} className="flex min-w-0 gap-3 text-xs"><span className="rounded-full bg-[#b9bdc5] px-2 py-1 text-[10px] text-white">Fast track</span><span className="min-w-0 flex-1 truncate">{title}</span><span className="shrink-0 text-muted-foreground">{date}</span></li>)}</ul></section>
          <LiveTravelWidgets locations={daLatWeatherLocations} />
        </aside>
        <div className="order-1 min-w-0 lg:order-2">
          <div className="mb-7 bg-card p-5 md:p-7">
            <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
              <div><p className="text-xs tracking-[.25em] text-muted-foreground uppercase">{category.label} list</p><h2 className="mt-2 font-serif text-3xl">{category.heading} <span className="text-accent">{filteredPosts.length}</span></h2></div>
              <CategorySearch suggestions={archive?.posts ?? []} defaultValue={searchText} hidden={selectedFilter !== "all" ? { filter: selectedFilter } : {}} />
            </div>
            <div className="mt-6 border-t border-border pt-5 md:pt-6">
            <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
              <nav className="flex flex-wrap gap-2 md:gap-3 xl:flex-nowrap" aria-label="달랏 카테고리 필터">
                  {sidebarNavItems.map((item) => <Link key={item.key} href={item.href} className={`inline-flex h-10 shrink-0 items-center justify-center whitespace-nowrap px-4 text-xs tracking-[0.04em] text-foreground transition-colors md:h-12 md:px-4 md:text-sm ${item.key === rawCategory ? "bg-accent" : "bg-secondary hover:bg-accent/70"}`}>{item.label}</Link>)}
                </nav>
              </div>
            </div>
          </div>
          <div className="grid min-w-0 grid-cols-2 gap-3 sm:gap-5 xl:grid-cols-3">
            {visiblePosts.map((post) => <article key={post.href} className="min-w-0 max-w-full overflow-hidden rounded-2xl bg-card shadow-[0_8px_28px_rgba(30,26,20,.06)] md:rounded-none">
              <Link href={post.href} className="block min-w-0 max-w-full">
                <div className="aspect-[4/3] w-full max-w-full overflow-hidden bg-secondary">{localImage(post) ? <img src={localImage(post) ?? ""} alt={post.title} className="h-full w-full object-cover transition-transform duration-500 hover:scale-105" /> : null}</div>
                <div className="min-w-0 p-3 md:p-3.5"><div className="hidden items-center gap-1.5 text-xs text-muted-foreground md:flex"><MapPin className="h-3.5 w-3.5 text-accent" />Đà Lạt</div><h3 className="line-clamp-2 min-h-10 text-[13px] font-medium leading-5 md:mt-2 md:text-sm">{post.title}</h3><div className="mt-2 flex min-w-0 items-center justify-between gap-1 text-[10px] text-muted-foreground md:mt-3 md:border-t md:border-border md:pt-3 md:text-[11px]"><span className="truncate">🎊 호치민 게임</span><span className="shrink-0">{postDate(post.summary)}</span></div></div>
              </Link>
            </article>)}
          </div>
          <nav className="mt-9 flex justify-center gap-1">
            {currentPage > 1 ? <Link href={pageHref(currentPage - 1)} className="grid h-10 w-10 place-items-center border border-border bg-card"><ChevronLeft className="h-4 w-4" /></Link> : null}
            {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => <Link key={page} href={pageHref(page)} className={`grid h-10 min-w-10 place-items-center border px-3 text-sm ${page === currentPage ? "border-foreground bg-foreground text-background" : "border-border bg-card"}`}>{page}</Link>)}
            {currentPage < totalPages ? <Link href={pageHref(currentPage + 1)} className="grid h-10 w-10 place-items-center border border-border bg-card"><ChevronRight className="h-4 w-4" /></Link> : null}
          </nav>
          <a href="https://open.kakao.com/o/gziI3pyh" target="_blank" rel="noreferrer" className="mt-8 block w-full overflow-hidden bg-[#fff0c9]">
            <div className="aspect-[2268/720]">
              <img src="/vietdalbam/upload/31787e8e10004092b8082c77b2b5ddc4.webp" alt="달밤 카카오톡 단톡방" className="h-full w-full object-cover transition-transform duration-500 hover:scale-[1.01]" />
            </div>
          </a>
        </div>
      </div>
    </section>
    <Footer />
  </main>;
}
