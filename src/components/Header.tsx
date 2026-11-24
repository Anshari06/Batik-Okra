"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

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
  const [terbuka, setTerbuka] = useState(false);

  // Menu mobile ditutup tiap pindah halaman
  useEffect(() => {
    setTerbuka(false);
  }, [pathname]);

  return (
    <header className="w-full bg-white px-6 py-4 md:px-[60px]">
      <div className="flex items-center justify-between">
        <Link href="/" className="flex items-center gap-[10px]">
          {/* eslint-disable-next-line @next/next/no-img-element -- SVG lokal, next/image menolak SVG */}
          <img src="/assets/logomark.svg" alt="" width={30} height={30} className="h-[30px] w-[30px]" />
          <span className="text-[14px] font-extrabold tracking-[1px] text-black">
            BATIK OKRA SURABAYA
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={`text-[12px] tracking-[2px] ${
                isActive(item.href, pathname) ? "font-bold text-black" : "font-medium text-[#333]"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/kunjungi"
          className="hidden rounded-[2px] bg-black px-6 py-[10px] text-[11px] font-semibold tracking-[2px] text-white md:block"
        >
          HUBUNGI
        </Link>

        <button
          type="button"
          onClick={() => setTerbuka((v) => !v)}
          aria-label={terbuka ? "Tutup menu" : "Buka menu"}
          aria-expanded={terbuka}
          className="p-1 text-black md:hidden"
        >
          {terbuka ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {terbuka ? (
        <nav className="mt-4 flex flex-col gap-4 border-t border-[#e0e0e0] pt-4 md:hidden">
          {NAV.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={`text-[12px] tracking-[2px] ${
                isActive(item.href, pathname) ? "font-bold text-black" : "font-medium text-[#333]"
              }`}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/kunjungi"
            className="mt-1 rounded-[2px] bg-black px-6 py-[10px] text-center text-[11px] font-semibold tracking-[2px] text-white"
          >
            HUBUNGI
          </Link>
        </nav>
      ) : null}
    </header>
  );
}
