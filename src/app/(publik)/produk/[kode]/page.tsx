import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowLeft, MessageCircle, Star } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import StatusBadge from "@/components/StatusBadge";
import { MOCK_PRODUCTS } from "@/lib/mock-products";
import {
  KATEGORI_OPTIONS,
  WHATSAPP_ADMIN,
  formatRupiah,
  waLink,
} from "@/lib/constants";
import type { Product } from "@/lib/types";

// TODO Step 5+: ganti dengan query Supabase (`products` by kode) setelah Step 2.
const produkByKode = (kode: string) =>
  MOCK_PRODUCTS.find((p) => p.kode.toLowerCase() === kode.toLowerCase());

const labelKategori = (kategori: string) =>
  KATEGORI_OPTIONS.find((o) => o.value === kategori)?.label ?? kategori;

// Produk mirip: kategori sama & masih TERSEDIA, maksimal 4 (Figma 829:550)
function produkMirip(produk: Product): Product[] {
  const sesama = MOCK_PRODUCTS.filter(
    (p) =>
      p.kode !== produk.kode &&
      p.status === "TERSEDIA" &&
      p.kategori === produk.kategori
  );
  if (sesama.length >= 4) return sesama.slice(0, 4);
  const lainnya = MOCK_PRODUCTS.filter(
    (p) =>
      p.kode !== produk.kode &&
      p.status === "TERSEDIA" &&
      !sesama.some((s) => s.kode === p.kode)
  );
  return [...sesama, ...lainnya].slice(0, 4);
}

export function generateStaticParams() {
  return MOCK_PRODUCTS.map((p) => ({ kode: p.kode }));
}

export function generateMetadata({
  params,
}: {
  params: { kode: string };
}): Metadata {
  const produk = produkByKode(params.kode);
  return { title: produk ? `${produk.nama} — Batik Okra` : "Motif tidak ditemukan" };
}

export default function DetailProduk({ params }: { params: { kode: string } }) {
  const produk = produkByKode(params.kode);
  if (!produk) notFound();

  const terjual = produk.status === "TERJUAL";
  const pesan = `Halo, saya tertarik dengan motif ${produk.nama} (${produk.kode}).`;
  const mirip = produkMirip(produk);

  return (
    <div className="mx-auto w-full max-w-[1440px]">
      {/* Top Bar */}
      <div className="flex items-center justify-between gap-4 px-6 pt-6 md:px-[60px]">
        <p className="text-[13px] tracking-[1px] text-[#8a8a8a]">
          <Link href="/" className="hover:text-black">
            Beranda
          </Link>{" "}
          /{" "}
          <Link href="/katalog" className="hover:text-black">
            Katalog
          </Link>{" "}
          / <span className="text-black">{produk.nama}</span>
        </p>
        <Link
          href="/katalog"
          className="flex items-center gap-[6px] text-[13px] text-[#333] hover:text-black"
        >
          <ArrowLeft size={14} />
          Kembali ke katalog
        </Link>
      </div>

      {/* Product Main */}
      <section className="flex flex-col gap-8 px-6 py-8 md:flex-row md:items-start md:gap-[48px] md:px-[60px]">
        <div className="h-[320px] w-full overflow-hidden rounded-[3px] bg-[#d9d9de] sm:h-[420px] md:h-[560px] md:w-[560px] md:shrink-0">
          {produk.image_url ? (
            // shortcut: <img> karena domain Supabase Storage belum terdaftar di next.config; lihat ProductCard.
            // eslint-disable-next-line @next/next/no-img-element -- lihat shortcut di atas
            <img
              src={produk.image_url}
              alt={produk.nama}
              className={`h-full w-full object-cover ${terjual ? "opacity-55" : ""}`}
            />
          ) : null}
        </div>

        <div className="flex min-w-0 flex-1 flex-col gap-5">
          <h1 className="text-[28px] font-bold tracking-[1px] text-black">
            {produk.nama.toUpperCase()}
          </h1>

          <div className="flex items-center gap-3">
            <p className="text-[13px] text-[#8a8a8a]">Kode: {produk.kode}</p>
            <StatusBadge status={produk.status} />
          </div>

          <p className="text-[24px] font-bold text-black">
            {formatRupiah(produk.harga)}
          </p>

          {terjual ? (
            <div className="flex flex-col gap-2 rounded-[3px] bg-[#f2f2f2] p-5">
              <p className="text-[15px] font-semibold text-[#333]">
                Produk ini sudah terjual.
              </p>
              <Link href="/katalog" className="text-[13px] font-medium text-black hover:underline">
                Lihat motif yang masih tersedia →
              </Link>
            </div>
          ) : null}

          <div className="h-px w-full bg-[#e0e0e0]" />

          {produk.deskripsi ? (
            <p className="text-[15px] leading-[1.7] text-[#333]">{produk.deskripsi}</p>
          ) : null}

          <div className="flex flex-col gap-3">
            <div className="flex flex-wrap items-center gap-[10px]">
              <span className="text-[13px] text-[#8a8a8a]">Kategori:</span>
              <span className="rounded-[2px] border border-[#e0e0e0] px-3 py-[5px] text-[12px] text-[#333]">
                {labelKategori(produk.kategori)}
              </span>
            </div>
            {produk.warna && produk.warna.length > 0 ? (
              <div className="flex flex-wrap items-center gap-[10px]">
                <span className="text-[13px] text-[#8a8a8a]">Warna:</span>
                {produk.warna.map((w) => (
                  <span
                    key={w}
                    className="rounded-[2px] border border-[#e0e0e0] px-3 py-[5px] text-[12px] capitalize text-[#333]"
                  >
                    {w}
                  </span>
                ))}
              </div>
            ) : null}
            {produk.pola ? (
              <div className="flex flex-wrap items-center gap-[10px]">
                <span className="text-[13px] text-[#8a8a8a]">Pola:</span>
                <span className="rounded-[2px] border border-[#e0e0e0] px-3 py-[5px] text-[12px] text-[#333]">
                  {produk.pola}
                </span>
              </div>
            ) : null}
          </div>

          <div className="h-px w-full bg-[#e0e0e0]" />

          <p className="flex items-center gap-2 text-[14px] font-semibold text-black">
            <Star size={16} />
            Motif eksklusif: hanya tersedia 1 buah.
          </p>

          <div className="flex flex-col gap-3">
            <a
              href={waLink(WHATSAPP_ADMIN, pesan)}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center justify-center gap-2 rounded-[2px] py-[14px] text-[12px] font-semibold tracking-[2px] ${
                terjual
                  ? "border border-[#e0e0e0] bg-white text-[#8a8a8a]"
                  : "bg-black text-white"
              }`}
            >
              <MessageCircle size={16} />
              HUBUNGI VIA WHATSAPP
            </a>
            <a
              href="https://instagram.com/batik_okra_surabaya"
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center justify-center gap-2 rounded-[2px] py-[14px] text-[12px] font-semibold tracking-[2px] ${
                terjual
                  ? "border border-[#e0e0e0] bg-white text-[#8a8a8a]"
                  : "border border-[#e0e0e0] bg-white text-black"
              }`}
            >
              <img src="/assets/instagram.svg" alt="" className="h-4 w-4" />
              DM VIA INSTAGRAM
            </a>
          </div>

          <p className="text-[12px] leading-[1.6] text-[#8a8a8a]">
            Transaksi dilakukan langsung dengan pengelola melalui chat. Tidak ada pembayaran di
            website ini.
          </p>
        </div>
      </section>

      {/* Produk Mirip */}
      {mirip.length > 0 ? (
        <section className="flex flex-col gap-6 px-6 pb-[60px] md:px-[60px]">
          <p className="text-[20px] font-bold tracking-[2px] text-black">MOTIF MIRIP</p>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {mirip.map((p) => (
              <ProductCard key={p.kode} product={p} showWa />
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}
