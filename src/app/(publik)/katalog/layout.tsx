import type { Metadata } from "next";
import type { ReactNode } from "react";

// Halaman katalog adalah client component, jadi metadata ditaruh di layout segmen.
export const metadata: Metadata = {
  title: "Katalog Motif — Batik Okra Surabaya",
  description:
    "Katalog batik tulis Batik Okra Surabaya. Setiap motif hanya satu — cek ketersediaannya sebelum datang.",
};

export default function KatalogLayout({ children }: { children: ReactNode }) {
  return children;
}
