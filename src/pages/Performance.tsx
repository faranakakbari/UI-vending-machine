import Header from "../components/Header";
import { performanceData } from "../data/mockData";

const perf = performanceData.drivers;

export default function Performance() {
  const avgOnTime = Math.round(perf.reduce((s, d) => s + d.onTime, 0) / perf.length);
  const avgAdherence = Math.round(perf.reduce((s, d) => s + d.routeAdherence, 0) / perf.length);
  const totalCompleted = perf.reduce((s, d) => s + d.completed, 0);
  const totalMissed = perf.reduce((s, d) => s + (d.totalVisits - d.completed), 0);

  return (
    <div className="flex flex-col h-full overflow-hidden bg-slate-50">
      <Header title="عملکرد رانندگان" subtitle="تحلیل و مقایسه عملکرد تمام رانندگان" />
      <div className="flex-1 overflow-auto hide-scroll p-6 space-y-5">
        {/* Filters */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 flex gap-3 items-center">
          {["تاریخ", "راننده"].map((f) => (
            <select key={f} className="text-xs border border-slate-200 rounded-lg px-3 py-2 text-slate-700 bg-white focus:outline-none focus:ring-1 focus:ring-blue-500">
              <option>{f}: همه</option>
            </select>
          ))}
          <button className="text-xs bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium">اعمال فیلتر</button>
        </div>

        {/* KPI cards */}
        <div className="grid grid-cols-6 gap-4">
          {[
            { label: "میانگین زمان ویزیت", value: "۱۶ دقیقه", icon: "⏱️", col: "blue" },
            { label: "نرخ انجام به‌موقع", value: `${avgOnTime}٪`, icon: "✅", col: "green" },
            { label: "پایبندی به مسیر", value: `${avgAdherence}٪`, icon: "🗺️", col: "blue" },
            { label: "ویزیت تکمیل‌شده", value: totalCompleted, icon: "📍", col: "green" },
            { label: "ویزیت از دست‌رفته", value: totalMissed, icon: "❌", col: "red" },
            { label: "مسافت طی‌شده", value: `${perf.reduce((s, d) => s + d.distanceKm, 0)} km`, icon: "🛣️", col: "slate" },
          ].map((c) => (
            <div key={c.label} className="bg-white rounded-xl border border-slate-200 shadow-sm p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-slate-500">{c.label}</span>
                <span className="text-lg">{c.icon}</span>
              </div>
              <div className={`text-2xl font-bold ${c.col === "green" ? "text-green-700" : c.col === "red" ? "text-red-600" : "text-slate-900"}`}>{c.value}</div>
            </div>
          ))}
        </div>

        {/* Bar chart — simple SVG */}
        <div className="grid grid-cols-2 gap-5">
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
            <h3 className="text-sm font-bold text-slate-900 mb-4">ویزیت‌های تکمیل‌شده به ازای راننده</h3>
            <div className="space-y-3">
              {perf.map((d) => (
                <div key={d.code} className="flex items-center gap-3">
                  <div className="text-xs text-slate-600 w-24 text-right truncate">{d.name.split(" ")[0]}</div>
                  <div className="flex-1 h-6 bg-slate-100 rounded-lg overflow-hidden">
                    <div
                      className="h-full bg-blue-500 rounded-lg flex items-center justify-end pr-2 transition-all"
                      style={{ width: `${(d.completed / d.totalVisits) * 100}%` }}
                    >
                      <span className="text-white text-xs font-bold">{d.completed}</span>
                    </div>
                  </div>
                  <div className="text-xs text-slate-400 w-6">{d.totalVisits}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
            <h3 className="text-sm font-bold text-slate-900 mb-4">پایبندی به مسیر</h3>
            <div className="space-y-3">
              {perf.map((d) => (
                <div key={d.code} className="flex items-center gap-3">
                  <div className="text-xs text-slate-600 w-24 text-right truncate">{d.name.split(" ")[0]}</div>
                  <div className="flex-1 h-6 bg-slate-100 rounded-lg overflow-hidden">
                    <div
                      className={`h-full rounded-lg flex items-center justify-end pr-2 transition-all ${
                        d.routeAdherence >= 90 ? "bg-green-500" : d.routeAdherence >= 80 ? "bg-yellow-500" : "bg-red-500"
                      }`}
                      style={{ width: `${d.routeAdherence}%` }}
                    >
                      <span className="text-white text-xs font-bold">{d.routeAdherence}٪</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Driver comparison table */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-100">
            <h3 className="text-sm font-bold text-slate-900">مقایسه عملکرد رانندگان</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  {["رتبه", "راننده", "کد", "ویزیت کل", "تکمیل‌شده", "به‌موقع", "مسافت", "پایبندی به مسیر", "امتیاز"].map((h) => (
                    <th key={h} className="px-4 py-3 text-right text-slate-500 font-semibold whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[...perf].sort((a, b) => b.rating - a.rating).map((d, i) => (
                  <tr key={d.code} className={`border-b border-slate-100 hover:bg-slate-50 transition-colors ${i === 0 ? "bg-green-50/50" : ""}`}>
                    <td className="px-4 py-3">
                      <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold inline-flex ${
                        i === 0 ? "bg-yellow-400 text-yellow-900" :
                        i === 1 ? "bg-slate-300 text-slate-700" :
                        i === 2 ? "bg-orange-300 text-orange-800" : "bg-slate-100 text-slate-500"
                      }`}>
                        {i + 1}
                      </span>
                    </td>
                    <td className="px-4 py-3 font-medium text-slate-900 whitespace-nowrap">{d.name}</td>
                    <td className="px-4 py-3 text-slate-400 font-mono">{d.code}</td>
                    <td className="px-4 py-3 text-slate-700">{d.totalVisits}</td>
                    <td className="px-4 py-3 font-semibold text-green-600">{d.completed}</td>
                    <td className="px-4 py-3">
                      <span className={`font-semibold ${d.onTime >= 90 ? "text-green-600" : d.onTime >= 75 ? "text-yellow-600" : "text-red-600"}`}>
                        {d.onTime}٪
                      </span>
                    </td>
                    <td className="px-4 py-3 text-slate-600">{d.distanceKm} km</td>
                    <td className="px-4 py-3">
                      <span className={`font-semibold ${d.routeAdherence >= 90 ? "text-green-600" : d.routeAdherence >= 80 ? "text-yellow-600" : "text-red-600"}`}>
                        {d.routeAdherence}٪
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        {"★".repeat(Math.round(d.rating))}{"☆".repeat(5 - Math.round(d.rating))}
                        <span className="text-slate-500 mr-1">{d.rating}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
