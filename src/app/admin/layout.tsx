import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { AdminShell } from "@/components/admin-shell";

export const dynamic = "force-dynamic";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const user = await getCurrentUser();
  if (!user) redirect("/?auth=login&next=%2Fadmin");
  if (user.role !== "admin") redirect("/");
  return <AdminShell name={user.name} email={user.email}>{children}</AdminShell>;
}
