export interface NavChild {
  label: string;
  href: string;
}

export interface NavGroup {
  label: string;
  href: string;
  children: NavChild[];
}

export interface BoardCard {
  title: string;
  href: string;
  image: string;
  alt: string;
}

export interface BoardSection {
  title: string;
  href: string;
  moreLabel: string;
  cards: BoardCard[];
  desktopColumns: string;
  mobileColumns: string;
}

export interface QuickLink {
  href: string;
  image: string;
  alt: string;
}

export interface MassagePost {
  title: string;
  href: string;
  image: string;
  alt: string;
  date: string;
  notice?: boolean;
  imageCount?: number;
}

export type AccommodationPost = MassagePost;

export interface FilterPill {
  label: string;
  href: string;
  active?: boolean;
}
