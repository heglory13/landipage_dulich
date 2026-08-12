import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "로그인 | 호치민 게임",
  description: "호치민 게임 계정에 로그인하세요.",
};

export default function LoginPage() {
  redirect("/?auth=login");
}
