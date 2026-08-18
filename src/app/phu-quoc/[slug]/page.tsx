import Link from "next/link";
import { ArrowLeft, ChevronRight } from "lucide-react";
import { notFound } from "next/navigation";

import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { LiveTravelWidgets } from "@/components/live-travel-widgets";
import archivedCategories from "@/data/vietdalbam/categories.json";
import archivedPosts from "@/data/vietdalbam/posts.json";
import { getArchivedArticle } from "@/lib/archived-content";

export const dynamic = "force-dynamic";

type ArchivedPost = { href: string; title: string; imageUrl: string | null; summary: string };
type ArchivedCategory = { slug: string; posts: ArchivedPost[] };
type ArticlePost = ArchivedPost & { category: string; html: string; text: string; assets: string[] };

const categories = archivedCategories as ArchivedCategory[];
const posts = archivedPosts as ArticlePost[];

function postSlug(post: ArchivedPost) {
  return decodeURIComponent(post.href.split("/").at(-1) ?? "");
}

function normalizeImageSources(html: string) {
  return html.replace(/\/vietdalbam\/crawl\/[^"' >]*-([a-f0-9]{32}\.webp)(\?thumbnail)?/gi, (_, fileName: string, thumbnail: string | undefined) =>
    `/vietdalbam/upload/${fileName.replace(/\.webp$/i, thumbnail ? ".thumbnail.webp" : ".webp")}`,
  );
}

function articleHtml(post: ArticlePost) {
  return normalizeImageSources(post.html || `<p>${post.text || post.summary}</p>`);
}

export function generateStaticParams() {
  const category = categories.find((item) => item.slug === "phuquoc");
  return category?.posts.map((post) => ({ slug: postSlug(post) })) ?? [];
}

export default async function PhuQuocDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const stored = getArchivedArticle("phuquoc", slug);
  const post = stored === undefined ? posts.find((item) => item.category === "phuquoc" && postSlug(item) === decodeURIComponent(slug)) : stored;
  if (!post) notFound();

  return <main className="min-h-screen overflow-x-hidden bg-[#f3f1ec]">
    <Header />
    <section className="px-4 pb-14 pt-28 sm:px-6 md:px-10 md:pt-32">
      <div className="mx-auto max-w-[1280px]">
        <nav className="mb-5 flex flex-wrap items-center gap-2 text-[11px] tracking-[.1em] text-muted-foreground uppercase"><Link href="/">홈</Link><ChevronRight className="h-3 w-3"/><Link href="/phu-quoc">푸꾸옥</Link><ChevronRight className="h-3 w-3"/><span className="max-w-[42vw] truncate text-foreground">{post.title}</span></nav>
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
          <article className="min-w-0 overflow-hidden rounded-[12px] bg-card px-5 py-6 shadow-[0_1px_2px_rgba(0,0,0,.04)]">
            <header className="mb-8 border-b border-border pb-6">
              <Link href="/phu-quoc" className="text-xs text-muted-foreground">푸꾸옥</Link>
              <h1 className="mt-3 font-sans text-[20px] font-bold leading-8">{post.title}</h1>
            </header>
            <div className="overflow-hidden rounded-xl" dangerouslySetInnerHTML={{ __html: articleHtml(post) }} />
            <div className="mt-7 flex items-center gap-3 border-y border-border py-4"><Link href="/phu-quoc" className="inline-flex items-center gap-2 text-sm hover:text-accent"><ArrowLeft className="h-4 w-4"/>목록으로</Link></div>
          </article>
          <aside className="space-y-5"><div className="rounded-2xl bg-card p-3 shadow-[0_10px_30px_rgba(30,26,20,.08)]"><a href="https://t.me/+A3VGGGBdkFllYWE9" target="_blank" rel="noreferrer" className="block aspect-[2268/720] overflow-hidden rounded-t-xl"><img src="/vietdalbam/upload/0e4942bd4a4e4ac699bd991fe4133439.webp" alt="호치민 게임 텔레방" className="h-full w-full object-cover" /></a><a href="https://open.kakao.com/o/gziI3pyh" target="_blank" rel="noreferrer" className="block aspect-[2268/720] overflow-hidden rounded-b-xl"><img src="/vietdalbam/upload/f5d0a13573ff441e95560ae9955acfd7.webp" alt="호치민 게임 단톡방" className="h-full w-full object-cover" /></a></div><LiveTravelWidgets locations={[{ key: "phuQuoc", name: "Phú Quốc", latitude: 10.2899, longitude: 103.984 }]} /></aside>
        </div>
      </div>
    </section>
    <Footer />
  </main>;
}
