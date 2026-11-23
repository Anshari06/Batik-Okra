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

export const formatRupiah = (nilai: number): string =>
  `Rp ${new Intl.NumberFormat("id-ID").format(nilai)}`;

export const waLink = (nomor: string, pesan: string): string =>
  `https://wa.me/${nomor}?text=${encodeURIComponent(pesan)}`;
