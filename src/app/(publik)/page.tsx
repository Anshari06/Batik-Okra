/* eslint-disable @next/next/no-img-element -- aset lokal; next/image belum dipakai sampai Step 2 */
import Link from "next/link";
import { Star, PackageCheck, MessageCircle } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import { MOCK_PRODUCTS } from "@/lib/mock-products";
import { WHATSAPP_ADMIN, WHATSAPP_ADMIN_DISPLAY, waLink } from "@/lib/constants";

// Foto section Beranda diambil dari frame Figma 829:19
const HERO_IMG = "/assets/26ee8fb305779d835219f84c64bb88a1.jpg";
const TENTANG_IMG = "/assets/tentang.jpg";
const MAPS_IMG = "/assets/maps.png";

const VALUES = [
  {
    icon: Star,
    judul: "Motif Eksklusif",
    teks: "1 motif = 1 produk. Tidak ada duplikasi.",
  },
  {
    icon: PackageCheck,
    judul: "Status Stok Terkini",
    teks: "Cek ketersediaan sebelum datang.",
  },
  {
    icon: MessageCircle,
    judul: "Hubungi Langsung",
    teks: "Via WhatsApp atau Instagram.",
  },
];

const PROSES = [
  {
    no: "01",
    judul: "Desain Motif",
    teks: "Motif digambar di atas kain putih menggunakan pensil, mengikuti pola yang telah dirancang.",
    img: "/assets/proses-1.jpg",
  },
  {
    no: "02",
    judul: "Mencanting",
    teks: "Lilin panas diaplikasikan menggunakan canting tembaga untuk membentuk garis-garis motif.",
    img: "/assets/proses-2.jpg",
  },
  {
    no: "03",
    judul: "Pewarnaan",
    teks: "Kain dicelup ke dalam pewarna alami atau sintetis untuk memberi warna pada motif.",
    img: "/assets/proses-3.jpg",
  },
  {
    no: "04",
    judul: "Finishing",
    teks: "Lilin dihilangkan, kain dicuci dan dikeringkan. Batik siap menjadi karya eksklusif.",
    img: "/assets/proses-4.jpg",
  },
];

const KATEGORI = ["SEMUA MOTIF", "PARANG", "KAWUNG", "MEGA MENDUNG", "TRUNTUM", "SOGAN"];

// Label + foto tile grid (urutan mengikuti frame Figma 829:19)
const TILE_ROW_1 = [
  { label: "Lihat Motif", img: "/assets/25b0f6862c206772d5bc7db2ea26044a.jpg" },
  { label: "Motif Parang", img: "/assets/7294f764bcb45b67237c2ef1fe337545.jpg" },
  { label: "Motif Kawung", img: "/assets/fc5018e319501ad44a67ce2fd04a5dde.jpg" },
];
const TILE_ROW_2 = [
  { label: "Batik Kontemporer", img: "/assets/d6c898ee0d45bdae961ac47a57aff43a.jpg" },
  { label: "Mega Mendung", img: "/assets/3e63b45c6e052ea919102e30bc69922c.jpg" },
  { label: "Truntum", img: "/assets/495cf0eaaeb26366a9f9fd35d1e80064.jpg" },
];

export default function Beranda() {
  return (
    <>
      {/* Hero */}
      <section className="flex flex-col bg-[#f2f2f2] md:h-[560px] md:flex-row">
        <div className="flex w-full flex-col justify-center gap-5 px-6 py-12 md:w-[560px] md:shrink-0 md:pl-[80px] md:py-[60px]">
          <div className="flex flex-col gap-[5px] tracking-[1px]">
            <p className="text-[16px] font-semibold text-[#8a8a8a]">
              KAMPUNG BATIK OKRA SURABAYA
            </p>
            <h1 className="text-[48px] font-bold leading-[1.06] text-black">
              Satu Motif,
              <br />
              Satu Karya.
            </h1>
          </div>
          <p className="max-w-[420px] text-[17px] leading-[1.6] text-[#333]">
            Temukan batik eksklusif dari Kampung Batik Okra Surabaya. Setiap motif hanya dibuat satu
            kali.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <Link
              href="/katalog"
              className="rounded-[2px] bg-black px-7 py-[14px] text-[14px] font-semibold tracking-[2px] text-white"
            >
              LIHAT KATALOG
            </Link>
            <Link
              href="/kunjungi"
              className="rounded-[2px] bg-white px-7 py-[14px] text-[14px] font-semibold tracking-[2px] text-black"
            >
              KUNJUNGI KAMPUNG
            </Link>
          </div>
          <div className="flex gap-1">
            <span className="h-2 w-2 rounded-full bg-black" />
            <span className="h-2 w-2 rounded-full bg-[#d9d9de]" />
            <span className="h-2 w-2 rounded-full bg-[#d9d9de]" />
            <span className="h-2 w-2 rounded-full bg-[#d9d9de]" />
          </div>
        </div>
        <div className="bg-[#d9d9de] md:flex-1">
          <img src={HERO_IMG} alt="Kain batik tulis Batik Okra" className="h-[300px] w-full object-cover md:h-full" />
        </div>
      </section>

      {/* Tentang */}
      <section
        id="tentang"
        className="flex flex-col gap-10 px-6 py-12 md:flex-row md:items-center md:gap-[60px] md:px-[60px] md:py-[80px]"
      >
        <div className="h-[400px] w-full overflow-hidden rounded-[3px] bg-[#d9d9de] md:w-[580px] md:shrink-0">
          <img src={TENTANG_IMG} alt="Pengrajin batik Okra Surabaya" className="h-full w-full object-cover" />
        </div>
        <div className="flex flex-1 flex-col gap-4">
          <p className="text-[16px] font-semibold tracking-[1px] text-[#8a8a8a]">
            TENTANG KAMPUNG BATIK OKRA SURABAYA
          </p>
          <h2 className="max-w-[500px] text-[28px] font-bold leading-[1.2] tracking-[1px] text-black">
            Dari Kampung Kecil,
            <br />
            Lahir Karya Besar
          </h2>
          <div className="flex flex-col gap-4 text-[16px] leading-[1.7] text-[#333]">
            <p>
              Kampung Batik Okra bermula dari sekelompok ibu-ibu di Surabaya yang ingin melestarikan
              warisan budaya batik tulis. Dengan semangat gotong royong, mereka mendirikan kampung
              wisata kerajinan batik yang kini menjadi destinasi budaya di jantung kota.
            </p>
            <p>
              Setiap helai kain yang dihasilkan merupakan karya satu-satunya — tidak ada motif yang
              dibuat dua kali. Filosofi ini menjadi jati diri Kampung Batik Okra: eksklusivitas yang
              lahir dari ketulusan tangan pengrajin.
            </p>
            <p>
              Kami percaya batik bukan sekadar kain, tetapi cerita yang ditulis dengan lilin dan
              warna.
            </p>
          </div>
        </div>
      </section>

      {/* Value Strip */}
      <section className="flex flex-col gap-10 bg-[#f2f2f2] px-6 py-12 md:flex-row md:items-start md:justify-center md:gap-[40px] md:px-[60px] md:py-[48px]">
        {VALUES.map(({ icon: Icon, judul, teks }) => (
          <div key={judul} className="flex flex-1 flex-col items-center gap-3">
            <Icon size={28} className="text-black" />
            <p className="text-center text-[16px] font-bold tracking-[1px] text-black">{judul}</p>
            <p className="max-w-[280px] text-center text-[15px] leading-[1.5] text-[#8a8a8a]">
              {teks}
            </p>
          </div>
        ))}
      </section>

      {/* Proses Membatik */}
      <section className="flex flex-col items-center gap-10 px-6 py-12 md:px-[60px] md:py-[80px]">
        <p className="text-[13px] font-semibold tracking-[3px] text-[#8a8a8a]">PROSES MEMBATIK</p>
        <h2 className="text-center text-[28px] font-bold tracking-[1px] text-black">
          Dari Kain Polos Menjadi Karya Seni
        </h2>
        <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {PROSES.map(({ no, judul, teks, img }) => (
            <div key={no} className="flex flex-col gap-3">
              <div className="h-[220px] w-full overflow-hidden rounded-[3px] bg-[#d9d9de]">
                <img src={img} alt={judul} className="h-full w-full object-cover" />
              </div>
              <div className="flex items-center gap-2 font-bold">
                <span className="text-[28px] text-[#e0e0e0]">{no}</span>
                <span className="text-[16px] tracking-[1px] text-black">{judul}</span>
              </div>
              <p className="text-[15px] leading-[1.5] text-[#8a8a8a]">{teks}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Band */}
      <section className="flex flex-col items-center gap-5 bg-white p-6 text-center md:p-[60px]">
        <p className="text-[24px] font-bold text-black">Tertarik dengan motif kami?</p>
        <p className="text-[16px] text-[#8a8a8a]">
          Jelajahi koleksi batik eksklusif Kampung Batik Okra Surabaya.
        </p>
      </section>

      {/* Kategori */}
      <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-3 px-6 py-5 text-[14px] tracking-[2px] md:px-[60px]">
        {KATEGORI.map((k, i) => (
          <Link
            key={k}
            href="/katalog"
            className={i === 0 ? "font-bold text-black" : "font-medium text-[#8a8a8a]"}
          >
            {k}
          </Link>
        ))}
      </div>

      {/* Tile Grid */}
      <section className="flex flex-col gap-5 p-6 md:p-[60px]">
        {[TILE_ROW_1, TILE_ROW_2].map((row, r) => (
          <div
            key={r}
            className={`flex flex-col gap-5 md:flex-row ${r === 0 ? "md:h-[400px]" : "md:h-[340px]"}`}
          >
            {row.map(({ label, img }) => (
              <Link
                key={label}
                href="/katalog"
                className="relative h-[240px] flex-1 overflow-hidden rounded-[3px] bg-[#d9d9de] md:h-full"
              >
                <img src={img} alt={label} className="h-full w-full object-cover" />
                <span className="absolute bottom-5 left-5 rounded-[2px] bg-white px-4 py-2 text-[13px] font-semibold tracking-[2px] text-black">
                  {label}
                </span>
              </Link>
            ))}
          </div>
        ))}
        <div className="flex justify-center">
          <Link href="/katalog" className="text-[16px] tracking-[1px] text-[#8a8a8a]">
            Lihat selengkapnya →
          </Link>
        </div>
      </section>

      {/* Motif Terbaru */}
      <section className="flex flex-col gap-8 p-6 md:p-[60px]">
        <div className="flex items-center justify-between">
          <p className="text-[20px] font-bold tracking-[4px] text-black">MOTIF TERBARU</p>
          <Link href="/katalog" className="text-[15px] tracking-[1px] text-[#8a8a8a]">
            Lihat semua motif →
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {MOCK_PRODUCTS.slice(0, 4).map((produk) => (
            <ProductCard key={produk.kode} product={produk} imageHeight={320} />
          ))}
        </div>
      </section>

      {/* Kunjungi Kami */}
      <section className="flex flex-col items-center gap-10 bg-[#f2f2f2] p-6 md:p-[60px]">
        <p className="text-[20px] font-bold tracking-[4px] text-black">KUNJUNGI KAMI</p>
        <div className="flex w-full flex-col gap-10 md:flex-row md:items-start md:gap-[40px]">
          <div className="flex max-w-[520px] flex-1 flex-col gap-6">
            <div className="flex flex-col gap-2">
              <p className="text-[13px] font-semibold tracking-[2px] text-[#8a8a8a]">ALAMAT</p>
              <p className="max-w-[400px] text-[16px] leading-[1.5] text-[#333]">
                Jl. Kranggan Gg. VII, RT 10 / RW 01, Kelurahan Bubutan, Kecamatan Bubutan, Kota
                Surabaya, Jawa Timur 60174.
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-[13px] font-semibold tracking-[2px] text-[#8a8a8a]">JAM BUKA</p>
              <p className="text-[16px] leading-[1.5] text-[#333]">
                Senin – Sabtu: 08.00 – 17.00 WIB
                <br />
                Minggu: Tutup
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-[13px] font-semibold tracking-[2px] text-[#8a8a8a]">KONTAK</p>
              <p className="text-[16px] text-[#333]">{WHATSAPP_ADMIN_DISPLAY}</p>
              <p className="text-[16px] text-[#333]">@batik_okra_surabaya</p>
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <a
                href={waLink(WHATSAPP_ADMIN, "Halo, saya ingin bertanya tentang Batik Okra.")}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-[2px] bg-black px-6 py-[14px] text-[13px] font-semibold tracking-[2px] text-white"
              >
                <img src="/assets/whatsapp.svg" alt="" className="h-4 w-4" />
                HUBUNGI VIA WHATSAPP
              </a>
              <a
                href="https://instagram.com/batik_okra_surabaya"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-[2px] bg-white px-6 py-[14px] text-[13px] font-semibold tracking-[2px] text-black"
              >
                <img src="/assets/instagram.svg" alt="" className="h-4 w-4" />
                DM VIA INSTAGRAM
              </a>
            </div>
          </div>
          <div className="h-full w-[500px] flex-1 overflow-hidden rounded-[3px] bg-[#e0e0e0]">
            <img src={MAPS_IMG} alt="Peta lokasi Kampung Batik Okra Surabaya" className="h-full w-full object-cover" />
          </div>
        </div>
      </section>
    </>
  );
}
