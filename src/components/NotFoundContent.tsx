import Link from "next/link";
import { SearchX } from "lucide-react";

// Isi 404 dipakai dua boundary: di dalam (publik) dan root (route tak dikenal)
export default function NotFoundContent({ produk = false }: { produk?: boolean }) {
  return (
    <div className="mx-auto flex w-full max-w-[1440px] flex-1 flex-col items-center justify-center gap-6 px-6 py-24 text-center md:px-[60px]">
      <SearchX size={48} className="text-[#e0e0e0]" />
      <p className="text-[20px] font-bold tracking-[4px] text-black">HALAMAN TIDAK DITEMUKAN</p>
      <p className="max-w-[420px] text-[15px] leading-[1.6] text-[#8a8a8a]">
        {produk
          ? "Motif yang Anda cari tidak tersedia. Mungkin sudah terjual atau alamatnya salah."
          : "Halaman yang Anda cari tidak tersedia. Mungkin alamatnya salah atau sudah dipindahkan."}
      </p>
      <div className="flex flex-wrap items-center justify-center gap-4">
        <Link
          href="/katalog"
          className="rounded-[2px] bg-black px-7 py-[14px] text-[12px] font-semibold tracking-[2px] text-white"
        >
          LIHAT KATALOG
        </Link>
        <Link
          href="/"
          className="rounded-[2px] border border-[#e0e0e0] px-7 py-[14px] text-[12px] font-semibold tracking-[2px] text-black"
        >
          KE BERANDA
        </Link>
      </div>
    </div>
  );
}
