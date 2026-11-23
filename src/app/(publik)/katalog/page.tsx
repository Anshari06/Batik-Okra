"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ListFilter, SearchX } from "lucide-react";
import FilterPanel from "@/components/FilterPanel";
import ProductCard from "@/components/ProductCard";
import {
  EMPTY_FILTER,
  filterProducts,
  type KatalogFilter,
} from "@/lib/filter-products";
import { MOCK_PRODUCTS } from "@/lib/mock-products";

const PAGE_SIZE = 12;
// Saran kata kunci di empty state search — sama dengan frame Figma 829:1201
const SARAN_KATA_KUNCI = ["Parang", "Kawung", "Mega Mendung", "Truntum"];

export default function KatalogPage() {
  const [filters, setFilters] = useState<KatalogFilter>(EMPTY_FILTER);
  const [sort, setSort] = useState<"terbaru" | "harga">("terbaru");
  const [shown, setShown] = useState(PAGE_SIZE);

  const patch = (p: Partial<KatalogFilter>) => {
    setFilters((f) => ({ ...f, ...p }));
    setShown(PAGE_SIZE);
  };

  const reset = () => patch(EMPTY_FILTER);

  const filtered = useMemo(
    () => filterProducts(MOCK_PRODUCTS, filters, sort),
    [filters, sort]
  );

  const visible = filtered.slice(0, shown);
  const kataKunci = filters.search.trim();
  const adaFilterLain =
    filters.status !== "SEMUA" ||
    filters.kategori !== null ||
    filters.warna.length > 0 ||
    filters.asal.length > 0 ||
    Boolean(filters.hargaMin) ||
    Boolean(filters.hargaMax);

  return (
    <div className="mx-auto w-full max-w-[1440px]">
      <div className="flex flex-col gap-2 px-6 pt-8 md:px-[60px]">
        <p className="text-[12px] tracking-[1px] text-[#8a8a8a]">
          <Link href="/" className="hover:text-black">
            Beranda
          </Link>{" "}
          / Katalog
        </p>
        <h1 className="text-[28px] font-bold tracking-[4px] text-black">
          KATALOG BATIK EKSKLUSIF
        </h1>
        <p className="text-[15px] text-[#333]">
          Setiap motif hanya satu. Cek ketersediaannya di sini.
        </p>
      </div>

      <div className="flex flex-col gap-8 px-6 pb-[60px] pt-8 md:flex-row md:items-start md:px-[60px]">
        <FilterPanel filters={filters} patch={patch} onReset={reset} />

        <div className="min-w-0 flex-1">
          {filtered.length > 0 ? (
            <>
              <div className="flex flex-wrap items-center justify-between gap-2 text-[13px]">
                <p className="text-[#8a8a8a]">
                  Menampilkan {visible.length} dari {filtered.length} motif
                </p>
                <div className="flex items-center gap-3">
                  <span className="text-[#8a8a8a]">Urutkan:</span>
                  <button
                    type="button"
                    onClick={() => setSort("terbaru")}
                    aria-pressed={sort === "terbaru"}
                    className={
                      sort === "terbaru"
                        ? "font-bold text-black"
                        : "text-[#8a8a8a] hover:text-black"
                    }
                  >
                    Terbaru
                  </button>
                  <span className="text-[#8a8a8a]">/</span>
                  <button
                    type="button"
                    onClick={() => setSort("harga")}
                    aria-pressed={sort === "harga"}
                    className={
                      sort === "harga"
                        ? "font-bold text-black"
                        : "text-[#8a8a8a] hover:text-black"
                    }
                  >
                    Harga
                  </button>
                </div>
              </div>

              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
                {visible.map((produk) => (
                  <ProductCard key={produk.kode} product={produk} showWa />
                ))}
              </div>

              {filtered.length > shown ? (
                <div className="flex justify-center pb-10 pt-5">
                  <button
                    type="button"
                    onClick={() => setShown((n) => n + PAGE_SIZE)}
                    className="rounded-[2px] border border-[#e0e0e0] px-10 py-[14px] text-[12px] font-semibold tracking-[2px] text-black hover:border-black"
                  >
                    MUAT LEBIH BANYAK
                  </button>
                </div>
              ) : null}
            </>
          ) : kataKunci ? (
            <div className="flex flex-col items-center justify-center gap-6 py-20 text-center">
              <SearchX size={48} strokeWidth={1} className="text-[#8a8a8a]" />
              <p className="text-[18px] font-semibold text-black">
                Motif &quot;{kataKunci}&quot; tidak ditemukan.
              </p>
              <div className="flex flex-col items-center gap-4">
                <p className="text-[14px] text-[#8a8a8a]">Coba kata kunci lain:</p>
                <div className="flex flex-wrap justify-center gap-2">
                  {SARAN_KATA_KUNCI.map((saran) => (
                    <button
                      key={saran}
                      type="button"
                      onClick={() => patch({ search: saran })}
                      className="rounded-[20px] border border-[#e0e0e0] px-4 py-2 text-[12px] text-[#333] hover:border-black"
                    >
                      {saran}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center gap-5 py-20 text-center">
              <ListFilter size={48} strokeWidth={1} className="text-[#8a8a8a]" />
              <p className="text-[18px] font-semibold text-black">
                Tidak ada produk dengan status ini.
              </p>
              {adaFilterLain ? (
                <button
                  type="button"
                  onClick={reset}
                  className="rounded-[2px] border border-[#e0e0e0] px-7 py-3 text-[12px] font-semibold tracking-[2px] text-black hover:border-black"
                >
                  RESET FILTER
                </button>
              ) : null}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
