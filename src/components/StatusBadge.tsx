import type { DriverStatus, VisitStatus } from "../data/mockData";

type Status = DriverStatus | VisitStatus;

const configs: Record<string, { label: string; bg: string; text: string; dot: string }> = {
  online: { label: "آنلاین", bg: "bg-green-50", text: "text-green-700", dot: "bg-green-500" },
  driving: { label: "در مسیر", bg: "bg-blue-50", text: "text-blue-700", dot: "bg-blue-500" },
  visiting: { label: "در حال ویزیت", bg: "bg-orange-50", text: "text-orange-700", dot: "bg-orange-500" },
  delayed: { label: "تأخیر", bg: "bg-yellow-50", text: "text-yellow-700", dot: "bg-yellow-500" },
  problem: { label: "مشکل", bg: "bg-red-50", text: "text-red-700", dot: "bg-red-500" },
  offline: { label: "آفلاین", bg: "bg-slate-100", text: "text-slate-500", dot: "bg-slate-400" },
  completed: { label: "انجام شد", bg: "bg-green-50", text: "text-green-700", dot: "bg-green-500" },
  planned: { label: "برنامه‌ریزی‌شده", bg: "bg-slate-100", text: "text-slate-500", dot: "bg-slate-400" },
  missed: { label: "از دست‌رفته", bg: "bg-red-50", text: "text-red-700", dot: "bg-red-500" },
};

interface Props {
  status: Status;
  size?: "sm" | "md";
}

export default function StatusBadge({ status, size = "md" }: Props) {
  const c = configs[status] ?? configs.offline;
  const px = size === "sm" ? "px-2 py-0.5 text-xs" : "px-2.5 py-1 text-xs";
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full font-medium ${c.bg} ${c.text} ${px}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${c.dot} flex-shrink-0`} />
      {c.label}
    </span>
  );
}
