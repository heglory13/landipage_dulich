import Link from "next/link";
import { ChevronLeft, ChevronRight, MapPin, Search } from "lucide-react";

import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { LiveTravelWidgets } from "@/components/live-travel-widgets";
import { RecentActivityTabs } from "@/components/recent-activity-tabs";
import { CategorySearch } from "@/components/category-search";
import archivedCategories from "@/data/vietdalbam/categories.json";
import archivedPosts from "@/data/vietdalbam/posts.json";
import { getPublicCmsPosts } from "@/lib/public-cms-posts";

type ArchivedPost = { href: string; title: string; imageUrl: string | null; summary: string };
type ArchivedCategory = { slug: string; posts: ArchivedPost[] };
type ArticlePost = ArchivedPost & { category: string; html: string };
type FilterOption = readonly [value: string, label: string];
const normalizeSearch = (value: string) => value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/\s+/g, " ").trim();

const categories = archivedCategories as ArchivedCategory[];
const articles = archivedPosts as ArticlePost[];

const filterOptions: FilterOption[] = [
  ["all", "전체"],
  ["accommodation", "숙소&풀빌라"],
  ["karaoke", "가라오케"],
  ["club", "클럽"],
  ["bar", "바&주점"],
  ["salon", "이발소&미용실"],
  ["massage", "마사지"],
  ["golf", "골프"],
  ["travel", "여행지"],
  ["restaurant", "맛집"],
];

const recentPosts = [
  ["Vũng Tàu", "붕따우 한인 KTV 추천 럭셔리 가라오케", "2025.12.22", "/vung-tau/붕따우-한인-ktv-추천-럭셔리-가라오케-4547"],
  ["Vũng Tàu", "붕따우 누루 불건마 뉴 도쿄마사지", "2025.08.21", "/vung-tau/붕따우-누루-불건마-뉴-도쿄마사지-new-to-4416"],
  ["Vũng Tàu", "붕따우 블루문 클럽", "2025.04.04", "/vung-tau/붕따우-블루문-클럽-blue-moon-club-4269"],
  ["Phú Quốc", "푸꾸옥 사쿠라 VIP 마사지 예약 방법", "2025.01.01", "/phu-quoc/푸꾸옥-사쿠라-vip-마사지-예약-방법-4316"],
  ["Vũng Tàu", "붕따우 예수상 여행지 추천", "2025.03.29", "/vung-tau/붕따우-예수상-여행지로-추천-및-가볼-만한-곳-4175"],
  ["Vũng Tàu", "붕따우 세븐 가라오케 한인 ktv 추천", "2024.10.21", "/vung-tau/붕따우-세븐-가라오케-한인-ktv-추천-2770"],
] as const;
const recentComments = [
  ["Vũng Tàu", "위치 확인 부탁드려요", "3 phút trước", "/vung-tau/붕따우-한인-ktv-추천-럭셔리-가라오케-4547"],
  ["Phú Quốc", "예약 문의드립니다", "12 phút trước", "/phu-quoc/푸꾸옥-사쿠라-vip-마사지-예약-방법-4316"],
  ["Vũng Tàu", "여기 아직 영업하나요?", "28 phút trước", "/vung-tau/붕따우-88비어가든-88-beer-garden-4263"],
  ["Vũng Tàu", "가격 정보 궁금합니다", "1 giờ trước", "/vung-tau/5룸-붕따우-풀빌라-villa-60-넓은-수영장-240"],
] as const;
const eventItems = [
  ["2026년 5월 붕따우 호치민 게임 1:1 이벤트", "2026.04.29"],
  ["2025년 12월 붕따우 호치민 게임 정모 안내", "2025.11.20"],
  ["2025년 11월 푸꾸옥 호치민 게임 정모 안내", "2025.10.23"],
  ["2025년 10월 호치민 게임 이벤트", "2025.09.17"],
] as const;
const serviceItems = [
  ["호치민 게임 호치민 VIP 패스트트랙", "2024.06.28"],
  ["호치민 게임 다낭 VIP 패스트트랙", "2024.06.29"],
  ["호치민 게임 나트랑 VIP 패스트트랙", "2024.07.02"],
] as const;
const weatherLocations = [
  { key: "seoul", name: "Seoul", latitude: 37.5665, longitude: 126.978 },
  { key: "vungTau", name: "Vũng Tàu", latitude: 10.4114, longitude: 107.1362 },
  { key: "phuQuoc", name: "Phú Quốc", latitude: 10.2899, longitude: 103.984 },
];

function archive() {
  return categories.find((item) => item.slug === "vungtau");
}

function localImage(post: ArchivedPost) {
  if (post.imageUrl?.startsWith("/uploads/")) return post.imageUrl;
  if (post.imageUrl?.startsWith("/upload/")) {
    const fileName = post.imageUrl
      .replace("/upload/", "")
      .replace("?thumbnail", "")
      .replace(/\.webp$/i, ".thumbnail.webp");
    return `/vietdalbam/upload/${fileName}`;
  }
  const article = articles.find((item) => item.href === post.href);
  const image = article?.html.match(/<img[^>]+src="\/vietdalbam\/crawl\/[^"]*-([a-f0-9]{32}\.webp)(?:\?thumbnail)?"/i)?.[1];
  return image ? `/vietdalbam/upload/${image.replace(/\.webp$/i, ".thumbnail.webp")}` : null;
}

function postDate(summary: string) {
  return summary.match(/\d{4}\.\d{2}\.\d{2}/)?.[0] ?? "";
}

function postSlug(post: ArchivedPost) {
  return decodeURIComponent(post.href.split("/").at(-1) ?? "");
}

function matchesFilter(post: ArchivedPost, filter: string) {
  if (filter === "all") return true;
  const text = `${post.title} ${post.summary}`.toLowerCase();
  if (filter === "accommodation") return /풀빌라|villa|숙소|룸|stay|resort|villa/i.test(text);
  if (filter === "karaoke") return /가라오케|karaoke|ktv/i.test(text);
  if (filter === "club") return /클럽|club|lounge/i.test(text);
  if (filter === "bar") return /bar|pub|beer|비어|주점|바/i.test(text);
  if (filter === "salon") return /이발소|미용실|barber|salon|hair|nail/i.test(text);
  if (filter === "massage") return /마사지|spa|massage|불건마|nuru|spa/i.test(text);
  if (filter === "golf") return /골프|golf/i.test(text);
  if (filter === "travel") return /여행지|관광|예수상|landmark|beach|섬|tour/i.test(text);
  if (filter === "restaurant") return /맛집|restaurant|식당|bbq|가든|garden|food/i.test(text);
  return true;
}

export default async function VungTauPage({ searchParams }: { searchParams: Promise<{ page?: string; q?: string; filter?: string }> }) {
  const data = archive();
  if (!data) return null;
  const query = await searchParams;
  const selectedFilter = filterOptions.some(([value]) => value === query.filter) ? (query.filter ?? "all") : "all";
  const searchText = query.q ?? "";
  const pageSize = 9;
  const categoryMap:Record<string,string>={accommodation:"vungtau",karaoke:"vungtaukaraoke",club:"vungtauclub",bar:"vungtaubar",salon:"vungtausalon",massage:"vungtaumassage",golf:"vungtaugolf",travel:"vungtautravel",restaurant:"vungtaufood"};
  const cmsCategories=selectedFilter==="all"?Object.values(categoryMap):selectedFilter==="clubbar"?[categoryMap.club,categoryMap.bar]:[categoryMap[selectedFilter]].filter(Boolean);
  const allPosts=[...getPublicCmsPosts(cmsCategories),...data.posts];
  const filteredPosts = allPosts.filter((post) => {
    const matchesKeyword = !searchText || normalizeSearch(post.title).includes(normalizeSearch(searchText));
    return matchesKeyword && (post.href.startsWith("/article/") || matchesFilter(post, selectedFilter));
  });
  const totalPages = Math.max(1, Math.ceil(filteredPosts.length / pageSize));
  const currentPage = Math.min(Math.max(Number(query.page) || 1, 1), totalPages);
  const visiblePosts = filteredPosts.slice((currentPage - 1) * pageSize, currentPage * pageSize);
  const banners = allPosts.slice(0, 2).map((post) => localImage(post)).filter((image): image is string => Boolean(image));
  const pageHref = (page: number, filter = selectedFilter) => `?page=${page}${searchText ? `&q=${encodeURIComponent(searchText)}` : ""}${filter === "all" ? "" : `&filter=${encodeURIComponent(filter)}`}#category-list`;
  const filterHref = (filter: string) => `?${searchText ? `q=${encodeURIComponent(searchText)}&` : ""}${filter === "all" ? "" : `filter=${encodeURIComponent(filter)}`}#category-list`;

  return <main className="min-h-screen overflow-x-hidden bg-[#f3f1ec]">
    <Header />
    <section className="border-b border-border bg-secondary/50 px-4 pb-12 pt-28 sm:px-6 md:px-10 md:pb-16 md:pt-32">
      <div className="mx-auto max-w-[1740px]">
        <nav className="mb-8 flex items-center gap-2 text-xs tracking-[.12em] text-muted-foreground"><Link href="/">홈</Link><ChevronRight className="h-3.5 w-3.5" /><span>붕따우</span><ChevronRight className="h-3.5 w-3.5" /><span className="text-foreground">붕따우</span></nav>
        <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_340px]">
          <div className="min-w-0 space-y-5">
            <div className="grid grid-cols-1 gap-1 overflow-hidden sm:grid-cols-2">{banners.map((banner, index) => <div key={banner} className="aspect-[180/57] overflow-hidden bg-neutral-900"><img src={banner} alt={`붕따우 banner ${index + 1}`} className="h-full w-full object-cover" /></div>)}</div>
            <div className="rounded-2xl bg-card px-6 py-7 shadow-[0_10px_30px_rgba(30,26,20,.06)] md:px-10 md:py-8"><p className="text-xs tracking-[.28em] text-muted-foreground uppercase">Vung Tau · Travel</p><h1 className="mt-3 font-serif text-3xl leading-tight md:text-5xl">Vũng Tàu <span className="cartoon-page-title italic text-accent">붕따우</span></h1></div>
          </div>
          <div className="hidden h-fit rounded-2xl bg-card p-3 shadow-[0_10px_30px_rgba(30,26,20,.08)] lg:block"><a href="https://t.me/+A3VGGGBdkFllYWE9" target="_blank" rel="noreferrer" className="block aspect-[2268/720] overflow-hidden rounded-t-xl"><img src="/vietdalbam/upload/0e4942bd4a4e4ac699bd991fe4133439.webp" alt="호치민 게임 텔레방" className="h-full w-full object-cover" /></a><a href="https://open.kakao.com/o/gziI3pyh" target="_blank" rel="noreferrer" className="block aspect-[2268/720] overflow-hidden rounded-b-xl"><img src="/vietdalbam/upload/f5d0a13573ff441e95560ae9955acfd7.webp" alt="호치민 게임 단톡방" className="h-full w-full object-cover" /></a></div>
        </div>
      </div>
    </section>
    <section id="category-list" className="scroll-mt-24 py-10 md:py-14"><div className="mx-auto grid max-w-[1800px] gap-8 px-4 sm:px-6 md:px-10 lg:grid-cols-[320px_minmax(0,1fr)]">
      <aside className="order-2 h-fit space-y-6 lg:order-1 lg:sticky lg:top-28"><div className="bg-card"><div className="border-b border-border px-6 py-6"><p className="text-xs tracking-[.25em] text-muted-foreground uppercase">Destination</p><h2 className="mt-2 font-serif text-2xl">Vũng Tàu</h2></div><nav>{filterOptions.slice(1).map(([value, label]) => <Link key={value} href={filterHref(value)} className={`flex items-center justify-between border-b border-border/70 px-6 py-4 text-sm ${selectedFilter === value ? "bg-foreground text-background" : "hover:bg-secondary"}`}>{label}<ChevronRight className="h-4 w-4" /></Link>)}</nav></div>
        <RecentActivityTabs posts={recentPosts} comments={recentComments} />
        <section className="rounded-2xl bg-card p-5 shadow-[0_8px_25px_rgba(30,26,20,.05)]"><div className="mb-5 flex items-center justify-between"><h3 className="font-semibold">Sự kiện</h3><Link href="#" className="text-xs">Xem thêm</Link></div><ul className="space-y-3">{eventItems.map(([title, date]) => <li key={title} className="flex min-w-0 gap-3 text-xs"><span className="min-w-0 flex-1 truncate">{title}</span><span className="shrink-0 text-muted-foreground">{date}</span></li>)}</ul></section>
        <section className="rounded-2xl bg-card p-5 shadow-[0_8px_25px_rgba(30,26,20,.05)]"><div className="mb-5 flex items-center justify-between"><h3 className="font-semibold">Dịch vụ</h3><Link href="#" className="text-xs">Xem thêm</Link></div><ul className="space-y-3">{serviceItems.map(([title, date]) => <li key={title} className="flex min-w-0 gap-3 text-xs"><span className="rounded-full bg-[#b9bdc5] px-2 py-1 text-[10px] text-white">Fast track</span><span className="min-w-0 flex-1 truncate">{title}</span><span className="shrink-0 text-muted-foreground">{date}</span></li>)}</ul></section>
        <LiveTravelWidgets locations={weatherLocations} />
      </aside>
      <div className="order-1 min-w-0 lg:order-2"><div className="mb-7 bg-card p-5 md:p-7"><div className="flex flex-col justify-between gap-5 md:flex-row md:items-end"><div><p className="text-xs tracking-[.25em] text-muted-foreground uppercase">Vung Tau list</p><h2 className="mt-2 font-serif text-3xl">붕따우 <span className="text-accent">{filteredPosts.length}</span></h2></div><CategorySearch suggestions={allPosts} defaultValue={searchText} hidden={selectedFilter !== "all" ? { filter: selectedFilter } : {}} /></div><div className="mt-6 flex flex-col gap-4 border-t border-border pt-5 xl:flex-row xl:items-center xl:justify-between md:pt-6">
          <nav className="flex flex-wrap gap-2 md:gap-3 xl:flex-nowrap" aria-label="붕따우 필터">
            {filterOptions.map(([value, label]) => (
              <Link
                key={value}
                href={filterHref(value)}
                className={`inline-flex h-10 shrink-0 items-center justify-center whitespace-nowrap px-4 text-xs tracking-[0.04em] text-foreground transition-colors md:h-12 md:px-4 md:text-sm ${selectedFilter === value ? "bg-accent" : "bg-secondary hover:bg-accent/70"}`}
              >
                {label}
              </Link>
            ))}
          </nav>
        </div></div>
        <div className="grid min-w-0 grid-cols-2 gap-3 sm:gap-5 xl:grid-cols-3">{visiblePosts.map((post) => <article key={post.href} className="min-w-0 max-w-full overflow-hidden rounded-2xl bg-card shadow-[0_8px_28px_rgba(30,26,20,.06)] md:rounded-none"><Link href={post.href} className="block min-w-0 max-w-full"><div className="aspect-[4/3] w-full max-w-full overflow-hidden bg-secondary">{localImage(post) ? <img src={localImage(post) ?? ""} alt={post.title} className="h-full w-full object-cover transition-transform duration-500 hover:scale-105" /> : null}</div><div className="min-w-0 p-3 md:p-3.5"><div className="hidden items-center gap-1.5 text-xs text-muted-foreground md:flex"><MapPin className="h-3.5 w-3.5 text-accent" />Vũng Tàu</div><h3 className="line-clamp-2 min-h-10 text-[13px] font-medium leading-5 md:mt-2 md:text-sm">{post.title}</h3><div className="mt-2 flex min-w-0 items-center justify-between gap-1 text-[10px] text-muted-foreground md:mt-3 md:border-t md:border-border md:pt-3 md:text-[11px]"><span className="truncate">🎊 호치민 게임</span><span className="shrink-0">{postDate(post.summary)}</span></div></div></Link></article>)}</div>
        <nav className="mt-9 flex justify-center gap-1">{currentPage > 1 ? <Link href={pageHref(currentPage - 1)} className="grid h-10 w-10 place-items-center border border-border bg-card"><ChevronLeft className="h-4 w-4" /></Link> : null}{Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => <Link key={page} href={pageHref(page)} className={`grid h-10 min-w-10 place-items-center border px-3 text-sm ${page === currentPage ? "border-foreground bg-foreground text-background" : "border-border bg-card"}`}>{page}</Link>)}{currentPage < totalPages ? <Link href={pageHref(currentPage + 1)} className="grid h-10 w-10 place-items-center border border-border bg-card"><ChevronRight className="h-4 w-4" /></Link> : null}</nav>
        <a href="https://open.kakao.com/o/gziI3pyh" target="_blank" rel="noreferrer" className="mt-8 block w-full overflow-hidden bg-[#fff0c9]"><div className="aspect-[2268/720]"><img src="/vietdalbam/upload/31787e8e10004092b8082c77b2b5ddc4.webp" alt="호치민 게임 카카오톡 단톡방" className="h-full w-full object-cover transition-transform duration-500 hover:scale-[1.01]" /></div></a>
      </div>
    </div></section>
    <Footer />
  </main>;
}
