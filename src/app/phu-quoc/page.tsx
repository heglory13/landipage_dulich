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
const category = categories.find((item) => item.slug === "phuquoc");
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
  ["Phú Quốc", "푸꾸옥 사쿠라 VIP 마사지", "2025.01.01", "/phu-quoc/푸꾸옥-사쿠라-vip-마사지-예약-방법-4316"],
  ["Vũng Tàu", "붕따우 한인 KTV 추천", "2025.12.22", "/vung-tau/붕따우-한인-ktv-추천-럭셔리-가라오케-4547"],
] as const;
const recentComments = [
  ["Phú Quốc", "예약 문의드립니다", "3 phút trước", "/phu-quoc/푸꾸옥-사쿠라-vip-마사지-예약-방법-4316"],
  ["Vũng Tàu", "위치 확인 부탁드려요", "12 phút trước", "/vung-tau/붕따우-한인-ktv-추천-럭셔리-가라오케-4547"],
] as const;

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
  if (filter === "travel") return /여행지|관광|랜드마크|beach|섬|tour/i.test(text);
  if (filter === "restaurant") return /맛집|restaurant|식당|bbq|가든|garden|food/i.test(text);
  return true;
}

export default async function PhuQuocPage({ searchParams }: { searchParams: Promise<{ q?: string; filter?: string }> }) {
  if (!category) return null;
  const query = await searchParams;
  const selectedFilter = filterOptions.some(([value]) => value === query.filter) ? (query.filter ?? "all") : "all";
  const searchText = query.q ?? "";
  const categoryMap:Record<string,string>={accommodation:"phuquoc",karaoke:"phuquockaraoke",club:"phuquocclub",bar:"phuquocbar",salon:"phuquocsalon",massage:"phuquocmassage",golf:"phuquocgolf",travel:"phuquoctravel",restaurant:"phuquocfood"};
  const cmsCategories=selectedFilter==="all"?Object.values(categoryMap):[categoryMap[selectedFilter]].filter(Boolean);
  const allPosts=[...getPublicCmsPosts(cmsCategories),...category.posts];
  const visiblePosts = allPosts.filter((post) => {
    const matchesKeyword = !searchText || normalizeSearch(post.title).includes(normalizeSearch(searchText));
    return matchesKeyword && (post.href.startsWith("/article/") || matchesFilter(post, selectedFilter));
  });
  const banners = allPosts.slice(0, 2).map((post) => localImage(post)).filter((image): image is string => Boolean(image));
  const filterHref = (filter: string) => `?${searchText ? `q=${encodeURIComponent(searchText)}&` : ""}${filter === "all" ? "" : `filter=${encodeURIComponent(filter)}`}#category-list`;

  return <main className="min-h-screen overflow-x-hidden bg-[#f3f1ec]">
    <Header />
    <section className="border-b border-border bg-secondary/50 px-4 pb-12 pt-28 sm:px-6 md:px-10 md:pb-16 md:pt-32">
      <div className="mx-auto max-w-[1740px]">
        <nav className="mb-8 flex items-center gap-2 text-xs tracking-[.12em] text-muted-foreground"><Link href="/">홈</Link><ChevronRight className="h-3.5 w-3.5" /><span>푸꾸옥</span><ChevronRight className="h-3.5 w-3.5" /><span className="text-foreground">푸꾸옥</span></nav>
        <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_340px]">
          <div className="min-w-0 space-y-5">
            <div className="grid grid-cols-1 gap-1 overflow-hidden sm:grid-cols-2">{banners.map((banner, index) => <div key={banner} className="aspect-[180/57] overflow-hidden bg-neutral-900"><img src={banner} alt={`푸꾸옥 banner ${index + 1}`} className="h-full w-full object-cover" /></div>)}</div>
            <div className="rounded-2xl bg-card px-6 py-7 shadow-[0_10px_30px_rgba(30,26,20,.06)] md:px-10 md:py-8"><p className="text-xs tracking-[.28em] text-muted-foreground uppercase">Phu Quoc · Travel</p><h1 className="mt-3 font-serif text-3xl leading-tight md:text-5xl">Phú Quốc <span className="cartoon-page-title italic text-accent">푸꾸옥</span></h1></div>
          </div>
          <div className="hidden h-fit rounded-2xl bg-card p-3 shadow-[0_10px_30px_rgba(30,26,20,.08)] lg:block"><a href="https://t.me/+A3VGGGBdkFllYWE9" target="_blank" rel="noreferrer" className="block aspect-[2268/720] overflow-hidden rounded-t-xl"><img src="/vietdalbam/upload/0e4942bd4a4e4ac699bd991fe4133439.webp" alt="달밤 텔레방" className="h-full w-full object-cover" /></a><a href="https://open.kakao.com/o/gziI3pyh" target="_blank" rel="noreferrer" className="block aspect-[2268/720] overflow-hidden rounded-b-xl"><img src="/vietdalbam/upload/f5d0a13573ff441e95560ae9955acfd7.webp" alt="달밤 단톡방" className="h-full w-full object-cover" /></a></div>
        </div>
      </div>
    </section>
    <section id="category-list" className="scroll-mt-24 py-10 md:py-14"><div className="mx-auto grid max-w-[1800px] gap-8 px-4 sm:px-6 md:px-10 lg:grid-cols-[320px_minmax(0,1fr)]">
      <aside className="order-2 h-fit space-y-6 lg:order-1 lg:sticky lg:top-28"><div className="bg-card"><div className="border-b border-border px-6 py-6"><p className="text-xs tracking-[.25em] text-muted-foreground uppercase">Destination</p><h2 className="mt-2 font-serif text-2xl">Phú Quốc</h2></div><nav>{filterOptions.slice(1).map(([value, label]) => <Link key={value} href={filterHref(value)} className={`flex items-center justify-between border-b border-border/70 px-6 py-4 text-sm ${selectedFilter === value ? "bg-foreground text-background" : "hover:bg-secondary"}`}>{label}<ChevronRight className="h-4 w-4" /></Link>)}</nav></div>
        <RecentActivityTabs posts={recentPosts} comments={recentComments} />
        <LiveTravelWidgets locations={[{ key: "phuQuoc", name: "Phú Quốc", latitude: 10.2899, longitude: 103.984 }]} />
      </aside>
      <div className="order-1 min-w-0 lg:order-2"><div className="mb-7 bg-card p-5 md:p-7"><div className="flex flex-col justify-between gap-5 md:flex-row md:items-end"><div><p className="text-xs tracking-[.25em] text-muted-foreground uppercase">Phu Quoc list</p><h2 className="mt-2 font-serif text-3xl">푸꾸옥 <span className="text-accent">{visiblePosts.length}</span></h2></div><CategorySearch suggestions={allPosts} defaultValue={searchText} hidden={selectedFilter !== "all" ? { filter: selectedFilter } : {}} /></div><div className="mt-6 flex flex-col gap-4 border-t border-border pt-5 xl:flex-row xl:items-center xl:justify-between md:pt-6">
          <nav className="flex flex-wrap gap-2 md:gap-3 xl:flex-nowrap" aria-label="푸꾸옥 필터">
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
        <div className="grid min-w-0 grid-cols-2 gap-3 sm:gap-5 xl:grid-cols-3">{visiblePosts.map((post) => <article key={post.href} className="min-w-0 max-w-full overflow-hidden rounded-2xl bg-card shadow-[0_8px_28px_rgba(30,26,20,.06)] md:rounded-none"><Link href={post.href} className="block min-w-0 max-w-full"><div className="aspect-[4/3] w-full max-w-full overflow-hidden bg-secondary">{localImage(post) ? <img src={localImage(post) ?? ""} alt={post.title} className="h-full w-full object-cover transition-transform duration-500 hover:scale-105" /> : null}</div><div className="min-w-0 p-3 md:p-3.5"><div className="hidden items-center gap-1.5 text-xs text-muted-foreground md:flex"><MapPin className="h-3.5 w-3.5 text-accent" />Phú Quốc</div><h3 className="line-clamp-2 min-h-10 text-[13px] font-medium leading-5 md:mt-2 md:text-sm">{post.title}</h3><div className="mt-2 flex min-w-0 items-center justify-between gap-1 text-[10px] text-muted-foreground md:mt-3 md:border-t md:border-border md:pt-3 md:text-[11px]"><span className="truncate">🎊 호치민 게임</span><span className="shrink-0">{postDate(post.summary)}</span></div></div></Link></article>)}</div>
        <nav className="mt-9 flex justify-center gap-1"><Link href="#category-list" className="grid h-10 w-10 place-items-center border border-border bg-card"><ChevronLeft className="h-4 w-4" /></Link><span className="grid h-10 min-w-10 place-items-center border border-foreground bg-foreground px-3 text-sm text-background">1</span><Link href="#category-list" className="grid h-10 w-10 place-items-center border border-border bg-card"><ChevronRight className="h-4 w-4" /></Link></nav>
        <a href="https://open.kakao.com/o/gziI3pyh" target="_blank" rel="noreferrer" className="mt-8 block w-full overflow-hidden bg-[#fff0c9]"><div className="aspect-[2268/720]"><img src="/vietdalbam/upload/31787e8e10004092b8082c77b2b5ddc4.webp" alt="달밤 카카오톡 단톡방" className="h-full w-full object-cover transition-transform duration-500 hover:scale-[1.01]" /></div></a>
      </div>
    </div></section>
    <Footer />
  </main>;
}
