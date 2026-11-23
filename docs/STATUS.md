# Status Pengerjaan — Batik Okra

Terakhir diperbarui: **2026-11-23** oleh Fachriditya (frontend)

Legenda: ✅ selesai · 🟡 sedang dikerjakan · ⬜ belum mulai · ⛔ terblokir

## Frontend (Fachriditya)

| # | Step | Status | Tanggal | Catatan |
|---|---|---|---|---|
| 1 | Scaffold Next.js 14 + TS + Tailwind | ✅ | 2026-11-23 | App Router, `src/`, alias `@/*` |
| 2 | Project Supabase + tabel + RLS + seed | ⬜ | | menunggu partner |
| 3 | Konstanta & komponen dasar | ✅ | 2026-11-23 | `constants.ts`, `supabase.ts`, `types.ts`, Header/Footer/StatusBadge/ProductCard/TanyaButton, font Inter, route group `(publik)` |
| 4 | Beranda | ✅ | 2026-11-23 | 9 section Figma; produk dari `mock-products.ts` (TODO Step 5); gambar memakai foto asli sejak Step 5 |
| 5 | Katalog + filter + empty state | ✅ | 2026-11-23 | Filter search/ketersediaan/kategori/warna/asal/harga + reset, sort Terbaru/Harga, Load More, 2 empty state; data masih `mock-products.ts` (20 produk) |
| 6 | Detail produk (TERSEDIA/TERJUAL) | ✅ | 2026-11-24 | `/produk/[kode]` statis 20 kode; badge otomatis, gambar `opacity-55` + Sold Banner saat TERJUAL, tombol WA berisi nama+kode, Motif Mirip maks 4 |
| 7 | Kunjungi + tombol chat | ⬜ | | |
| 8 | Realtime status produk | ⬜ | | butuh Step 2 selesai |
| 9 | Login admin | ⬜ | | |
| 10 | Dashboard admin | ⬜ | | |
| 11 | Kelola produk (toggle status + konfirmasi) | ⬜ | | |
| 12 | Form tambah produk + AI description | ⬜ | | butuh `ai-describe` dari partner |
| 13 | UI chatbot | ⬜ | | butuh `chatbot` dari partner |
| 14 | Verifikasi visual & fungsional | ⬜ | | |
| 15 | Deploy Vercel + UAT | ⬜ | | |

## Backend (partner)

| # | Item | Status | Tanggal | Catatan |
|---|---|---|---|---|
| B1 | Supabase project, tabel `products`, RLS, Realtime, Storage | ⬜ | | SQL ada di `PANDUAN_PENGERJAAN.md` Step 2 |
| B2 | Seed data produk | ⬜ | | 10–15 produk |
| B3 | Edge Function `ai-describe` (AI Vision) | ⬜ | | kontrak: foto → `{ deskripsi, motif, warna, pola, keyakinan }` |
| B4 | Edge Function `chatbot` (scoped + recommender) | ⬜ | | kontrak: `{ pertanyaan }` → `{ jawaban, rekomendasi[] }` |
| B5 | Unit test scope-check & recommender | ⬜ | | wajib per `docs/project-context.md` |

## Butuh dari partner

- (kosong)

## Kendala / Catatan

- Design Figma hanya desktop; adaptasi mobile dibuat di sisi frontend.
- Nomor WhatsApp admin masih placeholder di `src/lib/constants.ts`.

## Riwayat

| Tanggal | Perubahan |
|---|---|
| 2026-11-24 | Step 6: halaman `/produk/[kode]` (detail TERSEDIA & TERJUAL, produk mirip) + deskripsi/pola di `mock-products.ts` |
| 2026-11-23 | Step 5: halaman `/katalog` (filter, sort, Load More, empty search & empty filter) + `mock-products.ts` jadi 20 produk berfoto asli; Beranda mengambil 4 motif terbaru |
| 2026-11-23 | Step 4: Beranda (9 section) memakai `mock-products.ts` — ProductCard & badge TERJUAL terbukti jalan |
| 2026-11-23 | Step 3: konstanta status/WA + client Supabase + 5 komponen dasar (Header, Footer, StatusBadge, ProductCard, TanyaButton) + font Inter + route group `(publik)` |
| 2026-11-23 | Scaffold project + repo terhubung GitHub; dokumen acuan dipindah ke `docs/` |
