import type { ProductStatus } from "./constants";
import type { Product } from "./types";

export type SortOrder = "terbaru" | "harga";

export type KatalogFilter = {
  search: string;
  status: "SEMUA" | ProductStatus;
  kategori: string | null;
  warna: string[];
  asal: string[];
  hargaMin: string;
  hargaMax: string;
};

export const EMPTY_FILTER: KatalogFilter = {
  search: "",
  status: "SEMUA",
  kategori: null,
  warna: [],
  asal: [],
  hargaMin: "",
  hargaMax: "",
};

// Filter di sisi klien sampai Step 2 (Supabase) selesai; pindah ke query server-side nanti.
export function filterProducts(
  list: Product[],
  filters: KatalogFilter,
  sort: SortOrder
): Product[] {
  const q = filters.search.trim().toLowerCase();
  const min = filters.hargaMin ? Number(filters.hargaMin) : 0;
  const max = filters.hargaMax ? Number(filters.hargaMax) : Infinity;

  const hasil = list.filter(
    (p) =>
      (!q || p.nama.toLowerCase().includes(q)) &&
      (filters.status === "SEMUA" || p.status === filters.status) &&
      (!filters.kategori || p.kategori === filters.kategori) &&
      (filters.warna.length === 0 ||
        (p.warna ?? []).some((w) => filters.warna.includes(w))) &&
      (filters.asal.length === 0 ||
        (p.asal !== null && p.asal !== undefined && filters.asal.includes(p.asal))) &&
      p.harga >= min &&
      p.harga <= max
  );

  return sort === "harga" ? [...hasil].sort((a, b) => a.harga - b.harga) : hasil;
}
