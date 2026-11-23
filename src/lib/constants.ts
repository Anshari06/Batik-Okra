export type ProductStatus = "TERSEDIA" | "TERJUAL";

// Satu-satunya sumber teks & warna badge (aturan project-context.md)
export const STATUS_LABEL: Record<ProductStatus, string> = {
  TERSEDIA: "Tersedia",
  TERJUAL: "Terjual",
};

export const STATUS_STYLE: Record<ProductStatus, string> = {
  TERSEDIA: "bg-white text-black",
  TERJUAL: "bg-[#e0e0e0] text-[#555]",
};

// Format untuk wa.me (hanya digit, tanpa +/spasi) — bukan env frontend
export const WHATSAPP_ADMIN = "6281234567890";
// Format tampilan di UI
export const WHATSAPP_ADMIN_DISPLAY = "+62 812-3456-7890";

// Opsi filter katalog — label & warna dirujuk dari Figma frame 829:246
export const KATEGORI_OPTIONS = [
  { value: "parang", label: "Parang" },
  { value: "kawung", label: "Kawung" },
  { value: "mega-mendung", label: "Mega Mendung" },
  { value: "truntum", label: "Truntum" },
] as const;

export const WARNA_OPTIONS = [
  { value: "biru", hex: "#1A3A5C" },
  { value: "coklat", hex: "#8B4513" },
  { value: "hijau", hex: "#2E7D32" },
  { value: "merah", hex: "#C62828" },
  { value: "kuning", hex: "#F9A825" },
  { value: "ungu", hex: "#4A148C" },
  { value: "hitam", hex: "#000000" },
  { value: "abu", hex: "#E0E0E0" },
] as const;

export const ASAL_OPTIONS = [
  "Surabaya",
  "Cirebon",
  "Pekalongan",
  "Yogyakarta",
  "Solo",
] as const;

export const formatRupiah = (nilai: number): string =>
  `Rp ${new Intl.NumberFormat("id-ID").format(nilai)}`;

export const waLink = (nomor: string, pesan: string): string =>
  `https://wa.me/${nomor}?text=${encodeURIComponent(pesan)}`;
