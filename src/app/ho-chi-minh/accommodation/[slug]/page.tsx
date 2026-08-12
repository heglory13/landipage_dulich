import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ChevronRight } from "lucide-react";
import { notFound } from "next/navigation";

import archivedPosts from "@/data/vietdalbam/posts.json";
import liveDetails from "@/app/data/accommodation-live.json";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { LiveTravelWidgets } from "@/components/live-travel-widgets";
import { ArticleInteractions } from "@/components/article-interactions";
import { getArchivedArticle } from "@/lib/archived-content";

export const dynamic = "force-dynamic";

type AccommodationPost = {
  href: string; title: string; imageUrl: string | null; summary: string;
  category: string; html: string; text: string; assets: string[];
  cmsMap?: { name?: string; address?: string; url?: string; embedUrl?: string };
};

const liveHtml = new Map((liveDetails as { href: string; html: string }[]).map((item) => [item.href, item.html]));
const posts = (archivedPosts as AccommodationPost[])
  .filter((post) => post.category === "accommodation")
  .map((post) => ({ ...post, html: liveHtml.get(post.href) ?? post.html }));

function getPost(slug: string) {
  const stored = getArchivedArticle("accommodation", slug);
  if (stored !== undefined) return stored;
  return posts.find((post) => decodeURIComponent(post.href.split("/").at(-1) ?? "") === decodeURIComponent(slug));
}

function fallbackMapLocation(post: AccommodationPost) {
  const slug = decodeURIComponent(post.href.split("/").at(-1) ?? "").toLowerCase();
  if (post.cmsMap && Object.values(post.cmsMap).some(Boolean)) return { name: post.cmsMap.name || post.title, query: post.cmsMap.address || post.title, mapSrc: post.cmsMap.embedUrl || `https://www.google.com/maps?q=${encodeURIComponent(post.cmsMap.address || post.title)}&output=embed`, mapUrl: post.cmsMap.url || "", approximate: false };
  if (slug.endsWith("-176")) return {
    name: "The Landmark plus",
    query: "QPV9+XP6, Vinhomes Tân Cảng, Bình Thạnh, Hồ Chí Minh",
    mapSrc: "https://www.google.com/maps?q=The%20Landmark%20plus%2C%2010.7950932%2C106.7220907&z=17&output=embed&hl=en",
    mapUrl: "https://www.google.com/maps/place/The+Landmark+plus/@10.7950932,106.7220907,17z/data=!3m1!4b1!4m10!3m9!1s0x317529001214a12d:0xa6c40c26ded55a9d!5m3!1s2026-08-13!4m1!1i2!8m2!3d10.7950932!4d106.7220907!16s%2Fg%2F11z5vf2rpk!5m1!1e1?entry=ttu&g_ep=EgoyMDI2MDgwOS4wIKXMDSoASAFQAw%3D%3D",
    approximate: false,
  };
  if (slug.endsWith("-180")) return {
    name: "The Landmark plus",
    query: "QPV9+XP6, Vinhomes Tân Cảng, Bình Thạnh, Hồ Chí Minh",
    mapSrc: "https://www.google.com/maps?q=The%20Landmark%20plus%2C%2010.7950932%2C106.7220907&z=17&output=embed&hl=en",
    mapUrl: "https://www.google.com/maps/place/The+Landmark+plus/@10.7950932,106.7220907,17z/data=!3m1!4b1!4m10!3m9!1s0x317529001214a12d:0xa6c40c26ded55a9d!5m3!1s2026-08-13!4m1!1i2!8m2!3d10.7950932!4d106.7220907!16s%2Fg%2F11z5vf2rpk!5m1!1e1?entry=ttu&g_ep=EgoyMDI2MDgwOS4wIKXMDSoASAFQAw%3D%3D",
    approximate: false,
  };
  if (slug.endsWith("-4342")) return {
    name: "Dự án Midtown Phú Mỹ Hưng - Căn hộ Sakura Park Quận 7",
    query: "Đường 16, Tân Phú, Quận 7, Hồ Chí Minh",
    mapSrc: "https://www.google.com/maps?q=Midtown%20Phu%20My%20Hung%20Sakura%20Park%20District%207&z=17&output=embed&hl=vi",
    mapUrl: "https://www.google.com/maps/place/D%E1%BB%B1+%C3%A1n+Midtown+Ph%C3%BA+M%E1%BB%B9+H%C6%B0ng+-+C%C4%83n+h%E1%BB%99+Sakura+Park+Qu%E1%BA%ADn+7/@10.7232792,106.7271486,17z/data=!4m6!3m5!1s0x31752592096c1c89:0x21ee9fe4997efeb7!8m2!3d10.7232956!4d106.7268326!16s%2Fg%2F11ghzlr8_0!5m1!1e1?entry=ttu&g_ep=EgoyMDI2MDgwOS4wIKXMDSoASAFQAw%3D%3D",
    approximate: false,
  };
  if (slug.endsWith("-1792")) return {
    name: "Sunrise City",
    query: "PPV2+664, Khu đô thị Sunrise City, Tân Hưng, Hồ Chí Minh, Vietnam",
    mapSrc: "https://www.google.com/maps?q=%EC%84%A0%EB%9D%BC%EC%9D%B4%EC%A6%88%EC%8B%9C%ED%8B%B0%2C%2010.7430044%2C106.700586&z=15&output=embed&hl=vi",
    mapUrl: "https://www.google.com/maps/place/%EC%84%A0%EB%9D%BC%EC%9D%B4%EC%A6%88%EC%8B%9C%ED%8B%B0/@10.7430044,106.700586,15z/data=!4m6!3m5!1s0x31752f9f82d68dbf:0xa7311d540f08168c!8m2!3d10.7430044!4d106.700586!16s%2Fg%2F11f123qv_8!5m1!1e1?entry=ttu&g_ep=EgoyMDI2MDgwOS4wIKXMDSoASAFQAw%3D%3D",
    approximate: false,
  };
  if (slug.endsWith("-219")) return {
    name: "Sunrise City",
    query: "PPV2+664, Khu đô thị Sunrise City, Tân Hưng, Hồ Chí Minh, Vietnam",
    mapSrc: "https://www.google.com/maps?q=%EC%84%A0%EB%9D%BC%EC%9D%B4%EC%A6%88%EC%8B%9C%ED%8B%B0%2C%2010.7430044%2C106.700586&z=15&output=embed&hl=vi",
    mapUrl: "https://www.google.com/maps/place/%EC%84%A0%EB%9D%BC%EC%9D%B4%EC%A6%88%EC%8B%9C%ED%8B%B0/@10.7430044,106.700586,15z/data=!4m6!3m5!1s0x31752f9f82d68dbf:0xa7311d540f08168c!8m2!3d10.7430044!4d106.700586!16s%2Fg%2F11f123qv_8!5m1!1e1?entry=ttu&g_ep=EgoyMDI2MDgwOS4wIKXMDSoASAFQAw%3D%3D",
    approximate: false,
  };
  if (slug.endsWith("-218")) return {
    name: "Sunrise City",
    query: "PPV2+664, Khu đô thị Sunrise City, Tân Hưng, Hồ Chí Minh, Vietnam",
    mapSrc: "https://www.google.com/maps?q=%EC%84%A0%EB%9D%BC%EC%9D%B4%EC%A6%88%EC%8B%9C%ED%8B%B0%2C%2010.7430044%2C106.700586&z=15&output=embed&hl=vi",
    mapUrl: "https://www.google.com/maps/place/%EC%84%A0%EB%9D%BC%EC%9D%B4%EC%A6%88%EC%8B%9C%ED%8B%B0/@10.7430044,106.700586,15z/data=!4m6!3m5!1s0x31752f9f82d68dbf:0xa7311d540f08168c!8m2!3d10.7430044!4d106.700586!16s%2Fg%2F11f123qv_8!5m1!1e1?entry=ttu&g_ep=EgoyMDI2MDgwOS4wIKXMDSoASAFQAw%3D%3D",
    approximate: false,
  };
  if (slug.endsWith("-1875")) return { query: "208 Nguyễn Hữu Cảnh, Vinhomes Tân Cảng, Bình Thạnh, Hồ Chí Minh", approximate: false };
  if (slug.startsWith("a-1-") || slug.startsWith("a-7-")) return { query: "Pool Villa An Phú, Quận 2, Thành phố Hồ Chí Minh, Vietnam", approximate: true };
  if (/^(a-[2-6]|l-1)-/.test(slug)) return { query: "Pool Villa Thảo Điền, Quận 2, Thành phố Hồ Chí Minh, Vietnam", approximate: true };
  return { query: `${post.title} Ho Chi Minh City Vietnam`, approximate: true };
}

function cleanMapName(title: string) {
  return title
    .replace(/^(\[[^\]]+\]\s*)?호치민\s*/i, "")
    .replace(/^베트남\s*호치민\s*/i, "")
    .replace(/\s*(추천|소개|숙소|아파트|풀빌라|가성비).*$/i, "")
    .replace(/\([^)]*(?:군|구|district)[^)]*\)$/i, "")
    .replace(/\s+/g, " ")
    .trim() || title;
}

function articleHtml(post: AccommodationPost) {
  const marker = post.html.indexOf('id="content"');
  let content = post.html;
  if (marker >= 0) {
    const start = post.html.indexOf(">", marker) + 1;
    const overlayStart = post.html.indexOf('<div class="absolute bottom-0', start);
    const followingSection = post.html.indexOf('\n    <div class="flex', start);
    const end = overlayStart > start ? overlayStart : followingSection;
    content = post.html.slice(start, end > start ? end : undefined);
  }
  content = content.replace(/<p(?:\s[^>]*)?>(?:\s|&nbsp;|​)*<\/p>/gi, "");
  const slug = decodeURIComponent(post.href.split("/").at(-1) ?? "").toLowerCase();
  if (slug.endsWith("-176") || slug.endsWith("-180") || slug.endsWith("-4342") || slug.endsWith("-1792") || slug.endsWith("-219") || slug.endsWith("-218")) {
    content = content.replace(/<a\b(?=[^>]*href="[^"]*maps\.app\.goo\.gl[^"]*")[^>]*>[\s\S]*?<\/a>/gi, "");
  }
  content = content.replace(
    /<figure class="image"><img src="\/vietdalbam\/crawl\/3865632e77656270-0f103edb91694c81a4cce0bcc5e8a8ec\.webp"><\/figure><p style="text-align:center;">주소: PPV2\+664, Tân Hưng, Quận 7<\/p><h4 style="text-align:center;"><a href="https:\/\/maps\.app\.goo\.gl\/fAxkuuarLNQrAUfU8" target="_blank"><span style="color:hsl\(240,75%,60%\);">구글지도바로가기<\/span><\/a><\/h4>/g,
    "",
  );

  if (!/<iframe[^>]+google\.com\/maps/i.test(content)) {
    const location = fallbackMapLocation(post);
    const name = "name" in location ? location.name : cleanMapName(post.title);
    const queryText = "name" in location ? location.query : location.approximate ? location.query : `${name}, ${location.query}`;
    const query = encodeURIComponent(queryText);
    const notice = location.approximate ? `<p class="article-map-note"><strong>${name}</strong><span>Khu vực tham khảo · ${location.query}</span></p>` : `<p class="article-map-note"><strong>${name}</strong><span>${location.query}</span></p>`;
    const mapSrc = "mapSrc" in location ? location.mapSrc : `https://www.google.com/maps?q=${query}&output=embed&hl=en`;
    const map = `<div class="article-map-embed">${notice}<div class="article-map-frame"><iframe title="${name} Google Maps" src="${mapSrc}" loading="lazy" allowfullscreen="" referrerpolicy="no-referrer-when-downgrade"></iframe></div></div>`;
    const paragraphs = [...content.matchAll(/<\/p>/gi)];
    const anchor = paragraphs[Math.min(2, paragraphs.length - 1)];
    if (anchor?.index !== undefined) {
      const position = anchor.index + anchor[0].length;
      content = `${content.slice(0, position)}${map}${content.slice(position)}`;
    } else {
      content = `${map}${content}`;
    }
  }
  return content;
}

function postDate(post: AccommodationPost) {
  return post.summary.match(/\d{4}\.\d{2}\.\d{2}/)?.[0] ?? "2024.05.13";
}

function postArea(post: AccommodationPost) {
  return post.title.match(/(\d{1,2}군|빈탄군|투득시|타오디엔|안푸|푸미흥)/)?.[0] ?? "호치민";
}

function thumbnailUrl(post: AccommodationPost) {
  const filename = post.imageUrl?.match(/\/upload\/([^?]+)/)?.[1];
  return filename ? `/vietdalbam/upload/${filename.replace(/\.webp$/, ".thumbnail.webp")}` : null;
}

export function generateStaticParams() {
  return posts.map((post) => ({ slug: decodeURIComponent(post.href.split("/").at(-1) ?? "") }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const post = getPost((await params).slug);
  return { title: post ? `${post.title} | 호치민 게임` : "숙소 상세 | 호치민 게임", description: post?.text.slice(0, 155) ?? "호치민 숙소 상세 정보" };
}

export default async function AccommodationDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const post = getPost((await params).slug);
  if (!post) notFound();
  const date = postDate(post);
  const related = posts.filter((item) => item.href !== post.href).slice(0, 8);
  const listingPosts = posts.slice(0, 9);
  const contentKey = `accommodation:${decodeURIComponent(post.href.split("/").at(-1) ?? "")}`;

  return <main className="min-h-screen overflow-x-hidden bg-[#f3f1ec]">
    <Header />
    <section className="w-full max-w-full overflow-hidden px-3 pb-14 pt-24 md:pt-28"><div className="mx-auto w-full max-w-[1280px]">
      <nav className="mb-5 flex flex-wrap items-center gap-2 text-[11px] tracking-[.1em] text-muted-foreground uppercase"><Link href="/">홈</Link><ChevronRight className="h-3 w-3"/><span>호치민</span><ChevronRight className="h-3 w-3"/><Link href="/ho-chi-minh/accommodation">숙소 & 풀빌라</Link><ChevronRight className="h-3 w-3"/><span className="max-w-[42vw] truncate text-foreground">{post.title}</span></nav>
      <div className="grid min-w-0 max-w-full items-start gap-5 lg:grid-cols-[minmax(0,940px)_320px]">
      <article className="w-full min-w-0 max-w-full overflow-hidden rounded-[12px] bg-card px-5 py-6 shadow-[0_1px_2px_rgba(0,0,0,.04)]">
        <header className="mb-11 border-b border-border pb-6">
          <Link href="/ho-chi-minh/accommodation" className="text-xs text-muted-foreground">숙소 & 풀빌라</Link>
          <h1 className="mt-3 font-sans text-[20px] font-bold leading-8">{post.title}</h1>
          <div className="mt-4 text-xs text-muted-foreground">🎊 달밤</div>
        </header>
        <div className="mb-6 flex flex-wrap items-center gap-2"><span className="bg-[#b5b9c1] px-1.5 py-1 text-xs text-white">{post.title.includes("풀빌라") ? "풀빌라" : "아파트"}</span><h2 className="font-sans text-[20px] font-bold leading-8">{post.title}</h2></div>
        <div className="mb-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted-foreground"><span>호치민 게임</span><span>{date}</span></div>
        <div className="mb-6 border-t border-border" />
        <div className="article-content" dangerouslySetInnerHTML={{__html: articleHtml(post)}}/>
        <div className="mt-7"><Link href="/ho-chi-minh/accommodation" className="inline-flex items-center gap-2 text-sm hover:text-accent"><ArrowLeft className="h-4 w-4"/>목록으로</Link></div>
        <ArticleInteractions contentKey={contentKey} />

      </article>
      <aside className="min-w-0 space-y-5 self-start">
        <div className="rounded-2xl bg-card p-3 shadow-[0_10px_30px_rgba(30,26,20,.08)]"><a href="https://t.me/+A3VGGGBdkFllYWE9" target="_blank" rel="noreferrer" className="block aspect-[2268/720] overflow-hidden rounded-t-xl"><img src="/vietdalbam/upload/0e4942bd4a4e4ac699bd991fe4133439.webp" alt="달밤 텔레방" className="h-full w-full object-cover"/></a><a href="https://open.kakao.com/o/gziI3pyh" target="_blank" rel="noreferrer" className="block aspect-[2268/720] overflow-hidden rounded-b-xl"><img src="/vietdalbam/upload/f5d0a13573ff441e95560ae9955acfd7.webp" alt="달밤 단톡방" className="h-full w-full object-cover"/></a></div>
        <section className="bg-card p-6 shadow-[0_8px_25px_rgba(30,26,20,.05)]"><p className="text-[10px] tracking-[.25em] text-muted-foreground uppercase">Related stays</p><h2 className="mt-2 font-serif text-2xl">추천 숙소</h2><div className="mt-5 space-y-5">{related.map((item) => { const itemSlug=item.href.split("/").at(-1)??""; const image=thumbnailUrl(item); return <Link key={item.href} href={`/ho-chi-minh/accommodation/${itemSlug}`} className="group grid grid-cols-[92px_1fr] gap-3 border-b border-border pb-5 last:border-0 last:pb-0"><div className="aspect-[4/3] overflow-hidden bg-secondary">{image?<img src={image} alt="" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"/>:null}</div><div className="min-w-0"><p className="line-clamp-2 text-sm font-medium leading-5 group-hover:text-accent">{item.title}</p><p className="mt-2 text-[10px] text-muted-foreground">{postDate(item)}</p></div></Link>})}</div></section>
        <LiveTravelWidgets />
      </aside>
      </div>
      <section className="mt-6 w-full min-w-0 max-w-full overflow-hidden">
        <div className="grid overflow-hidden md:grid-cols-2"><Link href="/ho-chi-minh/accommodation?type=아파트" className="block aspect-[180/57] overflow-hidden"><img src="/vietdalbam/upload/48e5ebc917c04ffc91d4f6cfbcc4004b.webp" alt="빈홈 아파트" className="h-full w-full object-cover"/></Link><Link href="/ho-chi-minh/accommodation?area=7군" className="block aspect-[180/57] overflow-hidden"><img src="/vietdalbam/upload/5b3aadbfaeb644499e9070de0daf54d4.webp" alt="선라이즈 아파트" className="h-full w-full object-cover"/></Link></div>
        <div className="mt-5 rounded-xl bg-card px-7 py-5 shadow-[0_1px_2px_rgba(0,0,0,.04)]"><h2 className="font-sans text-xl font-bold">숙소 & 풀빌라</h2></div>
        <nav className="my-5 flex flex-wrap gap-2.5">{["전체", "아파트", "풀빌라", "호텔"].map((filter, index) => <Link key={filter} href={filter === "전체" ? "/ho-chi-minh/accommodation" : `/ho-chi-minh/accommodation?type=${encodeURIComponent(filter)}`} className={`inline-flex h-10 items-center justify-center rounded-lg px-5 text-sm font-semibold text-white ${index === 0 ? "bg-[#969ba3]" : "bg-[#b9bdc5]"}`}>{filter}</Link>)}</nav>
        <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3">{listingPosts.map((item) => { const itemSlug=item.href.split("/").at(-1)??""; const image=thumbnailUrl(item); return <article key={item.href} className="group overflow-hidden rounded-xl bg-card shadow-[0_1px_2px_rgba(0,0,0,.05)]"><Link href={`/ho-chi-minh/accommodation/${itemSlug}`}><div className="aspect-[4/3] overflow-hidden bg-secondary">{image?<img src={image} alt={item.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"/>:null}</div><div className="p-4"><h3 className="line-clamp-2 min-h-11 text-sm font-semibold leading-6">{item.title}</h3><div className="mt-3 flex items-center justify-between text-xs text-muted-foreground"><span>🎊 달밤</span><span>{postDate(item)}</span></div></div></Link></article>})}</div>
      </section>
    </div></section>
    <Footer />
  </main>;
}
