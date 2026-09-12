interface Props {
  icon: string;
  label: string;
  value: string | number;
  secondary?: string;
  trend?: "up" | "down" | "neutral";
  trendValue?: string;
  color?: "blue" | "green" | "orange" | "red" | "slate";
}

const colorMap = {
  blue: { icon: "bg-blue-100 text-blue-600", border: "border-blue-200", val: "text-blue-700" },
  green: { icon: "bg-green-100 text-green-600", border: "border-green-200", val: "text-green-700" },
  orange: { icon: "bg-orange-100 text-orange-600", border: "border-orange-200", val: "text-orange-700" },
  red: { icon: "bg-red-100 text-red-600", border: "border-red-200", val: "text-red-700" },
  slate: { icon: "bg-slate-100 text-slate-600", border: "border-slate-200", val: "text-slate-700" },
};

export default function KPICard({ icon, label, value, secondary, color = "blue" }: Props) {
  const c = colorMap[color];
  return (
    <div className={`bg-white rounded-xl border ${c.border} p-4 shadow-sm flex flex-col gap-2 hover:shadow-md transition-shadow`}>
      <div className="flex items-center justify-between">
        <span className="text-sm text-slate-500 font-medium">{label}</span>
        <div className={`w-9 h-9 rounded-lg ${c.icon} flex items-center justify-center text-lg flex-shrink-0`}>{icon}</div>
      </div>
      <div className={`text-3xl font-bold ${c.val}`}>{value}</div>
      {secondary && <div className="text-xs text-slate-500">{secondary}</div>}
    </div>
  );
}
