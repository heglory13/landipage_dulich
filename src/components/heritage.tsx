"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Mic2, Music2, type LucideIcon } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

type FeatureItem = {
  title: string;
  href: string;
  subtitle: string;
  image: string;
  alt: string;
};

type BoardItem = {
  title: string;
  href: string;
  image: string;
  alt: string;
};

type BoardPanelConfig = {
  title: string;
  href: string;
  items: BoardItem[];
};

const karaokeItems: FeatureItem[] = [
  {
    title: "호치민 한인가라오케 시스템",
    href: "/ho-chi-minh/karaoke",
    subtitle: "호치민 · 예약 방식",
    image: "/vietdalbam/upload/0b2f1f367f53461895c293f460e3cd61.thumbnail.webp",
    alt: "한인가라오케 시스템 호치민",
  },
  {
    title: "호치민 102 가라오케",
    href: "/ho-chi-minh/karaoke/%ED%98%B8%EC%B9%98%EB%AF%BC-102-%EA%B0%80%EB%9D%BC%EC%98%A4%EC%BC%80-%ED%95%9C%EC%9D%B8-ktv-%EC%B6%94%EC%B2%9C-1%EA%B5%B0-201",
    subtitle: "호치민 1군 · 추천",
    image: "/vietdalbam/upload/7b39d50373a04e74bb66794dd75a71fd.thumbnail.webp",
    alt: "가라오케 102",
  },
  {
    title: "호치민 C 호텔 가라오케",
    href: "/ho-chi-minh/karaoke/%ED%98%B8%EC%B9%98%EB%AF%BC-c-hotel-%EA%B0%80%EB%9D%BC%EC%98%A4%EC%BC%80-%ED%98%B8%EC%B9%98%EB%AF%BC-5%EA%B5%B0-%EB%A1%9C-1970",
    subtitle: "호치민 5군 · 로컬",
    image: "/vietdalbam/upload/dab53410e75240b0b22f15051e2b61aa.thumbnail.webp",
    alt: "C 호텔 가라오케",
  },
  {
    title: "호치민 KTV 1238",
    href: "/ho-chi-minh/karaoke/%ED%98%B8%EC%B9%98%EB%AF%BC-%EB%A1%9C%EC%BB%AC-%EA%B0%80%EB%9D%BC%EC%98%A4%EC%BC%80-%EC%B6%94%EC%B2%9C-ktv-1238-7%EA%B5%B0-256",
    subtitle: "호치민 7군 · 로컬 추천",
    image: "/vietdalbam/upload/cfae2c4e801a42368415d971eb364625.thumbnail.webp",
    alt: "KTV 1238",
  },
  {
    title: "호치민 동물의 왕국",
    href: "/ho-chi-minh/karaoke/%ED%98%B8%EC%B9%98%EB%AF%BC-%EB%A1%9C%EC%BB%AC-%EA%B0%80%EB%9D%BC%EC%98%A4%EC%BC%80-%EC%B6%94%EC%B2%9C-%EB%8F%99%EB%AC%BC%EC%9D%98-%EC%99%95%EA%B5%AD-%EC%82%AC%EC%9A%B0%EB%82%98-1972",
    subtitle: "호치민 · 노래방 추천",
    image: "/vietdalbam/upload/f298a49693e04a59b00a4d68b7a00fcf.thumbnail.webp",
    alt: "호치민 동물의 왕국",
  },
  {
    title: "호치민 127 BB 가라오케",
    href: "/ho-chi-minh/karaoke",
    subtitle: "호치민 1군 · 추천",
    image: "/vietdalbam/upload/d5f5262c71cd4c26a9468bad2c7b6276.thumbnail.webp",
    alt: "호치민 127 BB 가라오케",
  },
];

const clubItems: FeatureItem[] = [
  {
    title: "호치민 파함 라운지",
    href: "/ho-chi-minh/club/%ED%98%B8%EC%B9%98%EB%AF%BC-faham-lounge-%ED%8C%8C%ED%95%A8-1%EA%B5%B0-%ED%81%B4%EB%9F%BD-108",
    subtitle: "호치민 1군 · 유흥 추천",
    image: "/vietdalbam/upload/2f81324fc4b34fc7af721b4b52b5ff77.thumbnail.webp",
    alt: "Faham Lounge",
  },
  {
    title: "호치민 자이온 스카이 라운지",
    href: "/ho-chi-minh/club/%ED%98%B8%EC%B9%98%EB%AF%BC-zion-%EC%9E%90%EC%9D%B4%EC%98%A8-1%EA%B5%B0-%ED%81%B4%EB%9F%BD-%EB%A3%A8%ED%94%84%ED%83%91-%EC%8A%A4%EC%B9%B4%EC%9D%B4-94",
    subtitle: "호치민 1군 · 루프탑 라운지",
    image: "/vietdalbam/upload/33cec852fa3745dc88e83b7ab0159910.thumbnail.webp",
    alt: "ZION Sky Lounge",
  },
  {
    title: "호치민 롤라 클럽",
    href: "/ho-chi-minh/club/%ED%98%B8%EC%B9%98%EB%AF%BC-1%EA%B5%B0-%ED%81%B4%EB%9F%BD-%EC%B6%94%EC%B2%9C-lolla-%EB%A1%A4%EB%9D%BC-43",
    subtitle: "호치민 1군 · 클럽 추천",
    image: "/vietdalbam/upload/985b1176bdf7488a80d8b629566c925b.thumbnail.webp",
    alt: "LOLLA 클럽",
  },
  {
    title: "호치민 파워 클럽",
    href: "/ho-chi-minh/club/%ED%98%B8%EC%B9%98%EB%AF%BC-%ED%8C%8C%EC%9B%8C%ED%81%B4%EB%9F%BD-power-club-pub-%ED%97%8C-3332",
    subtitle: "호치민 1군 · 바 & 펍",
    image: "/vietdalbam/upload/4207662930d248239c90016eea2cf6da.thumbnail.webp",
    alt: "Power Club",
  },
  {
    title: "호치민 코코 클럽",
    href: "/ho-chi-minh/club/%ED%98%B8%EC%B9%98%EB%AF%BC-%EC%BD%94%EC%BD%94-%ED%81%B4%EB%9F%BD-coco-%EB%B6%80%EC%9D%B4%EB%B9%84%EC%97%94-%EC%97%AC%ED%96%89%EC%9E%90%EA%B1%B0%EB%A6%AC-591",
    subtitle: "호치민 1군 · 부이비엔 추천",
    image: "/vietdalbam/upload/75706a539b3e4601b6a37cd4e427fcd7.thumbnail.webp",
    alt: "호치민 코코 클럽",
  },
  {
    title: "클럽 제휴문의",
    href: "/ho-chi-minh/club",
    subtitle: "클럽 · 주점 · 바 · 라운지",
    image: "/vietdalbam/upload/0c34bed6b7dc42efa4bf54931ef6b5c9.thumbnail.webp",
    alt: "클럽 제휴문의",
  },
];

const restaurantItems: BoardItem[] = [
  {
    title: "호치민 7군 냐베 한식당 맛집 캠핑 R.B (camping r.b)",
    href: "/ho-chi-minh/restaurant/%ED%98%B8%EC%B9%98%EB%AF%BC-7%EA%B5%B0-%EB%83%90%EB%B2%A0-%ED%95%9C%EC%8B%9D%EB%8B%B9-%EB%A7%9B%EC%A7%91-%EC%BA%A0%ED%95%91-r-b-c-4640",
    image: "/vietdalbam/upload/fc667022c21d4b71b5292135bd7789a7.thumbnail.webp",
    alt: "호치민 7군 냐베 한식당 맛집 캠핑 R.B (camping r.b)",
  },
  {
    title: "호치민 7군 신규 고기집 추천 벽돌집(brickhouse)",
    href: "/ho-chi-minh/restaurant/%ED%98%B8%EC%B9%98%EB%AF%BC-7%EA%B5%B0-%EC%8B%A0%EA%B7%9C-%EA%B3%A0%EA%B8%B0%EC%A7%91-%EC%B6%94%EC%B2%9C-%EB%B2%BD%EB%8F%8C%EC%A7%91-bric-4567",
    image: "/vietdalbam/upload/b2ecab6b148649c0b1a168c7c8189962.thumbnail.webp",
    alt: "호치민 7군 신규 고기집 추천 벽돌집(brickhouse)",
  },
  {
    title: "호치민 1군 한남 BBQ 프리미엄 소고기 한우 식당",
    href: "/ho-chi-minh/restaurant/%ED%98%B8%EC%B9%98%EB%AF%BC-1%EA%B5%B0-%ED%95%9C%EB%82%A8-bbq-%ED%94%84%EB%A6%AC%EB%AF%B8%EC%97%84-%EC%86%8C%EA%B3%A0%EA%B8%B0-%ED%95%9C%EC%9A%B0-4448",
    image: "/vietdalbam/upload/28f72ae0028b4d18a0f85e472c38d7ef.thumbnail.webp",
    alt: "호치민 1군 한남 BBQ 프리미엄 소고기 한우 식당",
  },
  {
    title: "호치민 2군 타오디엔 감성 옛날 포차 | 쎄쎄쎄 포차 (CCC Korean Street Pub)",
    href: "/ho-chi-minh/restaurant/%ED%98%B8%EC%B9%98%EB%AF%BC-2%EA%B5%B0-%ED%83%80%EC%98%A4%EB%94%94%EC%97%94-%EA%B0%90%EC%84%B1-%EC%98%9B%EB%82%A0-%ED%8F%AC%EC%B0%A8-%EC%8E%84%EC%8E%84%EC%8E%84-4447",
    image: "/vietdalbam/upload/8bd8b6c71b854f8da53fcf149ed0c43e.thumbnail.webp",
    alt: "호치민 2군 타오디엔 감성 옛날 포차 | 쎄쎄쎄 포차 (CCC Korean Street Pub)",
  },
  {
    title: "호치민 2군 타오디엔 횟집 추천 | 한해구도씨 (Hanhae)",
    href: "/ho-chi-minh/restaurant/%ED%98%B8%EC%B9%98%EB%AF%BC-2%EA%B5%B0-%ED%83%80%EC%98%A4%EB%94%94%EC%97%94-%ED%9A%9F%EC%A7%91-%EC%B6%94%EC%B2%9C-%ED%95%9C%ED%95%B4%EA%B5%AC%EB%8F%84%EC%94%A8-h-4444",
    image: "/vietdalbam/upload/583cb14f0f6044f18b7661e5af0ef72f.thumbnail.webp",
    alt: "호치민 2군 타오디엔 횟집 추천 | 한해구도씨 (Hanhae)",
  },
  {
    title: "호치민 7군 푸미흥 맛집 핫플 | 은하수포차 (Eunhasu Pocha)",
    href: "/ho-chi-minh/restaurant/%ED%98%B8%EC%B9%98%EB%AF%BC-7%EA%B5%B0-%ED%91%B8%EB%AF%B8%ED%9D%A5-%EB%A7%9B%EC%A7%91-%ED%95%AB%ED%94%8C-%EC%9D%80%ED%95%98%EC%88%98%ED%8F%AC%EC%B0%A8-eu-4421",
    image: "/vietdalbam/upload/42a9c21f66244af5944f7a3b4032b2ea.thumbnail.webp",
    alt: "호치민 7군 푸미흥 맛집 핫플 | 은하수포차 (Eunhasu Pocha)",
  },
];

const barItems: BoardItem[] = [
  {
    title: "호치민 3군 프리미엄 바, BIS 바 라운지 소개",
    href: "/ho-chi-minh/bar/%ED%98%B8%EC%B9%98%EB%AF%BC-3%EA%B5%B0-%ED%94%84%EB%A6%AC%EB%AF%B8%EC%97%84-%EB%B0%94-bis-%EB%B0%94-%EB%9D%BC%EC%9A%B4%EC%A7%80-%EC%86%8C-4628",
    image: "/vietdalbam/upload/4eb427f41c694a1cbcb4ffb16d633681.thumbnail.webp",
    alt: "호치민 3군 프리미엄 바, BIS 바 라운지 소개",
  },
  {
    title: "호치민 1군 레탄톤 토킹바 캣워크 바",
    href: "/ho-chi-minh/bar/%ED%98%B8%EC%B9%98%EB%AF%BC-1%EA%B5%B0-%EB%A0%88%ED%83%84%ED%86%A4-%ED%86%A0%ED%82%B9%EB%B0%94-%EC%BA%A3%EC%9B%8C%ED%81%AC-%EB%B0%94-4596",
    image: "/vietdalbam/upload/f3ade87cd4d44f30ae10ce1c14ade1b2.thumbnail.webp",
    alt: "호치민 1군 레탄톤 토킹바 캣워크 바",
  },
  {
    title: "호치민 1군 레탄톤 착석 토킹바 추천 아이돌바 (IDOL Bar)",
    href: "/ho-chi-minh/bar/%ED%98%B8%EC%B9%98%EB%AF%BC-1%EA%B5%B0-%EB%A0%88%ED%83%84%ED%86%A4-%EC%B0%A9%EC%84%9D-%ED%86%A0%ED%82%B9%EB%B0%94-%EC%B6%94%EC%B2%9C-en-b-4427",
    image: "/vietdalbam/upload/7b59a9ddbfaa4321b6c2929e82ccaac6.thumbnail.webp",
    alt: "호치민 1군 레탄톤 착석 토킹바 추천 아이돌바 (IDOL Bar)",
  },
  {
    title: "호치민 부이비엔 근처 착석바 추천 오빠 바 (O bar)",
    href: "/ho-chi-minh/bar/%ED%98%B8%EC%B9%98%EB%AF%BC-1%EA%B5%B0-%EB%B6%80%EC%9D%B4%EB%B9%84%EC%97%94-%EC%97%AC%ED%96%89%EC%9E%90%EA%B1%B0%EB%A6%AC-%EC%B0%A9%EC%84%9D-%ED%86%A0%ED%82%B9%EB%B0%94-4649",
    image: "/vietdalbam/upload/a0c5a602c45b450eb6afc01212b466a9.thumbnail.webp",
    alt: "호치민 부이비엔 근처 착석바 추천 오빠 바 (O bar)",
  },
  {
    title: "호치민 레탄톤 바 추천 - 카티 바 (Kati Bar) (1군)",
    href: "/ho-chi-minh/bar/%ED%98%B8%EC%B9%98%EB%AF%BC-%EB%A0%88%ED%83%84%ED%86%A4-%EB%B0%94-%EC%B6%94%EC%B2%9C-%EC%B9%B4%ED%8B%B0-%EB%B0%94-kati-ba-2838",
    image: "/vietdalbam/upload/247521b8808d4394ba69e54a7083c63a.thumbnail.webp",
    alt: "호치민 레탄톤 바 추천 - 카티 바 (Kati Bar) (1군)",
  },
  {
    title: "호치민 레탄톤 바 추천 - 미유키 바 (Miyuki Bar) (1군)",
    href: "/ho-chi-minh/bar/%ED%98%B8%EC%B9%98%EB%AF%BC-%EB%A0%88%ED%83%84%ED%86%A4-%EB%B0%94-%EC%B6%94%EC%B2%9C-%EB%AF%B8%EC%9C%A0%ED%82%A4-%EB%B0%94-miyuki-2837",
    image: "/vietdalbam/upload/feabf065dca24efd8e2a91935442258b.thumbnail.webp",
    alt: "호치민 레탄톤 바 추천 - 미유키 바 (Miyuki Bar) (1군)",
  },
];

const accommodationItems: BoardItem[] = [
  {
    title: "[1룸] 빈홈 랜드마크 플러스 아파트",
    href: "/ho-chi-minh/accommodation/1%EB%A3%B8-%EB%B9%88%ED%99%88-%EB%9E%9C%EB%93%9C%EB%A7%88%ED%81%AC-%ED%94%8C%EB%9F%AC%EC%8A%A4-%EC%95%84%ED%8C%8C%ED%8A%B8-176",
    image: "/vietdalbam/upload/8ce8942fbedc4f1ebc97b67bdb4cd28a.thumbnail.webp",
    alt: "[1룸] 빈홈 랜드마크 플러스 아파트",
  },
  {
    title: "[2룸] 빈홈 랜드마크 플러스 아파트",
    href: "/ho-chi-minh/accommodation/2%EB%A3%B8-%EB%B9%88%ED%99%88-%EB%9E%9C%EB%93%9C%EB%A7%88%ED%81%AC-%ED%94%8C%EB%9F%AC%EC%8A%A4-%EC%95%84%ED%8C%8C%ED%8A%B8-180",
    image: "/vietdalbam/upload/04482dbe0734454da7c6ace13c710d67.thumbnail.webp",
    alt: "[2룸] 빈홈 랜드마크 플러스 아파트",
  },
  {
    title: "[1룸] 선라이즈 시티 (sunrise city) 아파트 (7군)",
    href: "/ho-chi-minh/accommodation/2%EB%A3%B8-%EC%84%A0%EB%9D%BC%EC%9D%B4%EC%A6%88-%EC%8B%9C%ED%8B%B0-sunrise-city-%EC%95%84%ED%8C%8C-218",
    image: "/vietdalbam/upload/def70496299f498999ca4ab006d59c49.thumbnail.webp",
    alt: "[1룸] 선라이즈 시티 (sunrise city) 아파트 (7군)",
  },
  {
    title: "선라이즈 시티뷰 아파트 가성비 좋은 원룸 스튜디오 타입 (7군)",
    href: "/ho-chi-minh/accommodation/%EC%84%A0%EB%9D%BC%EC%9D%B4%EC%A6%88-%EC%8B%9C%ED%8B%B0%EB%B7%B0-%EC%95%84%ED%8C%8C%ED%8A%B8-%EA%B0%80%EC%84%B1%EB%B9%84-%EC%A2%8B%EC%9D%80-%EC%9B%90%EB%A3%B8-%EC%8A%A4%ED%8A%9C-1792",
    image: "/vietdalbam/upload/19a9a20f8ce84b4096177ded2d4e1741.thumbnail.webp",
    alt: "선라이즈 시티뷰 아파트 가성비 좋은 원룸 스튜디오 타입 (7군)",
  },
  {
    title: "[3룸] 선라이즈 시티 (sunrise city) 아파트 (7군)",
    href: "/ho-chi-minh/accommodation/3%EB%A3%B8-%EC%84%A0%EB%9D%BC%EC%9D%B4%EC%A6%88-%EC%8B%9C%ED%8B%B0-sunrise-city-%EC%95%84%ED%8C%8C-219",
    image: "/vietdalbam/upload/fa28f7e4df38467d90ea10712bc96633.thumbnail.webp",
    alt: "[3룸] 선라이즈 시티 (sunrise city) 아파트 (7군)",
  },
  {
    title: "[3룸] 빈홈 랜드마크 플러스 아파트",
    href: "/ho-chi-minh/accommodation/2%EB%A3%B8-%EB%B9%88%ED%99%88-%EB%9E%9C%EB%93%9C%EB%A7%88%ED%81%AC-%ED%94%8C%EB%9F%AC%EC%8A%A4-%EC%95%84%ED%8C%8C%ED%8A%B8-180",
    image: "/vietdalbam/upload/942e79e56bba4a38a56ab16f983d399d.thumbnail.webp",
    alt: "[3룸] 빈홈 랜드마크 플러스 아파트",
  },
];

const golfItems: BoardItem[] = [
  {
    title: "호치민 투득 골프장 Vietnam Golf & Country Club",
    href: "/ho-chi-minh/golf/%ED%98%B8%EC%B9%98%EB%AF%BC-%ED%88%AC%EB%93%9D-%EA%B3%A8%ED%94%84%EC%9E%A5-vietnam-golf-c-2705",
    image: "/vietdalbam/upload/1eadff8a8ec941a982b6b44cdbf88f19.thumbnail.webp",
    alt: "호치민 투득 골프장 Vietnam Golf & Country Club",
  },
  {
    title: "호치민 트윈도브스 골프장 Twin Doves Golf Club",
    href: "/ho-chi-minh/golf/%ED%98%B8%EC%B9%98%EB%AF%BC-%ED%8A%B8%EC%9C%88%EB%8F%84%EB%B8%8C%EC%8A%A4-%EA%B3%A8%ED%94%84%EC%9E%A5-twin-doves-2704",
    image: "/vietdalbam/upload/187de9b21c804a8483a796bb04f571bf.thumbnail.webp",
    alt: "호치민 트윈도브스 골프장 Twin Doves Golf Club",
  },
  {
    title: "호치민 태광 정산 CC 골프장 Jeongsan Country Club",
    href: "/ho-chi-minh/golf/%ED%98%B8%EC%B9%98%EB%AF%BC-%ED%83%9C%EA%B4%91-%EC%A0%95%EC%82%B0-cc-%EA%B3%A8%ED%94%84%EC%9E%A5-jeongsan-2703",
    image: "/vietdalbam/upload/bdea66c480e54d28b77ae71e0680f365.thumbnail.webp",
    alt: "호치민 태광 정산 CC 골프장 Jeongsan Country Club",
  },
  {
    title: "베트남 호치민 롱탄 CC 골프장 Long Thanh Golf Club",
    href: "/ho-chi-minh/golf/%EB%B2%A0%ED%8A%B8%EB%82%A8-%ED%98%B8%EC%B9%98%EB%AF%BC-%EB%A1%B1%ED%83%84-cc-%EA%B3%A8%ED%94%84%EC%9E%A5-long-th-1990",
    image: "/vietdalbam/upload/0e1364bfa16d4da7858202c07a20fd39.thumbnail.webp",
    alt: "베트남 호치민 롱탄 CC 골프장 Long Thanh Golf Club",
  },
  {
    title: "베트남 호치민 떤선녓 골프장 Tan Son Nhat Golf Course",
    href: "/ho-chi-minh/golf/%EB%B2%A0%ED%8A%B8%EB%82%A8-%ED%98%B8%EC%B9%98%EB%AF%BC-%EB%96%A4%EC%84%A0%EB%85%93-%EA%B3%A8%ED%94%84%EC%9E%A5-tan-son-n-1989",
    image: "/vietdalbam/upload/12a3c7184911404eb658b87b0b9b863d.thumbnail.webp",
    alt: "베트남 호치민 떤선녓 골프장 Tan Son Nhat Golf Course",
  },
];

const salonItems: BoardItem[] = [
  {
    title: "호치민 VIP 럭셔리 이발소 시스템 및 예약 | 1인 1실 추천 (1군)",
    href: "/ho-chi-minh/salon/%ED%98%B8%EC%B9%98%EB%AF%BC-vip-%EB%9F%AD%EC%85%94%EB%A6%AC-%EC%9D%B4%EB%B0%9C%EC%86%8C-%EC%8B%9C%EC%8A%A4%ED%85%9C-%EB%B0%8F-%EC%98%88%EC%95%BD-4491",
    image: "/vietdalbam/upload/385378b977c04d2998b57e7b9865ed7d.thumbnail.webp",
    alt: "호치민 VIP 럭셔리 이발소 시스템 및 예약 | 1인 1실 추천 (1군)",
  },
  {
    title: "호치민 캣츠 이발소 (CATS barbershop) | 푸미흥 바버샵 (7군)",
    href: "/ho-chi-minh/salon/%ED%98%B8%EC%B9%98%EB%AF%BC-%EC%BA%A3%EC%B8%A0-%EC%9D%B4%EB%B0%9C%EC%86%8C-cats-barbersho-4463",
    image: "/vietdalbam/upload/ff16a4cea42d4a098a5d219dd1b60990.thumbnail.webp",
    alt: "호치민 캣츠 이발소 (CATS barbershop) | 푸미흥 바버샵 (7군)",
  },
  {
    title: "호치민 1군 Jade 007 (제이드 007) 이발소",
    href: "/ho-chi-minh/salon/%ED%98%B8%EC%B9%98%EB%AF%BC-1%EA%B5%B0-jade-007-%EC%A0%9C%EC%9D%B4%EB%93%9C-007-%EC%9D%B4%EB%B0%9C-275",
    image: "/vietdalbam/upload/597c418b535746b3a8a578cd6571a3f8.thumbnail.webp",
    alt: "호치민 1군 Jade 007 (제이드 007) 이발소",
  },
  {
    title: "호치민 7군 이발소 추천 '코스이발소' (COS 이발소)",
    href: "/ho-chi-minh/salon/%ED%98%B8%EC%B9%98%EB%AF%BC-7%EA%B5%B0-%EC%9D%B4%EB%B0%9C%EC%86%8C-%EC%B6%94%EC%B2%9C-%EC%BD%94%EC%8A%A4%EC%9D%B4%EB%B0%9C%EC%86%8C-cos-%EC%9D%B4-2523",
    image: "/vietdalbam/upload/f8f49812a2e14d689f8d0cd1cb56f52c.thumbnail.webp",
    alt: "호치민 7군 이발소 추천 '코스이발소' (COS 이발소)",
  },
  {
    title: "호치민 1군 보스 이발소 (BOSS barbershop) 추천 및 예약안내",
    href: "/ho-chi-minh/salon/%ED%98%B8%EC%B9%98%EB%AF%BC-1%EA%B5%B0-%EB%B3%B4%EC%8A%A4-%EC%9D%B4%EB%B0%9C%EC%86%8C-boss-barber-4505",
    image: "/vietdalbam/upload/20407089c4bc4ff2af8552528f48f632.thumbnail.webp",
    alt: "호치민 1군 보스 이발소 (BOSS barbershop) 추천 및 예약안내",
  },
  {
    title: "호치민 VIP 이발소 추천 | Vip Babershop (1군)",
    href: "/ho-chi-minh/salon/%ED%98%B8%EC%B9%98%EB%AF%BC-vip-%EC%9D%B4%EB%B0%9C%EC%86%8C-%EC%B6%94%EC%B2%9C-vip-babers-4490",
    image: "/vietdalbam/upload/60eb5dd5eb704e73b7b52f007122f74d.thumbnail.webp",
    alt: "호치민 VIP 이발소 추천 | Vip Babershop (1군)",
  },
];

const boardPanelSlides: BoardPanelConfig[][] = [
  [
    { title: "맛집🍜", href: "/ho-chi-minh/restaurant", items: restaurantItems },
    { title: "바&주점🍷", href: "/ho-chi-minh/bar", items: barItems },
  ],
  [
    { title: "숙소&풀빌라🏠", href: "/ho-chi-minh/accommodation", items: accommodationItems },
    { title: "골프⛳", href: "/ho-chi-minh/golf", items: golfItems },
  ],
  [
    { title: "이발소&미용실🪒", href: "/ho-chi-minh/salon", items: salonItems },
    { title: "맛집🍜", href: "/ho-chi-minh/restaurant", items: restaurantItems },
  ],
];

function chunkItems<T>(items: T[], size: number) {
  return items.reduce<T[][]>((chunks, item, index) => {
    if (index % size === 0) {
      chunks.push([item]);
    } else {
      chunks[chunks.length - 1]?.push(item);
    }
    return chunks;
  }, []);
}

function FeaturePanel({
  title,
  href,
  icon: Icon,
  items,
}: {
  title: string;
  href: string;
  icon: LucideIcon;
  items: FeatureItem[];
}) {
  const slides = useMemo(() => chunkItems(items, 2), [items]);
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    if (slides.length <= 1) {
      return;
    }

    const intervalId = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % slides.length);
    }, 3500);

    return () => window.clearInterval(intervalId);
  }, [slides.length]);

  useEffect(() => {
    setActiveSlide(0);
  }, [slides.length]);

  return (
    <section className="border border-white/10 bg-white/5 p-5 md:p-6 shadow-[rgba(0,0,0,0.18)_0px_24px_60px] backdrop-blur-sm">
      <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-4">
        <div className="flex items-center gap-3">
          <span className="grid size-10 place-items-center border border-accent/40 text-accent">
            <Icon className="size-4" aria-hidden="true" />
          </span>
          <div className="space-y-1">
            <p className="text-[10px] tracking-[0.4em] uppercase text-white/40">
              장소 추천
            </p>
            <h3 className="font-serif text-2xl md:text-3xl tracking-tight text-white">
              {title}
            </h3>
          </div>
        </div>

        <Link
          href={href}
          className="mt-1 inline-flex items-center gap-2 text-xs tracking-[0.28em] uppercase text-white/45 transition-colors hover:text-white"
        >
          더보기
          <ArrowUpRight className="size-4" aria-hidden="true" />
        </Link>
      </div>

      <div className="mt-5 overflow-hidden">
        <div
          className="flex transition-transform duration-700 ease-out"
          style={{ transform: `translateX(-${activeSlide * 100}%)` }}
        >
          {slides.map((slide, slideIndex) => (
            <div key={slideIndex} className="w-full shrink-0">
              <div className="grid gap-4 sm:grid-cols-2">
                {slide.map((item) => (
                  <Link key={item.title} href={item.href} className="group block space-y-3">
                    <div className="relative aspect-[4/3] overflow-hidden bg-black/20">
                      <Image
                        src={item.image}
                        alt={item.alt}
                        fill
                        unoptimized
                        priority={slideIndex === 0}
                        sizes="(min-width: 1280px) 220px, (min-width: 768px) 24vw, 42vw"
                        className="object-cover transition duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
                    </div>

                    <div className="space-y-1">
                      <p className="text-[10px] tracking-[0.32em] uppercase text-white/40">
                        호치민
                      </p>
                      <h4 className="text-sm leading-snug text-white md:text-[15px]">
                        {item.title}
                      </h4>
                      <p className="text-xs leading-relaxed text-white/60">
                        {item.subtitle}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 flex items-center justify-center gap-2">
        {slides.map((_, dotIndex) => (
          <button
            key={dotIndex}
            type="button"
            className={`h-2 rounded-full transition-all duration-300 ${
              activeSlide === dotIndex ? "w-8 bg-accent" : "w-2 bg-white/30"
            }`}
            aria-label={`${title} 슬라이드 ${dotIndex + 1}`}
            onClick={() => setActiveSlide(dotIndex)}
          />
        ))}
      </div>
    </section>
  );
}

function BoardPanel({
  title,
  href,
  items,
}: {
  title: string;
  href: string;
  items: BoardItem[];
}) {
  return (
    <section className="border border-white/10 bg-white/5 p-5 md:p-6 shadow-[rgba(0,0,0,0.18)_0px_24px_60px] backdrop-blur-sm">
      <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-4">
        <div className="space-y-1">
          <p className="text-[10px] tracking-[0.4em] uppercase text-white/40">
            추천 섹션
          </p>
          <h3 className="font-serif text-2xl md:text-3xl tracking-tight text-white">
            {title}
          </h3>
        </div>

        <Link
          href={href}
          className="inline-flex items-center gap-2 text-xs tracking-[0.28em] uppercase text-white/45 transition-colors hover:text-white"
        >
          더보기
          <ArrowUpRight className="size-4" aria-hidden="true" />
        </Link>
      </div>

      <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item, index) => (
          <Link key={`${item.href}-${item.title}-${index}`} href={item.href} className="group space-y-3">
            <div className="relative aspect-[4/3] overflow-hidden bg-black/20">
              <Image
                src={item.image}
                alt={item.alt}
                fill
                unoptimized
                sizes="(min-width: 1280px) 220px, (min-width: 768px) 24vw, 42vw"
                className="object-cover transition duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
            </div>

            <div className="space-y-1">
              <p className="text-[10px] tracking-[0.32em] uppercase text-white/40">
                호치민
              </p>
              <h4 className="text-sm leading-snug text-white md:text-[15px]">
                {item.title}
              </h4>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

function BoardPanelCarousel({ slides }: { slides: BoardPanelConfig[][] }) {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    if (slides.length <= 1) {
      return;
    }

    const intervalId = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % slides.length);
    }, 10000);

    return () => window.clearInterval(intervalId);
  }, [slides.length]);

  return (
    <div className="mt-10">
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-700 ease-out"
          style={{ transform: `translateX(-${activeSlide * 100}%)` }}
        >
          {slides.map((slide, slideIndex) => (
            <div key={slideIndex} className="w-full shrink-0">
              <div className="grid gap-6 lg:grid-cols-2">
                {slide.map((panel) => (
                  <BoardPanel
                    key={panel.title}
                    title={panel.title}
                    href={panel.href}
                    items={panel.items}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 flex items-center justify-center gap-2">
        {slides.map((_, dotIndex) => (
          <button
            key={dotIndex}
            type="button"
            className={`h-2 rounded-full transition-all duration-300 ${
              activeSlide === dotIndex ? "w-8 bg-accent" : "w-2 bg-white/30"
            }`}
            aria-label={`추천 섹션 슬라이드 ${dotIndex + 1}`}
            onClick={() => setActiveSlide(dotIndex)}
          />
        ))}
      </div>
    </div>
  );
}

export function Heritage() {
  return (
    <section
      id="heritage"
      className="overflow-hidden bg-primary py-24 text-primary-foreground md:py-32"
    >
      <div className="mx-auto max-w-[1800px] px-6 md:px-12">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-24">
          {/* Left - Content */}
          <div className="space-y-8 lg:pr-12">
            <div className="space-y-4">
              <p className="text-sm tracking-[0.3em] uppercase text-primary-foreground/60">
                베트남 여행 가이드
              </p>
              <h2 className="cartoon-section-title font-serif text-4xl leading-[1.1] tracking-tight md:text-5xl lg:text-6xl">
                베트남
                <span className="block italic text-accent">Moonlight 추천</span>
                여행 가이드
              </h2>
            </div>

            <p className="max-w-lg text-lg leading-relaxed text-primary-foreground/70">
              저희는 베트남 전역의 유용한 여행 정보를 한곳에 모았습니다.
              가라오케, 클럽, 맛집, 바, 숙소, 풀빌라, 골프장, 이발소까지
              빠르게 참고하실 수 있습니다.
            </p>

            <div className="grid grid-cols-3 gap-8 border-y border-primary-foreground/20 py-8">
              <div>
                <p className="font-serif text-4xl text-accent md:text-5xl">베트남</p>
                <p className="mt-1 text-sm text-primary-foreground/60">전국</p>
              </div>
              <div>
                <p className="font-serif text-4xl text-accent md:text-5xl">2026</p>
                <p className="mt-1 text-sm text-primary-foreground/60">업데이트</p>
              </div>
              <div>
                <p className="font-serif text-4xl text-accent md:text-5xl">7+</p>
                <p className="mt-1 text-sm text-primary-foreground/60">콘텐츠</p>
              </div>
            </div>

            <Link
              href="/ho-chi-minh/karaoke"
              className="inline-flex min-h-12 items-center justify-center gap-3 border border-primary-foreground px-8 py-4 text-sm uppercase tracking-[0.2em] text-primary-foreground transition-all duration-300 hover:bg-primary-foreground hover:text-primary"
            >
              자세히 보기
            </Link>
          </div>

          {/* Right - Panels */}
          <div className="grid gap-6 xl:grid-cols-2">
            <FeaturePanel title="가라오케" href="/ho-chi-minh/karaoke" icon={Mic2} items={karaokeItems} />
            <FeaturePanel title="클럽" href="/ho-chi-minh/club" icon={Music2} items={clubItems} />
          </div>
        </div>

        <BoardPanelCarousel slides={boardPanelSlides} />
      </div>
    </section>
  );
}
