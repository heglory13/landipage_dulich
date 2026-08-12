import type { Metadata } from "next";
import Link from "next/link";
import { Medal, Star } from "lucide-react";
import { database } from "@/lib/database";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export const metadata: Metadata = { title: "실시간 평가 순위 | 호치민 게임", description: "실제 회원 별점으로 집계한 콘텐츠 순위" };

type RatingRow = { contentKey: string; rating: number; ratingCount: number };

export default function RankingsPage() {
  const ratings = database.prepare("SELECT content_key AS contentKey, ROUND(AVG(score), 1) AS rating, COUNT(*) AS ratingCount FROM ratings GROUP BY content_key ORDER BY rating DESC, ratingCount DESC LIMIT 100").all() as RatingRow[];
  const contentItems = database.prepare("SELECT title, href, image FROM content_items WHERE href IS NOT NULL").all() as Array<{ title: string; href: string; image: string | null }>;
  const items = ratings.map((item) => {
    const parts = item.contentKey.split(":");
    const slug = parts.at(-1) ?? item.contentKey;
    const content = contentItems.find((entry) => decodeURIComponent(entry.href).endsWith(`/${slug}`));
    const href = parts[0] === "accommodation" ? `/ho-chi-minh/accommodation/${slug}` : parts.length >= 3 ? `/${parts[0]}/${parts[1]}/${slug}` : "/";
    return { ...item, title: content?.title ?? slug.replaceAll("-", " "), image: content?.image, href };
  });

  return <main className="min-h-screen bg-[#f3f1ec]"><Header/><section className="mx-auto max-w-6xl px-6 pb-24 pt-32 md:pt-40"><p className="text-xs tracking-[.28em] text-muted-foreground">REAL MEMBER RANKING</p><h1 className="cartoon-page-title mt-4 font-serif text-4xl md:text-6xl">실시간 평가 순위</h1><p className="mt-6 max-w-2xl leading-7 text-muted-foreground">로그인한 회원이 직접 남긴 별점만 반영됩니다. 평가가 추가되면 순위와 평균 점수가 즉시 업데이트됩니다.</p>
  {items.length ? <div className="mt-12 grid gap-4">{items.map((item,index)=><Link key={item.contentKey} href={item.href} className="group grid grid-cols-[52px_1fr_auto] items-center gap-4 rounded-2xl border border-border bg-card p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg md:p-6"><span className={`grid size-11 place-items-center rounded-full font-bold ${index<3?"bg-accent text-white":"bg-secondary"}`}>{index<3?<Medal className="size-5"/>:index+1}</span><div className="min-w-0"><h2 className="truncate font-bold group-hover:text-accent">{item.title}</h2><p className="mt-1 text-xs text-muted-foreground">{item.ratingCount}개 실제 평가</p></div><div className="flex items-center gap-2 font-bold text-accent"><Star className="size-5 fill-accent"/>{item.rating}</div></Link>)}</div>:<div className="mt-12 rounded-2xl border border-dashed border-border bg-card p-12 text-center text-muted-foreground">아직 등록된 평가가 없습니다. 상세 페이지에서 첫 별점을 남겨주세요.</div>}
  </section><Footer/></main>;
}
