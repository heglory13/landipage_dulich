import type { Metadata } from "next";
import Link from "next/link";
import { Bookmark, ChevronRight, LogIn, Star, ThumbsUp, UserRound } from "lucide-react";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { getCurrentUser } from "@/lib/auth";
import { database } from "@/lib/database";
import { PasswordSettings } from "@/components/password-settings";

export const metadata: Metadata = {
  title: "내 프로필 | 호치민 게임",
  description: "회원 정보와 저장한 글을 확인하세요.",
};

type BookmarkRow = { contentKey: string; createdAt: string };
type ContentRow = { title: string; href: string; image: string | null; category: string | null };

function contentHref(contentKey: string) {
  const parts = contentKey.split(":");
  const slug = parts.at(-1) ?? contentKey;
  if (parts[0] === "accommodation") return `/ho-chi-minh/accommodation/${slug}`;
  if (parts.length >= 3) return `/${parts[0]}/${parts[1]}/${slug}`;
  return "/";
}

function contentImage(image: string | null | undefined) {
  if (!image) return null;
  const filename = image.match(/\/upload\/([^?]+)/)?.[1];
  if (!filename) return image.startsWith("/") ? image : null;
  return `/vietdalbam/upload/${filename.replace(/\.webp$/i, ".thumbnail.webp")}`;
}

export default async function ProfilePage() {
  const user = await getCurrentUser();

  if (!user) {
    return <main className="min-h-screen bg-[#f3f1ec]"><Header/><section className="mx-auto flex min-h-[70vh] max-w-xl items-center px-6 pb-24 pt-32"><div className="w-full rounded-3xl border border-border bg-card p-10 text-center shadow-sm"><UserRound className="mx-auto size-12 text-accent"/><h1 className="mt-5 font-serif text-3xl">로그인이 필요합니다</h1><p className="mt-3 text-sm leading-6 text-muted-foreground">저장한 글과 회원 정보를 확인하려면 로그인해주세요.</p><Link href="/login" className="mt-7 inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-bold text-primary-foreground"><LogIn className="size-4"/>로그인</Link></div></section><Footer/></main>;
  }

  const bookmarks = database.prepare("SELECT content_key AS contentKey, created_at AS createdAt FROM bookmarks WHERE user_id = ? ORDER BY created_at DESC").all(user.id) as BookmarkRow[];
  const contentItems = database.prepare("SELECT title, href, image, category FROM content_items WHERE href IS NOT NULL").all() as ContentRow[];
  const savedItems = bookmarks.map((bookmark) => {
    const slug = bookmark.contentKey.split(":").at(-1) ?? bookmark.contentKey;
    const content = contentItems.find((item) => decodeURIComponent(item.href).endsWith(`/${slug}`));
    return {
      ...bookmark,
      title: content?.title ?? slug.replaceAll("-", " "),
      image: contentImage(content?.image),
      category: content?.category ?? bookmark.contentKey.split(":")[1] ?? "저장한 글",
      href: contentHref(bookmark.contentKey),
    };
  });
  const ratingCount = (database.prepare("SELECT COUNT(*) AS count FROM ratings WHERE user_id = ?").get(user.id) as { count: number }).count;
  const likeCount = (database.prepare("SELECT COUNT(*) AS count FROM content_likes WHERE user_id = ?").get(user.id) as { count: number }).count;

  return <main className="min-h-screen bg-[#f3f1ec]"><Header/><section className="mx-auto max-w-6xl px-6 pb-24 pt-32 md:pt-40">
    <div className="rounded-3xl border border-border bg-card p-6 shadow-sm md:p-9"><div className="flex flex-col gap-6 sm:flex-row sm:items-center"><span className="grid size-20 place-items-center rounded-full bg-accent text-3xl font-bold text-white">{user.name.charAt(0).toUpperCase()}</span><div className="min-w-0"><p className="text-xs tracking-[.25em] text-muted-foreground">MY PROFILE</p><h1 className="mt-2 truncate font-serif text-3xl font-bold">{user.name}</h1><p className="mt-1 truncate text-sm text-muted-foreground">{user.email}</p></div></div>
      <div className="mt-8 grid grid-cols-3 divide-x divide-border rounded-2xl bg-secondary/60 py-5 text-center"><div><Bookmark className="mx-auto size-5 text-accent"/><strong className="mt-2 block text-xl">{savedItems.length}</strong><span className="text-xs text-muted-foreground">저장한 글</span></div><div><Star className="mx-auto size-5 text-accent"/><strong className="mt-2 block text-xl">{ratingCount}</strong><span className="text-xs text-muted-foreground">내 평가</span></div><div><ThumbsUp className="mx-auto size-5 text-accent"/><strong className="mt-2 block text-xl">{likeCount}</strong><span className="text-xs text-muted-foreground">추천한 글</span></div></div>
    </div>

    <section className="mt-10"><div className="flex items-end justify-between gap-4"><div><p className="text-xs tracking-[.25em] text-muted-foreground">SAVED CONTENT</p><h2 className="cartoon-section-title mt-2 font-serif text-3xl">저장한 글</h2></div><span className="text-sm text-muted-foreground">총 {savedItems.length}개</span></div>
      {savedItems.length ? <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{savedItems.map((item) => <Link key={item.contentKey} href={item.href} className="group overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition hover:-translate-y-1 hover:shadow-lg">{item.image ? <div className="aspect-[16/9] overflow-hidden bg-secondary"><img src={item.image} alt="" className="h-full w-full object-cover transition duration-500 group-hover:scale-105"/></div> : <div className="grid aspect-[16/9] place-items-center bg-secondary"><Bookmark className="size-9 text-accent/60"/></div>}<div className="p-5"><p className="text-xs text-accent">{item.category}</p><h3 className="mt-2 line-clamp-2 min-h-12 font-bold leading-6 group-hover:text-accent">{item.title}</h3><div className="mt-4 flex items-center justify-between text-xs text-muted-foreground"><span>{new Intl.DateTimeFormat("ko-KR", { dateStyle: "medium" }).format(new Date(item.createdAt))}</span><ChevronRight className="size-4"/></div></div></Link>)}</div> : <div className="mt-6 rounded-2xl border border-dashed border-border bg-card p-12 text-center"><Bookmark className="mx-auto size-10 text-accent/50"/><p className="mt-4 font-bold">아직 저장한 글이 없습니다.</p><p className="mt-2 text-sm text-muted-foreground">상세 페이지에서 저장 버튼을 누르면 여기에 표시됩니다.</p></div>}
    </section>
    <PasswordSettings />
  </section><Footer/></main>;
}
