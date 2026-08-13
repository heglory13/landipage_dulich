import "server-only";

import { getCurrentAdmin } from "@/lib/auth";

export async function requireAdmin() {
  const admin = await getCurrentAdmin();
  if (!admin) throw new Error("ADMIN_REQUIRED");
  return admin;
}

export function isSameOrigin(request: Request) {
  const origin = request.headers.get("origin");
  if (!origin) return true;
  try {
    const originUrl = new URL(origin);
    const requestUrl = new URL(request.url);
    const hostCandidates = new Set(
      [
        requestUrl.host,
        request.headers.get("host"),
        request.headers.get("x-forwarded-host"),
      ].filter(Boolean) as string[],
    );

    return hostCandidates.has(originUrl.host);
  } catch {
    return false;
  }
}
