/* eslint-disable @next/next/no-img-element -- aset lokal; next/image belum dipakai sampai Step 2 */
import type { Metadata } from "next";
import { ChevronDown } from "lucide-react";
import { ALAMAT, JAM_BUKA, WHATSAPP_ADMIN, WHATSAPP_ADMIN_2_DISPLAY, WHATSAPP_ADMIN_DISPLAY, waLink } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Kunjungi — Batik Okra Surabaya",
  description:
    "Alamat, jam buka, tiket workshop, dan peta lokasi Kampung Batik Okra Surabaya.",
};

const MAPS_EMBED =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3669.2855953365797!2d112.72906837463744!3d-7.254371792752237!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd7f9a6b5d6a683%3A0xf61599fb527918fc!2sWisata%20Kampung%20Batik%20Okra%20Surabaya!5e1!3m2!1sid!2sid!4v1795456106952!5m2!1sid!2sid";

const MAPS_URL =
  "https://www.google.com/maps/search/?api=1&query=Wisata+Kampung+Batik+Okra+Surabaya";

const TIKET = [
  "Masuk kampung: Gratis",
  "Workshop Membatik (2 jam): Rp 75.000 / orang",
  "Paket Grup (min. 10 orang): Rp 50.000 / orang",
];

const TIPS = [
  "Kenakan pakaian nyaman dan alas kaki tertutup.",
  "Datang di pagi hari untuk melihat proses membatik.",
  "Siapkan uang tunai untuk pembelian langsung.",
  "Hubungi pengelola sebelum datang untuk memastikan jadwal.",
];

const AKTIVITAS = [
  {
    judul: "Jelajah Kampung",
    teks: "Susuri gang-gang kampung batik dan saksikan langsung para pengrajin berkarya.",
    img: "/assets/aktiv-jelajah.jpg",
  },
  {
    judul: "Workshop Membatik",
    teks: "Belajar membatik langsung dari pengrajin berpengalaman. Cocok untuk semua usia.",
    img: "/assets/aktiv-workshop.jpg",
  },
  {
    judul: "Belanja Batik Eksklusif",
    teks: "Pilih dan beli batik langsung dari pembuatnya. Setiap motif hanya satu.",
    img: "/assets/aktiv-belanja.jpg",
  },
];

// Jawaban FAQ 2–5 masih placeholder prototype (Figma hanya mengisi FAQ 1).
const FAQ = [
  {
    tanya: "Apakah bisa membeli langsung dari website?",
    jawab:
      "Belum. Pemesanan dilakukan melalui WhatsApp atau DM Instagram pengelola. Website ini hanya berfungsi sebagai katalog informasi.",
  },
  {
    tanya: "Apakah perlu reservasi untuk berkunjung?",
    jawab:
      "Tidak perlu untuk kunjungan biasa. Reservasi hanya diwajibkan untuk workshop membatik, minimal H-2 lewat WhatsApp.",
  },
  {
    tanya: "Apakah tersedia parkir di lokasi?",
    jawab:
      "Tersedia area parkir terbatas untuk mobil dan motor di depan kampung. Untuk rombongan besar, informasikan saat reservasi.",
  },
  {
    tanya: "Berapa lama waktu yang dibutuhkan untuk workshop?",
    jawab:
      "Sekitar 2 jam, sudah termasuk bahan, alat, dan kain praktik yang bisa dibawa pulang.",
  },
  {
    tanya: "Apakah anak-anak boleh ikut workshop?",
    jawab:
      "Boleh. Anak usia 7 tahun ke atas bisa mengikuti workshop dengan pendampingan orang tua.",
  },
];

export default function Kunjungi() {
  return (
    <div className="mx-auto flex w-full max-w-[1440px] flex-col">
      {/* Title Area */}
      <div className="flex flex-col items-center gap-2 px-6 pb-2 pt-12 text-center md:px-[60px]">
        <h1 className="text-[28px] font-bold tracking-[4px] text-black">
          KUNJUNGI BATIK OKRA SURABAYA
        </h1>
        <p className="text-[15px] text-[#8a8a8a]">
          Datang langsung ke kampung wisata kerajinan batik di Surabaya.
        </p>
      </div>

      {/* Info Columns */}
      <div className="flex flex-col gap-10 px-6 pb-[60px] pt-10 md:flex-row md:items-start md:gap-[48px] md:px-[60px]">
        <div className="flex flex-1 flex-col gap-8">
          <div className="flex flex-col gap-2">
            <p className="text-[11px] font-semibold tracking-[2px] text-[#8a8a8a]">ALAMAT</p>
            <p className="max-w-[500px] text-[15px] leading-[1.5] text-[#333]">
              {ALAMAT}
              <br />
              Jawa Timur, Indonesia
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <p className="text-[11px] font-semibold tracking-[2px] text-[#8a8a8a]">JAM BUKA</p>
            <p className="text-[15px] leading-[1.5] text-[#333]">
              {JAM_BUKA.map((baris) => (
                <span key={baris} className="block">
                  {baris}
                </span>
              ))}
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <p className="text-[11px] font-semibold tracking-[2px] text-[#8a8a8a]">
              TIKET & PAKET WISATA
            </p>
            <div className="flex flex-col text-[15px] leading-[1.5] text-[#333]">
              {TIKET.map((baris) => (
                <p key={baris}>{baris}</p>
              ))}
              <p className="mt-[1.5em]">Reservasi workshop wajib melalui WhatsApp.</p>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <p className="text-[11px] font-semibold tracking-[2px] text-[#8a8a8a]">
              TIPS BERKUNJUNG
            </p>
            <div className="flex flex-col text-[15px] leading-[1.6] text-[#333]">
              {TIPS.map((tips, i) => (
                <p key={tips}>
                  {i + 1}. {tips}
                </p>
              ))}
            </div>
          </div>
        </div>

        {/* Map Card */}
        <div className="flex w-full flex-col overflow-hidden rounded-[3px] bg-white md:w-[520px] md:shrink-0">
          <div className="h-[360px] w-full overflow-hidden bg-[#f2f2f2]">
            <iframe
              src={MAPS_EMBED}
              title="Peta lokasi Kampung Batik Okra Surabaya"
              className="h-full w-full border-0"
              allowFullScreen
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
            />
          </div>
          <div className="flex flex-col gap-3 p-5">
            <p className="text-[14px] leading-[1.4] text-[#333]">
              <span className="block">Kampung Batik Okra</span>
              {ALAMAT}
            </p>
            <a
              href={MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center rounded-[2px] bg-black py-3 text-[11px] font-semibold tracking-[2px] text-white"
            >
              BUKA DI GOOGLE MAPS
            </a>
          </div>
        </div>
      </div>

      {/* Aktivitas Section */}
      <section className="flex flex-col items-center gap-8 bg-[#f2f2f2] p-6 md:p-[60px]">
        <p className="text-[11px] font-semibold tracking-[3px] text-[#8a8a8a]">
          AKTIVITAS DI KAMPUNG BATIK
        </p>
        <h2 className="text-center text-[28px] font-bold tracking-[1px] text-black">
          Yang Bisa Anda Lakukan di Sini
        </h2>
        <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-3">
          {AKTIVITAS.map(({ judul, teks, img }) => (
            <div key={judul} className="flex flex-col overflow-hidden rounded-[3px] bg-white">
              <div className="h-[260px] w-full overflow-hidden bg-[#d9d9de]">
                {/* eslint-disable-next-line @next/next/no-img-element -- aset lokal; lihat shortcut di ProductCard */}
                <img src={img} alt={judul} className="h-full w-full object-cover" />
              </div>
              <div className="flex flex-col gap-2 p-5">
                <p className="text-[16px] font-bold tracking-[1px] text-black">{judul}</p>
                <p className="text-[13px] leading-[1.5] text-[#8a8a8a]">{teks}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Hubungi Section */}
      <section className="flex flex-col items-center gap-8 p-6 md:p-[60px]">
        <h2 className="text-center text-[20px] font-bold tracking-[4px] text-black">
          HUBUNGI KAMI
        </h2>
        <p className="text-center text-[15px] text-[#8a8a8a]">
          Punya pertanyaan atau ingin reservasi workshop? Hubungi kami langsung.
        </p>
        <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2">
          <div className="flex flex-col items-center gap-4 rounded-[3px] bg-white p-8 text-center">
            <img src="/assets/whatsapp.svg" alt="" className="h-7 w-7" />
            <p className="text-[18px] font-bold tracking-[1px] text-black">WhatsApp</p>
            <p className="text-[15px] text-[#8a8a8a]">{WHATSAPP_ADMIN_DISPLAY}</p>
            <p className="text-[15px] text-[#8a8a8a]">{WHATSAPP_ADMIN_2_DISPLAY}</p>
            <p className="max-w-[360px] text-[13px] leading-[1.5] text-[#8a8a8a]">
              Respon cepat di jam kerja. Bisa untuk tanya produk atau reservasi workshop.
            </p>
            <a
              href={waLink(WHATSAPP_ADMIN, "Halo, saya ingin bertanya tentang Batik Okra.")}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-[2px] bg-black px-6 py-[14px] text-[11px] font-semibold tracking-[2px] text-white"
            >
              <img src="/assets/whatsapp.svg" alt="" className="h-4 w-4" />
              HUBUNGI VIA WHATSAPP
            </a>
          </div>

          <div className="flex flex-col items-center gap-4 rounded-[3px] bg-white p-8 text-center">
            <img src="/assets/instagram.svg" alt="" className="h-7 w-7" />
            <p className="text-[18px] font-bold tracking-[1px] text-black">Instagram</p>
            <p className="text-[15px] text-[#8a8a8a]">@batik_okra_surabaya</p>
            <p className="max-w-[360px] text-[13px] leading-[1.5] text-[#8a8a8a]">
              Lihat koleksi terbaru dan cerita di balik layar. Kirim DM untuk pemesanan.
            </p>
            <a
              href="https://instagram.com/batik_okra_surabaya"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-[2px] bg-white px-6 py-[14px] text-[11px] font-semibold tracking-[2px] text-black"
            >
              <img src="/assets/instagram.svg" alt="" className="h-4 w-4" />
              DM VIA INSTAGRAM
            </a>
          </div>
        </div>
      </section>

      {/* FAQ Section — <details> supaya bisa dibuka-tutup tanpa JS */}
      <section className="flex flex-col items-center gap-8 bg-[#f2f2f2] p-6 md:p-[60px]">
        <h2 className="text-center text-[20px] font-bold tracking-[4px] text-black">
          PERTANYAAN UMUM
        </h2>
        <div className="w-full max-w-[800px]">
          {FAQ.map(({ tanya, jawab }, i) => (
            <details key={tanya} open={i === 0} className="group py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4">
                <span
                  className={`text-[15px] text-black ${i === 0 ? "font-semibold" : "font-medium"}`}
                >
                  {tanya}
                </span>
                <ChevronDown
                  size={18}
                  className="shrink-0 text-black transition-transform group-open:rotate-180"
                />
              </summary>
              <p className="mt-3 text-[14px] leading-[1.6] text-[#333]">{jawab}</p>
            </details>
          ))}
        </div>
      </section>
    </div>
  );
}
