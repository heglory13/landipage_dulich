"use client";

import { useState } from "react";
import { CheckCircle2, Send } from "lucide-react";

export function SupportForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [isPending, setIsPending] = useState(false);

  return (
    <form
      className="rounded-2xl border border-border bg-card p-6 shadow-[0_12px_35px_rgba(30,26,20,0.06)] md:p-10"
      onSubmit={async (event) => {
        event.preventDefault();
        setError("");
        setIsPending(true);
        const formElement = event.currentTarget;
        const form = new FormData(formElement);
        try {
          const response = await fetch("/api/inquiries", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              name: form.get("name"),
              contact: form.get("contact"),
              topic: form.get("topic"),
              message: form.get("message"),
            }),
          });
          const result = await response.json() as { error?: string };
          if (!response.ok) {
            setError(result.error ?? "문의 접수에 실패했습니다.");
            return;
          }
          setIsSubmitted(true);
          formElement.reset();
        } catch {
          setError("서버에 연결할 수 없습니다. 잠시 후 다시 시도해주세요.");
        } finally {
          setIsPending(false);
        }
      }}
    >
      <div className="grid gap-6 md:grid-cols-2">
        <label className="grid gap-2 text-sm font-semibold">
          이름 <span className="text-accent">*</span>
          <input
            required
            name="name"
            autoComplete="name"
            placeholder="이름을 입력해주세요"
            className="h-12 rounded-lg border border-input bg-background px-4 font-normal outline-none transition placeholder:text-muted-foreground focus:border-accent focus:ring-2 focus:ring-accent/20"
          />
        </label>
        <label className="grid gap-2 text-sm font-semibold">
          연락처 <span className="text-accent">*</span>
          <input
            required
            name="contact"
            autoComplete="email"
            placeholder="이메일, 카카오톡 또는 텔레그램"
            className="h-12 rounded-lg border border-input bg-background px-4 font-normal outline-none transition placeholder:text-muted-foreground focus:border-accent focus:ring-2 focus:ring-accent/20"
          />
        </label>
        <label className="grid gap-2 text-sm font-semibold md:col-span-2">
          문의 유형 <span className="text-accent">*</span>
          <select
            required
            name="topic"
            defaultValue=""
            className="h-12 rounded-lg border border-input bg-background px-4 font-normal outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20"
          >
            <option value="" disabled>문의 유형을 선택해주세요</option>
            <option value="general">일반 문의</option>
            <option value="reservation">예약 & 서비스</option>
            <option value="content">게시물 수정 요청</option>
            <option value="event">이벤트 문의</option>
            <option value="other">기타 문의</option>
          </select>
        </label>
        <label className="grid gap-2 text-sm font-semibold md:col-span-2">
          문의 내용 <span className="text-accent">*</span>
          <textarea
            required
            name="message"
            rows={7}
            placeholder="확인이 필요한 내용을 구체적으로 작성해주세요"
            className="resize-y rounded-lg border border-input bg-background p-4 font-normal leading-7 outline-none transition placeholder:text-muted-foreground focus:border-accent focus:ring-2 focus:ring-accent/20"
          />
        </label>
      </div>

      <div className="mt-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs leading-5 text-muted-foreground">필수 항목을 입력한 뒤 문의를 접수해주세요.</p>
        <button
          type="submit"
          disabled={isPending}
          className="inline-flex min-h-12 items-center justify-center gap-3 rounded-lg bg-primary px-7 py-3 text-sm font-bold text-primary-foreground transition hover:bg-accent hover:text-accent-foreground disabled:cursor-wait disabled:opacity-60"
        >
          {isPending ? "접수 중..." : "문의 접수"} <Send className="size-4" />
        </button>
      </div>

      {error ? <p className="mt-6 rounded-lg bg-red-50 p-4 text-sm text-red-700" role="alert">{error}</p> : null}

      {isSubmitted ? (
        <div className="mt-6 flex items-start gap-3 rounded-lg bg-secondary p-4 text-sm leading-6" role="status">
          <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-accent" />
          문의가 접수되었습니다. 내용을 확인한 뒤 안내드리겠습니다.
        </div>
      ) : null}
    </form>
  );
}
