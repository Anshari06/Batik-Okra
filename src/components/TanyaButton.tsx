import { MessageCircle } from "lucide-react";

export default function TanyaButton({ onClick }: { onClick?: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-[24px] bg-black px-6 py-3 text-[13px] font-semibold text-white md:bottom-[50px] md:right-[50px]"
    >
      <MessageCircle size={16} />
      Tanya
    </button>
  );
}
