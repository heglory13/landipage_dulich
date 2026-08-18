"use client";

import { Package, Truck, RotateCcw, Headphones } from "lucide-react";

const services = [
  {
    icon: Truck,
    title: "1군 마사지",
    description: "호치민 1군 마사지 글을 빠르게 확인할 수 있습니다.",
    details: "모네스파, 해피 마사지 등",
  },
  {
    icon: Package,
    title: "게시글 이미지",
    description: "각 카드 이미지는 실제 마사지 게시글 썸네일을 사용합니다.",
    details: "posts/massage 기준",
  },
  {
    icon: RotateCcw,
    title: "공지 글",
    description: "공지 표시가 있는 주요 마사지 글을 별도로 강조합니다.",
    details: "날짜와 이미지 수 함께 표기",
  },
  {
    icon: Headphones,
    title: "호치민 게임 커뮤니티",
    description: "호치민 호치민 게임의 마사지 게시판 흐름에 맞춘 정보 구성입니다.",
    details: "베트남 자유 여행 정보 커뮤니티",
  },
];

export function Services() {
  return (
    <section id="services" className="py-24 md:py-32 bg-secondary/20">
      <div className="max-w-[1800px] mx-auto px-6 md:px-12">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left - Visual */}
          <div className="order-2 lg:order-1">
            <div className="grid grid-cols-2 gap-4 lg:gap-6">
              <div className="space-y-4 lg:space-y-6">
                <div className="aspect-[3/4] relative overflow-hidden" style={{ boxShadow: "rgba(14, 63, 126, 0.04) 0px 0px 0px 1px, rgba(42, 51, 69, 0.04) 0px 1px 1px -0.5px, rgba(42, 51, 70, 0.04) 0px 3px 3px -1.5px, rgba(42, 51, 70, 0.04) 0px 6px 6px -3px, rgba(14, 63, 126, 0.04) 0px 12px 12px -6px, rgba(14, 63, 126, 0.04) 0px 24px 24px -12px" }}>
                  <img
                    src="/vietdalbam/upload/6462cf3fb6e74ca39305dccc5ff0a8f9.thumbnail.webp"
                    alt="호치민 모네스파 스웨디시 마사지 추천"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="bg-accent p-6 lg:p-8" style={{ boxShadow: "rgba(14, 63, 126, 0.04) 0px 0px 0px 1px, rgba(42, 51, 69, 0.04) 0px 1px 1px -0.5px, rgba(42, 51, 70, 0.04) 0px 3px 3px -1.5px, rgba(42, 51, 70, 0.04) 0px 6px 6px -3px, rgba(14, 63, 126, 0.04) 0px 12px 12px -6px, rgba(14, 63, 126, 0.04) 0px 24px 24px -12px" }}>
                  <p className="font-serif text-4xl text-accent-foreground mb-2">모네스파</p>
                  <p className="text-sm text-accent-foreground/80">
                    1군 · 2024.11.25
                  </p>
                </div>
              </div>
              <div className="space-y-4 lg:space-y-6 pt-12">
                <div className="bg-card p-6 lg:p-8" style={{ boxShadow: "rgba(14, 63, 126, 0.04) 0px 0px 0px 1px, rgba(42, 51, 69, 0.04) 0px 1px 1px -0.5px, rgba(42, 51, 70, 0.04) 0px 3px 3px -1.5px, rgba(42, 51, 70, 0.04) 0px 6px 6px -3px, rgba(14, 63, 126, 0.04) 0px 12px 12px -6px, rgba(14, 63, 126, 0.04) 0px 24px 24px -12px" }}>
                  <p className="font-serif text-4xl mb-2">Happy</p>
                  <p className="text-sm text-muted-foreground">
                    1군 · 2024.10.31
                  </p>
                </div>
                <div className="aspect-[3/4] relative overflow-hidden" style={{ boxShadow: "rgba(14, 63, 126, 0.04) 0px 0px 0px 1px, rgba(42, 51, 69, 0.04) 0px 1px 1px -0.5px, rgba(42, 51, 70, 0.04) 0px 3px 3px -1.5px, rgba(42, 51, 70, 0.04) 0px 6px 6px -3px, rgba(14, 63, 126, 0.04) 0px 12px 12px -6px, rgba(14, 63, 126, 0.04) 0px 24px 24px -12px" }}>
                  <img
                    src="/vietdalbam/upload/6f24485ae35d41af88e596963ade7244.thumbnail.webp"
                    alt="호치민 불건마 해피 마사지"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right - Content */}
          <div className="order-1 lg:order-2 space-y-12">
            <div className="space-y-6">
              <p className="text-sm tracking-[0.3em] uppercase text-muted-foreground">
                Massage Guide
              </p>
              <h2 className="cartoon-section-title font-serif text-4xl md:text-5xl lg:text-6xl tracking-tight leading-[1.1]">
                게시글과
                <span className="block italic text-accent">이미지 정보</span>
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                모네스파와 해피 마사지 이미지는 각각의 실제 마사지 게시글
                제목, 지역, 날짜와 함께 표시됩니다.
              </p>
            </div>

            <div className="space-y-8">
              {services.map((service, index) => {
                const Icon = service.icon;
                return (
                  <div
                    key={index}
                    className="flex gap-6 p-6 bg-card hover:shadow-md transition-shadow duration-300"
                    style={{ boxShadow: "rgba(14, 63, 126, 0.04) 0px 0px 0px 1px, rgba(42, 51, 69, 0.04) 0px 1px 1px -0.5px, rgba(42, 51, 70, 0.04) 0px 3px 3px -1.5px, rgba(42, 51, 70, 0.04) 0px 6px 6px -3px, rgba(14, 63, 126, 0.04) 0px 12px 12px -6px, rgba(14, 63, 126, 0.04) 0px 24px 24px -12px" }}
                  >
                    <div className="flex-shrink-0">
                      <Icon className="w-8 h-8 text-accent" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-serif text-xl">{service.title}</h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {service.description}
                      </p>
                      <p className="text-sm text-muted-foreground/70 italic">
                        {service.details}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
