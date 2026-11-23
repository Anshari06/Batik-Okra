# Batik Okra — Website Katalog Digital

Katalog digital produk eksklusif Kampung Batik Okra Surabaya (1 motif = 1 produk).
Next.js 14 (App Router) + TypeScript + Tailwind CSS + Supabase · deploy Vercel.

## Dokumen

| Dokumen | Isi |
|---|---|
| [docs/PANDUAN_PENGERJAAN.md](docs/PANDUAN_PENGERJAAN.md) | Rencana kerja step-by-step, skema DB, peta frame Figma → route |
| [docs/STATUS.md](docs/STATUS.md) | Progress pengerjaan + pembagian tugas frontend/backend |
| [docs/PRD_Katalog_Batik_Okra.md](docs/PRD_Katalog_Batik_Okra.md) | Kebutuhan fungsional (FR-01…FR-06) |
| [docs/BRD_Katalog_Batik_Okra.md](docs/BRD_Katalog_Batik_Okra.md) | Konteks bisnis |
| [docs/project-context.md](docs/project-context.md) | Aturan teknis & domain untuk developer/AI agent |

## Menjalankan

```bash
npm install
npm run dev
```

Buat `.env.local` (tidak di-commit):

```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

Design: [Figma — TS DESIGN](https://www.figma.com/design/Bpjx1K40jcNB39p072tySl/TS-DESIGN) (page `batikokra`).
