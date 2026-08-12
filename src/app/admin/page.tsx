import Link from "next/link";
import { BarChart3, FileText, Inbox, Users } from "lucide-react";
import { database } from "@/lib/database";

type CountRow = { count: number };

export default function AdminPage() {
  const users = database.prepare("SELECT COUNT(*) AS count FROM users WHERE role = 'user'").get() as CountRow;
  const content = database.prepare("SELECT COUNT(*) AS count FROM content_items").get() as CountRow;
  const inquiries = database.prepare("SELECT COUNT(*) AS count FROM inquiries WHERE status != 'resolved'").get() as CountRow;
  const comments = database.prepare("SELECT COUNT(*) AS count FROM comments").get() as CountRow;
  const stats = [["회원", users.count, Users, "/admin/users"], ["콘텐츠", content.count, FileText, "/admin/content"], ["처리할 문의", inquiries.count, Inbox, "/admin/inquiries"], ["댓글", comments.count, BarChart3, "/admin/content"]] as const;
  return <main className="mx-auto max-w-[1500px] space-y-7 px-4 py-7 md:px-7 lg:px-10 lg:py-10"><div><p className="text-sm font-semibold text-[#646970]">Admin Console</p><h1 className="mt-1 text-3xl font-semibold md:text-4xl">대시보드</h1><p className="mt-2 text-[#646970]">관리할 메뉴를 선택하세요.</p></div><section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">{stats.map(([label,value,Icon,href]) => <Link href={href} key={label} className="rounded-lg border border-[#c3c4c7] bg-white p-6 shadow-sm transition hover:border-[#2271b1] hover:shadow-md"><div className="flex items-center justify-between"><span className="text-sm font-semibold text-[#646970]">{label}</span><span className="grid size-10 place-items-center rounded-md bg-[#e7f3ff] text-[#2271b1]"><Icon className="size-5"/></span></div><p className="mt-5 text-4xl font-semibold tabular-nums">{value.toLocaleString()}</p></Link>)}</section></main>;
}
