"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Inquiry = {
  id: number;
  name: string;
  contact: string;
  topic: string;
  message: string;
  status: string;
  created_at: string;
};

const statusLabels: Record<string, string> = {
  new: "신규",
  in_progress: "처리 중",
  resolved: "완료",
};

export function AdminInquiries({ inquiries }: { inquiries: Inquiry[] }) {
  const router = useRouter();
  const [pendingId, setPendingId] = useState<number | null>(null);
  const [error, setError] = useState("");

  async function updateStatus(id: number, status: string) {
    setPendingId(id);
    setError("");
    try {
      const response = await fetch(`/api/admin/inquiries/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (!response.ok) throw new Error();
      router.refresh();
    } catch {
      setError("상태를 변경하지 못했습니다. 다시 시도해주세요.");
    } finally {
      setPendingId(null);
    }
  }

  return (
    <section className="rounded-lg border border-[#c3c4c7] bg-white p-5 shadow-sm md:p-7">
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[.22em] text-accent">Support</p>
          <h2 className="mt-2 text-2xl font-bold">최근 문의</h2>
        </div>
        <span className="text-sm text-muted-foreground">최근 {inquiries.length}건</span>
      </div>
      {error ? <p className="mt-5 rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</p> : null}
      <div className="mt-6 overflow-x-auto">
        <table className="w-full min-w-[850px] text-left text-sm">
          <thead className="border-b border-border text-xs uppercase tracking-wider text-muted-foreground">
            <tr><th className="pb-3">고객</th><th className="pb-3">문의</th><th className="pb-3">내용</th><th className="pb-3">접수일</th><th className="pb-3">상태</th></tr>
          </thead>
          <tbody className="divide-y divide-border">
            {inquiries.map((item) => (
              <tr key={item.id}>
                <td className="py-4 pr-5"><p className="font-semibold">{item.name}</p><p className="mt-1 text-xs text-muted-foreground">{item.contact}</p></td>
                <td className="py-4 pr-5 font-medium">{item.topic}</td>
                <td className="max-w-md py-4 pr-5 text-muted-foreground"><p className="line-clamp-2">{item.message}</p></td>
                <td className="whitespace-nowrap py-4 pr-5 text-muted-foreground">{new Date(item.created_at).toLocaleDateString("ko-KR")}</td>
                <td className="py-4">
                  <select disabled={pendingId === item.id} value={item.status} onChange={(event) => updateStatus(item.id, event.target.value)} className="h-10 rounded-lg border border-input bg-background px-3 outline-none focus:border-accent">
                    {Object.entries(statusLabels).map(([value, label]) => <option key={value} value={value}>{label}</option>)}
                  </select>
                </td>
              </tr>
            ))}
            {inquiries.length === 0 ? <tr><td colSpan={5} className="py-12 text-center text-muted-foreground">접수된 문의가 없습니다.</td></tr> : null}
          </tbody>
        </table>
      </div>
    </section>
  );
}
