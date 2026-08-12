"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { BarChart3, ChevronLeft, FileText, Gift, Home, Inbox, KeyRound, LogOut, Menu, Settings, Users, X } from "lucide-react";

const navItems = [
  { label: "대시보드", href: "/admin", icon: BarChart3 },
  { label: "콘텐츠", href: "/admin/content", icon: FileText },
  { label: "혜택 관리", href: "/admin/benefits", icon: Gift },
  { label: "회원", href: "/admin/users", icon: Users },
  { label: "문의", href: "/admin/inquiries", icon: Inbox },
  { label: "웹사이트 정보", href: "/admin/settings", icon: Settings },
  { label: "비밀번호 변경", href: "/admin/change-password", icon: KeyRound },
] as const;

export function AdminShell({ name, email, children }: { name: string; email: string; children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    window.dispatchEvent(new Event("ho-chi-minh-game-auth-change"));
    router.replace("/");
    router.refresh();
  }

  const sidebar = (
    <aside className="flex h-full w-[270px] flex-col bg-[#1d2327] text-[#c3c4c7] shadow-2xl">
      <div className="flex h-16 items-center justify-between border-b border-white/10 px-5">
        <Link href="/admin" className="text-lg font-bold text-white">호치민 게임</Link>
        <button type="button" onClick={() => setOpen(false)} className="grid size-9 place-items-center rounded-lg hover:bg-white/10 lg:hidden" aria-label="메뉴 닫기"><X className="size-5" /></button>
      </div>
      <div className="border-b border-white/10 p-4">
        <div className="flex items-center gap-3 rounded-lg bg-white/[.06] p-3">
          <span className="grid size-10 shrink-0 place-items-center rounded-full bg-[#2271b1] font-bold text-white">{name.charAt(0).toUpperCase()}</span>
          <div className="min-w-0"><p className="truncate text-sm font-semibold text-white">{name}</p><p className="truncate text-xs text-[#a7aaad]">{email}</p><Link href="/admin/change-password" onClick={() => setOpen(false)} className="mt-1 inline-flex items-center gap-1 text-xs text-[#72aee6] hover:text-white"><KeyRound className="size-3"/>비밀번호 변경</Link></div>
        </div>
      </div>
      <nav className="flex-1 space-y-1 overflow-y-auto p-3">
        {navItems.map(({ label, href, icon: Icon }) => (
          <Link key={label} href={href} onClick={() => setOpen(false)} className={`flex items-center gap-3 rounded-md px-4 py-3 text-sm font-medium transition ${pathname === href ? "bg-[#2271b1] text-white" : "hover:bg-[#2c3338] hover:text-[#72aee6]"}`}>
            <Icon className="size-[18px]" />{label}
          </Link>
        ))}
      </nav>
      <div className="border-t border-white/10 p-3">
        <Link href="/" className="flex items-center gap-3 rounded-md px-4 py-3 text-sm font-medium hover:bg-[#2c3338] hover:text-white"><Home className="size-[18px]" />사이트 보기</Link>
        <button type="button" onClick={logout} className="flex w-full items-center gap-3 rounded-md px-4 py-3 text-sm font-medium hover:bg-[#2c3338] hover:text-white"><LogOut className="size-[18px]" />로그아웃</button>
      </div>
    </aside>
  );

  return (
    <div className="min-h-screen bg-[#f0f0f1] text-[#1d2327]">
      <div className="fixed inset-y-0 left-0 z-50 hidden lg:block">{sidebar}</div>
      {open ? <><button className="fixed inset-0 z-40 bg-black/60 lg:hidden" onClick={() => setOpen(false)} aria-label="메뉴 닫기" /><div className="fixed inset-y-0 left-0 z-50 lg:hidden">{sidebar}</div></> : null}
      <div className="lg:pl-[270px]">
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-[#c3c4c7] bg-white px-4 shadow-sm md:px-7">
          <button type="button" onClick={() => setOpen(true)} className="grid size-10 place-items-center rounded-md hover:bg-[#f0f0f1] lg:hidden" aria-label="메뉴 열기"><Menu className="size-5" /></button>
          <p className="hidden text-sm text-[#646970] lg:block">관리자 페이지</p>
          <Link href="/" className="flex items-center gap-2 text-sm font-medium text-[#2271b1] hover:underline">사이트로 이동 <ChevronLeft className="size-4 rotate-180" /></Link>
        </header>
        {children}
      </div>
    </div>
  );
}
