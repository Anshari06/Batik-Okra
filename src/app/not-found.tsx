import NotFoundContent from "@/components/NotFoundContent";

// 404 untuk URL di luar route group (tidak dapat Header/Footer)
export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <NotFoundContent />
    </div>
  );
}
