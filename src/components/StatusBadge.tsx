import { STATUS_LABEL, STATUS_STYLE, type ProductStatus } from "@/lib/constants";

export default function StatusBadge({ status }: { status: ProductStatus }) {
  return (
    <span
      className={`inline-block rounded-[2px] px-[10px] py-[4px] text-[10px] font-semibold leading-none tracking-[1px] ${STATUS_STYLE[status]}`}
    >
      {STATUS_LABEL[status]}
    </span>
  );
}
