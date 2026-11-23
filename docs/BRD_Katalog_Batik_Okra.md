# Business Requirements Document (BRD)

## Pengembangan Website Katalog Digital Cerdas Berbasis AI untuk Produk Eksklusif Wisata Kampung Batik Okra Surabaya

| | |
|---|---|
| **Judul Proyek** | Pengembangan Website Katalog Digital Cerdas Berbasis AI untuk Produk Eksklusif Wisata Kampung Batik Okra Surabaya |
| **Tipe Dokumen** | BRD (Business Requirements Document) |
| **Versi** | 1.0 |
| **Metodologi** | MVP (Minimum Viable Product) |
| **Bahasa** | Bahasa Indonesia |
| **Dokumen Terkait** | [PRD](PRD_Katalog_Batik_Okra.md) · [Project Context](project-context.md) |

> **Catatan pemisahan dokumen:** Kebutuhan fungsional (user stories + acceptance criteria), kebutuhan non-fungsional, dan alur data/AI yang sebelumnya menyatu di dokumen ini telah dipindahkan ke **PRD** agar BRD fokus pada sisi bisnis. Konteks bisnis tidak berubah.

---

## 1. Executive Summary

### 1.1 Latar Belakang Masalah

Kampung Batik Okra Surabaya merupakan kawasan wisata kerajinan yang menjual produk batik dengan konsep **eksklusif**, yaitu setiap motif hanya diproduksi sebanyak **satu produk** (1 motif = 1 produk). Model bisnis ini memiliki nilai jual tinggi karena kelangkaan (scarcity), namun menimbulkan sejumlah permasalahan operasional dan pengalaman pengguna, antara lain:

1. **Tidak adanya visibilitas stok secara real-time.** Pengunjung tidak dapat mengetahui apakah suatu motif masih tersedia atau sudah terjual sebelum datang langsung ke lokasi, sehingga sering terjadi kekecewaan ketika motif yang dicari ternyata telah laku.

2. **Pengelolaan katalog yang masih manual.** Proses pembuatan deskripsi produk (penamaan motif, filosofi, bahan, teknik pewarnaan) dilakukan secara manual oleh Admin. Hal ini memakan waktu, tidak konsisten antar produk, dan menjadi beban ketika jumlah produk bertambah.

3. **Hilangnya peluang penjualan (lost opportunity).** Ketika motif yang dicari pengunjung telah terjual, tidak ada mekanisme yang secara otomatis menawarkan alternatif motif serupa, sehingga minat beli pengunjung hilang begitu saja.

4. **Terbatasnya saluran interaksi digital.** Tidak ada kanal tanya-jawab otomatis yang dapat melayani pertanyaan pengunjung seputar katalog, ketersediaan stok, dan detail motif di luar jam operasional.

### 1.2 Solusi

Untuk menjawab permasalahan di atas, dibangun **Website Katalog Digital Cerdas Berbasis AI** dengan tiga pilar utama:

1. **Katalog Real-Time** — halaman galeri digital yang menampilkan status ketersediaan produk secara langsung (real-time), lengkap dengan fitur filter ketersediaan dan pencarian motif.

2. **AI Vision untuk Auto-Description** — pemanfaatan teknologi *Computer Vision / AI Vision* untuk mendeteksi motif dari foto yang diunggah Admin dan secara otomatis menyusun deskripsi produk yang informatif, sehingga proses input produk menjadi lebih cepat dan konsisten.

3. **Chatbot Asisten Virtual dengan Smart Recommender** — chatbot bersistem *scoped* (terbatas pada domain katalog, stok, dan motif) yang mampu menjawab pertanyaan pengunjung serta secara otomatis merekomendasikan **motif alternatif yang masih tersedia** apabila produk yang dicari telah terjual.

### 1.3 Tujuan & Manfaat

| Tujuan | Manfaat |
|---|---|
| Mempercepat pembuatan deskripsi produk | Efisiensi waktu Admin hingga signifikan, konsistensi data produk |
| Memberikan informasi stok secara real-time | Mengurangi kekecewaan pengunjung, meningkatkan kepercayaan |
| Menawarkan rekomendasi alternatif otomatis | Meningkatkan konversi penjualan dan retensi minat beli |
| Menyediakan layanan tanya-jawab 24/7 | Meningkatkan pengalaman dan keterlibatan pengunjung |

---

## 2. User Roles & Personas

### 2.1 Admin (Pengelola)

**Deskripsi:** Pengelola toko / pengrajin batik Kampung Batik Okra yang bertanggung jawab atas pengelolaan katalog produk, unggah foto, deskripsi produk, dan pembaruan status stok.

| Atribut | Detail |
|---|---|
| Peran | Mengelola konten dan stok produk |
| Kebutuhan Utama | Mengunggah produk dengan cepat, deskripsi otomatis, memperbarui status stok |
| Tingkat Teknis | Menengah (terbiasa dengan aplikasi web, bukan pengembang) |
| Pain Point | Input deskripsi manual yang lambat, kesulitan memperbarui status jual |

### 2.2 Pengunjung Publik (Calon Pembeli)

**Deskripsi:** Pengunjung umum — baik wisatawan lokal maupun mancanegara — yang ingin melihat-lihat katalog, mencari motif tertentu, mengecek ketersediaan, dan bertanya melalui chatbot.

| Atribut | Detail |
|---|---|
| Peran | Menjelajah katalog dan mencari produk |
| Kebutuhan Utama | Mengetahui ketersediaan stok, mencari motif, mendapat rekomendasi alternatif |
| Tingkat Teknis | Dasar (pengguna web umum) |
| Pain Point | Tidak tahu apakah motif tersedia, bingung mencari alternatif saat motif terjual |

---

## 3. Scope of Work

### 3.1 In-Scope (Termasuk dalam MVP)

- **Modul Admin**
  - Form unggah foto produk yang terhubung ke AI Vision untuk deteksi motif dan pembuatan deskripsi otomatis (AI Auto-Description).
  - Manajemen status stok: tombol untuk mengubah status eksklusif dari **"Tersedia"** menjadi **"Terjual"**.
- **Modul Publik**
  - Katalog real-time: halaman galeri dengan filter ketersediaan dan pencarian motif.
  - Chatbot terbatas (*scoped*) yang hanya menjawab pertanyaan seputar katalog, stok, dan motif batik.
  - Smart Recommender terintegrasi di chatbot: jika pengguna mencari produk berstatus **"Terjual"**, sistem otomatis merekomendasikan tautan produk motif serupa yang masih **"Tersedia"**.
- **Integrasi penjualan non-pembayaran:** pengalihan (redirect) calon pembeli ke **WhatsApp Admin** untuk proses transaksi lanjutan.

### 3.2 Out-of-Scope (Tidak Termasuk dalam MVP)

- **Payment Gateway / sistem pembayaran online** — transaksi keuangan TIDAK diproses di dalam sistem.
- Manajemen pengiriman (shipping) dan pelacakan pesanan.
- Sistem akun/membership pengunjung dengan riwayat transaksi.
- Manajemen inventori multi-unit (karena produk bersifat 1 motif = 1 produk).
- Aplikasi mobile native (Android/iOS).
- Multi-bahasa penuh (selain kebutuhan dasar konten).
- Integrasi marketplace pihak ketiga (Tokopedia, Shopee, dsb.).

---

## 4. Kebutuhan Bisnis (Business Requirements)

Rincian kebutuhan fungsional & non-fungsional (user stories, acceptance criteria, alur data/AI) berada di **PRD**. Berikut ringkasan kebutuhan bisnis pada level tinggi:

| ID | Kebutuhan Bisnis | Rujukan PRD |
|---|---|---|
| BR-01 | Mempercepat & menyeragamkan pembuatan deskripsi produk melalui deteksi otomatis dari foto | FR-01 |
| BR-02 | Menyajikan status ketersediaan produk secara real-time kepada pengunjung | FR-02, FR-03 |
| BR-03 | Menawarkan rekomendasi motif alternatif saat produk yang dicari telah terjual | FR-05 |
| BR-04 | Menyediakan layanan tanya-jawab otomatis 24/7 seputar katalog, stok, dan motif | FR-04 |
| BR-05 | Mengalihkan calon pembeli ke WhatsApp Admin tanpa memproses pembayaran online | FR-06 |

---

## 5. Ringkasan Kunci MVP

| Modul | Fitur Utama | Status |
|---|---|---|
| Admin | AI Auto-Description (deteksi motif + deskripsi otomatis) | In-Scope |
| Admin | Manajemen Status Stok (Tersedia ⇄ Terjual) | In-Scope |
| Publik | Katalog Real-Time (filter + pencarian motif) | In-Scope |
| Publik | Chatbot Terbatas (scoped: katalog, stok, motif) | In-Scope |
| Publik | Smart Recommender (rekomendasi motif alternatif) | In-Scope |
| Publik | Pengalihan ke WhatsApp Admin | In-Scope |
| Publik | Payment Gateway | **Out-of-Scope** |
