# Panduan Pengerjaan — Batik Okra (Frontend)

## Info Proyek

| | |
|---|---|
| Repo | https://github.com/Anshari06/Batik-Okra |
| Figma | https://www.figma.com/design/Bpjx1K40jcNB39p072tySl/TS-DESIGN — page **batikokra** (`829:12`), section Desktop Public |
| Dokumen acuan | `docs/BRD_Katalog_Batik_Okra.md`, `docs/PRD_Katalog_Batik_Okra.md`, `docs/project-context.md` |
| Peran | Frontend: Anshari Shidqi (semua tampilan + koneksi Supabase). Backend AI: partner (Edge Functions `ai-describe`, `chatbot`) |
| Progress | [`STATUS.md`](STATUS.md) — update setiap step selesai |
| Stack | Next.js 14 (App Router) + React 18 + TypeScript strict + Tailwind CSS 3 + Supabase |
| Deploy | Vercel |
| Bahasa UI | Bahasa Indonesia |

**Keputusan stack:** Supabase menggantikan "PostgreSQL + Prisma" di `project-context.md` — Supabase tetap PostgreSQL, tapi tidak butuh server/ORM sendiri. Edge Functions dipakai agar API key AI tidak pernah sampai ke browser.

## Kolaborasi (repo dipakai bersama)

| Area | PIC | File/folder |
|---|---|---|
| UI publik + admin | Anshari Shidqi (frontend) | `src/app`, `src/components`, `src/lib` |
| Edge Functions AI (`ai-describe`, `chatbot`) | Backend partner | `supabase/functions/**` |
| Skema DB & RLS | Backend partner | `supabase/migrations/**` |

Aturan main:
- **Update `docs/STATUS.md`** setiap menyelesaikan step (centang + tanggal), agar partner tahu progres tanpa bertanya.
- Jangan mengubah file milik area lain. Kalau perlu perubahan di sisi lain, tulis di `docs/STATUS.md` bagian "Butuh dari partner".
- `.env.local` masing-masing; jangan pernah commit secret.
- Format commit: `feat: ...`, `fix: ...`, `docs: ...`, `chore: ...`.
- Kontrak API di bagian bawah dokumen ini adalah kesepakatan bersama; kalau berubah, perbarui dulu tabelnya.


## Status Saat Ini

- [x] Step 1 — Scaffold Next.js 14 + TS + Tailwind (App Router, `src/`, alias `@/*`), repo ter-push
- [ ] Step 2 — Project Supabase + tabel + RLS + seed
- [x] Step 3 — Konstanta & komponen dasar
- [x] Step 4 — Beranda
- [x] Step 5 — Katalog
- [x] Step 6 — Detail produk
- [x] Step 7 - Kunjungi + tombol chat
- [ ] Step 8 — Realtime status
- [ ] Step 9 — Login admin
- [ ] Step 10 — Dashboard admin
- [ ] Step 11 — Kelola produk (toggle status)
- [ ] Step 12 — Form tambah produk + AI description
- [ ] Step 13 — UI chatbot
- [ ] Step 14 — Verifikasi visual & fungsional
- [ ] Step 15 — Deploy Vercel + UAT

## Env

`.env.local` (tidak di-commit; sudah masuk `.gitignore` sebagai `.env*.local`):

```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

Nomor WhatsApp admin **tidak** di env frontend — simpan di `src/lib/constants.ts`.

---

## Fase 0 — Setup

### Step 2 — Supabase: project + tabel + RLS

Tabel `products`:

| Kolom | Tipe | Catatan |
|---|---|---|
| id | uuid | PK, default `gen_random_uuid()` |
| kode | text | unik, dipakai di URL `/produk/[kode]` |
| nama | text | nama motif |
| kategori | text | parang, kawung, mega-mendung, truntum, sogan, kontemporer |
| warna | text[] | untuk filter warna |
| pola | text | geometris / organik / dll |
| asal | text | Surabaya, Cirebon, Pekalongan, Yogyakarta, Solo |
| harga | integer | rupiah, tanpa desimal |
| status | text | `TERSEDIA` / `TERJUAL` (check constraint) |
| deskripsi | text | |
| image_url | text | Supabase Storage |
| created_at | timestamptz | default `now()` |

```sql
create table products (
  id uuid primary key default gen_random_uuid(),
  kode text unique not null,
  nama text not null,
  kategori text not null,
  warna text[] not null default '{}',
  pola text,
  asal text,
  harga integer not null,
  status text not null default 'TERSEDIA' check (status in ('TERSEDIA','TERJUAL')),
  deskripsi text,
  image_url text,
  created_at timestamptz not null default now()
);

alter table products enable row level security;

-- publik hanya boleh membaca
create policy "public read products" on products for select using (true);

-- hanya admin (user login) yang boleh menulis
create policy "admin write products" on products for all
  to authenticated using (true) with check (true);
```

- Aktifkan **Realtime** untuk tabel `products` (Database → Replication)
- Buat 1 akun admin di Authentication → Users
- Buat bucket Storage `produk` (public read)
- Seed 10–15 produk memakai foto dari Figma

---

## Fase 1 — Fondasi Komponen

### Step 3 — Konstanta & komponen dasar
- `src/lib/constants.ts`: `ProductStatus`, `STATUS_LABEL`, `STATUS_STYLE` (warna badge), `WHATSAPP_ADMIN`
- `src/lib/supabase.ts`: client `createClient(url, anonKey)`
- Komponen: `Header`, `Footer`, `StatusBadge`, `ProductCard`, `TanyaButton`
- Ikon: `lucide-react` (design memakai ikon lucide)

---

## Fase 2 — Halaman Publik (FR-03, FR-06)

Peta frame Figma → route:

| Frame | ID | Route |
|---|---|---|
| Beranda | `829:19` | `/` |
| Katalog | `829:246` | `/katalog` |
| Detail: Parang Okra (Tersedia) | `829:550` | `/produk/[kode]` |
| Detail: Kawung Biru (Terjual) | `829:700` | `/produk/[kode]` (state TERJUAL) |
| Kunjungi | `829:845` | `/kunjungi` |
| Chat: Main Conversation | `829:990` | widget chat |
| State: Empty Search | `829:1201` | state di `/katalog` |
| State: Empty Filter | `829:1249` | state di `/katalog` |
| Admin Login | `829:1355` | `/login` |
| Admin Dashboard | `829:1433` | `/admin` |
| Admin Kelola Produk | `829:1478` | `/admin/produk` |
| Admin Kelola: Empty | `829:1593` | state di `/admin/produk` |

### Step 4 — Beranda → `/`
Hero, cerita, value strip, 4 langkah proses, CTA, kategori, grid tile, Motif Terbaru (4 produk terbaru), Kunjungi Kami, footer.

### Step 5 — Katalog → `/katalog`
Filter: search, ketersediaan, kategori, warna, asal, harga, reset. Grid + Load More + sort. Wajib ada empty state. Produk TERJUAL tetap tampil dengan badge.

### Step 6 — Detail produk → `/produk/[kode]`
Badge otomatis dari `status`. Tombol WA: `https://wa.me/<nomor>?text=...` berisi nama motif + kode. Produk mirip: kategori sama, status TERSEDIA, maksimal 4.

### Step 7 — Kunjungi → `/kunjungi`
Alamat, jam buka, kontak, peta. Tombol chat mengambang global.

---

## Fase 3 — Realtime (FR-02/FR-03)

### Step 8 — Supabase Realtime
Subscribe `postgres_changes` pada `products`; saat admin mengubah status, badge katalog publik berubah tanpa reload (≤5 detik). Uji dulu dengan update manual via SQL.

---

## Fase 4 — Admin (FR-01, FR-02)

### Step 9 — Login admin → `/login`
Supabase Auth (email + password). Semua `/admin/*` diproteksi; belum login → redirect `/login`.

### Step 10 — Dashboard → `/admin`
Statistik Total / Tersedia / Terjual dari count query (bukan hardcode).

### Step 11 — Kelola produk → `/admin/produk`
Daftar produk + tombol "Tandai Terjual" / "Tandai Tersedia" (dua arah). Wajib dialog konfirmasi sebelum mengubah status. Ada empty state.

### Step 12 — Form Tambah Produk + AI Description (FR-01)
Form: foto, nama motif, harga → kirim foto ke Edge Function `ai-describe` → tampilkan deskripsi untuk diedit/dikonfirmasi → simpan dengan status awal TERSEDIA. Fallback: AI gagal atau >10 detik → isi deskripsi manual.

---

## Fase 5 — Chatbot (FR-04, FR-05)

### Step 13 — UI Chat
Widget chat Bahasa Indonesia. Pertanyaan dikirim ke Edge Function `chatbot`; jawaban + link rekomendasi `/produk/[kode]`. Pertanyaan di luar scope → pesan penolakan sopan. Unit test untuk scope-check & matching rekomendasi (di Edge Function).

---

## Fase 6 — Kualitas & Rilis

### Step 14 — Verifikasi
Bandingkan tiap halaman dengan Figma; cek responsif mobile dan browser modern; cek produk terjual tetap tampil, dialog konfirmasi status, empty states, fallback AI, dan tidak ada API key di client.

### Step 15 — Deploy Vercel
Push ke GitHub → import di Vercel → set env vars → tambahkan domain deploy ke Supabase Authentication → Redirect URLs → UAT vs acceptance criteria FR-01…FR-06.

---

## Aturan yang tidak boleh dilanggar (dari project-context.md)
- 1 motif = 1 produk; status hanya TERSEDIA / TERJUAL
- Produk terjual tidak disembunyikan
- Semua teks UI Bahasa Indonesia
- API key AI hanya di server (Edge Function)
- Tidak ada payment gateway
- Komponen badge reusable, label/warna terpusat di satu konstanta

## Kontrak API (untuk backend/Edge Function)
| Endpoint | Input | Output |
|---|---|---|
| `ai-describe` | foto produk | `{ deskripsi, motif, warna, pola, keyakinan }` |
| `chatbot` | `{ pertanyaan }` | `{ jawaban, rekomendasi: [{kode, nama, link}] }` |
