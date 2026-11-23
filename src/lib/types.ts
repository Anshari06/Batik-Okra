import type { ProductStatus } from "./constants";

// Bentuk baris tabel `products` — lihat PANDUAN_PENGERJAAN.md Step 2
export interface Product {
  id?: string;
  kode: string;
  nama: string;
  kategori: string;
  warna?: string[];
  pola?: string | null;
  asal?: string | null;
  harga: number;
  status: ProductStatus;
  deskripsi?: string | null;
  image_url?: string | null;
  created_at?: string;
}
