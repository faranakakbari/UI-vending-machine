import { useState } from "react";
import Header from "../components/Header";
import { alerts as initialAlerts } from "../data/mockData";
import type { Alert } from "../data/mockData";

const severityConfig = {
  critical: { bg: "bg-red-50", border: "border-red-200", icon: "🔴", text: "text-red-700", badge: "bg-red-100 text-red-700" },
  warning: { bg: "bg-orange-50", border: "border-orange-200", icon: "🟠", text: "text-orange-700", badge: "bg-orange-100 text-orange-700" },
  info: { bg: "bg-blue-50", border: "border-blue-200", icon: "🔵", text: "text-blue-700", badge: "bg-blue-100 text-blue-700" },
};

const typeLabel: Record<Alert["type"], string> = {
  delayed: "ویزیت عقب‌افتاده",
  deviation: "انحراف از مسیر",
  long_stop: "توقف طولانی",
  geofence: "ورود به مشتری",
  offline: "آفلاین شدن",
};

export default function Alerts() {
  const [alerts, setAlerts] = useState(initialAlerts);

  const markRead = (id: string) => {
    setAlerts((prev) => prev.map((a) => (a.id === id ? { ...a, read: true } : a)));
  };

  const unread = alerts.filter((a) => !a.read);
  const read = alerts.filter((a) => a.read);

  return (
    <div className="flex flex-col h-full overflow-hidden bg-slate-50">
      <Header title="هشدارها" subtitle="مرکز هشدار و رویدادهای نیازمند توجه" />
      <div className="flex-1 overflow-auto hide-scroll p-6 space-y-5">
        {/* Summary */}
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: "هشدارهای بحرانی", value: alerts.filter((a) => a.severity === "critical").length, cls: "bg-red-50 border-red-200 text-red-700" },
            { label: "هشدارهای اخطاری", value: alerts.filter((a) => a.severity === "warning").length, cls: "bg-orange-50 border-orange-200 text-orange-700" },
            { label: "اطلاع‌رسانی", value: alerts.filter((a) => a.severity === "info").length, cls: "bg-blue-50 border-blue-200 text-blue-700" },
          ].map((c) => (
            <div key={c.label} className={`rounded-xl border p-4 ${c.cls}`}>
              <div className="text-2xl font-bold">{c.value}</div>
              <div className="text-sm mt-1 opacity-80">{c.label}</div>
            </div>
          ))}
        </div>

        {/* Unread */}
        {unread.length > 0 && (
          <div>
            <h2 className="text-sm font-bold text-slate-900 mb-3">هشدارهای جدید ({unread.length})</h2>
            <div className="space-y-3">
              {unread.map((a) => {
                const sc = severityConfig[a.severity];
                return (
                  <div key={a.id} className={`rounded-xl border ${sc.bg} ${sc.border} p-4 flex items-start gap-4`}>
                    <span className="text-xl flex-shrink-0 mt-0.5">{sc.icon}</span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${sc.badge}`}>{typeLabel[a.type]}</span>
                        <span className="text-xs text-slate-500">{a.time}</span>
                      </div>
                      <div className="text-sm font-semibold text-slate-900">{a.driverName}</div>
                      {a.customerName && <div className="text-xs text-slate-600">{a.customerName}</div>}
                      <div className={`text-xs mt-1 ${sc.text}`}>{a.description}</div>
                    </div>
                    <div className="flex gap-2 flex-shrink-0">
                      <button onClick={() => markRead(a.id)} className="text-xs bg-white border border-slate-200 text-slate-700 px-3 py-1.5 rounded-lg hover:bg-slate-50 transition-colors font-medium">
                        خواندم
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Read */}
        {read.length > 0 && (
          <div>
            <h2 className="text-sm font-bold text-slate-500 mb-3">هشدارهای خوانده‌شده ({read.length})</h2>
            <div className="space-y-2">
              {read.map((a) => (
                <div key={a.id} className="rounded-xl border border-slate-200 bg-white p-4 flex items-center gap-4 opacity-60">
                  <span className="text-lg">{severityConfig[a.severity].icon}</span>
                  <div className="flex-1">
                    <div className="text-xs font-medium text-slate-700">{a.driverName} — {typeLabel[a.type]}</div>
                    <div className="text-xs text-slate-500">{a.description}</div>
                  </div>
                  <span className="text-xs text-slate-400">{a.time}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {alerts.length === 0 && (
          <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
            <div className="text-slate-200 text-5xl mb-4">✅</div>
            <div className="text-slate-500 font-medium">هیچ هشداری وجود ندارد</div>
            <div className="text-slate-400 text-sm mt-1">همه رانندگان در وضعیت مطلوب هستند</div>
          </div>
        )}
      </div>
    </div>
  );
}
