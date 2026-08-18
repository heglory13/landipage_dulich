import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ChevronRight } from "lucide-react";
import { notFound } from "next/navigation";

import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { LiveTravelWidgets } from "@/components/live-travel-widgets";
import { ArticleInteractions } from "@/components/article-interactions";
import { getArchivedArticle } from "@/lib/archived-content";

export const dynamic = "force-dynamic";
import archivedPosts from "@/data/vietdalbam/posts.json";

const routeCategories = {
  accommodation: { source: "danangroom", label: "숙소 & 풀빌라" },
  karaoke: { source: "danangkaraoke", label: "가라오케" },
  salon: { source: "danangsalon", label: "이발소 & 미용실" },
  club: { source: "danangclub", label: "클럽" },
  bar: { source: "danangbar", label: "바 & 주점" },
  massage: { source: "danangmassage", label: "마사지" },
  restaurant: { source: "danangfood", label: "맛집" },
} as const;

type RouteCategory = keyof typeof routeCategories;
type ArticlePost = {
  href: string;
  title: string;
  imageUrl: string | null;
  summary: string;
  category: string;
  html: string;
  text: string;
  assets: string[];
};
type ArchivePost = { href: string; title: string; imageUrl: string | null; summary: string };

const posts = archivedPosts as ArticlePost[];
const categoryBanners: Partial<Record<RouteCategory, string[]>> = {
  accommodation: ["/vietdalbam/upload/48e5ebc917c04ffc91d4f6cfbcc4004b.webp", "/vietdalbam/upload/5b3aadbfaeb644499e9070de0daf54d4.webp"],
  karaoke: ["/vietdalbam/upload/karaoke-korean-banner.webp", "/vietdalbam/upload/karaoke-local-banner.webp"],
  salon: ["/vietdalbam/upload/salon-banner-1.webp", "/vietdalbam/upload/salon-banner-2.webp"],
  club: ["/vietdalbam/upload/club-banner-1.webp", "/vietdalbam/upload/club-banner-2.webp"],
  massage: ["/vietdalbam/upload/massage-banner-1.webp", "/vietdalbam/upload/massage-banner-2.webp"],
  restaurant: ["/vietdalbam/upload/restaurant-banner-1.webp", "/vietdalbam/upload/restaurant-banner-2.webp"],
};
const karaokeMapDetails: Record<string, { name: string; address: string }> = {
  "다낭-초대형-더-나인-가라오케-예약-방법-4635": { name: "THE 9 Karaoke", address: "35 Lý Thánh Tông, An Hải, Đà Nẵng, Vietnam" },
  "다낭-로컬가라오케-추천-212-karaoke-4475": { name: "NEW 212 CLUB", address: "Đà Nẵng, Vietnam" },
  "다낭-유니크-가라오케-i-핫하고-수질-좋은-k-3191": { name: "V-SHOW KTV", address: "409 Đ. Trần Hưng Đạo, An Hải Trung, Sơn Trà, Đà Nẵng, Vietnam" },
  "다낭-업타운-가라오케-한인-ktv-시스템-추천-3190": { name: "Uptown Karaoke", address: "54 Võ Nghĩa, Phước Mỹ, Sơn Trà, Đà Nẵng, Vietnam" },
  "다낭-로컬가라오케-라스베가스-adm-ktv-추-2985": { name: "ADM CLUB", address: "Đ. 2 Tháng 9, Hoà Cường Bắc, Hải Châu, Đà Nẵng, Vietnam" },
  "다낭-빅뱅-가라오케-한인-ktv-추천-예약-주-2805": { name: "BigBang Karaoke", address: "47 Chính Hữu, An Hải Bắc, Sơn Trà, Đà Nẵng, Vietnam" },
  "다낭-하와이-가라오케-한인-ktv-추천-예약-2796": { name: "Hawaii Karaoke", address: "18 Phạm Văn Đồng, An Hải, Sơn Trà, Đà Nẵng, Vietnam" },
  "다낭-에덴-가라오케-한인-ktv-추천-예약-주대-268": { name: "다낭 가라오케 NEW 에덴 가라오케", address: "5 Duy Tân, Hoà Cường Bắc, Hải Châu, Đà Nẵng 550000, Vietnam" },
  "다낭-원오페라-가라오케-한인-ktv-추천-예약-267": { name: "Club One Opera (Vietnam Casino VIP club)", address: "115 Nguyễn Văn Linh, Vĩnh Trung, Hải Châu, Đà Nẵng, Vietnam" },
  "다낭-누민-가라오케-한인-ktv-추천-예약-주대-266": { name: "Numin Karaoke", address: "Lot 2 - A2 - KH, Phạm Văn Đồng, Sơn Trà, Đà Nẵng, Vietnam" },
  "다낭-벤츠-가라오케-한인-ktv-추천-예약-주대-265": { name: "Benz Karaoke", address: "132 Phạm Văn Đồng, An Hải Bắc, Sơn Trà, Đà Nẵng, Vietnam" },
  "다낭-준코-가라오케-한인-ktv-추천-예약-주대-258": { name: "Junco Karaoke", address: "441 Đ. Trần Hưng Đạo, An Hải Trung, Sơn Trà, Đà Nẵng, Vietnam" },
};
const salonMapDetails: Record<string, { name: string; address: string }> = {
  "다낭-이발소-고향이발관-1호점-1840": { name: "Cắt tóc Quê Hương", address: "52 Lê Văn Quý, An Hải Bắc, Sơn Trà, Đà Nẵng, Vietnam" },
  "다낭-이발소-추천-서울-이발관-2400": { name: "서울이발관&Nail", address: "Đà Nẵng, Vietnam" },
  "다낭-이발소-추천-제일-이발관-2401": { name: "Tiệm cắt tóc and Spa Jeil", address: "Đà Nẵng, Vietnam" },
};
const clubMapDetails: Record<string, { name: string; address: string }> = {
  "다낭-adm-클럽-adm-club-추천-230": { name: "ADM CLUB", address: "Khu công viên Bắc Đài tưởng niệm, Hoà Cường Bắc, Hải Châu, Đà Nẵng 50000, Vietnam" },
  "다낭-소피-믹솔로지-sohpie-mixology-229": { name: "Sophie Lounge - Bar", address: "150 Bạch Đằng, Hải Châu, Đà Nẵng 50000, Vietnam" },
  "다낭-야치-클럽-yachy-club-예약-방법-4471": { name: "YACHY", address: "Tầng 5, Du thuyền DHC-Marina, Đường Trần Hưng Đạo, An Hải, Đà Nẵng, Vietnam" },
  "다낭-슈가클럽-sugar-social-club-4465": { name: "Bloom Night Club", address: "100 Yên Bái, Phước Ninh, Hải Châu, Đà Nẵng, Vietnam" },
  "다낭-뉴골든파인-현지인-추천-핫플-비어-클럽-3399": { name: "New Golden Pine Club", address: "325 Trần Hưng Đạo, An Hải, Sơn Trà, Đà Nẵng 590000, Vietnam" },
  "다낭-이지디-클럽-easy-d-club-다낭-3398": { name: "EAZY D", address: "72-74 Hùng Vương, Hải Châu, Đà Nẵng 50000, Vietnam" },
  "다낭-코토-클럽-koto-club-추천-1325": { name: "Koto Club", address: "254 Võ Nguyên Giáp, Phước Mỹ, Sơn Trà, Đà Nẵng 550000, Vietnam" },
};
const barMapDetails: Record<string, { name: string; address: string }> = {
  "다낭-토킹바-추천-골든바-golden-loun-4562": { name: "Golden Lounge 골든라운지", address: "Phạm Văn Đồng, Sơn Trà, Đà Nẵng, Vietnam" },
  "다낭-혼술-토킹바-추천-home-lounge-4508": { name: "Home Lounge & Bar ガールズバー＆カラオケ", address: "34 Nguyễn Chí Thanh, Thạch Thang, Hải Châu, Đà Nẵng, Vietnam" },
  "다낭-스크린골프-더벙커-the-bunker-예-4478": { name: "THE BUNKER SCREEN GOLF", address: "122 Võ Nguyên Giáp, Phước Mỹ, Sơn Trà, Đà Nẵng, Vietnam" },
  "다낭-착석바-클럽-판도라-라운지-추천-예약방법-4195": { name: "Lounge Pandora", address: "7 Hà Bổng, Phước Mỹ, Sơn Trà, Đà Nẵng, Vietnam" },
  "다낭-토킹바-스위트바-라운지-sweet-bar-3397": { name: "다낭 스위트바 Sweet BAR & lounge", address: "82-84 Nguyễn Xuân Khoát, An Hải Bắc, Sơn Trà, Đà Nẵng, Vietnam" },
  "다낭-바-추천-탑스크린골프-토킹바-top-sc-2995": { name: "Top Screen Golf Bar", address: "47 Trần Bạch Đằng, Phước Mỹ, Sơn Trà, Đà Nẵng 550000, Vietnam" },
  "다낭-토킹바-추천-x바-x-bar-lounge-2994": { name: "X Bar Lounge", address: "Grand Tourane Hotel, 252 Võ Nguyên Giáp, Phước Mỹ, Sơn Trà, Đà Nẵng, Vietnam" },
};
const directMapEmbeds: Record<string, string> = {
  "다낭-스크린골프-더벙커-the-bunker-예-4478": "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7238.249355493953!2d108.2452088!3d16.077098700000004!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3142174878985337%3A0xf370b24d0fd9a38a!2z64uk64KtIOyKpO2BrOumsOqzqO2UhCDrspnsu6QgVEhFIEJVTktFUiBTQ1JFRU4gR09MRg!5e1!3m2!1sen!2s!4v1776113068613!5m2!1sen!2s",
};

function isRouteCategory(category: string): category is RouteCategory {
  return category in routeCategories;
}

function postSlug(post: ArticlePost | ArchivePost) {
  return decodeURIComponent(post.href.split("/").at(-1) ?? "");
}

function getPosts(category: RouteCategory) {
  return posts.filter((post) => post.category === routeCategories[category].source);
}

function getPost(category: RouteCategory, slug: string) {
  const stored = getArchivedArticle(routeCategories[category].source, slug);
  if (stored !== undefined) return stored;
  return getPosts(category).find((post) => postSlug(post) === decodeURIComponent(slug));
}

function extractContent(html: string) {
  const marker = html.indexOf('id="content"');
  if (marker < 0) return html;
  const start = html.indexOf(">", marker) + 1;
  const overlayStart = html.indexOf('<div class="absolute bottom-0', start);
  const followingSection = html.indexOf('\n    <div class="flex', start);
  const end = overlayStart > start ? overlayStart : followingSection;
  return html.slice(start, end > start ? end : undefined);
}

function stripEmptyParagraphs(html: string) {
  return html.replace(/<p(?:\s[^>]*)?>(?:\s|&nbsp;|​)*<\/p>/gi, "");
}

function stripGoogleMapLinks(html: string) {
  return html.replace(/<a\b(?=[^>]*href="(?:https?:\/\/)?(?:maps\.app\.goo\.gl|www\.google\.com\/maps|google\.com\/maps)[^"]*")[^>]*>[\s\S]*?<\/a>/gi, "");
}

function cleanText(text: string) {
  return text.replace(/&nbsp;/g, " ").replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();
}

function venueName(post: ArticlePost) {
  const latinName = post.title.match(/\b(?:[A-Za-z0-9][A-Za-z0-9\s&.'-]*\s)?(?:karaoke|ktv|club|bar|spa|pub|lounge|massage|wash|salon)\b/i)?.[0]?.trim();
  if (latinName) return latinName;
  const title = post.title
    .replace(/^(\[[^\]]+\]\s*)?(베트남\s*)?다낭\s*/i, "")
    .replace(/\s*(예약 문의 안내|예약 빠르게하는 법|예약 주대 정보|예약방법|예약 방법|예약|가격|위치|주소|시스템 및 예약방법|시스템|추천|소개|주대 정보|코스).*$/i, "")
    .replace(/\s+/g, " ")
    .trim();
  const romanName = title.match(/\(([^)]+)\)/)?.[1]?.trim();
  return romanName || title || post.title;
}

function extractAddress(content: string, post: ArticlePost) {
  const htmlMatch = content.match(/(?:주소|위치)\s*[:：]\s*([\s\S]{0,240}?)(?:<\/p>|<\/li>|<br\s*\/?>|<a\b|$)/i);
  const textMatch = post.text.match(/(?:주소|위치)\s*[:：]\s*([\s\S]{0,180}?)(?:구글지도|영업시간|내용|예약|가격|코스|#|$)/i);
  return cleanText(htmlMatch?.[1] ?? textMatch?.[1] ?? "")
    .replace(/\s*(구글지도바로가기|구글 지도 바로가기|Google Maps?|google maps?).*$/i, "")
    .replace(/\s*\.{2,}.*$/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function mapDetails(content: string, post: ArticlePost) {
  const karaokeOverride = post.category === "danangkaraoke" ? karaokeMapDetails[postSlug(post)] : undefined;
  if (karaokeOverride) {
    return {
      name: karaokeOverride.name,
      address: karaokeOverride.address,
      queryText: `${karaokeOverride.name}, ${karaokeOverride.address}`,
    };
  }
  const salonOverride = post.category === "danangsalon" ? salonMapDetails[postSlug(post)] : undefined;
  if (salonOverride) {
    return {
      name: salonOverride.name,
      address: salonOverride.address,
      queryText: `${salonOverride.name}, ${salonOverride.address}`,
    };
  }
  const clubOverride = post.category === "danangclub" ? clubMapDetails[postSlug(post)] : undefined;
  if (clubOverride) {
    return {
      name: clubOverride.name,
      address: clubOverride.address,
      queryText: `${clubOverride.name}, ${clubOverride.address}`,
    };
  }
  const barOverride = post.category === "danangbar" ? barMapDetails[postSlug(post)] : undefined;
  if (barOverride) {
    return {
      name: barOverride.name,
      address: barOverride.address,
      queryText: `${barOverride.name}, ${barOverride.address}`,
    };
  }
  const address = extractAddress(content, post);
  const name = venueName(post);
  if (!address && post.category === "danangroom") {
    return {
      name: "The Myst Pool Villa By Han Market Da Nang",
      address: "268 Trần Phú, Hải Châu, Đà Nẵng, Vietnam",
      queryText: "The Myst Pool Villa By Han Market Da Nang, 268 Trần Phú, Hải Châu, Đà Nẵng, Vietnam",
    };
  }
  return {
    name,
    address: address || "Đà Nẵng, Vietnam",
    queryText: address ? `${address}, Vietnam` : `${name}, Đà Nẵng, Vietnam`,
  };
}

function mapEmbed(post: ArticlePost, content: string) {
  if (/<iframe[^>]+google\.com\/maps/i.test(content)) return "";
  const details = mapDetails(content, post);
  const query = encodeURIComponent(details.queryText);
  const mapSrc = directMapEmbeds[postSlug(post)] ?? `https://www.google.com/maps?q=${query}&output=embed`;
  return `<div class="article-map-embed"><p class="article-map-note"><strong>${details.name}</strong><span>${details.address}</span></p><div class="article-map-frame"><iframe title="${details.name} Google Maps" src="${mapSrc}" loading="lazy" allowfullscreen="" referrerpolicy="no-referrer-when-downgrade"></iframe></div></div>`;
}

function articleHtml(post: ArticlePost) {
  let content = stripEmptyParagraphs(extractContent(post.html));
  const map = mapEmbed(post, content);
  content = stripGoogleMapLinks(content);
  if (!map) return content;
  const paragraphs = [...content.matchAll(/<\/p>/gi)];
  const anchor = paragraphs[Math.min(2, paragraphs.length - 1)];
  if (anchor?.index === undefined) return `${map}${content}`;
  const position = anchor.index + anchor[0].length;
  return `${content.slice(0, position)}${map}${content.slice(position)}`;
}

function postDate(post: ArticlePost | ArchivePost) {
  return post.summary.match(/\d{4}\.\d{2}\.\d{2}/)?.[0] ?? "";
}

function localImage(post: ArticlePost) {
  return post.html.match(/<img[^>]+src="(\/vietdalbam\/crawl\/[^"]+)"/i)?.[1] ?? null;
}

function archiveTitle(category: RouteCategory) {
  const titles: Record<RouteCategory, string> = {
    accommodation: "Đà Nẵng 풀빌라",
    karaoke: "Đà Nẵng 가라오케",
    salon: "Đà Nẵng 이발소 & 미용실",
    club: "Đà Nẵng 클럽",
    bar: "Đà Nẵng 바 & 주점",
    massage: "Đà Nẵng 마사지",
    restaurant: "Đà Nẵng 맛집",
  };
  return titles[category];
}

function categoryFilters(category: RouteCategory) {
  if (category === "karaoke") return ["toàn bộ", "tiếng Hàn", "Địa phương"];
  return ["toàn bộ"];
}

function CategoryArchiveSection({ category }: { category: RouteCategory }) {
  const items = getPosts(category).slice(0, 9);
  const banners = categoryBanners[category] ?? getPosts(category).slice(0, 2).map((post) => localImage(post)).filter((image): image is string => Boolean(image));
  return <section className="mt-8 w-full min-w-0 max-w-full overflow-hidden">
    {banners.length ? <div className="grid overflow-hidden sm:grid-cols-2">
      {banners.map((banner, index) => <div key={banner} className="block aspect-[2268/720] overflow-hidden bg-neutral-200">
        <img src={banner} alt={`${archiveTitle(category)} banner ${index + 1}`} className="h-full w-full object-cover" />
      </div>)}
    </div> : null}
    <div className="mt-5 rounded-xl bg-card px-7 py-5 shadow-[0_16px_34px_rgba(30,26,20,.08)]">
      <h2 className="font-sans text-[22px] font-bold leading-8">{archiveTitle(category)}</h2>
    </div>
    <nav className="my-5 flex flex-wrap gap-3" aria-label={`${archiveTitle(category)} filters`}>
      {categoryFilters(category).map((filter, index) => <button key={filter} type="button" className={`inline-flex h-11 items-center justify-center rounded-lg px-6 text-[15px] font-semibold text-white shadow-sm ${index === 0 ? "bg-[#9298a2]" : "bg-[#b5bac4]"}`}>
        {filter}
      </button>)}
    </nav>
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
      {items.map((item) => <article key={item.href} className="group overflow-hidden rounded-[12px] bg-card shadow-[0_10px_25px_rgba(30,26,20,.08)]">
        <Link href={`/da-nang/${category}/${postSlug(item)}`} className="block">
          <div className="aspect-[4/3] overflow-hidden bg-secondary">
            {localImage(item) ? <img src={localImage(item) ?? ""} alt={item.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" /> : null}
          </div>
          <div className="p-5">
            <h3 className="line-clamp-2 min-h-12 text-[17px] font-semibold leading-6 group-hover:text-accent">{item.title}</h3>
            <div className="mt-4 flex items-center justify-between gap-3 text-[14px] text-muted-foreground">
              <span className="min-w-0 truncate">🎊 호치민 게임</span>
              <span className="shrink-0">{postDate(item).replace(/\./g, "/")}</span>
            </div>
          </div>
        </Link>
      </article>)}
    </div>
  </section>;
}

export function generateStaticParams() {
  return (Object.keys(routeCategories) as RouteCategory[]).flatMap((category) =>
    getPosts(category).map((post) => ({ category, slug: postSlug(post) })),
  );
}

export async function generateMetadata({ params }: { params: Promise<{ category: string; slug: string }> }): Promise<Metadata> {
  const { category, slug } = await params;
  if (!isRouteCategory(category)) return { title: "Đà Nẵng | 호치민 게임" };
  const post = getPost(category, slug);
  return { title: post ? `${post.title} | 호치민 게임` : "Đà Nẵng | 호치민 게임", description: post?.text.slice(0, 155) ?? "Đà Nẵng 여행 정보" };
}

export default async function DaNangDetailPage({ params }: { params: Promise<{ category: string; slug: string }> }) {
  const { category: rawCategory, slug } = await params;
  if (!isRouteCategory(rawCategory)) notFound();
  const post = getPost(rawCategory, slug);
  if (!post) notFound();
  const category = routeCategories[rawCategory];
  const related = getPosts(rawCategory).filter((item) => item.href !== post.href).slice(0, 8);

  return <main className="min-h-screen overflow-x-hidden bg-[#f3f1ec]">
    <Header />
    <section className="w-full max-w-full overflow-hidden px-3 pb-14 pt-24 md:pt-28"><div className="mx-auto w-full max-w-[1280px]">
      <nav className="mb-5 flex flex-wrap items-center gap-2 text-[11px] tracking-[.1em] text-muted-foreground uppercase"><Link href="/">홈</Link><ChevronRight className="h-3 w-3" /><span>다낭</span><ChevronRight className="h-3 w-3" /><Link href={`/da-nang/${rawCategory}`}>{category.label}</Link><ChevronRight className="h-3 w-3" /><span className="max-w-[42vw] truncate text-foreground">{post.title}</span></nav>
      <div className="grid min-w-0 max-w-full items-start gap-5 lg:grid-cols-[minmax(0,940px)_320px]">
        <article className="w-full min-w-0 max-w-full overflow-hidden rounded-[12px] bg-card px-5 py-6 shadow-[0_1px_2px_rgba(0,0,0,.04)]">
          <header className="mb-11 border-b border-border pb-6"><Link href={`/da-nang/${rawCategory}`} className="text-xs text-muted-foreground">{category.label}</Link><h1 className="mt-3 font-sans text-[20px] font-bold leading-8">{post.title}</h1><div className="mt-4 text-xs text-muted-foreground">🎊 호치민 게임 · {postDate(post)}</div></header>
          <div className="mb-6 flex flex-wrap items-center gap-2"><span className="bg-[#b5b9c1] px-1.5 py-1 text-xs text-white">{category.label}</span><h2 className="font-sans text-[20px] font-bold leading-8">{post.title}</h2></div>
          <div className="mb-6 border-t border-border" />
          <div className="article-content" dangerouslySetInnerHTML={{ __html: articleHtml(post) }} />
          <div className="mt-7"><Link href={`/da-nang/${rawCategory}`} className="inline-flex items-center gap-2 text-sm hover:text-accent"><ArrowLeft className="h-4 w-4" />목록으로</Link></div>
          <ArticleInteractions contentKey={`da-nang:${rawCategory}:${decodeURIComponent(slug)}`} />
        </article>
        <aside className="min-w-0 space-y-5 self-start">
          <div className="rounded-2xl bg-card p-3 shadow-[0_10px_30px_rgba(30,26,20,.08)]"><a href="https://t.me/+A3VGGGBdkFllYWE9" target="_blank" rel="noreferrer" className="block aspect-[2268/720] overflow-hidden rounded-t-xl"><img src="/vietdalbam/upload/0e4942bd4a4e4ac699bd991fe4133439.webp" alt="호치민 게임 텔레방" className="h-full w-full object-cover" /></a><a href="https://open.kakao.com/o/gziI3pyh" target="_blank" rel="noreferrer" className="block aspect-[2268/720] overflow-hidden rounded-b-xl"><img src="/vietdalbam/upload/f5d0a13573ff441e95560ae9955acfd7.webp" alt="호치민 게임 단톡방" className="h-full w-full object-cover" /></a></div>
          <section className="bg-card p-6 shadow-[0_8px_25px_rgba(30,26,20,.05)]"><p className="text-[10px] tracking-[.25em] text-muted-foreground uppercase">Related posts</p><h2 className="mt-2 font-serif text-2xl">추천 글</h2><div className="mt-5 space-y-5">{related.map((item) => <Link key={item.href} href={`/da-nang/${rawCategory}/${postSlug(item)}`} className="group grid grid-cols-[92px_1fr] gap-3 border-b border-border pb-5 last:border-0 last:pb-0"><div className="aspect-[4/3] overflow-hidden bg-secondary">{localImage(item) ? <img src={localImage(item) ?? ""} alt="" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" /> : null}</div><div className="min-w-0"><p className="line-clamp-2 text-sm font-medium leading-5 group-hover:text-accent">{item.title}</p><p className="mt-2 text-[10px] text-muted-foreground">{postDate(item)}</p></div></Link>)}</div></section>
          <LiveTravelWidgets />
        </aside>
      </div>
      <CategoryArchiveSection category={rawCategory} />
    </div></section>
    <Footer />
  </main>;
}
