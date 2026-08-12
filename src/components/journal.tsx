import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { eventPosts } from "@/data/event-posts";

const articles = eventPosts.slice(0, 3).map((post) => ({
  ...post,
  image: post.images[0]?.src ?? "/placeholder.svg",
  excerpt: post.description,
}));

export function Journal() {
  return (
    <section id="journal" className="py-24 md:py-32">
      <div className="max-w-[1800px] mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="space-y-4">
            <p className="text-sm tracking-[0.3em] uppercase text-muted-foreground">
              Board
            </p>
            <h2 className="cartoon-section-title font-serif text-4xl md:text-5xl lg:text-6xl tracking-tight">
              최신 <span className="italic text-accent">이벤트</span>
            </h2>
          </div>
          <Link
            href="/event"
            className="group inline-flex items-center gap-2 text-sm tracking-[0.2em] uppercase hover:text-accent transition-colors duration-300 self-start md:self-auto"
          >
            이벤트 보기
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
          </Link>
        </div>

        {/* Articles grid - Featured + 2 smaller */}
        <div className="grid lg:grid-cols-2 gap-6 md:gap-8">
          {/* Featured article */}
          <Link href={`/event/${articles[0].slug}`} className="group block">
            <div className="relative overflow-hidden mb-6">
              <div className="aspect-[4/3] lg:aspect-[3/4]">
                <img
                  src={articles[0].image || "/placeholder.svg"}
                  alt={articles[0].title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="absolute top-4 left-4 bg-background/90 backdrop-blur-sm px-4 py-2">
                <p className="text-[10px] tracking-[0.2em] uppercase">
                  {articles[0].category}
                </p>
              </div>
            </div>
            <div className="space-y-3">
              <p className="text-sm text-muted-foreground">{articles[0].date}</p>
              <h3 className="font-serif text-2xl md:text-3xl group-hover:text-accent transition-colors duration-300 text-balance">
                {articles[0].title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {articles[0].excerpt}
              </p>
            </div>
          </Link>

          {/* Other articles */}
          <div className="flex flex-col gap-6 md:gap-8">
            {articles.slice(1).map((article) => (
              <Link
                key={article.slug}
                href={`/event/${article.slug}`}
                className="group grid md:grid-cols-[1fr,1.5fr] gap-4 md:gap-6"
              >
                <div className="relative overflow-hidden">
                  <div className="aspect-[4/3]">
                    <img
                      src={article.image || "/placeholder.svg"}
                      alt={article.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                </div>
                <div className="space-y-2 flex flex-col justify-center">
                  <div className="flex items-center gap-3">
                    <p className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground">
                      {article.category}
                    </p>
                    <span className="w-px h-3 bg-border" />
                    <p className="text-sm text-muted-foreground">
                      {article.date}
                    </p>
                  </div>
                  <h3 className="font-serif text-xl md:text-2xl group-hover:text-accent transition-colors duration-300 text-balance">
                    {article.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2">
                    {article.excerpt}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
