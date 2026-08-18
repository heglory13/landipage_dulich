import type { Metadata } from "next";
import Link from "next/link";
import { ChevronLeft, ChevronRight, MapPin, Search } from "lucide-react";

import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { LiveTravelWidgets } from "@/components/live-travel-widgets";
import archivedPosts from "@/data/vietdalbam/posts.json";
import { database } from "@/lib/database";

export const metadata: Metadata = {
  title: "호치민 숙소 & 풀빌라 | VIN KY QUAN",
  description: "호치민 아파트, 호텔과 프라이빗 풀빌라 추천 정보를 확인하세요.",
};

const stays = [
  {
    title: "빈홈 랜드마크 플러스 아파트 1룸",
    area: "빈탄군",
    type: "아파트",
    image: "/vietdalbam/upload/8ce8942fbedc4f1ebc97b67bdb4cd28a.thumbnail.webp",
  },
  {
    title: "빈홈 랜드마크 플러스 아파트 2룸",
    area: "빈탄군",
    type: "아파트",
    image: "/vietdalbam/upload/04482dbe0734454da7c6ace13c710d67.thumbnail.webp",
  },
  {
    title: "메트로폴 오페라 아파트 1·2·3룸",
    area: "투득시",
    type: "아파트",
    image: "/vietdalbam/upload/9e3489aebea44861a4ce4e7d41f59960.thumbnail.webp",
  },
  {
    title: "루미에르 리버사이드 아파트",
    area: "2군 타오디엔",
    type: "아파트",
    image: "/vietdalbam/upload/c5aec58707b44c7eb3573eab0f560d70.thumbnail.webp",
  },
  {
    title: "미드타운 아파트 2룸",
    area: "7군 푸미흥",
    type: "아파트",
    image: "/vietdalbam/upload/85beddc0d1194e5f90c843bb8927395a.thumbnail.webp",
  },
  {
    title: "타오디엔 프라이빗 풀빌라 5룸",
    area: "2군 타오디엔",
    type: "풀빌라",
    image: "/vietdalbam/upload/3a6095c0ca124393a31fa23068b1b2f2.thumbnail.webp",
  },
  {
    title: "빈홈 센트럴파크 아파트 4룸",
    area: "빈탄군",
    type: "아파트",
    image: "/vietdalbam/upload/416786cf84ff483686b8e3a30bec2bae.thumbnail.webp",
  },
  {
    title: "선라이즈 시티뷰 스튜디오",
    area: "7군",
    type: "스튜디오",
    image: "/vietdalbam/upload/19a9a20f8ce84b4096177ded2d4e1741.thumbnail.webp",
  },
  {
    title: "안푸 프라이빗 풀빌라 7룸",
    area: "2군 안푸",
    type: "풀빌라",
    image: "/vietdalbam/upload/34b4e121b9154e81b0ee5fd4e7becd07.thumbnail.webp",
  },
  {
    title: "타오디엔 프라이빗 풀빌라 5룸 A-6",
    area: "2군 타오디엔",
    type: "풀빌라",
    image: "/vietdalbam/upload/4f9dbf67cc6f4dcb8e1a66612b24e4da.thumbnail.webp",
  },
  {
    title: "타오디엔 프라이빗 풀빌라 5룸 A-5",
    area: "2군 타오디엔",
    type: "풀빌라",
    image: "/vietdalbam/upload/614bef8e0bae417192cb0d74feabaa66.thumbnail.webp",
  },
  {
    title: "타오디엔 프라이빗 풀빌라 5룸 A-4",
    area: "2군 타오디엔",
    type: "풀빌라",
    image: "/vietdalbam/upload/c158b62e49594398997d49ccce00d2bb.thumbnail.webp",
  },
  {
    title: "타오디엔 프라이빗 풀빌라 6룸 A-3",
    area: "2군 타오디엔",
    type: "풀빌라",
    image: "/vietdalbam/upload/04dbb55880cb4c7594ad7b9521a31c27.thumbnail.webp",
  },
  {
    title: "타오디엔 프라이빗 풀빌라 5룸 A-2",
    area: "2군 타오디엔",
    type: "풀빌라",
    image: "/vietdalbam/upload/252f8a627543489982d8ca364618610a.thumbnail.webp",
  },
  {
    title: "안푸 프라이빗 풀빌라 4룸 A-1",
    area: "2군 안푸",
    type: "풀빌라",
    image: "/vietdalbam/upload/2ea347c561214eb7b3cfebd3e1706d05.thumbnail.webp",
  },
  {
    title: "선라이즈 시티 아파트 3룸",
    area: "7군",
    type: "아파트",
    image: "/vietdalbam/upload/fa28f7e4df38467d90ea10712bc96633.thumbnail.webp",
  },
  {
    title: "선라이즈 시티 아파트 2룸",
    area: "7군",
    type: "아파트",
    image: "/vietdalbam/upload/a600a8eaa48e46bda0a1215c6d0c09a9.thumbnail.webp",
  },
] as const;

type ArchivedPost = {
  href: string;
  category: string;
};

const accommodationPosts = (archivedPosts as ArchivedPost[]).filter(
  (post) => post.category === "accommodation",
);

function detailHref(index: number) {
  const post = accommodationPosts[index];
  return post
    ? post.href.replace("/posts/accommodation/", "/ho-chi-minh/accommodation/")
    : "/ho-chi-minh/accommodation";
}

type CmsStayRow={title:string;slug:string;image:string|null;summary:string|null;updated_at:string};

const filters = ["전체", "아파트", "풀빌라", "호텔", "1군", "2군", "7군"];
const hoChiMinhAreas = [
  "1군", "2군", "3군", "4군", "5군", "6군", "7군", "8군", "9군", "10군", "11군", "12군",
  "빈탄군", "고밥군", "푸뉴언군", "떤빈군", "떤푸군", "빈떤군", "투득시",
  "빈짠현", "냐베현", "혹몬현", "꾸찌현", "껀저현",
] as const;

const categories = [
  "숙소&풀빌라",
  "가라오케",
  "클럽",
  "바&주점",
  "이발소&미용실",
  "마사지",
  "골프",
  "여행지",
  "맛집",
];

const categoryRoutes = [
  "/ho-chi-minh/accommodation", "/ho-chi-minh/karaoke", "/ho-chi-minh/club",
  "/ho-chi-minh/bar", "/ho-chi-minh/salon", "/ho-chi-minh/massage",
  "/ho-chi-minh/golf", "/ho-chi-minh/travel", "/ho-chi-minh/restaurant",
];

const promotionalBanners = [
  {
    image: "/vietdalbam/upload/48e5ebc917c04ffc91d4f6cfbcc4004b.webp",
    alt: "빈홈 아파트 숙소 추천",
  },
  {
    image: "/vietdalbam/upload/5b3aadbfaeb644499e9070de0daf54d4.webp",
    alt: "선라이즈 아파트 숙소 추천",
  },
] as const;

const recentPosts = [
  { category: "바&주점", title: "호치민 1군 부이비엔 인기 바 추천", date: "4 일전" },
  { category: "마사지", title: "호치민 체온스파 38.5°C 이용 안내", date: "7 일전" },
  { category: "다낭마사지", title: "다낭 링감 마사지샵, 룸 안내", date: "36 일전" },
  { category: "다낭마사지", title: "다낭 요정스파 수질 좋은 곳", date: "38 일전" },
  { category: "푸꾸옥", title: "푸꾸옥 사쿠라 VIP 마사지", date: "40 일전" },
] as const;

const eventItems = [
  { title: "2026년 5월 호치민 호치민 게임 1:1 이벤트", date: "2026.04.29" },
  { title: "2025년 12월 호치민 호치민 게임 정모 안내", date: "2025.11.20" },
  { title: "2025년 11월 호치민 호치민 게임 정모 안내", date: "2025.10.23" },
  { title: "2025년 10월 호치민 게임 이벤트", date: "2025.09.17" },
] as const;

const serviceItems = [
  { title: "호치민 게임 호치민 VIP 패스트트랙", date: "2024.06.28" },
  { title: "호치민 게임 나트랑 VIP 패스트트랙", date: "2024.07.02" },
  { title: "호치민 게임 하노이 VIP 패스트트랙", date: "2024.08.07" },
  { title: "호치민 게임 다낭 VIP 패스트트랙", date: "2024.06.29" },
] as const;

const stayDates = [
  "13/05/2024", "14/05/2024", "07/05/2026", "07/05/2026", "25/06/2025",
  "09/02/2025", "03/09/2024", "28/08/2024", "07/08/2024", "06/08/2024",
  "06/08/2024", "06/08/2024", "06/08/2024", "06/08/2024", "05/08/2024",
  "22/06/2024", "21/06/2024",
] as const;

export default async function AccommodationPage({
  searchParams,
}: {
  searchParams: Promise<{
    page?: string | string[];
    area?: string | string[];
    type?: string | string[];
  }>;
}) {
  const resolvedSearchParams = await searchParams;
  const pageParam = resolvedSearchParams.page;
  const areaParam = Array.isArray(resolvedSearchParams.area) ? resolvedSearchParams.area[0] : resolvedSearchParams.area;
  const typeParam = Array.isArray(resolvedSearchParams.type) ? resolvedSearchParams.type[0] : resolvedSearchParams.type;
  const selectedArea = areaParam && hoChiMinhAreas.includes(areaParam as (typeof hoChiMinhAreas)[number]) ? areaParam : "전체";
  const selectedType = typeParam ?? "전체";
  const cmsRows=database.prepare("SELECT title,slug,image,summary,updated_at FROM content_items WHERE kind='cms_article' AND category='accommodation' AND status='published' ORDER BY updated_at DESC").all() as CmsStayRow[];
  const allStays=[...cmsRows.map(row=>({title:row.title,area:row.summary?.match(/(\d{1,2}군|빈탄군|투득시|타오디엔|안푸|푸미흥)/)?.[0]??"호치민",type:"아파트",image:row.image||"/seo/og-home.webp",href:`/article/${row.slug}`,date:new Date(row.updated_at).toLocaleDateString("ko-KR")})),...stays.map((stay,index)=>({...stay,href:detailHref(index),date:stayDates[index]}))];
  const filteredStays = allStays.filter((stay) => {
    const matchesArea = selectedArea === "전체" || stay.area.includes(selectedArea);
    const matchesType = selectedType === "전체" || stay.type === selectedType;
    return matchesArea && matchesType;
  });
  const requestedPage = Number(Array.isArray(pageParam) ? pageParam[0] : pageParam);
  const pageSize = 9;
  const totalPages = Math.max(1, Math.ceil(filteredStays.length / pageSize));
  const currentPage = Number.isFinite(requestedPage)
    ? Math.min(Math.max(Math.trunc(requestedPage), 1), totalPages)
    : 1;
  const paginatedStays = filteredStays.slice((currentPage - 1) * pageSize, currentPage * pageSize);
  const pageHref = (page: number) => {
    const query = new URLSearchParams({ page: String(page) });
    if (selectedArea !== "전체") query.set("area", selectedArea);
    if (selectedType !== "전체") query.set("type", selectedType);
    return `?${query.toString()}#accommodation-list`;
  };
  const filterHref = (filter: string) => {
    const query = new URLSearchParams();
    const typeFilters = new Set(["아파트", "풀빌라", "호텔"]);
    const areaFilters = new Set(["1군", "2군", "7군"]);

    if (filter === "전체") return "?#accommodation-list";
    if (typeFilters.has(filter)) {
      query.set("type", filter);
      if (selectedArea !== "전체") query.set("area", selectedArea);
    }
    if (areaFilters.has(filter)) {
      query.set("area", filter);
      if (selectedType !== "전체") query.set("type", selectedType);
    }
    return `?${query.toString()}#accommodation-list`;
  };
  const isFilterActive = (filter: string) => {
    if (filter === "전체") return selectedArea === "전체" && selectedType === "전체";
    if (["아파트", "풀빌라", "호텔"].includes(filter)) return selectedType === filter;
    return selectedArea === filter;
  };

  return (
    <main className="min-h-screen max-w-full overflow-x-hidden bg-background">
      <Header />

      <section className="border-b border-border bg-secondary/40 pt-28 md:pt-32">
        <div className="mx-auto max-w-[1480px] px-6 pb-12 md:px-10 md:pb-16">
          <nav className="mb-9 flex items-center gap-2 text-xs tracking-[0.16em] text-muted-foreground uppercase">
            <Link href="/" className="transition-colors hover:text-accent">홈</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span>호치민</span>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-foreground">숙소 & 풀빌라</span>
          </nav>

          <div className="grid min-w-0 grid-cols-1 items-start gap-6 lg:grid-cols-[minmax(0,1fr)_340px]">
            <div className="min-w-0 space-y-5">
              <div className="grid gap-2 overflow-hidden md:grid-cols-2 md:gap-0">
                {promotionalBanners.map((banner) => (
                  <Link
                    key={banner.image}
                    href="#accommodation-list"
                    className="group block overflow-hidden bg-secondary"
                  >
                    <div className="aspect-[180/57] overflow-hidden">
                      <img
                        src={banner.image}
                        alt={banner.alt}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                      />
                    </div>
                  </Link>
                ))}
              </div>

              <div className="rounded-2xl bg-card px-6 py-6 shadow-[0_8px_25px_rgba(30,26,20,0.05)] md:px-8">
                <p className="mb-2 text-xs tracking-[0.25em] text-muted-foreground uppercase">
                  Ho Chi Minh Stay
                </p>
                <h1 className="cartoon-page-title font-serif text-3xl leading-tight tracking-tight md:text-4xl">
                  호치민 <span className="italic text-accent">숙소 & 풀빌라</span>
                </h1>
              </div>
            </div>
            <div className="hidden w-full max-w-[340px] space-y-3 lg:block lg:justify-self-end">
              <div className="rounded-2xl bg-card p-3 shadow-[0_10px_30px_rgba(30,26,20,0.08)]">
                <div className="overflow-hidden rounded-xl">
                  <a href="https://t.me/+A3VGGGBdkFllYWE9" target="_blank" rel="noreferrer" className="block aspect-[2268/720] overflow-hidden">
                    <img src="/vietdalbam/upload/0e4942bd4a4e4ac699bd991fe4133439.webp" alt="호치민 게임 텔레방" className="h-full w-full object-cover transition-transform duration-300 hover:scale-[1.01]" />
                  </a>
                  <a href="https://open.kakao.com/o/gziI3pyh" target="_blank" rel="noreferrer" className="block aspect-[2268/720] overflow-hidden">
                    <img src="/vietdalbam/upload/f5d0a13573ff441e95560ae9955acfd7.webp" alt="호치민 게임 단톡방" className="h-full w-full object-cover transition-transform duration-300 hover:scale-[1.01]" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="accommodation-list" className="scroll-mt-24 bg-[#f3f1ec] py-12 md:py-16">
        <div className="mx-auto grid min-w-0 max-w-[1800px] grid-cols-1 gap-8 px-4 sm:px-6 md:px-10 lg:grid-cols-[320px_minmax(0,1fr)]">
          <aside className="order-2 h-fit space-y-6 lg:order-1 lg:sticky lg:top-28">
            <div className="bg-card">
              <div className="border-b border-border px-6 py-6">
                <p className="text-xs tracking-[0.25em] text-muted-foreground uppercase">Destination</p>
                <h2 className="mt-2 font-serif text-2xl">TP. Hồ Chí Minh</h2>
              </div>
              <nav aria-label="호치민 카테고리">
                {categories.map((category, index) => (
                  <Link
                    key={category}
                    href={categoryRoutes[index]}
                    className={`flex items-center justify-between border-b border-border/70 px-6 py-4 text-sm transition-colors last:border-0 ${index === 0 ? "bg-foreground text-background" : "hover:bg-secondary hover:text-accent"}`}
                  >
                    {category}
                    <ChevronRight className="h-4 w-4" />
                  </Link>
                ))}
              </nav>
            </div>

            <section className="rounded-2xl bg-card p-5 shadow-[0_8px_25px_rgba(30,26,20,0.05)]">
              <div className="mb-5 grid grid-cols-2 border-b border-border text-center text-sm font-semibold">
                <button type="button" className="border-b-2 border-[#df3138] pb-3 text-[#df3138]">새 글</button>
                <button type="button" className="pb-3">새 댓글</button>
              </div>
              <ul className="space-y-3">
                {recentPosts.map((item) => (
                  <li key={item.title} className="flex min-w-0 items-center gap-2 text-xs">
                    <span className="shrink-0 text-[#df3138]">[{item.category}]</span>
                    <span className="min-w-0 flex-1 truncate">{item.title}</span>
                    <span className="shrink-0 text-muted-foreground">{item.date}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section className="rounded-2xl bg-card p-5 shadow-[0_8px_25px_rgba(30,26,20,0.05)]">
              <div className="mb-5 flex items-center justify-between">
                <h3 className="font-semibold">이벤트</h3>
                <a href="#" className="text-xs text-muted-foreground hover:text-accent">더보기</a>
              </div>
              <ul className="space-y-3">
                {eventItems.map((item) => (
                  <li key={item.title} className="flex min-w-0 gap-3 text-xs">
                    <span className="min-w-0 flex-1 truncate">{item.title}</span>
                    <span className="shrink-0 text-muted-foreground">{item.date}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section className="rounded-2xl bg-card p-5 shadow-[0_8px_25px_rgba(30,26,20,0.05)]">
              <div className="mb-5 flex items-center justify-between">
                <h3 className="font-semibold">서비스</h3>
                <a href="#" className="text-xs text-muted-foreground hover:text-accent">더보기</a>
              </div>
              <ul className="space-y-3">
                {serviceItems.map((item) => (
                  <li key={item.title} className="flex min-w-0 items-center gap-2 text-xs">
                    <span className="rounded-full bg-[#b8bcc4] px-2 py-1 text-[10px] text-white">패스트트랙</span>
                    <span className="min-w-0 flex-1 truncate">{item.title}</span>
                    <span className="shrink-0 text-muted-foreground">{item.date}</span>
                  </li>
                ))}
              </ul>
            </section>

            <LiveTravelWidgets />
          </aside>

          <div className="order-1 min-w-0 lg:order-2">
            <div className="mb-6 max-w-full overflow-hidden bg-card p-5 md:p-7">
              <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
                <div>
                  <p className="text-xs tracking-[0.25em] text-muted-foreground uppercase">Accommodation list</p>
                  <h2 className="mt-2 font-serif text-3xl">추천 숙소 <span className="text-accent">{filteredStays.length}</span></h2>
                </div>
                <div className="flex w-full items-center border border-border bg-background px-4 xl:max-w-sm">
                  <Search className="h-4 w-4 text-muted-foreground" />
                  <input
                    type="search"
                    placeholder="숙소 이름 또는 지역 검색"
                    className="h-11 w-full bg-transparent px-3 text-sm outline-none placeholder:text-muted-foreground"
                  />
                </div>
              </div>
              <div className="mt-6 flex flex-col gap-4 border-t border-border pt-5 xl:flex-row xl:items-center xl:justify-between md:pt-6">
                <div className="flex flex-wrap gap-2 md:gap-3 xl:flex-nowrap">
                  {filters.map((filter) => (
                    <Link
                      key={filter}
                      href={filterHref(filter)}
                      aria-current={isFilterActive(filter) ? "true" : undefined}
                      className={`inline-flex h-10 shrink-0 items-center justify-center whitespace-nowrap px-4 text-xs tracking-[0.04em] text-foreground transition-colors md:h-12 md:px-4 md:text-sm ${isFilterActive(filter) ? "bg-accent" : "bg-secondary hover:bg-accent/70"}`}
                    >
                      {filter}
                    </Link>
                  ))}
                </div>

                <form action="/ho-chi-minh/accommodation" className="grid w-full max-w-[430px] shrink-0 grid-cols-2 gap-2 sm:grid-cols-[1fr_1fr_auto]">
                  <label className="border border-border bg-background px-2.5 py-1.5">
                    <span className="block text-[9px] tracking-[0.12em] text-muted-foreground">지역</span>
                    <select name="area" defaultValue={selectedArea} className="mt-0.5 w-full bg-transparent text-xs outline-none">
                      <option value="전체">전체 지역</option>
                      {hoChiMinhAreas.map((area) => <option key={area} value={area}>{area}</option>)}
                    </select>
                  </label>
                  <label className="border border-border bg-background px-2.5 py-1.5">
                    <span className="block text-[9px] tracking-[0.12em] text-muted-foreground">숙소 유형</span>
                    <select name="type" defaultValue={selectedType} className="mt-0.5 w-full bg-transparent text-xs outline-none">
                      <option value="전체">전체 유형</option>
                      <option value="아파트">아파트</option>
                      <option value="풀빌라">풀빌라</option>
                      <option value="호텔">호텔</option>
                      <option value="스튜디오">스튜디오</option>
                    </select>
                  </label>
                  <button type="submit" className="col-span-2 h-10 bg-foreground px-5 text-xs text-background transition-colors hover:bg-accent hover:text-accent-foreground sm:col-span-1 sm:h-full">
                    검색
                  </button>
                </form>
              </div>
            </div>

            <div className="grid min-w-0 grid-cols-2 gap-3 sm:gap-5 md:grid-cols-2 xl:grid-cols-3">
              {paginatedStays.map((stay) => (
                <article key={stay.title} className="group min-w-0 max-w-full overflow-hidden rounded-2xl bg-card shadow-[0_8px_28px_rgba(30,26,20,0.06)] transition-transform duration-300 hover:-translate-y-1 md:rounded-none">
                  <Link href={stay.href} className="block min-w-0 max-w-full">
                    <div className="relative aspect-[4/3] w-full max-w-full overflow-hidden bg-secondary">
                      <img
                        src={stay.image}
                        alt={stay.title}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <span className="absolute left-3 top-3 hidden bg-background/95 px-2.5 py-1.5 text-[10px] tracking-[0.12em] shadow-sm backdrop-blur md:block">
                        {stay.type}
                      </span>
                    </div>
                    <div className="min-w-0 p-3 md:p-3.5">
                      <div className="hidden items-center gap-2 text-xs text-muted-foreground md:flex">
                        <MapPin className="h-3.5 w-3.5 text-accent" />
                        {stay.area}
                      </div>
                      <h3 className="line-clamp-2 min-h-10 text-[13px] font-medium leading-5 transition-colors group-hover:text-accent md:mt-2 md:text-sm">
                        {stay.title}
                      </h3>
                      <div className="mt-2 flex min-w-0 items-center justify-between gap-1 text-[10px] text-muted-foreground md:mt-3 md:border-t md:border-border md:pt-3 md:text-[11px]">
                        <span className="truncate">🎊 호치민 게임</span>
                        <span className="shrink-0">{stay.date}</span>
                      </div>
                    </div>
                  </Link>
                </article>
              ))}
            </div>

            <nav aria-label="숙소 페이지" className="mt-10 flex items-center justify-center gap-1">
              {currentPage > 1 ? (
                <Link
                  href={pageHref(currentPage - 1)}
                  aria-label="이전 페이지"
                  className="flex h-11 w-11 items-center justify-center bg-card transition-colors hover:bg-foreground hover:text-background"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Link>
              ) : (
                <span className="flex h-11 w-11 items-center justify-center bg-card text-muted-foreground/40">
                  <ChevronLeft className="h-4 w-4" />
                </span>
              )}

              {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
                <Link
                  key={page}
                  href={pageHref(page)}
                  aria-current={page === currentPage ? "page" : undefined}
                  className={`flex h-11 w-11 items-center justify-center text-sm transition-colors ${page === currentPage ? "bg-foreground text-background" : "bg-card hover:bg-accent hover:text-accent-foreground"}`}
                >
                  {page}
                </Link>
              ))}

              {currentPage < totalPages ? (
                <Link
                  href={pageHref(currentPage + 1)}
                  aria-label="다음 페이지"
                  className="flex h-11 w-11 items-center justify-center bg-card transition-colors hover:bg-foreground hover:text-background"
                >
                  <ChevronRight className="h-4 w-4" />
                </Link>
              ) : (
                <span className="flex h-11 w-11 items-center justify-center bg-card text-muted-foreground/40">
                  <ChevronRight className="h-4 w-4" />
                </span>
              )}
            </nav>

            <a
              href="https://open.kakao.com/o/gziI3pyh"
              target="_blank"
              rel="noreferrer"
              className="mt-8 block w-full overflow-hidden bg-[#fff0c9]"
            >
              <div className="aspect-[2268/720] w-full overflow-hidden">
                <img
                  src="/vietdalbam/upload/31787e8e10004092b8082c77b2b5ddc4.webp"
                  alt="호치민 게임 카카오톡 단톡방"
                  className="h-full w-full object-cover transition-transform duration-500 hover:scale-[1.01]"
                />
              </div>
            </a>
          </div>
        </div>
      </section>

      <section className="bg-[#f3f1ec] px-6 pb-12 lg:hidden">
        <div className="mx-auto max-w-[340px] rounded-2xl bg-card p-3 shadow-[0_10px_30px_rgba(30,26,20,0.08)]">
          <div className="overflow-hidden rounded-xl">
            <a href="https://t.me/+A3VGGGBdkFllYWE9" target="_blank" rel="noreferrer" className="block aspect-[2268/720] overflow-hidden">
              <img src="/vietdalbam/upload/0e4942bd4a4e4ac699bd991fe4133439.webp" alt="호치민 게임 텔레방" className="h-full w-full object-cover" />
            </a>
            <a href="https://open.kakao.com/o/gziI3pyh" target="_blank" rel="noreferrer" className="block aspect-[2268/720] overflow-hidden">
              <img src="/vietdalbam/upload/f5d0a13573ff441e95560ae9955acfd7.webp" alt="호치민 게임 단톡방" className="h-full w-full object-cover" />
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
