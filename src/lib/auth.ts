import "server-only";

import { createHash, randomBytes, scryptSync, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { database, sessionCookieName } from "@/lib/database";

export type UserRole = "user" | "admin";
export type PublicUser = { id: number; name: string; email: string; role: UserRole };

export function adminEmails() {
  return new Set(
    (process.env.ADMIN_EMAILS ?? "")
      .split(",")
      .map((email) => email.trim().toLowerCase())
      .filter(Boolean),
  );
}

export function isAdminEmail(email: string) {
  return adminEmails().has(email.trim().toLowerCase());
}

export function hashPassword(password: string, salt = randomBytes(16).toString("hex")) {
  return { salt, hash: scryptSync(password, salt, 64).toString("hex") };
}

export function verifyPassword(password: string, salt: string, expectedHash: string) {
  const actual = scryptSync(password, salt, 64);
  const expected = Buffer.from(expectedHash, "hex");
  return actual.length === expected.length && timingSafeEqual(actual, expected);
}

function tokenHash(token: string) {
  return createHash("sha256").update(token).digest("hex");
}

export async function createSession(userId: number) {
  const token = randomBytes(32).toString("hex");
  const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
  database.prepare("DELETE FROM sessions WHERE expires_at <= ?").run(new Date().toISOString());
  database.prepare("INSERT INTO sessions (user_id, token_hash, expires_at) VALUES (?, ?, ?)")
    .run(userId, tokenHash(token), expiresAt.toISOString());
  const secureCookies = process.env.AUTH_COOKIE_SECURE === "true";

  (await cookies()).set(sessionCookieName, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: secureCookies,
    path: "/",
    expires: expiresAt,
  });
}

export async function getCurrentUser(): Promise<PublicUser | null> {
  const token = (await cookies()).get(sessionCookieName)?.value;
  if (!token) return null;

  const row = database.prepare(`
    SELECT users.id, users.name, users.email, users.role
    FROM sessions JOIN users ON users.id = sessions.user_id
    WHERE sessions.token_hash = ? AND sessions.expires_at > ?
  `).get(tokenHash(token), new Date().toISOString()) as PublicUser | undefined;
  return row ?? null;
}

export async function getCurrentAdmin() {
  const user = await getCurrentUser();
  return user?.role === "admin" ? user : null;
}

export async function destroySession() {
  const cookieStore = await cookies();
  const token = cookieStore.get(sessionCookieName)?.value;
  if (token) database.prepare("DELETE FROM sessions WHERE token_hash = ?").run(tokenHash(token));
  cookieStore.delete(sessionCookieName);
}
