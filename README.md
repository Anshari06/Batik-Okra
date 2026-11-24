# Batik Okra — Website Katalog Digital

Katalog digital produk eksklusif Kampung Batik Okra Surabaya (1 motif = 1 produk).
Next.js 14 (App Router) + TypeScript + Tailwind CSS + Supabase · deploy Vercel.

---

## ⚠️ WAJIB DIBACA SEBELUM KERJA

> **Urutan baca (jangan dilewat):**
> 1. **`docs/STATUS.md`** — cek progres terkini & siapa mengerjakan apa
> 2. **`docs/PANDUAN_PENGERJAAN.md`** — rencana kerja, skema DB, peta Figma → route
> 3. **`docs/project-context.md`** — aturan teknis & domain (1 motif = 1 produk, status hanya TERSEDIA/TERJUAL, teks UI Bahasa Indonesia)
> 4. **`docs/PRD_Katalog_Batik_Okra.md`** — kebutuhan fungsional (FR-01…FR-06)
> 5. **`docs/BRD_Katalog_Batik_Okra.md`** — konteks bisnis (baca kalau perlu latar belakang)

**Jangan menulis kode sebelum membaca poin 1–3.** Aturan di `project-context.md` tidak boleh dilanggar.

---

## 🤝 Alur Kerja Tim (frontend ↔ backend)

| Area | Siapa | Folder yang boleh diubah |
|---|---|---|
| UI publik + admin | Anshari Shidqi (frontend) | `src/app`, `src/components`, `src/lib` |
| Edge Functions AI | Backend partner | `supabase/functions/**` |
| Skema DB & RLS | Backend partner | `supabase/migrations/**` |

**Aturan:**
- ✅ **Setiap selesai satu step → perbarui `docs/STATUS.md`** (centang + tanggal), agar partner tahu progres tanpa bertanya
- ✅ Jangan mengubah file milik area lain. Butuh perubahan di sisi lain? Tulis di `docs/STATUS.md` bagian **"Butuh dari partner"**
- ✅ `.env.local` masing-masing — **jangan pernah commit secret**
- ✅ Kontrak API (tabel di akhir `PANDUAN_PENGERJAAN.md`) adalah kesepakatan bersama; kalau berubah, perbarui dulu tabelnya

---

## 🌿 Membuat Branch & Mengirim Perubahan (PR)

```bash
# 1. selalu mulai dari main yang terbaru
git checkout main
git pull

# 2. buat branch kerja (format: feat/fix/docs/chore + nama)
git checkout -b feat/katalog-filter

# 3. kerjakan, lalu commit
git add .
git commit -m "feat: filter kategori dan pencarian di katalog"

# 4. push branch & buat Pull Request di GitHub
git push -u origin feat/katalog-filter
```

> **⚠️ Jangan push langsung ke `main`.** Kirim **Pull Request** dulu supaya partner bisa review.
> Nama branch: `feat/...` (fitur baru), `fix/...` (perbaikan), `docs/...` (dokumen), `chore/...` (perawatan).
> Format commit: `feat: ...`, `fix: ...`, `docs: ...`, `chore: ...`.

Setelah PR di-merge, jalankan `git checkout main && git pull` sebelum mulai kerja berikutnya.

---

## 🖥 Menjalankan Project

```bash
npm install
npm run dev
```

Buka `http://localhost:3000`.

Buat **`.env.local`** (sudah ada di `.gitignore`, tidak ikut ter-commit):

```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

---

## 📚 Dokumen

| Dokumen | Isi |
|---|---|
| [`docs/STATUS.md`](docs/STATUS.md) | **Progress pengerjaan** + pembagian tugas |
| [`docs/PANDUAN_PENGERJAAN.md`](docs/PANDUAN_PENGERJAAN.md) | Rencana step-by-step, skema DB, peta Figma → route |
| [`docs/project-context.md`](docs/project-context.md) | Aturan teknis & domain wajib |
| [`docs/PRD_Katalog_Batik_Okra.md`](docs/PRD_Katalog_Batik_Okra.md) | Kebutuhan fungsional (FR-01…FR-06) |
| [`docs/BRD_Katalog_Batik_Okra.md`](docs/BRD_Katalog_Batik_Okra.md) | Konteks bisnis |

Design: [Figma — TS DESIGN](https://www.figma.com/design/Bpjx1K40jcNB39p072tySl/TS-DESIGN) (page `batikokra`).
