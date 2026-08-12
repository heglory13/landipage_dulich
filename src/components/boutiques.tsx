import { CalendarDays, Eye, Megaphone } from "lucide-react";
import Link from "next/link";
import { noticePosts } from "@/data/notice-posts";

const notices = noticePosts.slice(0, 3);

export function Boutiques() {
  return (
    <section id="boutiques" className="py-24 md:py-32">
      <div className="max-w-[1800px] mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="text-center mb-16 md:mb-24">
          <p className="text-sm tracking-[0.3em] uppercase text-muted-foreground mb-4">
            Notice Board
          </p>
          <h2 className="cartoon-section-title font-serif text-4xl md:text-5xl lg:text-6xl tracking-tight mb-6">
            달밤 <span className="italic text-accent">공지사항</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            달밤 이용에 필요한 최신 안내와 중요한 소식을 확인하세요.
          </p>
        </div>

        {/* Boutiques grid */}
        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {notices.map((notice, index) => (
            <Link
              key={notice.slug}
              href={`/notice/${notice.slug}`}
              className="group relative block"
            >
              {/* Image */}
              <div className="relative overflow-hidden mb-6">
                <div className="aspect-[3/2]">
                  <img
                    src={notice.images?.[0]?.src ?? "/seo/og-home.webp"}
                    alt={notice.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                {index === 0 && (
                  <div className="absolute top-4 left-4 bg-accent text-accent-foreground px-4 py-2">
                    <p className="text-[10px] tracking-[0.2em] uppercase">
                      중요
                    </p>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="space-y-4">
                <h3 className="font-serif text-2xl md:text-3xl">
                  {notice.title}
                </h3>

                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex items-start gap-3">
                    <Megaphone className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <span className="line-clamp-2">{notice.description}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Eye className="w-4 h-4 flex-shrink-0" />
                    <span>조회수 {notice.views}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CalendarDays className="w-4 h-4 flex-shrink-0" />
                    <span>{notice.date}</span>
                  </div>
                </div>

                <span className="inline-flex items-center text-sm tracking-[0.15em] uppercase group-hover:text-accent transition-colors duration-300 pt-2">
                  글 보기
                  <span className="ml-2">→</span>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
