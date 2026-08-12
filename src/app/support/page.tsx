import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, CircleHelp, Clock3, MessageCircle, Send, ShieldCheck } from "lucide-react";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { SupportForm } from "@/components/support-form";

export const metadata: Metadata = {
  title: "문의 및 지원 | 호치민 게임",
  description: "호치민 게임 이용, 예약 서비스, 게시물 관련 문의와 자주 묻는 질문을 확인하세요.",
};

const supportTopics = [
  {
    icon: MessageCircle,
    title: "일반 문의",
    description: "사이트 이용 방법, 여행 정보와 카테고리 탐색에 관한 문의를 도와드립니다.",
  },
  {
    icon: Send,
    title: "예약 & 서비스",
    description: "숙소, 현지 서비스와 예약 관련 안내는 서비스 페이지에서 빠르게 확인할 수 있습니다.",
  },
  {
    icon: ShieldCheck,
    title: "게시물 검토 요청",
    description: "게시물 수정, 정보 갱신 또는 권리 관련 요청은 확인 가능한 자료와 함께 전달해주세요.",
  },
];

const faqs = [
  ["게시물 정보는 언제 업데이트되나요?", "새로운 장소와 변경된 정보는 확인되는 순서대로 지속적으로 반영합니다."],
  ["예약 문의는 어디에서 하나요?", "각 상세 페이지의 안내를 먼저 확인한 뒤 서비스 문의 채널을 이용해주세요."],
  ["잘못된 정보를 발견했어요.", "게시물 제목과 수정이 필요한 내용을 정리해 문의 채널로 보내주시면 검토하겠습니다."],
  ["이벤트 참여 방법이 궁금해요.", "이벤트 페이지의 상세 안내에서 참여 조건과 문의 방법을 확인할 수 있습니다."],
];

export default function SupportPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Header />

      <section className="px-6 pb-20 pt-32 md:px-12 md:pb-28 md:pt-40">
        <div className="mx-auto max-w-[1500px]">
          <p className="text-xs uppercase tracking-[0.45em] text-muted-foreground">Contact & Support</p>
          <div className="mt-6 grid items-end gap-8 lg:grid-cols-[1fr_0.8fr]">
            <h1 className="cartoon-page-title font-serif text-5xl leading-[1.05] md:text-7xl">
              문의 및
              <span className="ml-3 italic text-accent">지원</span>
            </h1>
            <p className="max-w-xl text-base leading-8 text-muted-foreground lg:justify-self-end">
              호치민 게임 이용 중 궁금한 점이 있거나 정보 수정이 필요하다면 아래 안내를 확인해주세요.
              문의 내용을 구체적으로 전달할수록 빠른 확인에 도움이 됩니다.
            </p>
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-secondary/30 px-6 py-16 md:px-12 md:py-24">
        <div className="mx-auto grid max-w-[1500px] gap-6 md:grid-cols-3">
          {supportTopics.map((topic) => {
            const Icon = topic.icon;
            return (
              <div key={topic.title} className="rounded-2xl bg-card p-8 shadow-[0_12px_35px_rgba(30,26,20,0.06)] md:p-10">
                <Icon className="size-9 text-accent" />
                <h2 className="mt-7 font-serif text-2xl font-bold">{topic.title}</h2>
                <p className="mt-4 text-sm leading-7 text-muted-foreground">{topic.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="px-6 py-20 md:px-12 md:py-28">
        <div className="mx-auto grid max-w-[1500px] gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:gap-16">
          <div className="self-start">
            <p className="text-xs uppercase tracking-[0.4em] text-muted-foreground">Send a Request</p>
            <h2 className="cartoon-section-title mt-6 font-serif text-4xl leading-tight md:text-5xl">
              문의 접수
            </h2>
            <p className="mt-7 max-w-md text-sm leading-7 text-muted-foreground md:text-base">
              연락 가능한 정보와 문의 내용을 남겨주세요. 게시물 관련 요청은 해당 페이지 제목이나 주소를 함께 작성하면 확인에 도움이 됩니다.
            </p>
          </div>
          <SupportForm />
        </div>
      </section>

      <section className="bg-secondary/20 px-6 py-20 md:px-12 md:py-28">
        <div className="mx-auto grid max-w-[1500px] gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <div className="self-start rounded-2xl bg-primary p-8 text-primary-foreground md:p-10">
            <p className="text-xs uppercase tracking-[0.35em] text-primary-foreground/50">Direct Contact</p>
            <h2 className="mt-5 font-serif text-3xl font-bold">빠른 문의 채널</h2>
            <div className="mt-8 space-y-6">
              <div className="border-t border-primary-foreground/15 pt-5">
                <p className="text-xs text-primary-foreground/50">카카오톡</p>
                <p className="mt-2 text-lg font-bold">sk0794</p>
              </div>
              <div className="border-t border-primary-foreground/15 pt-5">
                <p className="text-xs text-primary-foreground/50">텔레그램</p>
                <a href="https://t.me/sky0794" target="_blank" rel="noreferrer" className="mt-2 inline-flex items-center gap-2 text-lg font-bold hover:text-accent">
                  @sky0794 <ArrowUpRight className="size-4" />
                </a>
              </div>
              <div className="flex gap-3 border-t border-primary-foreground/15 pt-5 text-sm leading-6 text-primary-foreground/60">
                <Clock3 className="mt-0.5 size-4 shrink-0" />
                답변 시간은 문의 내용과 확인 절차에 따라 달라질 수 있습니다.
              </div>
            </div>
          </div>

          <div>
            <div className="flex items-center gap-3">
              <CircleHelp className="size-7 text-accent" />
              <p className="text-xs uppercase tracking-[0.35em] text-muted-foreground">Frequently Asked Questions</p>
            </div>
            <h2 className="cartoon-section-title mt-6 font-serif text-4xl md:text-5xl">자주 묻는 질문</h2>
            <div className="mt-10 divide-y divide-border border-y border-border">
              {faqs.map(([question, answer]) => (
                <details key={question} className="group py-6">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-5 font-bold">
                    {question}
                    <span className="text-xl text-accent transition group-open:rotate-45">+</span>
                  </summary>
                  <p className="max-w-2xl pt-4 text-sm leading-7 text-muted-foreground">{answer}</p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 pb-20 md:px-12 md:pb-28">
        <div className="mx-auto grid max-w-[1500px] gap-4 rounded-2xl border border-border bg-card p-7 md:grid-cols-3 md:p-10">
          <Link href="/notice" className="flex items-center justify-between rounded-xl bg-secondary/50 p-5 font-bold transition hover:bg-secondary">
            공지사항 <ArrowUpRight className="size-4" />
          </Link>
          <Link href="/service" className="flex items-center justify-between rounded-xl bg-secondary/50 p-5 font-bold transition hover:bg-secondary">
            여행 서비스 <ArrowUpRight className="size-4" />
          </Link>
          <Link href="/event" className="flex items-center justify-between rounded-xl bg-secondary/50 p-5 font-bold transition hover:bg-secondary">
            이벤트 <ArrowUpRight className="size-4" />
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
