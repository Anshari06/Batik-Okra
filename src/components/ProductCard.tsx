import Link from "next/link";
import { MessageCircle } from "lucide-react";
import StatusBadge from "@/components/StatusBadge";
import {
  WHATSAPP_ADMIN,
  formatRupiah,
  waLink,
} from "@/lib/constants";
import type { Product } from "@/lib/types";

export default function ProductCard({
  product,
  showWa = false,
  imageHeight = 280,
}: {
  product: Product;
  showWa?: boolean;
  imageHeight?: number;
}) {
  const terjual = product.status === "TERJUAL";
  const pesan = `Halo, saya tertarik dengan motif ${product.nama} (${product.kode}).`;

  return (
    <div className="flex flex-col">
      <Link
        href={`/produk/${product.kode}`}
        className="relative block overflow-hidden rounded-[3px] bg-[#d9d9de]"
        style={{ height: imageHeight }}
      >
        {product.image_url ? (
          // shortcut: <img> karena domain Supabase Storage belum didaftarkan di next.config;
          // ganti ke next/image + images.remotePatterns setelah Step 2.
          // eslint-disable-next-line @next/next/no-img-element -- lihat shortcut di atas
          <img
            src={product.image_url}
            alt={product.nama}
            className={`h-full w-full object-cover ${terjual ? "opacity-55" : ""}`}
          />
        ) : null}
        <span className="absolute right-[10px] top-[10px]">
          <StatusBadge status={product.status} />
        </span>
      </Link>

      <div className="flex flex-col gap-[4px] py-[10px]">
        <p className="text-[16px] font-medium text-[#333]">{product.nama}</p>
        <div className="flex items-center justify-between">
          <p className="text-[16px] font-bold text-black">{formatRupiah(product.harga)}</p>
          <p className="text-[13px] text-[#8a8a8a]">{product.kode}</p>
        </div>
      </div>

      {showWa ? (
        <a
          href={waLink(WHATSAPP_ADMIN, pesan)}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-[6px] rounded-[2px] py-[10px] text-[14px] font-semibold tracking-[2px] text-black"
        >
          <MessageCircle size={14} />
          HUBUNGI VIA WHATSAPP
        </a>
      ) : null}
    </div>
  );
}
