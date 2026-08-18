import Link from "next/link";
import { ChevronLeft, ChevronRight, MapPin, Search } from "lucide-react";
import { notFound } from "next/navigation";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { LiveTravelWidgets } from "@/components/live-travel-widgets";
import { RecentActivityTabs } from "@/components/recent-activity-tabs";
import { CategorySearch } from "@/components/category-search";
import clonedCategories from "../category-data.json";

const navItems = [
  ["accommodation", "숙소 & 풀빌라"], ["karaoke", "가라오케"], ["club", "클럽"],
  ["bar", "바 & 주점"], ["salon", "이발소 & 미용실"], ["massage", "마사지"],
  ["golf", "골프"], ["travel", "여행지"], ["restaurant", "맛집"],
] as const;

const categoryData = {
  karaoke: { title: "호치민 가라오케", label: "Karaoke", names: ["호치민 한인가라오케 시스템", "호치민 102 가라오케", "호치민 C 호텔 가라오케", "호치민 KTV 1238", "호치민 동물의 왕국", "호치민 127 BB 가라오케"], images: ["0b2f1f367f53461895c293f460e3cd61", "7b39d50373a04e74bb66794dd75a71fd", "dab53410e75240b0b22f15051e2b61aa", "cfae2c4e801a42368415d971eb364625", "f298a49693e04a59b00a4d68b7a00fcf", "d5f5262c71cd4c26a9468bad2c7b6276"] },
  club: { title: "호치민 클럽", label: "Club", names: ["호치민 파함 라운지", "호치민 자이온 스카이 라운지", "호치민 롤라 클럽", "호치민 파워 클럽", "호치민 코코 클럽", "호치민 부이비엔 클럽 추천"], images: ["2f81324fc4b34fc7af721b4b52b5ff77", "33cec852fa3745dc88e83b7ab0159910", "985b1176bdf7488a80d8b629566c925b", "4207662930d248239c90016eea2cf6da", "75706a539b3e4601b6a37cd4e427fcd7", "0c34bed6b7dc42efa4bf54931ef6b5c9"] },
  bar: { title: "호치민 바 & 주점", label: "Bar & Pub", names: ["부이비엔 루프탑 바", "호치민 감성 포차", "타오디엔 칵테일 바", "1군 라운지 바", "7군 한인 주점", "호치민 야시장 펍"], images: ["4207662930d248239c90016eea2cf6da", "75706a539b3e4601b6a37cd4e427fcd7", "33cec852fa3745dc88e83b7ab0159910", "2f81324fc4b34fc7af721b4b52b5ff77", "985b1176bdf7488a80d8b629566c925b", "0c34bed6b7dc42efa4bf54931ef6b5c9"] },
  salon: { title: "호치민 이발소 & 미용실", label: "Salon", names: ["호치민 황제 이발소", "1군 한인 미용실", "7군 프리미엄 이발소", "푸미흥 헤어 살롱", "호치민 네일 & 스파", "타오디엔 뷰티 살롱"], images: ["0b2f1f367f53461895c293f460e3cd61", "dab53410e75240b0b22f15051e2b61aa", "f298a49693e04a59b00a4d68b7a00fcf", "7b39d50373a04e74bb66794dd75a71fd", "cfae2c4e801a42368415d971eb364625", "d5f5262c71cd4c26a9468bad2c7b6276"] },
  massage: { title: "호치민 마사지", label: "Massage & Spa", names: ["호치민 1군 모네 스파", "호치민 누루 마사지", "7군 푸미흥 마사지", "타오디엔 힐링 스파", "호치민 체온 스파", "출장 마사지 추천"], images: ["985b1176bdf7488a80d8b629566c925b", "33cec852fa3745dc88e83b7ab0159910", "2f81324fc4b34fc7af721b4b52b5ff77", "4207662930d248239c90016eea2cf6da", "75706a539b3e4601b6a37cd4e427fcd7", "0c34bed6b7dc42efa4bf54931ef6b5c9"] },
  golf: { title: "호치민 골프", label: "Golf", names: ["Vietnam Golf & Country Club", "Twin Doves Golf Club", "Jeongsan Country Club", "Long Thanh Golf Club", "Tan Son Nhat Golf Course", "호치민 골프 투어 안내"], images: ["fc667022c21d4b71b5292135bd7789a7", "b2ecab6b148649c0b1a168c7c8189962", "28f72ae0028b4d18a0f85e472c38d7ef", "8bd8b6c71b854f8da53fcf149ed0c43e", "985b1176bdf7488a80d8b629566c925b", "33cec852fa3745dc88e83b7ab0159910"] },
  travel: { title: "호치민 여행지", label: "Travel", names: ["호치민 시티 야경 투어", "사이공 중앙 우체국", "벤탄 시장", "랜드마크 81", "메콩 델타 당일 투어", "꾸찌 터널 여행"], images: ["fc667022c21d4b71b5292135bd7789a7", "b2ecab6b148649c0b1a168c7c8189962", "28f72ae0028b4d18a0f85e472c38d7ef", "8bd8b6c71b854f8da53fcf149ed0c43e", "2f81324fc4b34fc7af721b4b52b5ff77", "33cec852fa3745dc88e83b7ab0159910"] },
  restaurant: { title: "호치민 맛집", label: "Restaurant", names: ["7군 냐베 한식당 캠핑 R.B", "푸미흥 신규 고기집 벽돌집", "1군 한남 BBQ", "타오디엔 감성 포차", "호치민 로컬 쌀국수 맛집", "사이공 루프탑 레스토랑"], images: ["fc667022c21d4b71b5292135bd7789a7", "b2ecab6b148649c0b1a168c7c8189962", "28f72ae0028b4d18a0f85e472c38d7ef", "8bd8b6c71b854f8da53fcf149ed0c43e", "75706a539b3e4601b6a37cd4e427fcd7", "4207662930d248239c90016eea2cf6da"] },
} as const;

type Category = keyof typeof categoryData;
type ClonedPost = { title: string; href: string; image: string | null; date: string; area: string };
type ClonedCategory = { slug: string; maxPage: number; posts: ClonedPost[] };
type SubjectOption = readonly [value: string, label: string];
function normalizeSearch(value: string) {
  return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/\s+/g, " ").trim();
}
const categorySubjectFilters: Record<Category, readonly SubjectOption[]> = {
  karaoke: [["all", "전체"], ["11", "한인"], ["12", "로컬"]],
  club: [["all", "전체"], ["leader", "대장클럽"], ["local-beer", "로컬비어클럽"], ["korean", "한인클럽"], ["buivien", "부이비엔"]],
  bar: [["all", "전체"], ["vinhomes", "빈홈"], ["le-thanh-ton", "레탄톤"], ["phu-my-hung", "푸미흥"], ["district-1", "1군"], ["pasteur", "파스퇴르"]],
  salon: [["all", "전체"], ["barber", "이발소"], ["hair", "미용실"]],
  massage: [["all", "전체"], ["1", "1군"], ["2", "2군"], ["binh-thanh", "빈탄군"], ["3", "3군"], ["5", "5군"], ["7", "7군"], ["8", "8군"], ["10", "10군"], ["mobile", "출장"]],
  golf: [["all", "전체"], ["field", "필드"], ["screen", "스크린"]],
  travel: [["all", "전체"], ["attraction", "명소"], ["tour", "투어"]],
  restaurant: [["all", "전체"], ["1", "1군"], ["2", "2군"], ["binh-thanh", "빈탄군"], ["4", "4군"], ["7", "7군"], ["seated", "착석식당"]],
};

function matchesSubject(category: Category, subject: string, item: ClonedPost) {
  if (subject === "all") return true;
  const text = `${item.title} ${item.area}`;
  if (category === "karaoke") {
    const korean = /한인|홈런볼|자기야|퍼블릭|PUBLIC|나인 가라오케|썬 가라오케|JANUS|원투|THE ONE|산토끼|오딧세이|넘버원/i.test(text);
    return subject === "11" ? korean : !korean;
  }
  if (category === "club") {
    if (subject === "leader") return /대장|파함|FAHAM|ZION|자이온|LOLLA|롤라/i.test(text);
    if (subject === "local-beer") return /로컬|비어|BEER|폭폭|POC POC|더갱스|GANGS/i.test(text);
    if (subject === "buivien") return /부이비엔|COCO|코코/i.test(text);
    return /한인|BODEGA|보데가|POWER|파워|NEXX|넥스|LUSH|러쉬|BAMBAM|뱀뱀|11:11|KHU|DISTRICT K|LOCO/i.test(text);
  }
  if (category === "bar") {
    const words: Record<string, RegExp> = { vinhomes: /빈홈|VINHOME/i, "le-thanh-ton": /레탄톤|LE THANH TON/i, "phu-my-hung": /푸미흥|PHU MY HUNG/i, "district-1": /1군|QUẬN 1|DISTRICT 1/i, pasteur: /파스퇴르|PASTEUR/i };
    return words[subject]?.test(text) ?? true;
  }
  if (category === "salon") return subject === "hair" ? /미용실|헤어|HAIR|SALON/i.test(text) : /이발소|BARBER/i.test(text);
  if (category === "massage") {
    if (subject === "mobile") return /출장|홈 마사지|HOME MASSAGE/i.test(text);
    const areas: Record<string, string> = { "1": "1군", "2": "2군", "3": "3군", "5": "5군", "7": "7군", "8": "8군", "10": "10군", "binh-thanh": "빈탄군" };
    return text.includes(areas[subject] ?? subject);
  }
  if (category === "golf") return subject === "screen" ? /스크린|SCREEN/i.test(text) : !/스크린|SCREEN/i.test(text);
  if (category === "travel") return subject === "tour" ? /투어|TOUR|당일/i.test(text) : !/투어|TOUR|당일/i.test(text);
  if (category === "restaurant") {
    if (subject === "seated") return /착석식당/i.test(text);
    const areas: Record<string, string> = { "1": "1군", "2": "2군", "4": "4군", "7": "7군", "binh-thanh": "빈탄군" };
    return text.includes(areas[subject] ?? subject);
  }
  return true;
}
const hoChiMinhAreas = [
  "1군", "2군", "3군", "4군", "5군", "6군", "7군", "8군", "9군", "10군", "11군", "12군",
  "빈탄군", "고밥군", "푸뉴언군", "떤빈군", "떤푸군", "빈떤군", "투득시",
  "빈짠현", "냐베현", "혹몬현", "꾸찌현", "껀저현",
] as const;
const recentPosts = [
  ["바&주점", "호치민 1군 부이비엔 인기 바 추천", "4 일전", "/ho-chi-minh/bar/%ED%98%B8%EC%B9%98%EB%AF%BC-1%EA%B5%B0-%EB%B6%80%EC%9D%B4%EB%B9%84%EC%97%94-%EC%97%AC%ED%96%89%EC%9E%90%EA%B1%B0%EB%A6%AC-%EC%B0%A9%EC%84%9D-%ED%86%A0%ED%82%B9%EB%B0%94-4649"],
  ["마사지", "호치민 체온스파 38.5°C 이용 안내", "7 일전", "/ho-chi-minh/massage"],
  ["다낭마사지", "다낭 링감 마사지샵, 룸 스파", "36 일전", "/ho-chi-minh/massage"],
  ["다낭마사지", "다낭 요정스파 수질 좋은 곳", "38 일전", "/ho-chi-minh/massage"],
  ["푸꾸옥", "푸꾸옥 사쿠라 VIP 마사지", "40 일전", "/ho-chi-minh/massage"],
  ["다낭바", "다낭 토킹바 추천 시크릿 라운지", "40 일전", "/ho-chi-minh/bar"],
] as const;
const recentComments = [
  ["자유게시판", "좋은 정보 감사합니다", "방금 전", "/ho-chi-minh/karaoke"],
  ["가라오케", "위치 확인 부탁드려요", "3 분전", "/ho-chi-minh/karaoke/%ED%98%B8%EC%B9%98%EB%AF%BC-102-%EA%B0%80%EB%9D%BC%EC%98%A4%EC%BC%80-%ED%95%9C%EC%9D%B8-ktv-%EC%B6%94%EC%B2%9C-1%EA%B5%B0-201"],
  ["마사지", "예약 문의드립니다", "12 분전", "/ho-chi-minh/massage/호치민-모모스파-1군-마사지-잘하는-곳-추천-4639"],
  ["맛집", "여기 아직 영업하나요?", "28 분전", "/ho-chi-minh/restaurant/%ED%98%B8%EC%B9%98%EB%AF%BC-7%EA%B5%B0-%EB%83%90%EB%B2%A0-%ED%95%9C%EC%8B%9D%EB%8B%B9-%EB%A7%9B%EC%A7%91-%EC%BA%A0%ED%95%91-r-b-c-4640"],
  ["숙소", "가격 정보 궁금합니다", "1 시간전", "/ho-chi-minh/accommodation/1룸-빈홈-랜드마크-플러스-아파트-176"],
  ["클럽", "주말 분위기 어떤가요?", "2 시간전", "/ho-chi-minh/club/%ED%98%B8%EC%B9%98%EB%AF%BC-faham-lounge-%ED%8C%8C%ED%95%A8-1%EA%B5%B0-%ED%81%B4%EB%9F%BD-108"],
] as const;
const eventItems = [
  ["2026년 5월 호치민 호치민 게임 1:1 이벤트", "2026.04.29"], ["2025년 12월 호치민 호치민 게임 정모 안내", "2025.11.20"],
  ["2025년 11월 호치민 호치민 게임 정모 안내", "2025.10.23"], ["2025년 10월 호치민 게임 이벤트", "2025.09.17"],
  ["2025년 9월 호치민 게임 정모 안내", "2025.08.22"], ["[호치민 게임 궁상] 호치민 프라이빗 파티", "2025.04.16"],
] as const;
const serviceItems = [
  ["호치민 게임 호치민 VIP 패스트트랙", "2024.06.28"], ["호치민 게임 나트랑 VIP 패스트트랙", "2024.07.02"],
  ["호치민 게임 하노이 VIP 패스트트랙", "2024.08.07"], ["호치민 게임 다낭 VIP 패스트트랙", "2024.06.29"],
] as const;
const clonedBanners: Partial<Record<Category, readonly [string, string]>> = {
  karaoke: ["/vietdalbam/upload/karaoke-korean-banner.webp", "/vietdalbam/upload/karaoke-local-banner.webp"],
  club: ["/vietdalbam/upload/club-banner-1.webp", "/vietdalbam/upload/club-banner-2.webp"],
  salon: ["/vietdalbam/upload/salon-banner-1.webp", "/vietdalbam/upload/salon-banner-2.webp"],
  massage: ["/vietdalbam/upload/massage-banner-1.webp", "/vietdalbam/upload/massage-banner-2.webp"],
  restaurant: ["/vietdalbam/upload/restaurant-banner-1.webp", "/vietdalbam/upload/restaurant-banner-2.webp"],
};

export function generateStaticParams() { return Object.keys(categoryData).map((category) => ({ category })); }

export default async function CategoryPage({ params, searchParams }: { params: Promise<{ category: string }>; searchParams: Promise<{ page?: string; area?: string; subject?: string; q?: string }> }) {
  const { category: rawCategory } = await params;
  if (!(rawCategory in categoryData)) notFound();
  const category = rawCategory as Category;
  const data = categoryData[category];
  const clonedCategory = (clonedCategories as ClonedCategory[]).find((item) => item.slug === category);
  if (!clonedCategory) notFound();
  const query = await searchParams;
  const selectedArea = query.area && hoChiMinhAreas.includes(query.area as (typeof hoChiMinhAreas)[number]) ? query.area : "전체";
  const searchText = query.q ?? "";
  const subjectOptions = categorySubjectFilters[category];
  const areaSubjectValues = new Map(subjectOptions.filter(([, label]) => hoChiMinhAreas.includes(label as (typeof hoChiMinhAreas)[number])));
  const rawSelectedSubject = subjectOptions.some(([value]) => value === query.subject) ? (query.subject ?? "all") : "all";
  const selectedSubject = selectedArea !== "전체" && areaSubjectValues.has(rawSelectedSubject) ? "all" : rawSelectedSubject;
  const items = clonedCategory.posts.filter((item) => {
    const text = normalizeSearch(`${item.title} ${item.area}`);
    const matchesSearch = !searchText || text.includes(normalizeSearch(searchText));
    const matchesArea = selectedArea === "전체" || item.area === selectedArea;
    return matchesSearch && matchesArea && matchesSubject(category, selectedSubject, item);
  });
  const totalPages = Math.max(1, Math.ceil(items.length / 9));
  const currentPage = Math.min(Math.max(Number(query.page) || 1, 1), totalPages);
  const visibleItems = items.slice((currentPage - 1) * 9, currentPage * 9);
  const href = (page: number) => `?page=${page}${searchText ? `&q=${encodeURIComponent(searchText)}` : ""}${selectedArea === "전체" ? "" : `&area=${encodeURIComponent(selectedArea)}`}${selectedSubject === "all" ? "" : `&subject=${selectedSubject}`}#category-list`;
  const subjectHref = (subject: string) => {
    const params = new URLSearchParams();
    if (searchText) params.set("q", searchText);
    if (subject !== "all" && areaSubjectValues.has(subject)) {
      params.set("area", areaSubjectValues.get(subject) ?? "전체");
    } else {
      if (selectedArea !== "전체") params.set("area", selectedArea);
      if (subject !== "all") params.set("subject", subject);
    }
    const queryString = params.toString();
    return `${queryString ? `?${queryString}` : "?"}#category-list`;
  };
  const isSubjectActive = (subject: string, label: string) => {
    if (subject === "all") return selectedArea === "전체" && selectedSubject === "all";
    if (areaSubjectValues.has(subject)) return selectedArea === label;
    return selectedSubject === subject;
  };
  const categoryBanners = clonedBanners[category]
    ?? data.images.slice(0, 2).map((image) => `/vietdalbam/upload/${image}.thumbnail.webp`);

  return <main className="min-h-screen overflow-x-hidden bg-[#f3f1ec]">
    <Header />
    <section className="border-b border-border bg-secondary/50 px-4 pb-12 pt-28 sm:px-6 md:px-10 md:pb-16 md:pt-32">
      <div className="mx-auto max-w-[1740px]">
        <nav className="mb-8 flex items-center gap-2 text-xs tracking-[.12em] text-muted-foreground"><Link href="/">홈</Link><ChevronRight className="h-3.5 w-3.5"/><span>호치민</span><ChevronRight className="h-3.5 w-3.5"/><span className="text-foreground">{data.title.replace("호치민 ", "")}</span></nav>
        <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_340px]">
          <div className="min-w-0 space-y-5">
            <div className="grid grid-cols-1 gap-1 overflow-hidden sm:grid-cols-2">
              {categoryBanners.map((banner, index) => <div key={banner} className="aspect-[180/57] overflow-hidden bg-neutral-900"><img src={banner} alt={`${data.title} 배너 ${index + 1}`} className="h-full w-full object-cover"/></div>)}
            </div>
            <div className="rounded-2xl bg-card px-6 py-7 shadow-[0_10px_30px_rgba(30,26,20,.06)] md:px-10 md:py-8"><p className="text-xs tracking-[.28em] text-muted-foreground uppercase">Ho Chi Minh · {data.label}</p><h1 className="cartoon-page-title mt-3 font-serif text-3xl leading-tight md:text-5xl">호치민 <span className="italic text-accent">{data.title.replace("호치민 ", "")}</span></h1></div>
          </div>
          <div className="hidden h-fit rounded-2xl bg-card p-3 shadow-[0_10px_30px_rgba(30,26,20,.08)] lg:block">
            <div className="overflow-hidden rounded-xl"><a href="https://t.me/+A3VGGGBdkFllYWE9" target="_blank" rel="noreferrer" className="block aspect-[2268/720] overflow-hidden"><img src="/vietdalbam/upload/0e4942bd4a4e4ac699bd991fe4133439.webp" alt="호치민 게임 텔레방" className="h-full w-full object-cover"/></a><a href="https://open.kakao.com/o/gziI3pyh" target="_blank" rel="noreferrer" className="block aspect-[2268/720] overflow-hidden"><img src="/vietdalbam/upload/f5d0a13573ff441e95560ae9955acfd7.webp" alt="호치민 게임 단톡방" className="h-full w-full object-cover"/></a></div>
          </div>
        </div>
      </div>
    </section>
    <section id="category-list" className="scroll-mt-24 py-10 md:py-14"><div className="mx-auto grid max-w-[1800px] gap-8 px-4 sm:px-6 md:px-10 lg:grid-cols-[320px_minmax(0,1fr)]">
      <aside className="order-2 h-fit space-y-6 lg:order-1 lg:sticky lg:top-28"><div className="bg-card"><div className="border-b border-border px-6 py-6"><p className="text-xs tracking-[.25em] text-muted-foreground uppercase">Destination</p><h2 className="mt-2 font-serif text-2xl">TP. Hồ Chí Minh</h2></div><nav>{navItems.map(([slug, label]) => <Link key={slug} href={`/ho-chi-minh/${slug}`} className={`flex items-center justify-between border-b border-border/70 px-6 py-4 text-sm ${slug === category ? "bg-foreground text-background" : "hover:bg-secondary"}`}>{label}<ChevronRight className="h-4 w-4" /></Link>)}</nav></div>
        <RecentActivityTabs posts={recentPosts} comments={recentComments} />
        <section className="rounded-2xl bg-card p-5 shadow-[0_8px_25px_rgba(30,26,20,.05)]"><div className="mb-5 flex items-center justify-between"><h3 className="font-semibold">이벤트🌟</h3><Link href="#" className="text-xs">더보기</Link></div><ul className="space-y-3">{eventItems.map(([title, date]) => <li key={title} className="flex min-w-0 gap-3 text-xs"><span className="min-w-0 flex-1 truncate">{title}</span><span className="shrink-0 text-muted-foreground">{date}</span></li>)}</ul></section>
        <section className="rounded-2xl bg-card p-5 shadow-[0_8px_25px_rgba(30,26,20,.05)]"><div className="mb-5 flex items-center justify-between"><h3 className="font-semibold">서비스💟</h3><Link href="#" className="text-xs">더보기</Link></div><ul className="space-y-3">{serviceItems.map(([title, date]) => <li key={title} className="flex min-w-0 gap-3 text-xs"><span className="rounded-full bg-[#b9bdc5] px-2 py-1 text-[10px] text-white">패스트트랙</span><span className="min-w-0 flex-1 truncate">{title}</span><span className="shrink-0 text-muted-foreground">{date}</span></li>)}</ul></section>
        <LiveTravelWidgets />
      </aside>
      <div className="order-1 min-w-0 lg:order-2"><div className="mb-7 bg-card p-5 md:p-7"><div className="flex flex-col justify-between gap-5 md:flex-row md:items-end"><div><p className="text-xs tracking-[.25em] text-muted-foreground uppercase">{data.label} list</p><h2 className="mt-2 font-serif text-3xl">추천 목록 <span className="text-accent">{items.length}</span></h2></div><CategorySearch suggestions={clonedCategory.posts} defaultValue={searchText} hidden={{ ...(selectedArea !== "전체" ? { area: selectedArea } : {}), ...(selectedSubject !== "all" ? { subject: selectedSubject } : {}) }} /></div><div className="mt-6 flex flex-col gap-4 border-t border-border pt-5 xl:flex-row xl:items-center xl:justify-between md:pt-6"><nav className="flex flex-wrap gap-2 md:gap-3 xl:flex-nowrap" aria-label={`${data.title} 유형 필터`}>{subjectOptions.map(([value, label]) => <Link key={value} href={subjectHref(value)} className={`inline-flex h-10 shrink-0 items-center justify-center whitespace-nowrap px-4 text-xs tracking-[0.04em] text-foreground transition-colors md:h-12 md:px-4 md:text-sm ${isSubjectActive(value, label) ? "bg-accent" : "bg-secondary hover:bg-accent/70"}`}>{label}</Link>)}</nav><form className="grid w-full max-w-[300px] shrink-0 grid-cols-[1fr_auto] gap-2">{searchText ? <input type="hidden" name="q" value={searchText}/> : null}{selectedSubject !== "all" ? <input type="hidden" name="subject" value={selectedSubject}/> : null}<label className="border border-border bg-background px-2.5 py-1.5"><span className="block text-[9px] tracking-[0.12em] text-muted-foreground">지역</span><select name="area" defaultValue={selectedArea} className="mt-0.5 w-full bg-transparent text-xs outline-none"><option value="전체">전체 지역</option>{hoChiMinhAreas.map((area) => <option key={area}>{area}</option>)}</select></label><button className="h-full bg-foreground px-5 text-xs text-background transition-colors hover:bg-accent hover:text-accent-foreground">검색</button></form></div></div>
        <div className="grid min-w-0 grid-cols-2 gap-3 sm:gap-5 xl:grid-cols-3">{visibleItems.map((item) => <article key={item.href} className="min-w-0 max-w-full overflow-hidden rounded-2xl bg-card shadow-[0_8px_28px_rgba(30,26,20,.06)] md:rounded-none"><Link href={`/ho-chi-minh/${category}/${item.href.split("/").at(-1) ?? ""}`} className="block min-w-0 max-w-full"><div className="aspect-[4/3] w-full max-w-full overflow-hidden bg-secondary">{item.image ? <img src={item.image} alt={item.title} className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"/> : null}</div><div className="min-w-0 p-3 md:p-3.5"><div className="hidden items-center gap-1.5 text-xs text-muted-foreground md:flex"><MapPin className="h-3.5 w-3.5 text-accent"/>{item.area}</div><h3 className="line-clamp-2 min-h-10 text-[13px] font-medium leading-5 md:mt-2 md:text-sm">{item.title}</h3><div className="mt-2 flex min-w-0 items-center justify-between gap-1 text-[10px] text-muted-foreground md:mt-3 md:border-t md:border-border md:pt-3 md:text-[11px]"><span className="truncate">🎊 호치민 게임</span><span className="shrink-0">{item.date}</span></div></div></Link></article>)}</div>
        <nav className="mt-9 flex justify-center gap-1">{currentPage > 1 && <Link href={href(currentPage - 1)} className="grid h-10 w-10 place-items-center bg-card"><ChevronLeft className="h-4 w-4"/></Link>}{Array.from({length: totalPages}, (_, i) => i + 1).map((page) => <Link key={page} href={href(page)} className={`grid h-10 w-10 place-items-center ${page === currentPage ? "bg-foreground text-background" : "bg-card"}`}>{page}</Link>)}{currentPage < totalPages && <Link href={href(currentPage + 1)} className="grid h-10 w-10 place-items-center bg-card"><ChevronRight className="h-4 w-4"/></Link>}</nav>
        <a href="https://open.kakao.com/o/gziI3pyh" target="_blank" rel="noreferrer" className="mt-8 block w-full overflow-hidden bg-[#fff0c9]"><div className="aspect-[2268/720]"><img src="/vietdalbam/upload/31787e8e10004092b8082c77b2b5ddc4.webp" alt="호치민 게임 카카오톡 단톡방" className="h-full w-full object-cover transition-transform duration-500 hover:scale-[1.01]"/></div></a>
      </div>
    </div></section>
    <section className="px-6 pb-12 lg:hidden"><div className="mx-auto max-w-[340px] rounded-2xl bg-card p-3 shadow-[0_10px_30px_rgba(30,26,20,.08)]"><a href="https://t.me/+A3VGGGBdkFllYWE9" target="_blank" rel="noreferrer" className="block aspect-[2268/720] overflow-hidden"><img src="/vietdalbam/upload/0e4942bd4a4e4ac699bd991fe4133439.webp" alt="호치민 게임 텔레방" className="h-full w-full object-cover"/></a><a href="https://open.kakao.com/o/gziI3pyh" target="_blank" rel="noreferrer" className="block aspect-[2268/720] overflow-hidden"><img src="/vietdalbam/upload/f5d0a13573ff441e95560ae9955acfd7.webp" alt="호치민 게임 단톡방" className="h-full w-full object-cover"/></a></div></section>
    <Footer />
  </main>;
}
