import Link from "next/link";
import { ALAMAT, WHATSAPP_ADMIN_DISPLAY } from "@/lib/constants";

const TAUTAN = [
  { label: "Beranda", href: "/" },
  { label: "Katalog", href: "/katalog" },
  { label: "Tentang", href: "/#tentang" },
  { label: "Kunjungi", href: "/kunjungi" },
];

export default function Footer() {
  return (
    <footer className="flex flex-col gap-10 bg-[#f2f2f2] px-6 py-12 md:flex-row md:gap-[60px] md:px-[60px] md:py-[48px]">
      <div className="flex flex-1 flex-col gap-3">
        <p className="text-[14px] font-bold tracking-[3px] text-black">BATIK OKRA SURABAYA</p>
        <p className="w-[280px] max-w-full text-[13px] leading-[1.5] text-[#8a8a8a]">
          Kampung wisata kerajinan batik eksklusif di Surabaya, Indonesia.
        </p>
      </div>

      <div className="flex flex-1 flex-col gap-[10px]">
        <p className="text-[11px] font-semibold tracking-[2px] text-black">TAUTAN</p>
        {TAUTAN.map((item) => (
          <Link key={item.label} href={item.href} className="text-[13px] text-[#8a8a8a]">
            {item.label}
          </Link>
        ))}
      </div>

      <div className="flex flex-1 flex-col gap-[10px]">
        <p className="text-[11px] font-semibold tracking-[2px] text-black">HUBUNGI</p>
        <p className="text-[13px] text-[#8a8a8a]">WhatsApp: {WHATSAPP_ADMIN_DISPLAY}</p>
        <p className="text-[13px] text-[#8a8a8a]">Instagram: @batik_okra_surabaya</p>
        <p className="w-[260px] max-w-full text-[13px] leading-[1.4] text-[#8a8a8a]">{ALAMAT}</p>
      </div>

      <div className="flex flex-1 flex-col justify-end gap-[10px] text-[#8a8a8a]">
        <p className="text-[13px]">Kebijakan Privasi</p>
        <p className="text-[12px]">© 2024 Batik Okra Surabaya</p>
      </div>
    </footer>
  );
}
