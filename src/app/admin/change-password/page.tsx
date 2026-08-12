import { AdminChangePasswordForm } from "@/components/admin-change-password-form";

export default function AdminChangePasswordPage(){
  return <main className="mx-auto max-w-3xl px-4 py-7 md:px-7 lg:px-10 lg:py-10"><p className="text-sm font-semibold text-[#646970]">SECURITY</p><h1 className="mt-2 text-3xl font-semibold">비밀번호 변경</h1><p className="mt-2 text-[#646970]">관리자 계정의 로그인 비밀번호를 변경합니다.</p><AdminChangePasswordForm/></main>;
}
