# Panduan Pengerjaan — Batik Okra (Frontend)

Stack: **Next.js 14 (App Router) + React 18 + TypeScript strict + Tailwind CSS 3 + Supabase**
Deploy: Vercel · Backend data: Supabase (PostgreSQL + Auth + Storage + Realtime)
Sumber kebenaran: `BRD_Katalog_Batik_Okra.md`, `PRD_Katalog_Batik_Okra.md`, `project-context.md`.

---

## Fase 0 — Setup (Sprint 0)

### Step 1 — Scaffold project
```bash
npx create-next-app@14 . --typescript --tailwind --eslint --app --import-alias "@/*" --use-npm
```
- Pastikan `tsconfig.json` → `"strict": true`
- Buat `.env.local`:
  ```
  NEXT_PUBLIC_SUPABASE_URL=...
  NEXT_PUBLIC_SUPABASE_ANON_KEY=...
  ```
- `.env.local` tidak boleh masuk git (sudah otomatis di `.gitignore`)
- Struktur folder:
  ```
  src/app/            route: beranda, katalog, produk/[kode], kunjungi, login, admin/*
  src/components/     header, footer, product-card, status-badge, chat-widget, ...
  src/lib/            supabase.ts, constants.ts
  ```

### Step 2 — Supabase: project + tabel + RLS
- Buat project di supabase.com
- Tabel `products`: id, kode (unik), nama, kategori, warna, pola, asal, harga, status (enum), deskripsi, image_url, created_at
- Tabel `messages`: untuk chat
- RLS: publik hanya SELECT products; INSERT/UPDATE hanya admin
- Seed 10–15 produk dari design

---

## Fase 1 — Fondasi Komponen

### Step 3 — Konstanta & komponen dasar
- `lib/constants.ts`: `ProductStatus`, label badge, warna badge, nomor WhatsApp admin
  (aturan dokumen: label & warna status terpusat di satu konstanta)
- `components/`: Header, Footer, StatusBadge, ProductCard, TanyaButton
- Ikon: `lucide-react`

---

## Fase 2 — Halaman Publik (FR-03, FR-06)

### Step 4 — Beranda (frame 829:19) → `/`
Hero, cerita, value strip, 4 langkah proses, CTA, kategori, grid tile, Motif Terbaru (4 produk terbaru), Kunjungi Kami, footer.

### Step 5 — Katalog (frame 829:246) → `/katalog`
- Filter: search, ketersediaan, kategori, warna, asal, harga, reset
- Grid + Load More + sort
- Empty states (829:1201, 829:1249) wajib
- Produk TERJUAL tetap tampil dengan badge

### Step 6 — Detail produk (829:550 & 829:700) → `/produk/[kode]`
- Satu halaman, badge otomatis TERSEDIA/TERJUAL
- Tombol WA: `https://wa.me/62xxx?text=...` berisi nama motif (FR-06)
- Produk mirip: kategori sama, status TERSEDIA

### Step 7 — Kunjungi (829:845) → `/kunjungi` + tombol chat mengambang

---

## Fase 3 — Realtime (FR-02/FR-03)

### Step 8 — Supabase Realtime
- Subscribe `postgres_changes` tabel `products`
- Ubah status oleh admin → badge katalog publik berubah tanpa reload (≤5 detik)

---

## Fase 4 — Admin (FR-01, FR-02)

### Step 9 — Login admin (829:1355) → `/login`
Supabase Auth, proteksi semua `/admin/*`, redirect ke `/login`.

### Step 10 — Dashboard (829:1433) → `/admin`
Statistik Total/Tersedia/Terjual dari count query (bukan hardcode).

### Step 11 — Kelola produk (829:1478 + empty 829:1593) → `/admin/produk`
- Tombol Tandai Terjual / Tandai Tersedia (dua arah)
- Wajib dialog konfirmasi sebelum ubah status (FR-02)

### Step 12 — Form Tambah Produk + AI Description (FR-01)
- Form: foto, nama motif, harga
- Foto → Edge Function `ai-describe` → tampilkan deskripsi untuk diedit/dikonfirmasi
- Fallback: AI gagal/timeout >10 detik → isi manual
- Simpan dengan status awal TERSEDIA

---

## Fase 5 — Chatbot (FR-04, FR-05)

### Step 13 — UI Chat (829:990)
- Widget chat Bahasa Indonesia
- Pertanyaan → Edge Function `chatbot` → jawaban + link rekomendasi `/produk/[kode]`
- Pesan penolakan sopan untuk pertanyaan di luar scope
- Unit test: scope-check & matching rekomendasi (di Edge Function)

---

## Fase 6 — Kualitas & Rilis

### Step 14 — Verifikasi
- Bandingkan tiap halaman dengan Figma
- Responsif mobile, browser modern
- Cek: produk terjual tetap tampil, konfirmasi status, empty states, fallback AI, tidak ada API key di client

### Step 15 — Deploy Vercel
- Push ke GitHub → import di Vercel → set env vars
- Domain deploy → Supabase Authentication → Redirect URLs
- UAT vs acceptance criteria FR-01…FR-06

---

## Aturan yang tidak boleh dilanggar (dari project-context.md)
- 1 motif = 1 produk; status hanya TERSEDIA / TERJUAL
- Produk terjual tidak disembunyikan
- Semua teks UI Bahasa Indonesia
- API key AI hanya di server (Edge Function)
- Tidak ada payment gateway
- Komponen badge reusable, label/warna terpusat

## Kontrak API (untuk backend/Edge Function)
| Endpoint | Input | Output |
|---|---|---|
| `ai-describe` | foto produk | `{ deskripsi, motif, warna, pola, keyakinan }` |
| `chatbot` | `{ pertanyaan }` | `{ jawaban, rekomendasi: [{kode, nama, link}] }` |
