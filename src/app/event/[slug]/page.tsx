import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CalendarDays, Eye } from "lucide-react";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { eventPosts, getEventPost } from "@/data/event-posts";
import { DatabaseArticle, getDatabaseArticle } from "@/components/database-article";

export const dynamic = "force-dynamic";

export function generateStaticParams() {
  return eventPosts.map((post) => ({ slug: post.slug }));
}

export default async function EventDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const stored = getDatabaseArticle("event", slug);
  if (stored?.status === "deleted" || stored?.status === "draft") notFound();
  if (stored) return <DatabaseArticle row={stored} listHref="/event" />;
  const post = getEventPost(slug);

  if (!post) notFound();

  const paragraphs = post.body
    .split(/(?<=\\.)\\s+|\\n+/)
    .map((line) => line.trim())
    .filter(Boolean);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Header />
      <article className="px-6 pt-28 pb-20 md:px-12 md:pt-36 md:pb-28">
        <div className="mx-auto grid max-w-[1500px] gap-8 lg:grid-cols-[1fr_360px]">
          <div className="bg-card p-7 shadow-sm md:p-12 xl:p-16">
            <Link
              href="/event"
              className="mb-10 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.25em] text-muted-foreground transition hover:text-accent"
            >
              <ArrowLeft className="h-4 w-4" />
              목록으로
            </Link>
            <p className="mb-5 text-xs uppercase tracking-[0.45em] text-accent">
              {post.category}
            </p>
            <h1 className="font-serif text-4xl leading-tight md:text-6xl">
              {post.title}
            </h1>
            <div className="mt-8 flex flex-wrap gap-5 border-y border-border py-5 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-2">
                <CalendarDays className="h-4 w-4" />
                {post.date}
              </span>
              {post.views ? (
                <span className="inline-flex items-center gap-2">
                  <Eye className="h-4 w-4" />
                  조회수 {post.views}
                </span>
              ) : null}
            </div>

            {post.images.length ? (
              <div className="mt-10 space-y-6">
                {post.images.map((image) => (
                  <figure key={image.src} className="overflow-hidden rounded-2xl bg-background shadow-sm">
                    <img src={image.src} alt={image.alt} className="h-auto w-full object-cover" />
                  </figure>
                ))}
              </div>
            ) : null}

            <div data-article-body className="mt-12 space-y-6 text-base leading-8 text-muted-foreground md:text-lg md:leading-9">
              {paragraphs.map((paragraph, index) => (
                <p key={`${post.slug}-${index}`}>{paragraph}</p>
              ))}
            </div>
          </div>

          <aside className="space-y-5 self-start">
            <div className="bg-primary p-8 text-primary-foreground">
              <p className="text-xs uppercase tracking-[0.35em] text-primary-foreground/55">
                DALBAM EVENT
              </p>
              <h2 className="mt-4 font-serif text-3xl">이벤트</h2>
              <p className="mt-4 text-sm leading-7 text-primary-foreground/65">
                달밤 이벤트와 프로모션 소식을 모았습니다.
              </p>
            </div>
            <div className="bg-card p-6 shadow-sm">
              <h3 className="mb-5 text-sm font-semibold uppercase tracking-[0.25em] text-muted-foreground">
                다른 이벤트
              </h3>
              <div className="space-y-4">
                {eventPosts
                  .filter((item) => item.slug !== post.slug)
                  .slice(0, 4)
                  .map((item) => (
                    <Link key={item.slug} href={`/event/${item.slug}`} className="block border-t border-border pt-4 transition hover:text-accent">
                      <p className="line-clamp-2 text-sm leading-6">{item.title}</p>
                      <p className="mt-2 text-xs text-muted-foreground">{item.date}</p>
                    </Link>
                  ))}
              </div>
            </div>
          </aside>
        </div>
      </article>
      <Footer />
    </main>
  );
}
