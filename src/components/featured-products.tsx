"use client";

import Link from "next/link";
import { useState } from "react";
import { Heart, ShoppingBag } from "lucide-react";

const products = [
  {
    "id": 1,
    "href": "/ho-chi-minh/massage/%ED%98%B8%EC%B9%98%EB%AF%BC-%EC%B2%B4%EC%98%A8%EC%8A%A4%ED%8C%8C-38-5-c-%EB%A7%88%EC%82%AC%EC%A7%80-cheon-4648",
    "name": "호치민 체온스파 38.5ºC 마사지 CHEON SPA Massage",
    "category": "호치민",
    "price": "추천 글",
    "image": "/vietdalbam/upload/20783dc69d4f468cb0313e0cd702cfa2.thumbnail.webp",
    "isNew": true
  },
  {
    "id": 2,
    "href": "/ho-chi-minh/massage/%ED%98%B8%EC%B9%98%EB%AF%BC-%EB%AA%A8%EB%AA%A8%EC%8A%A4%ED%8C%8C-1%EA%B5%B0-%EB%A7%88%EC%82%AC%EC%A7%80-%EC%9E%98%ED%95%98%EB%8A%94-%EA%B3%B3-%EC%B6%94%EC%B2%9C-4639",
    "name": "호치민 모모스파 1군 마사지 잘하는 곳 추천",
    "category": "1군",
    "price": "추천 글",
    "image": "/vietdalbam/upload/b78a21b08c394c2c9620683956926c0b.thumbnail.webp",
    "isNew": true
  },
  {
    "id": 3,
    "href": "/ho-chi-minh/massage/%ED%98%B8%EC%B9%98%EB%AF%BC-%EC%B6%9C%EC%9E%A5-%EB%A7%88%EC%82%AC%EC%A7%80-%EC%B6%94%EC%B2%9C-%EC%97%AC%EC%9A%B0-%ED%99%88-%EB%A7%88%EC%82%AC%EC%A7%80-4631",
    "name": "호치민 출장 마사지 추천 - 여우 홈 마사지",
    "category": "호치민",
    "price": "추천 글",
    "image": "/vietdalbam/upload/1731c24697f44a319899ead2e4dc7754.thumbnail.webp",
    "isNew": true
  },
  {
    "id": 4,
    "href": "/ho-chi-minh/massage/%ED%98%B8%EC%B9%98%EB%AF%BC-2%EA%B5%B0-%EB%B2%84%EB%B8%94%EB%A7%88%EC%82%AC%EC%A7%80-%EA%B3%A8%EB%93%A0%ED%82%B9%EC%8A%A4%ED%8C%8C-golden-4629",
    "name": "호치민 2군 버블마사지 골든킹스파 (GOLDEN KING SPA)",
    "category": "2군",
    "price": "추천 글",
    "image": "/vietdalbam/upload/c406fb05122b4d20b720c4957f2338e3.thumbnail.webp",
    "isNew": true
  },
  {
    "id": 5,
    "href": "/ho-chi-minh/massage/%ED%98%B8%EC%B9%98%EB%AF%BC-7%EA%B5%B0-%ED%91%B8%EB%AF%B8%ED%9D%A5-%EB%B6%88%EA%B1%B4%EB%A7%88-yuri-spa-%EC%9C%A0-4530",
    "name": "호치민 7군 푸미흥 불건마 YURI Spa 유리마사지 소개",
    "category": "7군",
    "price": "추천 글",
    "image": "/vietdalbam/upload/6d55299313ae41178796f94fe1a2d115.thumbnail.webp",
    "isNew": true
  },
  {
    "id": 6,
    "href": "/ho-chi-minh/massage/%ED%98%B8%EC%B9%98%EB%AF%BC-7%EA%B5%B0-%EB%94%B8%EA%B8%B0-%EB%95%8C%EB%B0%80%EC%9D%B4-%EC%8A%A4%ED%8C%8C-%EB%A7%88%EC%82%AC%EC%A7%80-stra-4504",
    "name": "호치민 딸기 스파 STRAWBERRY MASSAGE",
    "category": "호치민",
    "price": "추천 글",
    "image": "/vietdalbam/upload/831c9505ae7e4e0b8fa5d279dcbb1adc.thumbnail.webp",
    "isNew": true
  },
  {
    "id": 7,
    "href": "/ho-chi-minh/massage/%ED%98%B8%EC%B9%98%EB%AF%BC-1%EA%B5%B0-%EB%88%84%EB%A3%A8-%EB%A7%88%EC%82%AC%EC%A7%80-%EC%B6%94%EC%B2%9C-%EB%8F%84%EB%8F%84%EC%8A%A4%ED%8C%8C-dod-4503",
    "name": "호치민 1군 누루 마사지 추천 도도스파 (DODO SPA)",
    "category": "1군",
    "price": "추천 글",
    "image": "/vietdalbam/upload/47408cbb65024155a973682027b62aef.thumbnail.webp",
    "isNew": false
  },
  {
    "id": 8,
    "href": "/ho-chi-minh/massage/%ED%98%B8%EC%B9%98%EB%AF%BC-%EB%B6%88%EA%B1%B4%EB%A7%88-%EC%B6%94%EC%B2%9C%EF%BD%9C7%EA%B5%B0-%EB%95%8C%EB%B0%80%EC%9D%B4-%EB%A9%94%EC%9D%B4%EC%8A%A4%ED%8C%8C-ma-4473",
    "name": "호치민 불건마 추천｜7군 때밀이  메이스파 (May spa)",
    "category": "7군",
    "price": "추천 글",
    "image": "/vietdalbam/upload/4435139bad91405380316b9cd02aaf92.thumbnail.webp",
    "isNew": false
  },
  {
    "id": 9,
    "href": "/ho-chi-minh/massage/%ED%98%B8%EC%B9%98%EB%AF%BC-%EB%B6%88%EA%B1%B4%EB%A7%88-%EC%B6%94%EC%B2%9C%EF%BD%9C1%EA%B5%B0-%ED%82%B9%EC%8A%A4%ED%86%A4-%EB%A7%88%EC%82%AC%EC%A7%80-kin-4441",
    "name": "호치민 불건마 추천｜1군 킹스톤 마사지(King Stone massage)",
    "category": "1군",
    "price": "추천 글",
    "image": "/vietdalbam/upload/6de8f41d77fc480dbd69fbc98c0ec547.thumbnail.webp",
    "isNew": false
  },
  {
    "id": 10,
    "href": "/ho-chi-minh/massage/%ED%98%B8%EC%B9%98%EB%AF%BC-%EB%91%90%EB%A6%AC%EC%95%88%EC%8A%A4%ED%8C%8C-%EB%B0%98%EA%B1%B4%EC%A0%84-%EC%82%AC%EC%9A%B0%EB%82%98-%EB%A7%88%EC%82%AC%EC%A7%80-7%EA%B5%B0-4211",
    "name": "호치민 두리안스파 마사지 (7군)",
    "category": "7군",
    "price": "추천 글",
    "image": "/vietdalbam/upload/032410cad8374a0198ca3391ee5af76e.thumbnail.webp",
    "isNew": false
  },
  {
    "id": 11,
    "href": "/ho-chi-minh/massage/%ED%98%B8%EC%B9%98%EB%AF%BC-%EB%B6%88%EA%B1%B4%EB%A7%88-%EB%A3%A8%EB%82%98-%EB%A7%88%EC%82%AC%EC%A7%80-luna-massa-3993",
    "name": "호치민 불건마 루나 마사지 (LUNA massage) (7군)",
    "category": "7군",
    "price": "추천 글",
    "image": "/vietdalbam/upload/d490cd8f79564afab5df3759f0c24b9d.thumbnail.webp",
    "isNew": false
  },
  {
    "id": 12,
    "href": "/ho-chi-minh/massage/%EB%B2%A0%ED%8A%B8%EB%82%A8-%ED%98%B8%EC%B9%98%EB%AF%BC-gd-%EC%8A%A4%ED%8C%8C-%ED%92%80%ED%8C%8C%ED%8B%B0-%EB%A7%88%EC%82%AC%EC%A7%80-%EB%B9%88%EC%A7%A0%ED%98%84-3502",
    "name": "베트남 호치민 GD 스파 풀파티 마사지 (7군)",
    "category": "7군",
    "price": "추천 글",
    "image": "/vietdalbam/upload/87554b4d2d244276947f67424924e4cc.thumbnail.webp",
    "isNew": false
  },
  {
    "id": 13,
    "href": "/ho-chi-minh/massage/%ED%98%B8%EC%B9%98%EB%AF%BC-%EB%AA%A8%EB%84%A4%EC%8A%A4%ED%8C%8C-%EC%8A%A4%EC%9B%A8%EB%94%94%EC%8B%9C-%EB%A7%88%EC%82%AC%EC%A7%80-%EC%B6%94%EC%B2%9C-1%EA%B5%B0-3045",
    "name": "호치민 모네스파 스웨디시 마사지 추천 (1군)",
    "category": "1군",
    "price": "추천 글",
    "image": "/vietdalbam/upload/6462cf3fb6e74ca39305dccc5ff0a8f9.thumbnail.webp",
    "isNew": false
  },
  {
    "id": 14,
    "href": "/ho-chi-minh/massage/%ED%98%B8%EC%B9%98%EB%AF%BC-%EB%B6%88%EA%B1%B4%EB%A7%88-%ED%95%B4%ED%94%BC-%EB%A7%88%EC%82%AC%EC%A7%80-happy-mass-2839",
    "name": "호치민 불건마 해피 마사지 (Happy massage) (1군)",
    "category": "1군",
    "price": "추천 글",
    "image": "/vietdalbam/upload/6f24485ae35d41af88e596963ade7244.thumbnail.webp",
    "isNew": false
  },
  {
    "id": 15,
    "href": "/ho-chi-minh/massage/%ED%98%B8%EC%B9%98%EB%AF%BC-%EC%8A%A4%ED%83%80%ED%82%B9-%EB%A7%88%EC%82%AC%EC%A7%80-%EB%95%8C%EB%B0%80%EC%9D%B4-%EC%84%B8%EC%8B%A0-%EC%B6%94%EC%B2%9C-1%EA%B5%B0-4641",
    "name": "호치민 스타킹 마사지 때밀이 세신 추천 (1군)",
    "category": "1군",
    "price": "추천 글",
    "image": "/vietdalbam/upload/7cbef2dbd83149e28f5f6fd2970e7a07.thumbnail.webp",
    "isNew": false
  },
  {
    "id": 16,
    "href": "/ho-chi-minh/massage/%ED%98%B8%EC%B9%98%EB%AF%BC-5%EA%B5%B0-%EB%B8%94%EB%9E%99%ED%95%91%ED%81%AC-%EB%A7%88%EC%82%AC%EC%A7%80-blackpink-3679",
    "name": "호치민 5군 블랙핑크 마사지 (BLACKPINK MASSAGE)",
    "category": "5군",
    "price": "추천 글",
    "image": "/vietdalbam/upload/937d1fb3d5404d10b6fc1147975c6ea8.thumbnail.webp",
    "isNew": false
  },
  {
    "id": 17,
    "href": "/ho-chi-minh/massage/%ED%98%B8%EC%B9%98%EB%AF%BC-%EC%8A%A4%ED%83%80%ED%82%B9-%EB%A7%88%EC%82%AC%EC%A7%80-starking-mass-2455",
    "name": "호치민 스타킹 마사지 STARKING MASSAGE 때밀이 세신 (1군)",
    "category": "1군",
    "price": "추천 글",
    "image": "/vietdalbam/upload/31543b20a34c4e19a8d422e115fef2d0.thumbnail.webp",
    "isNew": false
  },
  {
    "id": 18,
    "href": "/ho-chi-minh/massage/%ED%98%B8%EC%B9%98%EB%AF%BC-%EB%B9%84%EC%97%94%EB%8F%99-%ED%98%B8%ED%85%94-%EB%A7%88%EC%82%AC%EC%A7%80-spa-linh-c-2436",
    "name": "호치민 비엔동 호텔 마사지 Spa Linh Cherry (1군)",
    "category": "1군",
    "price": "추천 글",
    "image": "/vietdalbam/upload/74d56c316e404a08a45c08fc1b08515a.thumbnail.webp",
    "isNew": false
  },
  {
    "id": 19,
    "href": "/ho-chi-minh/massage/%ED%98%B8%EC%B9%98%EB%AF%BC-%EB%A6%B0%EC%B2%B4%EB%A6%AC-%EB%A7%88%EC%82%AC%EC%A7%80-spa-linh-cher-2435",
    "name": "호치민 린체리 마사지 Spa Linh Cherry (1군)",
    "category": "1군",
    "price": "추천 글",
    "image": "/vietdalbam/upload/2cf14d0efb2c44a188696e3a5047ac36.thumbnail.webp",
    "isNew": false
  }
];

const carouselProducts = [...products, ...products];

export function FeaturedProducts() {
  const [hoveredKey, setHoveredKey] = useState<string | null>(null);

  return (
    <section id="selection" className="overflow-hidden py-24 md:py-32">
      <style>{`
        @keyframes massage-marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .massage-marquee-track {
          animation: massage-marquee 70s linear infinite;
        }
        .massage-marquee-track:hover {
          animation-play-state: paused;
        }
      `}</style>
      <div className="mx-auto max-w-[1800px] px-6 md:px-12">
        <div className="mb-16 md:mb-24">
          <div className="grid gap-8 md:grid-cols-2 md:items-end">
            <div className="space-y-4">
              <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground">
                Massage Guide
              </p>
              <h2 className="cartoon-section-title font-serif text-4xl tracking-tight md:text-5xl lg:text-6xl">
                호치민 마사지
                <span className="italic text-accent"> 추천 글</span>
              </h2>
            </div>
            <p className="max-w-md text-lg leading-relaxed text-muted-foreground md:ml-auto md:text-right">
              호치민 마사지 게시물을 한 줄로 모아 보여드립니다. 카드를 누르면
              이미지와 상세 내용이 있는 게시글로 바로 이동합니다.
            </p>
          </div>
        </div>

        <div className="relative -mx-6 overflow-hidden px-6 md:-mx-12 md:px-12">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-background to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-background to-transparent" />
          <div className="massage-marquee-track flex w-max gap-6 md:gap-8">
            {carouselProducts.map((product, index) => {
              const cardKey = `${product.href}-${index}`;
              return (
                <Link
                  key={cardKey}
                  href={product.href}
                  className="group block w-[280px] shrink-0 sm:w-[320px] lg:w-[360px]"
                  onMouseEnter={() => setHoveredKey(cardKey)}
                  onMouseLeave={() => setHoveredKey(null)}
                >
                  <div className="relative mb-4 overflow-hidden">
                    <div className="aspect-[5/6] overflow-hidden bg-secondary">
                      <img
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>

                    {product.isNew && (
                      <span className="absolute left-4 top-4 bg-accent px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-accent-foreground">
                        추천
                      </span>
                    )}

                    <div
                      className={`absolute inset-x-4 bottom-4 flex gap-2 transition-all duration-300 ${
                        hoveredKey === cardKey
                          ? "translate-y-0 opacity-100"
                          : "translate-y-4 opacity-0"
                      }`}
                    >
                      <span className="flex min-h-11 flex-1 items-center justify-center gap-2 bg-background/90 py-3 text-sm uppercase tracking-[0.1em] backdrop-blur-sm transition-colors duration-200 hover:bg-background">
                        <ShoppingBag className="h-4 w-4" />
                        글 보기
                      </span>
                      <span
                        className="flex h-11 w-11 items-center justify-center bg-background/90 backdrop-blur-sm transition-colors duration-200 hover:bg-background"
                        aria-label="추천 게시물"
                      >
                        <Heart className="h-4 w-4" />
                      </span>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                      {product.category}
                    </p>
                    <h3 className="line-clamp-2 font-serif text-xl transition-colors duration-300 group-hover:text-accent">
                      {product.name}
                    </h3>
                    <p className="text-lg">{product.price}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        <div className="mt-16 text-center">
          <Link
            href="/ho-chi-minh/massage"
            className="inline-flex min-h-12 items-center justify-center border border-primary px-10 py-4 text-sm uppercase tracking-[0.2em] text-primary transition-all duration-300 hover:bg-primary hover:text-primary-foreground"
          >
            전체 마사지 보기
          </Link>
        </div>
      </div>
    </section>
  );
}
