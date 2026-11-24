---
project_name: 'Website Katalog Digital Cerdas Berbasis AI — Kampung Batik Okra Surabaya'
user_name: 'Anshari Shidqi'
date: '2026-09-23'
sections_completed: ['technology_stack', 'domain_rules', 'language_rules', 'framework_rules', 'testing_rules', 'quality_rules', 'workflow_rules', 'anti_patterns']
status: 'complete'
rule_count: 36
optimized_for_llm: true
---

# Project Context for AI Agents

_This file contains critical rules and patterns that AI agents must follow when implementing code in this project. Focus on unobvious details that agents might otherwise miss._

> **Sumber kebenaran (source of truth):** [BRD](BRD_Katalog_Batik_Okra.md) · [PRD](PRD_Katalog_Batik_Okra.md). Baca keduanya sebelum menulis kode.

---

## Technology Stack & Versions

⚠️ **Belum ada kode yang diimplementasikan.** Stack berikut adalah **rekomendasi awal** yang disesuaikan dengan kebutuhan BRD/PRD. Konfirmasikan sebelum implementasi.

| Layer | Teknologi | Versi | Catatan |
|---|---|---|---|
| Frontend | Next.js (App Router) | 14.x | SSR/SSG untuk katalog |
| Frontend | React | 18.x | |
| Styling | Tailwind CSS | 3.x | Responsif desktop/mobile |
| Bahasa | TypeScript | 5.x | `strict: true` wajib |
| Backend | Next.js Route Handlers | 14.x | Satu repo fullstack |
| Database | PostgreSQL (Prisma ORM) | 16.x | |
| Realtime | Supabase Realtime / SSE | — | Status stok ≤ 5 detik |
| AI Vision | Google Cloud Vision / OpenAI Vision | — | Deteksi motif (FR-01) |
| Chatbot | OpenAI / Gemini + RAG | — | Scoped chatbot (FR-04/05) |
| Auth | NextAuth.js / Supabase Auth | — | Login Admin |
| Storage | Supabase Storage / Cloudinary | — | Foto produk |
| Deploy | Vercel | — | HTTPS wajib |

---

## Critical Implementation Rules

### Domain & Business Rules (WAJIB — paling penting)

Aturan bisnis ini tidak boleh dilanggar karena merupakan inti nilai produk:

- **1 motif = 1 produk.** Model eksklusif; TIDAK ada kuantitas/inventori multi-unit.
- **Status produk hanya dua nilai** enum: `TERSEDIA` dan `TERJUAL`. Admin bisa toggle dua arah (tandai terjual / tandai tersedia).
- **Status awal produk baru = `TERSEDIA`.**
- **Produk `TERJUAL` tetap terlihat** di katalog dengan badge jelas — jangan pernah menyembunyikan/menghapus produk terjual.
- **Real-time ≤ 5 detik.** Perubahan status Admin harus tampil di katalog publik tanpa reload (FR-02, NFR 5.1).
- **Chatbot strictly scoped.** Hanya jawab: katalog, stok, motif. Tolak sopan di luar scope (FR-04).
- **No hallucination.** Chatbot WAJIB menjawab dari data katalog aktual (query DB), bukan mengarang. Data tidak ada → sampaikan "tidak ditemukan".
- **TIDAK ADA payment gateway.** Transaksi keuangan dilarang di sistem. Checkout = redirect ke WhatsApp Admin (FR-06).
- **API key AI tidak boleh terekspos ke frontend.** Semua panggilan AI Vision & chatbot lewat backend (server-side).

### Language-Specific Rules (TypeScript)

- `strict: true` wajib di `tsconfig.json`.
- Gunakan `enum ProductStatus { TERSEDIA, TERJUAL }` — jangan string bebas.
- `async/await` saja; hindari callback nested.
- Bungkus semua panggilan AI dalam try/catch + fallback (lihat anti-pattern).

### Framework-Specific Rules (Next.js / React)

- Gunakan **App Router** (`app/`), bukan Pages Router.
- Server Components untuk fetching katalog; Client Components hanya untuk interaktivitas (filter, search, chatbot).
- Komponen reusable `StatusBadge` untuk badge Tersedia/Terjual.
- Panggilan AI jangan dilakukan langsung dari client — selalu lewat route handler.

### Testing Rules

- Unit test untuk logika **scope-check chatbot** dan **smart recommender** (matching atribut motif).
- Integration test untuk flow real-time Admin → Publik.
- Test wajib: produk `TERJUAL` memunculkan rekomendasi; produk `TERSEDIA` tidak.
- Test wajib: fallback AI (deteksi gagal → input manual).

### Code Quality & Style Rules

- File: `kebab-case.tsx`; nama komponen `PascalCase`.
- Label & warna status terpusat di satu konstanta — jangan hardcode di banyak tempat.
- Semua teks UI dalam **Bahasa Indonesia**.
- Pesan error (terutama chatbot) informatif & sopan.

### Development Workflow Rules

- Satu repo (single Next.js app).
- Env variabel (API key, DB URL, nomor WhatsApp) hanya di `.env*`, jangan di-commit.
- Nomor WhatsApp Admin terpusat di satu konstanta/env.

### Critical Don't-Miss Rules (Anti-pattern & Edge Case)

- ❌ Jangan hardcode API key AI di client (NFR 5.2).
- ❌ Jangan proses pembayaran / simpan data kartu (out-of-scope).
- ❌ Jangan biarkan chatbot menjawab di luar scope (politik, kesehatan, dll).
- ❌ Jangan izinkan duplikat motif yang sama sebagai produk baru (1 motif = 1 produk).
- ⚠️ Edge case: motif dicari tidak ditemukan → pesan informatif (FR-03 AC).
- ⚠️ Edge case: tidak ada rekomendasi serupa tersedia → chatbot bilang belum ada alternatif (FR-05 AC).
- ⚠️ Edge case: deteksi AI Vision gagal/timeout (> 10 detik) → fallback input manual (FR-01 AC, NFR 5.3).
- ⚠️ Edge case: wajib konfirmasi sebelum ubah status (cegah salah klik) (FR-02 AC).

---

## Usage Guidelines

**For AI Agents:**
- Baca file ini + BRD + PRD sebelum implementasi.
- Ikuti SEMUA aturan di atas persis.
- Jika ragu, pilih opsi yang lebih ketat/membatasi.
- Update file ini jika muncul pola baru.

**For Humans:**
- Jaga file ini ringkas dan fokus kebutuhan agen.
- Update saat tech stack berubah atau terkonfirmasi.
- Review berkala untuk hapus aturan yang sudah usang.

Last Updated: 2026-09-23
