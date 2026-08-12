import React from "react"
import type { Metadata, Viewport } from "next";
import "./globals.css";
import { WelcomePromo } from "@/components/welcome-promo";
import { AuthModal } from "@/components/auth-modal";
import { SearchModal } from "@/components/search-modal";

export const metadata: Metadata = {
  title: "호치민 게임",
  description:
    "호치민 여행지, 이벤트, 서비스와 다양한 현지 정보를 만나보세요.",
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="bg-background" suppressHydrationWarning>
      <body className="font-sans antialiased">
        {children}
        <WelcomePromo />
        <AuthModal />
        <SearchModal />
      </body>
    </html>
  );
}
