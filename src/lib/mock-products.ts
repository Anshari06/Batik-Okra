import type { Product } from "./types";

// TODO Step 5: ganti query Supabase (sementara untuk Step 4 — Beranda).
// Tidak ada env Supabase sampai Step 2 selesai, jadi 4 produk ini disalin dari kartu
// "Motif Terbaru" di Figma supaya ProductCard & badge TERJUAL terbukti jalan.
export const MOCK_PRODUCTS: Product[] = [
  {
    kode: "BTK-0001",
    nama: "Parang Okra",
    kategori: "parang",
    harga: 250000,
    status: "TERSEDIA",
    image_url: "/assets/logomark.svg",
  },
  {
    kode: "BTK-0002",
    nama: "Kawung Coklat",
    kategori: "kawung",
    harga: 280000,
    status: "TERJUAL",
    image_url: "/assets/logomark.svg",
  },
  {
    kode: "BTK-0003",
    nama: "Mega Mendung",
    kategori: "mega-mendung",
    harga: 320000,
    status: "TERSEDIA",
    image_url: "/assets/logomark.svg",
  },
  {
    kode: "BTK-0007",
    nama: "Parang Okra Merah",
    kategori: "parang",
    harga: 300000,
    status: "TERSEDIA",
    image_url: "/assets/logomark.svg",
  },
];
