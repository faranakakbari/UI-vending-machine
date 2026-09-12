import type { Driver } from "../data/mockData";
import StatusBadge from "./StatusBadge";

interface Props {
  driver: Driver;
  selected?: boolean;
  onClick?: () => void;
}

const statusLabel: Record<string, string> = {
  online: "آنلاین",
  driving: "در مسیر",
  visiting: "در حال ویزیت",
  delayed: "تأخیر در مسیر",
  offline: "آفلاین",
  problem: "مشکل",
};

export default function DriverCard({ driver, selected, onClick }: Props) {
  const progress = Math.round((driver.completedVisits / driver.totalVisits) * 100);
  const isOffline = driver.status === "offline";

  return (
    <div
      onClick={onClick}
      className={`p-3 rounded-xl border cursor-pointer transition-all ${
        selected
          ? "bg-blue-50 border-blue-300 shadow-sm"
          : "bg-white border-slate-200 hover:border-slate-300 hover:shadow-sm"
      }`}
    >
      <div className="flex items-center gap-3">
        <div className="relative flex-shrink-0">
          <div className={`w-9 h-9 rounded-full flex items-center justify-center text-white font-bold text-sm ${
            selected ? "bg-blue-600" : isOffline ? "bg-slate-300" : "bg-slate-600"
          }`}>
            {driver.avatar}
          </div>
          <span className={`absolute -bottom-0.5 -left-0.5 w-3 h-3 rounded-full border-2 border-white ${
            isOffline ? "bg-slate-400" :
            driver.status === "delayed" ? "bg-yellow-500" :
            driver.status === "problem" ? "bg-red-500" : "bg-green-500"
          }`} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-1">
            <span className="text-sm font-semibold text-slate-900 truncate">{driver.name}</span>
            <StatusBadge status={driver.status} size="sm" />
          </div>
          {isOffline ? (
            <div className="text-xs text-slate-400 mt-0.5">آخرین فعالیت: {driver.lastUpdate}</div>
          ) : (
            <div className="text-xs text-slate-500 mt-0.5">{statusLabel[driver.status] ?? driver.status}</div>
          )}
        </div>
      </div>

      {!isOffline && (
        <div className="mt-2.5 space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>🚗 {driver.vehicle}</span>
            <span className="font-medium text-slate-700">{driver.completedVisits} / {driver.totalVisits} ویزیت</span>
          </div>
          <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all ${
                driver.status === "delayed" ? "bg-yellow-500" : "bg-blue-500"
              }`}
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
