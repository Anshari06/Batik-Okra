"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV = [
  { label: "BERANDA", href: "/" },
  { label: "TENTANG", href: "/#tentang" },
  { label: "KATALOG", href: "/katalog" },
  { label: "KUNJUNGI", href: "/kunjungi" },
];

// Anchor (#) tidak pernah jadi nav aktif
function isActive(href: string, pathname: string) {
  if (href.includes("#")) return false;
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="flex w-full items-center justify-between bg-white px-6 py-4 md:px-[60px]">
      <Link href="/" className="flex items-center gap-[10px]">
        {/* eslint-disable-next-line @next/next/no-img-element -- SVG lokal, next/image menolak SVG */}
        <img src="/assets/logomark.svg" alt="" width={30} height={30} className="h-[30px] w-[30px]" />
        <span className="text-[16px] font-extrabold tracking-[1px] text-black">
          BATIK OKRA SURABAYA
        </span>
      </Link>

      <nav className="hidden items-center gap-8 md:flex">
        {NAV.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className={`text-[14px] tracking-[2px] ${
              isActive(item.href, pathname) ? "font-bold text-black" : "font-medium text-[#333]"
            }`}
          >
            {item.label}
          </Link>
        ))}
      </nav>

      <Link
        href="/kunjungi"
        className="rounded-[2px] bg-black px-6 py-[10px] text-[13px] font-semibold tracking-[2px] text-white"
      >
        HUBUNGI
      </Link>
    </header>
  );
}
