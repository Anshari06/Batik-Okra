# Product Requirements Document (PRD)

## Website Katalog Digital Cerdas Berbasis AI — Produk Eksklusif Wisata Kampung Batik Okra Surabaya

| | |
|---|---|
| **Judul Proyek** | Pengembangan Website Katalog Digital Cerdas Berbasis AI untuk Produk Eksklusif Wisata Kampung Batik Okra Surabaya |
| **Tipe Dokumen** | PRD (Product Requirements Document) |
| **Versi** | 1.0 |
| **Metodologi** | MVP (Minimum Viable Product) · SCRUM |
| **Bahasa** | Bahasa Indonesia |
| **Dokumen Terkait** | [BRD](BRD_Katalog_Batik_Okra.md) · [Project Context](project-context.md) |

---

## 1. Product Overview

Website katalog digital untuk produk batik eksklusif Kampung Batik Okra Surabaya. Karena setiap motif hanya diproduksi **satu produk** (1 motif = 1 produk), kelangkaan menjadi nilai jual utama — sekaligus menuntut visibilitas stok yang akurat dan pengalaman pencarian alternatif yang baik.

Produk dibangun di atas **tiga pilar**:

1. **Katalog Real-Time** — galeri produk dengan status ketersediaan langsung (real-time), filter, dan pencarian motif.
2. **AI Vision Auto-Description** — deteksi motif dari foto + pembuatan deskripsi otomatis yang dapat ditinjau Admin.
3. **Chatbot Scoped + Smart Recommender** — tanya-jawab terbatas seputar katalog/stok/motif + rekomendasi alternatif saat produk terjual.

**Ini adalah MVP.** Fokus pada pembuktian nilai inti, bukan kelengkapan fitur.

### 1.1 Problem Statement (Ringkas)

| # | Masalah |
|---|---|
| 1 | Tidak ada visibilitas stok real-time → kekecewaan saat motif sudah terjual |
| 2 | Pengelolaan katalog manual → lambat & tidak konsisten |
| 3 | Lost opportunity saat motif terjual tanpa tawaran alternatif |
| 4 | Tidak ada kanal tanya-jawab otomatis di luar jam operasional |

### 1.2 Target Pengguna

- **Admin** — pengelola/pengrajin batik (tingkat teknis menengah).
- **Pengunjung Publik** — wisatawan lokal & mancanegara (tingkat teknis dasar).

### 1.3 Value Proposition

- Bagi Admin: input produk jauh lebih cepat & konsisten berkat deskripsi otomatis.
- Bagi Pengunjung: tahu ketersediaan stok sebelum datang, dapat rekomendasi alternatif, dan bisa bertanya 24/7.

---

## 2. Goals & Success Metrics

| Tujuan Produk | Metrik Keberhasilan (target) |
|---|---|
| Mempercepat pembuatan deskripsi produk | Waktu input produk turun signifikan (dari manual penuh → review hasil AI) |
| Memberikan informasi stok real-time | 100% perubahan status Admin tersinkron ke katalog publik dalam ≤ 5 detik |
| Menawarkan rekomendasi alternatif | Terjadi peningkatan klik rekomendasi / lanjut ke WhatsApp Admin |
| Menyediakan tanya-jawab 24/7 | Persentase pertanyaan dalam scope terjawab otomatis tanpa intervensi Admin |

> Target numerik final divalidasi saat UAT (User Acceptance Testing).

---

## 3. User Personas & Use Cases

### 3.1 Ringkasan Persona

| Persona | Peran | Kebutuhan Utama |
|---|---|---|
| **Admin** | Kelola konten & stok | Unggah produk cepat, deskripsi otomatis, update status stok |
| **Pengunjung Publik** | Jelajah katalog & cari produk | Cek ketersediaan, cari motif, dapat rekomendasi alternatif |

### 3.2 Use Cases Utama

| Aktor | Use Case | FR |
|---|---|---|
| Admin | Mengunggah produk + auto-description (AI Vision) | FR-01 |
| Admin | Menandai produk Terjual / Tersedia | FR-02 |
| Pengunjung | Melihat & memfilter katalog real-time | FR-03 |
| Pengunjung | Bertanya ke chatbot (scoped) | FR-04 |
| Pengunjung | Menerima rekomendasi alternatif | FR-05 |
| Pengunjung | Dilanjutkan ke WhatsApp Admin | FR-06 |

> Diagram use case: `assets/02_UseCase_Diagram.jpg` · Diagram fishbone (analisis akar masalah): `assets/01_Fishbone_Diagram.jpg`.

---

## 4. Functional Requirements

Berikut kebutuhan fungsional dalam format **User Story** beserta **Acceptance Criteria**.

### 4.1 Modul Admin

#### FR-01 — AI Auto-Description

> **Sebagai** Admin, **saya ingin** mengunggah foto produk dan mendapatkan deskripsi motif secara otomatis dari AI Vision, **agar** proses pembuatan katalog menjadi lebih cepat dan konsisten tanpa menulis deskripsi manual.

**Acceptance Criteria:**
- [ ] Admin dapat membuka form unggah produk yang memuat kolom: foto produk, nama motif, dan harga.
- [ ] Saat foto diunggah, sistem mengirim foto ke layanan AI Vision untuk mendeteksi motif.
- [ ] Sistem menampilkan hasil deteksi berupa **deskripsi otomatis** (motif, warna, karakteristik visual) yang dapat **diedit/dikonfirmasi** oleh Admin sebelum disimpan.
- [ ] Admin dapat menyimpan produk; produk baru muncul di katalog dengan status awal **"Tersedia"**.
- [ ] Jika deteksi AI gagal atau tidak meyakinkan, Admin tetap dapat mengisi deskripsi secara manual (fallback).
- [ ] Sistem memberikan notifikasi keberhasilan/gagal saat penyimpanan.

#### FR-02 — Manajemen Status Stok

> **Sebagai** Admin, **saya ingin** mengubah status produk eksklusif dari "Tersedia" menjadi "Terjual" (dan sebaliknya), **agar** informasi ketersediaan di katalog selalu akurat secara real-time.

**Acceptance Criteria:**
- [ ] Admin dapat melihat daftar produk beserta status saat ini ("Tersedia"/"Terjual").
- [ ] Admin dapat menekan tombol **"Tandai Terjual"** pada produk berstatus "Tersedia".
- [ ] Admin dapat menekan tombol **"Tandai Tersedia"** untuk mengembalikan status produk (revert).
- [ ] Perubahan status langsung tercermin di halaman katalog publik tanpa perlu reload manual (real-time).
- [ ] Sistem meminta konfirmasi sebelum mengubah status untuk mencegah kesalahan.

### 4.2 Modul Publik

#### FR-03 — Katalog Real-Time

> **Sebagai** Pengunjung, **saya ingin** melihat galeri produk beserta status ketersediaannya secara real-time dengan filter dan pencarian motif, **agar** saya dapat menemukan produk yang masih tersedia dengan cepat.

**Acceptance Criteria:**
- [ ] Halaman katalog menampilkan galeri produk dengan foto, nama motif, harga, dan badge status ("Tersedia"/"Terjual").
- [ ] Pengunjung dapat memfilter produk berdasarkan ketersediaan (Semua / Tersedia / Terjual).
- [ ] Pengunjung dapat mencari produk berdasarkan kata kunci nama motif.
- [ ] Status produk diperbarui secara real-time mengikuti perubahan yang dilakukan Admin.
- [ ] Produk berstatus "Terjual" tetap terlihat namun ditandai dengan jelas (misal badge "Terjual").
- [ ] Jika pencarian tidak menemukan hasil, sistem menampilkan pesan yang informatif.

#### FR-04 — Chatbot Terbatas (Scoped)

> **Sebagai** Pengunjung, **saya ingin** bertanya kepada chatbot tentang katalog, ketersediaan stok, dan detail motif, **agar** saya mendapatkan jawaban cepat tanpa harus mencari manual atau menunggu Admin.

**Acceptance Criteria:**
- [ ] Chatbot tersedia di halaman website dan dapat dibuka oleh pengunjung.
- [ ] Chatbot **hanya** menjawab pertanyaan dalam lingkup (scope): katalog produk, status stok, dan informasi motif batik.
- [ ] Pertanyaan di luar lingkup ditolak dengan sopan dan diarahkan kembali ke topik yang didukung (misal: "Maaf, saya hanya dapat membantu seputar katalog, stok, dan motif batik.").
- [ ] Chatbot dapat menjawab pertanyaan seperti "Apakah motif [X] masih tersedia?" dengan data status terkini.
- [ ] Percakapan berjalan dalam Bahasa Indonesia secara natural.

#### FR-05 — Smart Recommender (Rekomendasi Motif Alternatif)

> **Sebagai** Pengunjung, **saya ingin** menerima rekomendasi produk motif serupa yang masih "Tersedia" ketika produk yang saya cari berstatus "Terjual", **agar** saya tetap memiliki alternatif pembelian yang relevan.

**Acceptance Criteria:**
- [ ] Ketika pengunjung menanyakan produk yang berstatus "Terjual", chatbot memberi tahu bahwa produk telah terjual.
- [ ] Chatbot secara otomatis menampilkan **rekomendasi produk motif serupa** (berdasarkan kemiripan atribut seperti warna, pola, atau kategori motif) yang masih berstatus "Tersedia".
- [ ] Setiap rekomendasi ditampilkan sebagai **tautan (link)** yang dapat diklik menuju halaman/detail produk.
- [ ] Jika tidak ada produk serupa yang tersedia, chatbot menyampaikan pesan yang jelas bahwa saat ini belum ada alternatif.
- [ ] Rekomendasi hanya menampilkan produk dengan status "Tersedia".

#### FR-06 — Pengalihan ke WhatsApp Admin

> **Sebagai** Pengunjung, **saya ingin** diarahkan ke WhatsApp Admin untuk melanjutkan transaksi, **agar** saya dapat berkomunikasi langsung dengan pengelola untuk pemesanan.

**Acceptance Criteria:**
- [ ] Setiap produk memiliki tombol/tautan **"Hubungi via WhatsApp"**.
- [ ] Tautan membuka WhatsApp Admin dengan pesan awal yang sudah terisi otomatis (misal berisi nama motif yang diminati).
- [ ] Tidak ada proses pembayaran yang terjadi di dalam website.

---

## 5. Non-Functional Requirements

### 5.1 Performa (Performance)

| Kategori | Kebutuhan |
|---|---|
| Waktu muat halaman katalog | ≤ 3 detik pada koneksi standar (target) |
| Respons API katalog | ≤ 500 ms untuk query standar |
| Pembaruan status real-time | Propagasi status dari Admin ke Publik dalam ≤ 5 detik |
| Respons chatbot | ≤ 3 detik per jawaban untuk pertanyaan umum |
| Skalabilitas | Mampu menampung minimal 100 produk dan 50 pengunjung bersamaan pada fase awal |

### 5.2 Keamanan (Security)

| Kategori | Kebutuhan |
|---|---|
| Autentikasi Admin | Akses modul Admin dilindungi login dengan kredensial (username/password) |
| Otorisasi | Pengunjung publik TIDAK dapat mengakses endpoint/fitur Admin |
| Input sanitization | Seluruh input pengguna (termasuk chatbot) divalidasi untuk mencegah injeksi (XSS, SQL Injection) |
| Proteksi API | API key untuk layanan AI Vision dan model chatbot disimpan di sisi server (tidak terekspos di frontend) |
| Komunikasi data | Seluruh komunikasi menggunakan HTTPS |

### 5.3 Limitasi AI

| Kategori | Kebutuhan |
|---|---|
| Akurasi deteksi AI Vision | Menyediakan fallback input manual bila hasil deteksi kurang akurat |
| Lingkup chatbot | Chatbot dibatasi (scoped) hanya pada domain katalog, stok, dan motif; menolak pertanyaan di luar domain |
| Hallucination | Chatbot wajib menjawab berdasarkan data katalog aktual; tidak mengarang informasi produk/stok |
| Latensi AI | Batas waktu (timeout) pemrosesan AI ditetapkan (misal ≤ 10 detik); jika melebihi, sistem memberi fallback |
| Privasi | Foto produk dan data percakapan tidak disebarkan ke pihak ketiga di luar kebutuhan layanan |

### 5.4 Usability & Kompatibilitas

| Kategori | Kebutuhan |
|---|---|
| Responsif | Website dapat diakses nyaman dari perangkat desktop dan mobile |
| Browser | Mendukung browser modern (Chrome, Firefox, Safari, Edge) versi terbaru |
| Aksesibilitas | Kontras teks memadai dan navigasi sederhana untuk pengunjung umum |

---

## 6. Data Logic & AI Flow

### 6.1 Alur Data: AI Memproses Gambar (AI Auto-Description)

```
[Admin]
   │ 1. Mengisi form & mengunggah foto produk
   ▼
[Frontend Admin]
   │ 2. Mengirim foto (multipart) + metadata ke Backend API
   ▼
[Backend API]
   │ 3. Validasi & sanitasi input
   │ 4. Mengirim gambar ke layanan AI Vision (dengan API key)
   ▼
[Layanan AI Vision]
   │ 5. Mendeteksi motif (pola, warna, karakteristik visual)
   │ 6. Mengembalikan hasil deteksi (label, atribut, deskripsi awal)
   ▼
[Backend API]
   │ 7. Menyusun/memformat deskripsi produk dari hasil deteksi
   ▼
[Frontend Admin]
   │ 8. Menampilkan deskripsi otomatis untuk ditinjau/diedit Admin
   ▼
[Admin]
   │ 9. Konfirmasi & simpan
   ▼
[Database]
   │ 10. Produk tersimpan dengan status awal "Tersedia"
   ▼
[Katalog Publik] (produk tampil real-time)
```

**Penjelasan:** Foto yang diunggah Admin diproses oleh model *Computer Vision* untuk mengenali pola dan karakteristik motif. Hasil deteksi diformat menjadi deskripsi produk yang dapat ditinjau Admin sebelum disimpan ke basis data. Produk yang tersimpan otomatis tampil di katalog publik dengan status "Tersedia".

### 6.2 Alur Data: Chatbot Mencari Rekomendasi (Smart Recommender)

```
[Pengunjung]
   │ 1. Mengirim pertanyaan, misal "Apakah motif Parang tersedia?"
   ▼
[Chatbot Interface]
   │ 2. Meneruskan pertanyaan ke Backend Chatbot
   ▼
[Backend Chatbot]
   │ 3. Scope check: apakah pertanyaan dalam domain (katalog/stok/motif)?
   │    ├─ Tidak → balas penolakan sopan & arahkan kembali
   │    └─ Ya ↓
   │ 4. Query status stok produk yang dicari ke Database
   ▼
[Database]
   │ 5. Mengembalikan status produk ("Tersedia" / "Terjual")
   ▼
[Backend Chatbot]
   │ 6a. Jika "Tersedia" → jawab tersedia + tampilkan link produk
   │ 6b. Jika "Terjual" → jalankan Smart Recommender
   │       ├─ Ambil atribut motif produk terjual (warna, pola, kategori)
   │       ├─ Cari produk serupa berstatus "Tersedia" di Database
   │       └─ Susun daftar rekomendasi (link produk)
   ▼
[Chatbot Interface]
   │ 7. Menampilkan jawaban + rekomendasi (link) kepada pengunjung
   ▼
[Pengunjung] (dapat klik rekomendasi atau lanjut ke WhatsApp Admin)
```

**Penjelasan:** Chatbot terlebih dahulu memvalidasi bahwa pertanyaan berada dalam lingkup yang diizinkan. Jika pengguna mencari produk yang tersedia, chatbot langsung mengembalikan tautan produk. Jika produk berstatus "Terjual", sistem mengekstrak atribut motif produk tersebut (misal warna dan kategori pola), mencari produk lain yang mirip dan masih "Tersedia" di basis data, lalu menyajikannya sebagai rekomendasi berupa tautan yang dapat diklik.

### 6.3 Arsitektur Sistem

> Diagram arsitektur sistem: `assets/06_Arsitektur_Sistem.jpg`.

**Komponen utama:** Frontend (publik + admin) → Backend API → Database; Backend terhubung ke layanan AI Vision (auto-description) dan model chatbot (scoped + recommender); integrasi keluar hanya berupa redirect ke WhatsApp Admin (tanpa payment gateway).

---

## 7. MVP Scope & Prioritisasi

Matriks prioritisasi membuktikan mengapa fitur MVP diajukan: semua fitur **Must-Have** menjawab langsung tiga pilar nilai inti dan memiliki dampak tinggi terhadap masalah bisnis utama.

### 7.1 Klasifikasi MoSCoW

| Prioritas | Fitur | FR | Alasan |
|---|---|---|---|
| **Must-Have** | Katalog Real-Time | FR-03 | Pilar 1 — inti nilai produk |
| **Must-Have** | Manajemen Status Stok | FR-02 | Prasyarat visibilitas stok |
| **Must-Have** | AI Auto-Description | FR-01 | Pilar 2 — efisiensi Admin |
| **Must-Have** | Chatbot Scoped | FR-04 | Pilar 3 — layanan 24/7 |
| **Must-Have** | Smart Recommender | FR-05 | Pilar 3 — mencegah lost opportunity |
| **Must-Have** | Redirect WhatsApp | FR-06 | Alur transaksi (non-pembayaran) |
| **Could-Have** | Analitik dashboard Admin | — | Menarik, tapi bukan nilai inti MVP |
| **Won't-Have (Out-of-Scope)** | Payment gateway, shipping, membership, mobile native, multi-bahasa, marketplace | — | Diluar batas MVP (lihat §3.2 BRD) |

### 7.2 Matriks Dampak vs Usaha

| | Dampak Tinggi | Dampak Rendah |
|---|---|---|
| **Usaha Rendah** | Status Stok, Redirect WhatsApp, Katalog + Filter/Pencarian | Badge/pesan informatif |
| **Usaha Tinggi** | AI Auto-Description, Chatbot + Smart Recommender | Analitik dashboard, multi-bahasa |

> Diagram matriks prioritisasi: `assets/04_Matriks_Prioritisasi.jpg`.

---

## 8. Release Plan & Timeline (SCRUM)

### 8.1 Metode Pengembangan

Proyek dikembangkan dengan **SCRUM** (iteratif & inkremental).

| Aspek | Detail |
|---|---|
| **Roles** | Product Owner (mewakili Admin/pengelola), Scrum Master, Development Team |
| **Ceremonies** | Sprint Planning · Daily Scrum · Sprint Review · Sprint Retrospective |
| **Artifacts** | Product Backlog · Sprint Backlog · Increment (hasil sprint) · Definition of Done |
| **Alur** | Backlog → Sprint Planning → Sprint (1–2 minggu) → Review → Retrospective → berulang |

> Diagram alur SCRUM: `assets/03_Alur_Scrum.jpg`.

### 8.2 Rencana Sprint (hingga UAS)

| Sprint | Fokus | Deliverable Kunci |
|---|---|---|
| Sprint 0 | Setup & discovery | Repo, scaffolding, arsitektur dasar, integrasi DB & AI |
| Sprint 1 | Admin: Auto-Description | Form unggah + integrasi AI Vision + fallback manual (FR-01) |
| Sprint 2 | Admin: Status Stok + Real-time | Toggle status + propagasi real-time (FR-02) |
| Sprint 3 | Publik: Katalog Real-Time | Galeri + filter + pencarian (FR-03) |
| Sprint 4 | Publik: Chatbot + Recommender + WhatsApp | Scoped chatbot, smart recommender, redirect WA (FR-04/05/06) |
| Sprint 5 | Hardening & UAT | Testing, perbaikan, dokumentasi, demo UAS |

> Diagram timeline: `assets/05_Timeline_Project.jpg`.

### 8.3 Definition of Done (DoD)

Sebuah item dianggap **selesai** apabila:
- [ ] Semua acceptance criteria FR terkait terpenuhi.
- [ ] Lolos unit/integration test (lihat `project-context.md`).
- [ ] Status real-time & fallback AI terverifikasi.
- [ ] Tidak ada API key/rahasia terekspos ke client.
- [ ] Sudah direview & disetujui Product Owner.

---

## 9. Asumsi, Dependensi & Open Questions

**Asumsi:**
- Admin memiliki koneksi internet memadai untuk unggah foto dan menggunakan dashboard.
- Layanan AI Vision & model chatbot tersedia via API pihak ketiga.

**Dependensi:**
- API key layanan AI Vision & model chatbot.
- Nomor WhatsApp Admin sebagai tujuan redirect.
- Data awal produk (foto + nama motif + harga) dari Admin.

**Open Questions:**
- Atribut motif apa saja (warna, pola, kategori) yang paling menentukan kemiripan untuk recommender?
- Apakah perlu retensi riwayat percakapan chatbot atau cukup stateless per sesi?

---

## 10. Out of Scope (Rekap)

- Payment gateway / pembayaran online.
- Shipping & pelacakan pesanan.
- Akun/membership pengunjung + riwayat transaksi.
- Inventori multi-unit.
- Aplikasi mobile native.
- Multi-bahasa penuh.
- Integrasi marketplace pihak ketiga.
