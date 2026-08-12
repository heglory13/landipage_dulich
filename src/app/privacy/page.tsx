import type { Metadata } from "next";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";

export const metadata: Metadata = {
  title: "정책 및 개인정보 보호 | 호치민 게임",
  description: "호치민 게임의 서비스 이용 정책과 개인정보 처리방침을 확인하세요.",
};

const sections = [
  ["수집하는 정보", "문의, 회원가입 또는 뉴스레터 신청 시 이름과 이메일 등 사용자가 직접 제공한 정보를 처리할 수 있습니다."],
  ["정보 이용 목적", "서비스 제공, 문의 답변, 계정 관리, 사이트 품질 개선과 보안 유지에 필요한 범위에서 정보를 이용합니다."],
  ["정보 보관 및 보호", "개인정보는 이용 목적에 필요한 기간 동안만 보관하며, 관련 법령과 합리적인 보안 기준에 따라 관리합니다."],
  ["제3자 서비스", "지도, 분석 또는 외부 문의 채널을 이용할 경우 해당 서비스 제공자의 개인정보 처리방침이 적용될 수 있습니다."],
  ["사용자의 권리", "사용자는 본인의 개인정보에 대한 열람, 수정 또는 삭제를 요청할 수 있으며 문의 및 지원 페이지를 통해 접수할 수 있습니다."],
  ["정책 변경", "서비스 또는 관련 기준이 변경될 경우 이 페이지의 내용을 갱신하며, 중요한 변경 사항은 별도로 안내할 수 있습니다."],
] as const;

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Header />
      <section className="px-6 pb-16 pt-32 md:px-12 md:pb-24 md:pt-40">
        <div className="mx-auto max-w-[1200px]">
          <p className="text-xs uppercase tracking-[0.45em] text-muted-foreground">Policy & Privacy</p>
          <h1 className="cartoon-page-title mt-6 font-serif text-5xl leading-tight md:text-7xl">
            정책 및 <span className="italic text-accent">개인정보 보호</span>
          </h1>
          <p className="mt-8 max-w-3xl text-base leading-8 text-muted-foreground md:text-lg">
            호치민 게임은 필요한 범위에서만 정보를 처리하고 안전하게 관리하기 위해 노력합니다.
          </p>
        </div>
      </section>
      <section className="border-y border-border bg-secondary/30 px-6 py-16 md:px-12 md:py-24">
        <div className="mx-auto grid max-w-[1200px] gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-2">
          {sections.map(([title, description], index) => (
            <article key={title} className="bg-card p-8 md:p-10">
              <p className="text-xs tracking-[0.3em] text-accent">0{index + 1}</p>
              <h2 className="mt-5 font-serif text-2xl font-bold">{title}</h2>
              <p className="mt-4 text-sm leading-7 text-muted-foreground md:text-base">{description}</p>
            </article>
          ))}
        </div>
      </section>
      <Footer />
    </main>
  );
}
