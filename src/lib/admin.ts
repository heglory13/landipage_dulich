import "server-only";

import { getCurrentAdmin } from "@/lib/auth";

export async function requireAdmin() {
  const admin = await getCurrentAdmin();
  if (!admin) throw new Error("ADMIN_REQUIRED");
  return admin;
}

export function isSameOrigin(request: Request) {
  const origin = request.headers.get("origin");
  if (!origin) return false;
  try {
    return new URL(origin).host === new URL(request.url).host;
  } catch {
    return false;
  }
}
