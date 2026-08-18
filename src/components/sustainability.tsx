import { Leaf, Heart, Shield, Recycle } from "lucide-react";
import Link from "next/link";

const commitments = [
  {
    icon: Leaf,
    title: "검증된 장소 정보",
    description:
      "호치민, 다낭, 나트랑, 푸꾸옥 등 주요 도시의 숙소, 가라오케, 마사지, 맛집 정보를 한곳에서 확인할 수 있습니다.",
  },
  {
    icon: Heart,
    title: "여행 목적에 맞게",
    description:
      "혼자 떠나는 여행부터 친구 모임, 출장, 가족 일정까지 상황에 맞는 추천 목록을 빠르게 찾아볼 수 있습니다.",
  },
  {
    icon: Shield,
    title: "지도와 위치 안내",
    description:
      "각 상세 페이지에서 주소와 Google Maps 위치를 확인해 이동 전 동선과 주변 지역을 쉽게 파악할 수 있습니다.",
  },
  {
    icon: Recycle,
    title: "계속 업데이트",
    description:
      "새로운 게시글과 인기 장소를 꾸준히 정리해 베트남 현지 정보를 더 편하게 비교하고 선택할 수 있도록 돕습니다.",
  },
];

export function Sustainability() {
  return (
    <section className="py-24 md:py-32 bg-secondary/30">
      <div className="max-w-[1800px] mx-auto px-6 md:px-12">
        <div className="grid lg:grid-cols-5 gap-12 lg:gap-20">
          {/* Left - Sticky Content */}
          <div className="lg:col-span-2 lg:sticky lg:top-32 lg:self-start space-y-8">
            <div className="space-y-4">
              <p className="text-sm tracking-[0.3em] uppercase text-muted-foreground">
                베트남 여행 정보 가이드
              </p>
              <h2 className="cartoon-section-title font-serif text-4xl md:text-5xl lg:text-6xl tracking-tight leading-[1.1]">
                필요한 정보를
                <span className="block italic text-accent">더 빠르게 찾기</span>
              </h2>
            </div>

            <p className="text-muted-foreground text-lg leading-relaxed">
              호치민 게임은 베트남 여행 중 필요한 장소 정보를 도시와 카테고리별로
              정리합니다. 숙소, 가라오케, 클럽, 마사지, 맛집까지 실제로
              확인하기 쉬운 목록과 상세 정보를 제공합니다.
            </p>

            <div className="pt-4">
              <div className="inline-block border-border p-6 space-y-2 bg-white border-none border-0" style={{ boxShadow: "rgba(14, 63, 126, 0.04) 0px 0px 0px 1px, rgba(42, 51, 69, 0.04) 0px 1px 1px -0.5px, rgba(42, 51, 70, 0.04) 0px 3px 3px -1.5px, rgba(42, 51, 70, 0.04) 0px 6px 6px -3px, rgba(14, 63, 126, 0.04) 0px 12px 12px -6px, rgba(14, 63, 126, 0.04) 0px 24px 24px -12px" }}>
                <p className="font-serif text-3xl text-accent">Guide</p>
                <p className="text-sm text-muted-foreground">
                  카테고리별 추천 & 위치 확인
                </p>
              </div>
            </div>

            <Link
              href="/ho-chi-minh/accommodation"
              className="inline-flex items-center justify-center border border-primary text-primary px-8 py-4 text-sm tracking-[0.2em] uppercase min-h-12 hover:bg-primary hover:text-primary-foreground transition-all duration-300"
            >
              추천 장소 둘러보기
            </Link>
          </div>

          {/* Right - Commitments Grid */}
          <div className="lg:col-span-3 grid sm:grid-cols-2 gap-6 lg:gap-8">
            {commitments.map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={index}
                  className="bg-card p-8 lg:p-10 space-y-6 hover:shadow-lg transition-shadow duration-300"
                  style={{ boxShadow: "rgba(14, 63, 126, 0.04) 0px 0px 0px 1px, rgba(42, 51, 69, 0.04) 0px 1px 1px -0.5px, rgba(42, 51, 70, 0.04) 0px 3px 3px -1.5px, rgba(42, 51, 70, 0.04) 0px 6px 6px -3px, rgba(14, 63, 126, 0.04) 0px 12px 12px -6px, rgba(14, 63, 126, 0.04) 0px 24px 24px -12px" }}
                >
                  <Icon className="w-10 h-10 text-accent" />
                  <h3 className="font-serif text-2xl">{item.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
