import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ChevronRight } from "lucide-react";
import { notFound } from "next/navigation";

import archivedPosts from "@/data/vietdalbam/posts.json";
import clonedCategories from "../../category-data.json";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { LiveTravelWidgets } from "@/components/live-travel-widgets";
import { ArticleInteractions } from "@/components/article-interactions";
import { getArchivedArticle } from "@/lib/archived-content";

export const dynamic = "force-dynamic";

type ArticlePost = {
  href: string; title: string; imageUrl: string | null; summary: string;
  category: string; html: string; text: string; assets: string[];
};
type ClonedPost = { title: string; href: string; image: string | null; date: string; area: string };
type ClonedCategory = { slug: string; posts: ClonedPost[] };

const routeCategories = {
  karaoke: { source: "karaoke", label: "가라오케" },
  club: { source: "club", label: "클럽" },
  bar: { source: "bar", label: "바 & 주점" },
  salon: { source: "salon", label: "이발소 & 미용실" },
  massage: { source: "massage", label: "마사지" },
  golf: { source: "golf", label: "골프" },
  travel: { source: "sights", label: "여행지" },
  restaurant: { source: "restaurant", label: "맛집" },
} as const;

type RouteCategory = keyof typeof routeCategories;

const posts = archivedPosts as ArticlePost[];
const categoryArchive = clonedCategories as ClonedCategory[];
const mapOverrides: Record<string, { name: string; address: string; queryText: string; url?: string }> = {
  "7군-푸미흥-정통-한식-맛집-이대감-4339": {
    name: "Lee Dae Gam 이대감",
    address: "87 Lê Văn Thiêm, Tân Phong, Quận 7, Hồ Chí Minh, Vietnam",
    queryText: "Lee Dae Gam 이대감, 87 Lê Văn Thiêm, Tân Phong, Quận 7, Hồ Chí Minh, Vietnam",
  },
  "호치민-사이공-별밤-2군-타오디엔-한식-맛집-4331": {
    name: "Saigon Byeol bam",
    address: "1 Đường 39, Thảo Điền, Thủ Đức, Hồ Chí Minh 700000, Vietnam",
    queryText: "Saigon Byeol bam, 1 Đường 39, Thảo Điền, Thủ Đức, Hồ Chí Minh 700000, Vietnam",
  },
  "호치민-신선-sinsun-7군-착석식당-푸미흥-4183": {
    name: "월남집 식당 (SAIGON HOUSE RESTAURANTS)",
    address: "76 Phan Khiêm Ích, Hưng Gia 2, Tân Phong, Quận 7, Hồ Chí Minh, Vietnam",
    queryText: "월남집 식당 SAIGON HOUSE RESTAURANTS, 76 Phan Khiêm Ích, Hưng Gia 2, Tân Phong, Quận 7, Hồ Chí Minh, Vietnam",
  },
  "호치민-분식-김밥-떡볶이-맛집-dossi-gi-4344": {
    name: "DOSSI GIMBAB 도시김밥",
    address: "64 Nguyễn Gia Trí, Phường 25, Bình Thạnh, Hồ Chí Minh, Vietnam",
    queryText: "DOSSI GIMBAB 도시김밥, 64 Nguyễn Gia Trí, Phường 25, Bình Thạnh, Hồ Chí Minh, Vietnam",
  },
  "호치민-푸미흥-고깃집-추천-푸짐하고-맛있는-‘-4343": {
    name: "BBQ Ong Map",
    address: "Đường Số 6, Khu đô thị Phú Mỹ Hưng, Tân Hưng, Quận 7, Hồ Chí Minh, Vietnam",
    queryText: "BBQ Ong Map, Đường Số 6, Khu đô thị Phú Mỹ Hưng, Tân Hưng, Quận 7, Hồ Chí Minh, Vietnam",
  },
  "호치민-푸미흥-감자탕-맛집-맛나감자탕-7군-4340": {
    name: "호치민 맛나감자탕 (Lẩu sườn) Hồ chí minh matnagamja tang địa chỉ mới",
    address: "67 Cao Triều Phát, Tân Phong, Quận 7, Hồ Chí Minh, Vietnam",
    queryText: "호치민 맛나감자탕 Lẩu sườn Hồ chí minh matnagamja tang, 67 Cao Triều Phát, Tân Phong, Quận 7, Hồ Chí Minh, Vietnam",
  },
  "호치민-2군-타오디엔-횟집-추천-한해구도씨-h-4444": {
    name: "Hanhae 한해9도씨",
    address: "1N Đường Số 10, An Khánh, Thủ Đức, Hồ Chí Minh 70000, Vietnam",
    queryText: "Hanhae 한해9도씨, 1N Đường Số 10, An Khánh, Thủ Đức, Hồ Chí Minh 70000, Vietnam",
  },
  "호치민-7군-푸미흥-맛집-핫플-은하수포차-eu-4421": {
    name: "Eunhasu Pocha - 은하수 포차 – Quán nhậu chuẩn Hàn",
    address: "15-17 Khu Phố Hưng Phước 2, Khu đô thị Phú Mỹ Hưng, Quận 7, Hồ Chí Minh, Vietnam",
    queryText: "Eunhasu Pocha 은하수 포차, 15-17 Khu Phố Hưng Phước 2, Khu đô thị Phú Mỹ Hưng, Quận 7, Hồ Chí Minh, Vietnam",
  },
  "호치민-레탄톤-고기집-추천-‘호미도-homid-4345": {
    name: "HOMIDO",
    address: "12 Lê Thánh Tôn, Bến Nghé, Quận 1, Hồ Chí Minh 700000, Vietnam",
    queryText: "HOMIDO Korean Restaurant, 12 Lê Thánh Tôn, Bến Nghé, Quận 1, Hồ Chí Minh 700000, Vietnam",
  },
  "호치민-7군-냐베-한식당-맛집-캠핑-r-b-c-4640": {
    name: "CAMPING R.B - Quán Nhậu Hàn Quốc 한식 술집",
    address: "C0.03 Khối C (tầng 1 + 2), Khu nhà ở Nam Sài Gòn Residences, Phước Kiển, Nhà Bè, Hồ Chí Minh, Vietnam",
    queryText: "CAMPING R.B - Quán Nhậu Hàn Quốc 한식 술집, C0.03 Khối C, Nam Sài Gòn Residences, Phước Kiển, Nhà Bè, Hồ Chí Minh, Vietnam",
  },
  "호치민-7군-신규-고기집-추천-벽돌집-bric-4567": {
    name: "벽돌집(brickhouse)",
    address: "23 Cao Triều Phát, Tân Phong, Quận 7, Hồ Chí Minh, Vietnam",
    queryText: "벽돌집 brickhouse, 23 Cao Triều Phát, Tân Phong, Quận 7, Hồ Chí Minh, Vietnam",
  },
  "호치민-2군-타오디엔-감성-옛날-포차-쎄쎄쎄-4447": {
    name: "쎄쎄쎄 포차 CCC Korean Street Pub",
    address: "33/17 Quốc Hương, Thảo Điền, Thủ Đức, Hồ Chí Minh, Vietnam",
    queryText: "쎄쎄쎄 포차 CCC Korean Street Pub, 33/17 Quốc Hương, Thảo Điền, Thủ Đức, Hồ Chí Minh, Vietnam",
  },
  "호치민-비엔동-호텔-마사지-spa-linh-c-2436": {
    name: "Vien Dong Hotel",
    address: "275A Phạm Ngũ Lão, Bến Thành, Quận 1, Hồ Chí Minh 70000, Vietnam",
    queryText: "Vien Dong Hotel, 275A Phạm Ngũ Lão, Bến Thành, Quận 1, Hồ Chí Minh 70000, Vietnam",
  },
  "호치민-스타킹-마사지-때밀이-세신-추천-1군-4641": {
    name: "STARKING MASSAGE(TRE XANH) / 스티킹 마사지",
    address: "105 Ký Con, Phường Nguyễn Thái Bình, Quận 1, Hồ Chí Minh, Vietnam",
    queryText: "STARKING MASSAGE TRE XANH, 105 Ký Con, Phường Nguyễn Thái Bình, Quận 1, Hồ Chí Minh, Vietnam",
  },
  "호치민-5군-블랙핑크-마사지-blackpink-3679": {
    name: "MASSAGE BLACKPINK",
    address: "134-134A Lê Hồng Phong, Phường 3, Quận 5, Hồ Chí Minh, Vietnam",
    queryText: "MASSAGE BLACKPINK, 134-134A Lê Hồng Phong, Phường 3, Quận 5, Hồ Chí Minh, Vietnam",
  },
  "호치민-불건마-루나-마사지-luna-massa-3993": {
    name: "Luna massage",
    address: "24 Đường Số 2, Hưng Gia 5, Phú Mỹ Hưng, Tân Phong, Quận 7, Hồ Chí Minh, Vietnam",
    queryText: "Luna massage, 24 Đường Số 2, Hưng Gia 5, Phú Mỹ Hưng, Tân Phong, Quận 7, Hồ Chí Minh, Vietnam",
  },
  "호치민-모네스파-스웨디시-마사지-추천-1군-3045": {
    name: "Mone Spa",
    address: "71/17 Đường Cô Bắc, Phường Cô Giang, Quận 1, Hồ Chí Minh, Vietnam",
    queryText: "Mone Spa, 71/17 Đường Cô Bắc, Phường Cô Giang, Quận 1, Hồ Chí Minh, Vietnam",
  },
  "호치민-불건마-추천｜7군-때밀이-메이스파-ma-4473": {
    name: "may때밀이spa",
    address: "116 Đường Số 2, Khu Hưng Gia 5, Tân Phong, Quận 7, Hồ Chí Minh, Vietnam",
    queryText: "may때밀이spa, 116 Đường Số 2, Khu Hưng Gia 5, Tân Phong, Quận 7, Hồ Chí Minh, Vietnam",
  },
  "호치민-불건마-추천｜1군-킹스톤-마사지-kin-4441": {
    name: "KING STONE MASSAGE | 마사지 호치민 | 마사지 호치민 | 1군 마사지",
    address: "202 Trần Hưng Đạo, Phường Cầu Ông Lãnh, Quận 1, Hồ Chí Minh, Vietnam",
    queryText: "KING STONE MASSAGE, 202 Trần Hưng Đạo, Phường Cầu Ông Lãnh, Quận 1, Hồ Chí Minh, Vietnam",
  },
  "호치민-1군-누루-마사지-추천-도도스파-dod-4503": {
    name: "DODO SPA HO CHI MINH",
    address: "70 Đường Calmette, Phường Nguyễn Thái Bình, Quận 1, Hồ Chí Minh 700000, Vietnam",
    queryText: "DODO SPA HO CHI MINH, 70 Đường Calmette, Phường Nguyễn Thái Bình, Quận 1, Hồ Chí Minh 700000, Vietnam",
    url: "https://maps.app.goo.gl/DU1jizh2NDtt5FZi7",
  },
  "호치민-1군-보스-이발소-boss-barber-4505": {
    name: "보스 이발소 老板理发店 Boss barber shop",
    address: "104 Đường Calmette, Phường Nguyễn Thái Bình, Quận 1, Hồ Chí Minh 700000, Vietnam",
    queryText: "보스 이발소 老板理发店 Boss barber shop, 104 Đường Calmette, Phường Nguyễn Thái Bình, Quận 1, Hồ Chí Minh 700000, Vietnam",
  },
  "호치민-공항-근처-이발소-추천-배트맨2이발소-4578": {
    name: "배트맨2이발소",
    address: "50A Đường Trường Sơn, Phường 2, Tân Bình, Hồ Chí Minh, Vietnam",
    queryText: "배트맨2이발소, 50A Đường Trường Sơn, Phường 2, Tân Bình, Hồ Chí Minh, Vietnam",
    url: "https://maps.app.goo.gl/DZmnSzfLUSjqsUM17",
  },
  "호치민-1군-로컬-vvip-우디-이발소｜vvi-4557": {
    name: "VVIP Wudi Spa 无敌越式洗头按摩",
    address: "35 Đặng Thị Nhu, Phường Nguyễn Thái Bình, Quận 1, Hồ Chí Minh, Vietnam",
    queryText: "VVIP Wudi Spa 无敌越式洗头按摩, 35 Đặng Thị Nhu, Phường Nguyễn Thái Bình, Quận 1, Hồ Chí Minh, Vietnam",
    url: "https://maps.app.goo.gl/TW2NTQ2Xh9ose8x29",
  },
  "호치민-1군-이발소-추천-훈이네-이발소-4632": {
    name: "HOON'S BARBER SHOP",
    address: "164 Ký Con, Phường Nguyễn Thái Bình, Quận 1, Hồ Chí Minh, Vietnam",
    queryText: "HOON'S BARBER SHOP, 164 Ký Con, Phường Nguyễn Thái Bình, Quận 1, Hồ Chí Minh, Vietnam",
  },
  "호치민-7군-푸미흥-이발소-추천-블랙이발소-4634": {
    name: "The Black Barbershop",
    address: "53 Đường số 6, KĐT Phú Mỹ Hưng, Tân Phong, Quận 7, Hồ Chí Minh, Vietnam",
    queryText: "The Black Barbershop, 53 Đường số 6, KĐT Phú Mỹ Hưng, Tân Phong, Quận 7, Hồ Chí Minh, Vietnam",
  },
  "호치민-레탄톤-바-추천-갤럭시-바-galaxy-2832": {
    name: "Galaxy Lounge Bar",
    address: "15B/70 Lê Thánh Tôn, Bến Nghé, Quận 1, Hồ Chí Minh, Vietnam",
    queryText: "Galaxy Lounge Bar, 15B/70 Lê Thánh Tôn, Bến Nghé, Quận 1, Hồ Chí Minh, Vietnam",
  },
  "호치민-레탄톤-바-추천-카티-바-kati-ba-2838": {
    name: "KATI Bar",
    address: "10.780275, 106.7049399, Quận 1, Hồ Chí Minh, Vietnam",
    queryText: "KATI Bar, 10.780275,106.7049399",
    url: "https://www.google.com/maps/place/KATI+Bar/@10.780275,106.702365,17z/data=!3m1!4b1!4m6!3m5!1s0x31752f9c0a6ee019:0xd8a9a6ae3404b7b0!8m2!3d10.780275!4d106.7049399!16s%2Fg%2F11v5f8y1n7!5m1!1e1?hl=vi-VN&entry=ttu",
  },
  "호치민-레탄톤-바-추천-미유키-바-miyuki-2837": {
    name: "Miyuki Bar",
    address: "8A/6B2 Thái Văn Lung, Bến Nghé, Quận 1, Hồ Chí Minh, Vietnam",
    queryText: "Miyuki Bar, 8A/6B2 Thái Văn Lung, Bến Nghé, Quận 1, Hồ Chí Minh, Vietnam",
  },
  "호치민-1군-부이비엔-여행자거리-착석-토킹바-4649": {
    name: "NORITER LOUNGE",
    address: "41 Đỗ Quang Đẩu, Bến Thành, Hồ Chí Minh, Vietnam",
    queryText: "NORITER LOUNGE, 41 Đỗ Quang Đẩu, Bến Thành, Hồ Chí Minh, Vietnam",
  },
  "호치민-한인가라오케-추천｜97-ktv-1군-4496": {
    name: "Karaoke Boss G Quận 1",
    address: "97 Sương Nguyệt Anh, Bến Thành, Hồ Chí Minh, Vietnam",
    queryText: "Karaoke Boss G Quận 1, 97 Sương Nguyệt Anh, Bến Thành, Hồ Chí Minh, Vietnam",
  },
  "호치민-ktv-추천｜두바이-가라오케-1군-4487": {
    name: "Dubai KTV",
    address: "16 Mạc Thị Bưởi, Bến Nghé, Quận 1, Hồ Chí Minh",
    queryText: "Dubai KTV, 16 Mạc Thị Bưởi, Bến Nghé, Quận 1, Hồ Chí Minh, Vietnam",
  },
};

function isRouteCategory(category: string): category is RouteCategory {
  return category in routeCategories;
}

function postSlug(post: ArticlePost) {
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
  return html.replace(
    /<a\b(?=[^>]*href="(?:https?:\/\/)?(?:maps\.app\.goo\.gl|www\.google\.com\/maps|google\.com\/maps)[^"]*")[^>]*>[\s\S]*?<\/a>/gi,
    "",
  );
}

function cleanText(text: string) {
  return text
    .replace(/&nbsp;/g, " ")
    .replace(/<[^>]+>/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function venueName(post: ArticlePost) {
  return post.title
    .replace(/^(\[[^\]]+\]\s*)?호치민\s*/i, "")
    .replace(/^베트남\s*호치민\s*/i, "")
    .replace(/\s*(추천|소개|가볼만한 곳|대표 관광지|유명 관광지|시스템 및 예약방법).*$/i, "")
    .replace(/\([^)]*(?:군|구|district)[^)]*\)$/i, "")
    .replace(/\s+/g, " ")
    .trim() || post.title;
}

function mapDetails(content: string, post: ArticlePost) {
  const override = mapOverrides[postSlug(post)];
  if (override) return override;

  const address = cleanText(content.match(/주소[:：]\s*([^<\n]+)/i)?.[1] ?? "");
  const googleUrl = content.match(/href="([^"]*(?:maps\.app\.goo\.gl|google\.com\/maps)[^"]*)"/i)?.[1];
  const name = venueName(post);
  const queryText = address.length > 4 ? `${name}, ${address}, Vietnam` : `${name}, Ho Chi Minh City, Vietnam`;
  return { address: address || "Ho Chi Minh City, Vietnam", name, queryText, url: googleUrl };
}

function mapEmbed(post: ArticlePost, content: string) {
  if (/<iframe[^>]+google\.com\/maps/i.test(content)) return "";
  const details = mapDetails(content, post);
  const query = encodeURIComponent(details.queryText);
  return `<div class="article-map-embed"><p class="article-map-note"><strong>${details.name}</strong><span>${details.address}</span></p><iframe title="${details.name} Google Maps" src="https://www.google.com/maps?q=${query}&output=embed" loading="lazy" allowfullscreen="" referrerpolicy="no-referrer-when-downgrade"></iframe></div>`;
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

function postDate(post: ArticlePost) {
  return post.summary.match(/\d{4}\.\d{2}\.\d{2}/)?.[0] ?? "2025.01.01";
}

function thumbnailUrl(post: ArticlePost) {
  const filename = post.imageUrl?.match(/\/upload\/([^?]+)/)?.[1];
  if (filename) return `/vietdalbam/upload/${filename.replace(/\.webp$/, ".thumbnail.webp")}`;
  const asset = post.assets[0]?.match(/\/upload\/([^?]+)/)?.[1];
  return asset ? `/vietdalbam/upload/${asset.replace(/\.webp$/, ".thumbnail.webp")}` : null;
}

function archiveImage(category: RouteCategory, post: ArticlePost) {
  const archive = categoryArchive.find((item) => item.slug === category);
  return archive?.posts.find((item) => item.href === post.href)?.image ?? thumbnailUrl(post);
}

function archiveTitle(category: RouteCategory) {
  const titles: Record<RouteCategory, string> = {
    karaoke: "Karaoke🎤",
    club: "Club🎵",
    bar: "Bar & Pub🍷",
    salon: "Salon💈",
    massage: "Massage👘",
    golf: "Golf⛳",
    travel: "Travel🗼",
    restaurant: "Restaurant🍜",
  };
  return titles[category];
}

function archiveBanners(category: RouteCategory) {
  const banners: Partial<Record<RouteCategory, string[]>> = {
    karaoke: ["/vietdalbam/upload/karaoke-korean-banner.webp", "/vietdalbam/upload/karaoke-local-banner.webp"],
    club: ["/vietdalbam/upload/club-banner-1.webp", "/vietdalbam/upload/club-banner-2.webp"],
    salon: ["/vietdalbam/upload/salon-banner-1.webp", "/vietdalbam/upload/salon-banner-2.webp"],
    massage: ["/vietdalbam/upload/massage-banner-1.webp", "/vietdalbam/upload/massage-banner-2.webp"],
    restaurant: ["/vietdalbam/upload/restaurant-banner-1.webp", "/vietdalbam/upload/restaurant-banner-2.webp"],
  };
  return banners[category] ?? [];
}

function categoryFilters(category: RouteCategory) {
  if (category === "karaoke") return ["toàn bộ", "tiếng Hàn", "Địa phương"];
  return ["toàn bộ"];
}

function CategoryArchiveSection({ category }: { category: RouteCategory }) {
  const archive = categoryArchive.find((item) => item.slug === category);
  if (!archive) return null;
  const banners = archiveBanners(category);
  const cards = archive.posts.slice(0, 9);

  return <section className="mt-8 w-full min-w-0 max-w-full overflow-hidden">
    {banners.length ? <div className="grid overflow-hidden sm:grid-cols-2">
      {banners.map((banner, index) => <Link key={banner} href={`/ho-chi-minh/${category}`} className="block aspect-[2268/720] overflow-hidden bg-neutral-200">
        <img src={banner} alt={`${archiveTitle(category)} banner ${index + 1}`} className="h-full w-full object-cover" />
      </Link>)}
    </div> : null}
    <div className="mt-5 rounded-xl bg-card px-7 py-5 shadow-[0_16px_34px_rgba(30,26,20,.08)]">
      <h2 className="font-sans text-[22px] font-bold leading-8">{archiveTitle(category)}</h2>
    </div>
    <nav className="my-5 flex flex-wrap gap-3" aria-label={`${archiveTitle(category)} filters`}>
      {categoryFilters(category).map((filter, index) => <Link key={filter} href={`/ho-chi-minh/${category}`} className={`inline-flex h-11 items-center justify-center rounded-lg px-6 text-[15px] font-semibold text-white shadow-sm ${index === 0 ? "bg-[#9298a2]" : "bg-[#b5bac4]"}`}>
        {filter}
      </Link>)}
    </nav>
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
      {cards.map((item) => <article key={item.href} className="group overflow-hidden rounded-[12px] bg-card shadow-[0_10px_25px_rgba(30,26,20,.08)]">
        <Link href={`/ho-chi-minh/${category}/${item.href.split("/").at(-1) ?? ""}`} className="block">
          <div className="aspect-[4/3] overflow-hidden bg-secondary">
            {item.image ? <img src={item.image} alt={item.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" /> : null}
          </div>
          <div className="p-5">
            <h3 className="line-clamp-2 min-h-12 text-[17px] font-semibold leading-6 group-hover:text-accent">{item.title}</h3>
            <div className="mt-4 flex items-center justify-between gap-3 text-[14px] text-muted-foreground">
              <span className="min-w-0 truncate">🎊 호치민 게임</span>
              <span className="shrink-0">{item.date.replace(/\./g, "/")}</span>
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
  if (!isRouteCategory(category)) return { title: "호치민 상세 | 호치민 게임" };
  const post = getPost(category, slug);
  return { title: post ? `${post.title} | 호치민 게임` : "호치민 상세 | 호치민 게임", description: post?.text.slice(0, 155) ?? "호치민 여행 정보" };
}

export default async function HoChiMinhDetailPage({ params }: { params: Promise<{ category: string; slug: string }> }) {
  const { category: rawCategory, slug } = await params;
  if (!isRouteCategory(rawCategory)) notFound();
  const post = getPost(rawCategory, slug);
  if (!post) notFound();
  const category = routeCategories[rawCategory];
  const related = getPosts(rawCategory).filter((item) => item.href !== post.href).slice(0, 8);

  return <main className="min-h-screen overflow-x-hidden bg-[#f3f1ec]">
    <Header />
    <section className="w-full max-w-full overflow-hidden px-3 pb-14 pt-24 md:pt-28"><div className="mx-auto w-full max-w-[1280px]">
      <nav className="mb-5 flex flex-wrap items-center gap-2 text-[11px] tracking-[.1em] text-muted-foreground uppercase"><Link href="/">홈</Link><ChevronRight className="h-3 w-3"/><span>호치민</span><ChevronRight className="h-3 w-3"/><Link href={`/ho-chi-minh/${rawCategory}`}>{category.label}</Link><ChevronRight className="h-3 w-3"/><span className="max-w-[42vw] truncate text-foreground">{post.title}</span></nav>
      <div className="grid min-w-0 max-w-full items-start gap-5 lg:grid-cols-[minmax(0,940px)_320px]">
        <article className="w-full min-w-0 max-w-full overflow-hidden rounded-[12px] bg-card px-5 py-6 shadow-[0_1px_2px_rgba(0,0,0,.04)]">
          <header className="mb-11 border-b border-border pb-6">
            <Link href={`/ho-chi-minh/${rawCategory}`} className="text-xs text-muted-foreground">{category.label}</Link>
            <h1 className="mt-3 font-sans text-[20px] font-bold leading-8">{post.title}</h1>
            <div className="mt-4 text-xs text-muted-foreground">🎊 호치민 게임 · {postDate(post)}</div>
          </header>
          <div className="mb-6 flex flex-wrap items-center gap-2"><span className="bg-[#b5b9c1] px-1.5 py-1 text-xs text-white">{category.label}</span><h2 className="font-sans text-[20px] font-bold leading-8">{post.title}</h2></div>
          <div className="mb-6 border-t border-border" />
          <div className="article-content" dangerouslySetInnerHTML={{__html: articleHtml(post)}}/>
          <div className="mt-7"><Link href={`/ho-chi-minh/${rawCategory}`} className="inline-flex items-center gap-2 text-sm hover:text-accent"><ArrowLeft className="h-4 w-4"/>목록으로</Link></div>
          <ArticleInteractions contentKey={`ho-chi-minh:${rawCategory}:${decodeURIComponent(slug)}`} />
        </article>
        <aside className="min-w-0 space-y-5 self-start">
          <div className="rounded-2xl bg-card p-3 shadow-[0_10px_30px_rgba(30,26,20,.08)]"><a href="https://t.me/+A3VGGGBdkFllYWE9" target="_blank" rel="noreferrer" className="block aspect-[2268/720] overflow-hidden rounded-t-xl"><img src="/vietdalbam/upload/0e4942bd4a4e4ac699bd991fe4133439.webp" alt="호치민 게임 텔레방" className="h-full w-full object-cover"/></a><a href="https://open.kakao.com/o/gziI3pyh" target="_blank" rel="noreferrer" className="block aspect-[2268/720] overflow-hidden rounded-b-xl"><img src="/vietdalbam/upload/f5d0a13573ff441e95560ae9955acfd7.webp" alt="호치민 게임 단톡방" className="h-full w-full object-cover"/></a></div>
          <section className="bg-card p-6 shadow-[0_8px_25px_rgba(30,26,20,.05)]"><p className="text-[10px] tracking-[.25em] text-muted-foreground uppercase">Related posts</p><h2 className="mt-2 font-serif text-2xl">추천 글</h2><div className="mt-5 space-y-5">{related.map((item) => { const image = archiveImage(rawCategory, item); return <Link key={item.href} href={`/ho-chi-minh/${rawCategory}/${postSlug(item)}`} className="group grid grid-cols-[92px_1fr] gap-3 border-b border-border pb-5 last:border-0 last:pb-0"><div className="aspect-[4/3] overflow-hidden bg-secondary">{image ? <img src={image} alt="" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"/> : null}</div><div className="min-w-0"><p className="line-clamp-2 text-sm font-medium leading-5 group-hover:text-accent">{item.title}</p><p className="mt-2 text-[10px] text-muted-foreground">{postDate(item)}</p></div></Link>})}</div></section>
          <LiveTravelWidgets />
        </aside>
      </div>
      <CategoryArchiveSection category={rawCategory} />
    </div></section>
    <Footer />
  </main>;
}
