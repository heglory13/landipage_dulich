"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { usePathname } from "next/navigation";

const promoImage = "/images/ho-chi-minh-game-promo.png";

function getStorageKey() {
  return window.innerWidth < 640
    ? "ho-chi-minh-game-promo-seen-mobile"
    : "ho-chi-minh-game-promo-seen-desktop";
}

export function WelcomePromo() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [image, setImage] = useState(promoImage);

  useEffect(() => {
    if (pathname.startsWith("/admin")) return;
    setIsReady(true);
    setIsOpen(sessionStorage.getItem(getStorageKey()) !== "true");
    fetch("/api/site-settings", { cache: "no-store" }).then((response) => response.json()).then((data) => { if (data.settings?.promo_image) setImage(data.settings.promo_image); }).catch(() => undefined);
  }, [pathname]);

  const closePromo = () => {
    sessionStorage.setItem(getStorageKey(), "true");
    setIsOpen(false);
  };

  if (!isReady || pathname.startsWith("/admin")) return null;

  return (
    <>
      {isOpen ? (
        <div
          className="fixed inset-0 z-[100] grid place-items-center bg-black/75 p-2 backdrop-blur-sm sm:p-4"
          role="dialog"
          aria-modal="true"
          aria-label="호치민 게임 환영 이벤트"
          onClick={closePromo}
        >
          <div
            className="relative max-h-[92vh] max-w-[min(94vw,620px)] overflow-hidden rounded-xl border border-white/20 bg-black shadow-2xl sm:max-h-[88vh] sm:rounded-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <img
              src={image}
              alt="호치민 게임 환영 이벤트 안내"
              className="max-h-[92vh] w-auto object-contain sm:max-h-[88vh]"
            />
            <button
              type="button"
              onClick={closePromo}
              className="absolute right-3 top-3 grid size-11 place-items-center rounded-full border border-white/35 bg-black/75 text-white backdrop-blur-md transition hover:bg-white hover:text-black"
              aria-label="팝업 닫기"
            >
              <X className="size-5" />
            </button>
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="fixed bottom-4 right-4 z-50 w-12 overflow-hidden rounded-lg border border-white/30 bg-black shadow-xl transition hover:-translate-y-1 sm:bottom-5 sm:right-5 sm:w-16 sm:rounded-xl"
          aria-label="호치민 게임 이벤트 다시 보기"
        >
          <img src={image} alt="" className="aspect-[9/14] w-full object-cover object-top" />
        </button>
      )}
    </>
  );
}
