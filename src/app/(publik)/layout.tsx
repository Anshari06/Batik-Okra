import type { ReactNode } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TanyaButton from "@/components/TanyaButton";

// Semua halaman publik; /admin & /login sengaja di luar group ini
export default function PublicLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <TanyaButton />
    </div>
  );
}
