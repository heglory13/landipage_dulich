"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { openAuthModal } from "@/components/auth-modal";
import { openSearchModal } from "@/components/search-modal";
import { ChevronDown, LogOut, Menu, X, Search, User } from "lucide-react";

type AuthSession = {
  name: string;
  email: string;
  role: "user" | "admin";
};

const destinationGroups = [
  {
    city: "호치민",
    places: [
      "호치민숙소&풀빌라",
      "호치민가라오케",
      "호치민클럽",
      "호치민바&주점",
      "호치민이발소&미용실",
      "호치민마사지",
      "호치민골프",
      "호치민여행지",
      "호치민맛집",
    ],
  },
  {
    city: "다낭",
    places: [
      "다낭풀빌라",
      "다낭가라오케",
      "다낭이발소",
      "다낭클럽",
      "다낭바",
      "다낭마사지",
      "다낭맛집",
    ],
  },
  {
    city: "붕따우",
    places: [
      "붕따우숙소&풀빌라",
      "붕따우가라오케",
      "붕따우클럽",
      "붕따우바&주점",
      "붕따우이발소&미용실",
      "붕따우마사지",
      "붕따우골프",
      "붕따우여행지",
      "붕따우맛집",
    ],
  },
  {
    city: "푸꾸옥",
    places: [
      "푸꾸옥숙소&풀빌라",
      "푸꾸옥가라오케",
      "푸꾸옥클럽",
      "푸꾸옥바&주점",
      "푸꾸옥이발소&미용실",
      "푸꾸옥마사지",
      "푸꾸옥골프",
      "푸꾸옥여행지",
      "푸꾸옥맛집",
    ],
  },
  {
    city: "나트랑",
    places: [
      "나트랑숙소&풀빌라",
      "나트랑가라오케",
      "나트랑클럽",
      "나트랑바&주점",
      "나트랑이발소&미용실",
      "나트랑마사지",
      "나트랑골프",
      "나트랑여행지",
      "나트랑맛집",
    ],
  },
  {
    city: "달랏",
    places: [
      "달랏숙소&풀빌라",
      "달랏가라오케",
      "달랏클럽",
      "달랏바&주점",
      "달랏이발소&미용실",
      "달랏마사지",
      "달랏골프",
      "달랏여행지",
      "달랏맛집",
    ],
  },
] as const;

const benefitItems = [
  {
    title: "공지사항",
    description: "호치민 게임의 새로운 소식과 꼭 확인해야 할 이용 안내",
    href: "/notice",
  },
  {
    title: "이벤트",
    description: "진행 중인 이벤트와 특별 프로모션 소식",
    href: "/event",
  },
  {
    title: "서비스",
    description: "공항 패스트트랙과 여행 편의 서비스 안내",
    href: "/service",
  },
] as const;

const companyItems = [
  {
    title: "소개",
    description: "호치민 게임의 서비스와 운영 방향을 소개합니다.",
    href: "/about",
  },
  {
    title: "정책 및 개인정보 보호",
    description: "서비스 이용 정책과 개인정보 처리 기준을 확인하세요.",
    href: "/privacy",
  },
] as const;

const hoChiMinhRoutes: Record<string, string> = {
  "호치민숙소&풀빌라": "/ho-chi-minh/accommodation",
  "호치민가라오케": "/ho-chi-minh/karaoke",
  "호치민클럽": "/ho-chi-minh/club",
  "호치민바&주점": "/ho-chi-minh/bar",
  "호치민이발소&미용실": "/ho-chi-minh/salon",
  "호치민마사지": "/ho-chi-minh/massage",
  "호치민골프": "/ho-chi-minh/golf",
  "호치민여행지": "/ho-chi-minh/travel",
  "호치민맛집": "/ho-chi-minh/restaurant",
  "다낭풀빌라": "/da-nang/accommodation",
  "다낭가라오케": "/da-nang/karaoke",
  "다낭이발소": "/da-nang/salon",
  "다낭클럽": "/da-nang/club",
  "다낭바": "/da-nang/bar",
  "다낭마사지": "/da-nang/massage",
  "다낭맛집": "/da-nang/restaurant",
  "붕따우숙소&풀빌라": "/vung-tau?filter=accommodation#category-list",
  "붕따우가라오케": "/vung-tau?filter=karaoke#category-list",
  "붕따우클럽": "/vung-tau?filter=clubbar#category-list",
  "붕따우바&주점": "/vung-tau?filter=clubbar#category-list",
  "붕따우이발소&미용실": "/vung-tau?filter=all#category-list",
  "붕따우마사지": "/vung-tau?filter=massage#category-list",
  "붕따우골프": "/vung-tau?filter=all#category-list",
  "붕따우여행지": "/vung-tau?filter=travel#category-list",
  "붕따우맛집": "/vung-tau?filter=restaurant#category-list",
  "푸꾸옥숙소&풀빌라": "/phu-quoc?filter=accommodation#category-list",
  "푸꾸옥가라오케": "/phu-quoc?filter=karaoke#category-list",
  "푸꾸옥클럽": "/phu-quoc?filter=clubbar#category-list",
  "푸꾸옥바&주점": "/phu-quoc?filter=clubbar#category-list",
  "푸꾸옥이발소&미용실": "/phu-quoc?filter=all#category-list",
  "푸꾸옥마사지": "/phu-quoc?filter=massage#category-list",
  "푸꾸옥골프": "/phu-quoc?filter=all#category-list",
  "푸꾸옥여행지": "/phu-quoc?filter=travel#category-list",
  "푸꾸옥맛집": "/phu-quoc?filter=restaurant#category-list",
  "나트랑숙소&풀빌라": "/nha-trang/accommodation",
  "나트랑가라오케": "/nha-trang/karaoke",
  "나트랑클럽": "/nha-trang/club",
  "나트랑바&주점": "/nha-trang/bar",
  "나트랑이발소&미용실": "/nha-trang/salon",
  "나트랑마사지": "/nha-trang/massage",
  "나트랑골프": "/nha-trang/golf",
  "나트랑여행지": "/nha-trang/travel",
  "나트랑맛집": "/nha-trang/restaurant",
  "달랏숙소&풀빌라": "/da-lat/accommodation",
  "달랏가라오케": "/da-lat/karaoke",
  "달랏클럽": "/da-lat/club",
  "달랏바&주점": "/da-lat/bar",
  "달랏이발소&미용실": "/da-lat/salon",
  "달랏마사지": "/da-lat/massage",
  "달랏골프": "/da-lat/golf",
  "달랏여행지": "/da-lat/travel",
  "달랏맛집": "/da-lat/restaurant",
};

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDestinationsOpen, setIsDestinationsOpen] = useState(false);
  const [isBenefitsOpen, setIsBenefitsOpen] = useState(false);
  const [isCompanyOpen, setIsCompanyOpen] = useState(false);
  const [authSession, setAuthSession] = useState<AuthSession | null>(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  useEffect(() => {
    const syncAuthSession = async () => {
      try {
        const response = await fetch("/api/auth/me", { cache: "no-store" });
        const result = await response.json() as { user: AuthSession | null };
        setAuthSession(result.user);
        if (!result.user) setIsProfileOpen(false);
      } catch {
        setAuthSession(null);
      }
    };

    syncAuthSession();
    window.addEventListener("ho-chi-minh-game-auth-change", syncAuthSession);

    return () => {
      window.removeEventListener("ho-chi-minh-game-auth-change", syncAuthSession);
    };
  }, []);

  const handleAccountClick = () => {
    if (authSession) {
      setIsProfileOpen((open) => !open);
      return;
    }

    openAuthModal("login");
  };

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    setAuthSession(null);
    setIsProfileOpen(false);
    window.dispatchEvent(new Event("ho-chi-minh-game-auth-change"));
  };

  const profilePanel = authSession && isProfileOpen ? (
    <div className="absolute right-0 top-full z-[80] mt-2 w-72 overflow-hidden rounded-2xl border border-border bg-background p-3 shadow-[0_18px_50px_rgba(32,25,20,0.2)]">
      <div className="flex items-center gap-3 rounded-xl bg-accent/10 p-4">
        <span className="grid size-11 shrink-0 place-items-center rounded-full bg-accent text-lg font-bold text-white">
          {authSession.name.charAt(0).toUpperCase()}
        </span>
        <div className="min-w-0">
          <p className="truncate font-bold text-foreground">{authSession.name}</p>
          <p className="truncate text-xs text-muted-foreground">{authSession.email}</p>
        </div>
      </div>
      <Link
        href="/profile"
        onClick={() => setIsProfileOpen(false)}
        className="mt-2 flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition-colors hover:bg-muted"
      >
        <User className="size-4" />
        내 프로필 · 저장한 글
      </Link>
      {authSession.role === "admin" ? (
        <Link
          href="/admin"
          onClick={() => setIsProfileOpen(false)}
          className="mt-1 flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition-colors hover:bg-muted"
        >
          <User className="size-4" />
          관리자 대시보드
        </Link>
      ) : null}
      <button
        type="button"
        onClick={handleLogout}
        className="mt-2 flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-semibold transition-colors hover:bg-muted"
      >
        <LogOut className="size-4" />
        로그아웃
      </button>
    </div>
  ) : null;

  const scrollToCollections = () => {
    document.getElementById("collections")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-[60] isolate bg-background/80 backdrop-blur-md border-b border-border/50">
      <nav className="relative z-10 max-w-[1800px] mx-auto px-6 md:px-12">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo - Left */}
          <Link href="/" className="flex-shrink-0">
            <h1 className="brand-logo font-serif text-xl md:text-2xl tracking-[0.12em] !text-accent [-webkit-text-stroke:1.25px_#6f6557]">
              호치민 게임
            </h1>
          </Link>

          {/* Desktop Navigation - Right */}
          <div className="hidden md:flex items-center gap-8">
            <div className="group">
              <a
                href="#collections"
                className="flex h-20 items-center gap-1.5 text-sm tracking-[0.12em] uppercase transition-colors duration-300 hover:text-accent focus:text-accent focus:outline-none"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToCollections();
                }}
              >
                여행지
                <ChevronDown className="h-4 w-4 transition-transform duration-300 group-hover:rotate-180 group-focus-within:rotate-180" />
              </a>

              <div className="pointer-events-none fixed inset-x-0 top-20 z-50 -translate-y-2 opacity-0 transition-[opacity,transform] duration-300 ease-out group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:translate-y-0 group-focus-within:opacity-100">
                <div className="max-h-[calc(100vh-5rem)] overflow-y-auto rounded-b-[40px] bg-background/95 px-12 py-10 shadow-[0_24px_50px_rgba(32,25,20,0.18)] backdrop-blur-xl lg:px-24 xl:px-[10vw]">
                  <div className="mx-auto grid max-w-[1680px] grid-cols-6 gap-x-10 gap-y-12">
                    {destinationGroups.map((group) => (
                      <section key={group.city}>
                        <h2 className="mb-5 text-xl font-semibold text-accent xl:text-2xl">
                          {group.city}
                        </h2>
                        <ul className="space-y-4">
                          {group.places.map((place) => (
                            <li key={place}>
                              <a
                                href={hoChiMinhRoutes[place] ?? "#collections"}
                                className="text-[15px] leading-6 tracking-normal text-foreground transition-colors hover:text-accent xl:text-base"
                                onClick={(e) => {
                                  if (hoChiMinhRoutes[place]) return;
                                  e.preventDefault();
                                  scrollToCollections();
                                }}
                              >
                                <span>{place}</span>
                              </a>
                            </li>
                          ))}
                        </ul>
                      </section>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="group/benefits">
              <Link
                href="/notice"
                className="flex h-20 items-center gap-1.5 text-sm tracking-[0.2em] uppercase transition-colors duration-300 hover:text-accent focus:text-accent focus:outline-none"
              >
                혜택
                <ChevronDown className="h-4 w-4 transition-transform duration-300 group-hover/benefits:rotate-180 group-focus-within/benefits:rotate-180" />
              </Link>

              <div className="pointer-events-none fixed inset-x-0 top-20 z-50 -translate-y-2 opacity-0 transition-[opacity,transform] duration-300 ease-out group-hover/benefits:pointer-events-auto group-hover/benefits:translate-y-0 group-hover/benefits:opacity-100 group-focus-within/benefits:pointer-events-auto group-focus-within/benefits:translate-y-0 group-focus-within/benefits:opacity-100">
                <div className="rounded-b-[40px] bg-background/95 px-12 py-12 shadow-[0_24px_50px_rgba(32,25,20,0.18)] backdrop-blur-xl lg:px-24 xl:px-[10vw]">
                  <div className="mx-auto grid max-w-[1400px] grid-cols-3 gap-8">
                    {benefitItems.map((item) => (
                      <Link
                        key={item.title}
                        href={item.href}
                        className="border-l border-border/80 px-7 py-3 transition-colors hover:text-accent"
                      >
                        <h2 className="mb-3 text-xl font-semibold text-accent xl:text-2xl">
                          {item.title}
                        </h2>
                        <p className="max-w-sm text-sm leading-6 text-muted-foreground xl:text-base">
                          {item.description}
                        </p>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="group/company">
              <Link
                href="/about"
                className="flex h-20 items-center gap-1.5 text-sm tracking-[0.2em] uppercase transition-colors duration-300 hover:text-accent focus:text-accent focus:outline-none"
              >
                소개
                <ChevronDown className="h-4 w-4 transition-transform duration-300 group-hover/company:rotate-180 group-focus-within/company:rotate-180" />
              </Link>
              <div className="pointer-events-none fixed inset-x-0 top-20 z-50 -translate-y-2 opacity-0 transition-[opacity,transform] duration-300 ease-out group-hover/company:pointer-events-auto group-hover/company:translate-y-0 group-hover/company:opacity-100 group-focus-within/company:pointer-events-auto group-focus-within/company:translate-y-0 group-focus-within/company:opacity-100">
                <div className="rounded-b-[40px] bg-background/95 px-12 py-12 shadow-[0_24px_50px_rgba(32,25,20,0.18)] backdrop-blur-xl lg:px-24 xl:px-[10vw]">
                  <div className="mx-auto grid max-w-[900px] grid-cols-2 gap-8">
                    {companyItems.map((item) => (
                      <Link key={item.title} href={item.href} className="border-l border-border/80 px-7 py-3 transition-colors hover:text-accent">
                        <h2 className="mb-3 text-xl font-semibold text-accent xl:text-2xl">{item.title}</h2>
                        <p className="text-sm leading-6 text-muted-foreground xl:text-base">{item.description}</p>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <Link
              href="/support"
              className="text-sm tracking-[0.2em] uppercase hover:text-accent transition-colors duration-300"
            >
              문의 및 지원
            </Link>
            <Link href="/rankings" className="text-sm tracking-[0.2em] uppercase hover:text-accent transition-colors duration-300">평가 순위</Link>

            {/* Icons - Desktop */}
            <div className="flex items-center gap-4 ml-4 pl-4 border-l border-border/50">
              <button
                type="button"
                onClick={openSearchModal}
                className="p-2 min-h-11 min-w-11 flex items-center justify-center hover:text-accent transition-colors duration-300"
                aria-label="검색"
              >
                <Search className="w-5 h-5" />
              </button>
              <div className="relative">
                <button
                  type="button"
                  onClick={handleAccountClick}
                  className="p-2 min-h-11 min-w-11 flex items-center justify-center hover:text-accent transition-colors duration-300"
                  aria-label={authSession ? "프로필 열기" : "로그인"}
                  aria-expanded={authSession ? isProfileOpen : undefined}
                >
                  {authSession ? (
                    <span className="grid size-8 place-items-center rounded-full bg-accent text-sm font-bold text-white">
                      {authSession.name.charAt(0).toUpperCase()}
                    </span>
                  ) : (
                    <User className="w-5 h-5" />
                  )}
                </button>
                {profilePanel}
              </div>
            </div>
          </div>

          {/* Mobile Icons and Menu Button - Right */}
          <div className="relative z-20 md:hidden flex items-center gap-2">
            <div className="relative">
              <button
                type="button"
                onClick={handleAccountClick}
                className="p-2 min-h-11 min-w-11 flex items-center justify-center hover:text-accent transition-colors duration-300"
                aria-label={authSession ? "프로필 열기" : "로그인"}
                aria-expanded={authSession ? isProfileOpen : undefined}
              >
                {authSession ? (
                  <span className="grid size-8 place-items-center rounded-full bg-accent text-sm font-bold text-white">
                    {authSession.name.charAt(0).toUpperCase()}
                  </span>
                ) : (
                  <User className="w-5 h-5" />
                )}
              </button>
              {profilePanel}
            </div>
            <button
              type="button"
              onClick={openSearchModal}
              className="p-2 min-h-11 min-w-11 flex items-center justify-center hover:text-accent transition-colors duration-300"
              aria-label="검색"
            >
              <Search className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="relative z-20 p-2 min-h-11 min-w-11 flex items-center justify-center bg-background/70"
              aria-label="메뉴 열기"
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-background border-b border-border py-8 px-6 animate-in fade-in slide-in-from-top-2 duration-300">
            <div className="flex flex-col gap-6">
              <div>
                <button
                  type="button"
                  className="flex w-full items-center justify-between text-left text-sm tracking-[0.15em] uppercase"
                  aria-expanded={isDestinationsOpen}
                  onClick={() => setIsDestinationsOpen((open) => !open)}
                >
                  여행지
                  <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${isDestinationsOpen ? "rotate-180" : ""}`} />
                </button>
                {isDestinationsOpen && (
                  <div className="mt-5 max-h-[55vh] space-y-6 overflow-y-auto rounded-2xl bg-card/80 p-5 shadow-sm">
                    {destinationGroups.map((group) => (
                      <section key={group.city}>
                        <h2 className="mb-3 font-semibold text-accent">{group.city}</h2>
                        <ul className="space-y-2.5">
                          {group.places.map((place) => (
                            <li key={place}>
                              <a
                                href={hoChiMinhRoutes[place] ?? "#collections"}
                                className="text-sm leading-5"
                                onClick={(e) => {
                                  if (hoChiMinhRoutes[place]) {
                                    setIsMenuOpen(false);
                                    setIsDestinationsOpen(false);
                                    return;
                                  }
                                  e.preventDefault();
                                  setIsMenuOpen(false);
                                  setIsDestinationsOpen(false);
                                  scrollToCollections();
                                }}
                              >
                                <span>{place}</span>
                              </a>
                            </li>
                          ))}
                        </ul>
                      </section>
                    ))}
                  </div>
                )}
              </div>
              <div>
                <button
                  type="button"
                  className="flex w-full items-center justify-between text-left text-sm tracking-[0.2em] uppercase"
                  aria-expanded={isBenefitsOpen}
                  onClick={() => setIsBenefitsOpen((open) => !open)}
                >
                  혜택
                  <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${isBenefitsOpen ? "rotate-180" : ""}`} />
                </button>
                {isBenefitsOpen && (
                  <div className="mt-5 space-y-5 rounded-2xl bg-card/80 p-5 shadow-sm">
                    {benefitItems.map((item) => (
                      <Link
                        key={item.title}
                        href={item.href}
                        className="block border-l border-border pl-4"
                        onClick={() => {
                          setIsMenuOpen(false);
                          setIsBenefitsOpen(false);
                        }}
                      >
                        <h2 className="font-semibold text-accent">{item.title}</h2>
                        <p className="mt-1 text-xs leading-5 text-muted-foreground">{item.description}</p>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
              <div>
                <button
                  type="button"
                  className="flex w-full items-center justify-between text-left text-sm tracking-[0.2em] uppercase"
                  aria-expanded={isCompanyOpen}
                  onClick={() => setIsCompanyOpen((open) => !open)}
                >
                  소개
                  <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${isCompanyOpen ? "rotate-180" : ""}`} />
                </button>
                {isCompanyOpen && (
                  <div className="mt-5 space-y-5 rounded-2xl bg-card/80 p-5 shadow-sm">
                    {companyItems.map((item) => (
                      <Link
                        key={item.title}
                        href={item.href}
                        className="block border-l border-border pl-4"
                        onClick={() => {
                          setIsMenuOpen(false);
                          setIsCompanyOpen(false);
                        }}
                      >
                        <h2 className="font-semibold text-accent">{item.title}</h2>
                        <p className="mt-1 text-xs leading-5 text-muted-foreground">{item.description}</p>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
              <Link
                href="/support"
                className="text-sm tracking-[0.2em] uppercase"
                onClick={() => {
                  setIsMenuOpen(false);
                }}
              >
                문의 및 지원
              </Link>
              <Link href="/rankings" className="text-sm tracking-[0.2em] uppercase" onClick={() => setIsMenuOpen(false)}>평가 순위</Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
