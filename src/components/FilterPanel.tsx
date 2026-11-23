"use client";

import type { ReactNode } from "react";
import { Check, Search, X } from "lucide-react";
import {
  ASAL_OPTIONS,
  KATEGORI_OPTIONS,
  WARNA_OPTIONS,
} from "@/lib/constants";
import type { KatalogFilter } from "@/lib/filter-products";

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`flex-1 rounded-[2px] border px-2 py-2 text-[11px] tracking-[1px] ${
        active
          ? "border-black font-bold text-black"
          : "border-[#e0e0e0] font-medium text-[#333]"
      }`}
    >
      {children}
    </button>
  );
}

function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <p className="text-[11px] font-semibold tracking-[2px] text-black">{children}</p>
  );
}

export default function FilterPanel({
  filters,
  patch,
  onReset,
}: {
  filters: KatalogFilter;
  patch: (p: Partial<KatalogFilter>) => void;
  onReset: () => void;
}) {
  const toggle = (key: "warna" | "asal", value: string) => {
    const current = filters[key];
    patch({
      [key]: current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value],
    });
  };

  return (
    <aside className="flex w-full flex-col gap-6 rounded-[3px] border border-[#e0e0e0] p-6 md:w-[280px] md:shrink-0">
      <div className="relative">
        <Search
          size={16}
          className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#8a8a8a]"
        />
        <input
          value={filters.search}
          onChange={(e) => patch({ search: e.target.value })}
          placeholder="Cari nama motif..."
          aria-label="Cari nama motif"
          className="w-full rounded-[3px] border border-[#e0e0e0] py-[10px] pl-9 pr-8 text-[13px] text-black placeholder:text-[#8a8a8a]"
        />
        {filters.search ? (
          <button
            type="button"
            onClick={() => patch({ search: "" })}
            aria-label="Hapus kata kunci"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8a8a8a] hover:text-black"
          >
            <X size={14} />
          </button>
        ) : null}
      </div>

      <div className="h-px w-full bg-[#e0e0e0]" />

      <div className="flex flex-col gap-[10px]">
        <SectionLabel>KETERSEDIAAN</SectionLabel>
        <div className="flex gap-2">
          {(
            [
              ["SEMUA", "Semua"],
              ["TERSEDIA", "Tersedia"],
              ["TERJUAL", "Terjual"],
            ] as const
          ).map(([value, label]) => (
            <Chip
              key={value}
              active={filters.status === value}
              onClick={() => patch({ status: value })}
            >
              {label}
            </Chip>
          ))}
        </div>
      </div>

      <div className="h-px w-full bg-[#e0e0e0]" />

      <div className="flex flex-col gap-[10px]">
        <SectionLabel>KATEGORI MOTIF</SectionLabel>
        <div className="grid grid-cols-2 gap-2">
          {KATEGORI_OPTIONS.map((opt) => (
            <Chip
              key={opt.value}
              active={filters.kategori === opt.value}
              onClick={() =>
                patch({
                  kategori: filters.kategori === opt.value ? null : opt.value,
                })
              }
            >
              {opt.label}
            </Chip>
          ))}
        </div>
      </div>

      <div className="h-px w-full bg-[#e0e0e0]" />

      <div className="flex flex-col gap-[10px]">
        <SectionLabel>WARNA</SectionLabel>
        <div className="flex gap-2">
          {WARNA_OPTIONS.map((opt) => {
            const active = filters.warna.includes(opt.value);
            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => toggle("warna", opt.value)}
                aria-pressed={active}
                aria-label={`Warna ${opt.value}`}
                title={opt.value}
                style={{ backgroundColor: opt.hex }}
                className={`size-[22px] shrink-0 rounded-full ${
                  active ? "ring-2 ring-black ring-offset-2" : ""
                } ${opt.value === "abu" ? "border border-[#c9c9c9]" : ""}`}
              />
            );
          })}
        </div>
      </div>

      <div className="h-px w-full bg-[#e0e0e0]" />

      <div className="flex flex-col gap-[10px]">
        <SectionLabel>ASAL DAERAH</SectionLabel>
        {ASAL_OPTIONS.map((asal) => {
          const active = filters.asal.includes(asal);
          return (
            <button
              key={asal}
              type="button"
              onClick={() => toggle("asal", asal)}
              aria-pressed={active}
              className="flex items-center gap-2 text-left text-[13px] text-[#333]"
            >
              <span
                className={`flex size-4 shrink-0 items-center justify-center rounded-[2px] border ${
                  active
                    ? "border-black bg-black text-white"
                    : "border-[#e0e0e0] bg-white"
                }`}
              >
                {active ? <Check size={10} strokeWidth={3} /> : null}
              </span>
              {asal}
            </button>
          );
        })}
      </div>

      <div className="h-px w-full bg-[#e0e0e0]" />

      <div className="flex flex-col gap-[10px]">
        <SectionLabel>HARGA</SectionLabel>
        <div className="flex items-center gap-2">
          <input
            value={filters.hargaMin}
            onChange={(e) => patch({ hargaMin: e.target.value.replace(/\D/g, "") })}
            inputMode="numeric"
            placeholder="Rp 0"
            aria-label="Harga minimum"
            className="w-full min-w-0 rounded-[2px] border border-[#e0e0e0] px-[10px] py-2 text-[12px] text-black placeholder:text-[#8a8a8a]"
          />
          {/* shortcut: range harga pakai dua input teks, bukan slider; upgrade ke slider saat filter Supabase server-side */}
          <span className="text-[12px] text-[#8a8a8a]">–</span>
          <input
            value={filters.hargaMax}
            onChange={(e) => patch({ hargaMax: e.target.value.replace(/\D/g, "") })}
            inputMode="numeric"
            placeholder="Rp 500.000"
            aria-label="Harga maksimum"
            className="w-full min-w-0 rounded-[2px] border border-[#e0e0e0] px-[10px] py-2 text-[12px] text-black placeholder:text-[#8a8a8a]"
          />
        </div>
      </div>

      <div className="h-px w-full bg-[#e0e0e0]" />

      <button
        type="button"
        onClick={onReset}
        className="text-left text-[11px] font-semibold tracking-[1px] text-black hover:underline"
      >
        Reset Filter
      </button>
    </aside>
  );
}
