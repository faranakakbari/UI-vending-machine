import Header from "../components/Header";
import { performanceData, kpiData } from "../data/mockData";

const weekData = [
  { day: "شنبه", completed: 85, delayed: 13 },
  { day: "یکشنبه", completed: 98, delayed: 14 },
  { day: "دوشنبه", completed: 89, delayed: 16 },
  { day: "سه‌شنبه", completed: 72, delayed: 17 },
  { day: "چهارشنبه", completed: 105, delayed: 13 },
  { day: "پنجشنبه", completed: 112, delayed: 14 },
];

function WeeklyVisitChart() {
  const W = 720, H = 200, PL = 40, PR = 16, PT = 24, PB = 36;
  const chartW = W - PL - PR;
  const chartH = H - PT - PB;
  const maxVal = 140;
  const gridLines = [0, 40, 80, 120];
  const barWidth = chartW / weekData.length;
  const barGap = barWidth * 0.28;
  const barW = (barWidth - barGap * 2) / 2;

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-bold text-slate-900">روند ویزیت‌ها (هفته جاری)</h3>
        <div className="flex items-center gap-4 text-xs text-slate-500">
          <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm bg-blue-500 inline-block" />تکمیل‌شده</span>
          <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm bg-red-300 inline-block" />از دست رفته</span>
        </div>
      </div>
      <div className="overflow-x-auto">
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ minWidth: 420 }}>
          {/* Grid lines */}
          {gridLines.map((v) => {
            const y = PT + chartH - (v / maxVal) * chartH;
            return (
              <g key={v}>
                <line x1={PL} y1={y} x2={W - PR} y2={y} stroke="#e2e8f0" strokeWidth={1} />
                <text x={PL - 6} y={y + 4} textAnchor="end" fontSize={10} fill="#94a3b8" fontFamily="Vazirmatn">{v}</text>
              </g>
            );
          })}

          {/* Bars */}
          {weekData.map((d, i) => {
            const x = PL + i * barWidth + barGap;
            const compH = (d.completed / maxVal) * chartH;
            const delH = (d.delayed / maxVal) * chartH;
            const compY = PT + chartH - compH;
            const delY = PT + chartH - delH;
            const dayX = PL + i * barWidth + barWidth / 2;
            return (
              <g key={d.day}>
                {/* Completed bar */}
                <rect x={x} y={compY} width={barW} height={compH} fill="#3b82f6" rx={3} />
                <text x={x + barW / 2} y={compY - 4} textAnchor="middle" fontSize={9} fill="#3b82f6" fontFamily="Vazirmatn" fontWeight="600">{d.completed}</text>
                {/* Delayed bar */}
                <rect x={x + barW + 2} y={delY} width={barW} height={delH} fill="#fca5a5" rx={3} />
                <text x={x + barW + 2 + barW / 2} y={delY - 4} textAnchor="middle" fontSize={9} fill="#ef4444" fontFamily="Vazirmatn" fontWeight="600">{d.delayed}</text>
                {/* Day label */}
                <text x={dayX} y={H - 6} textAnchor="middle" fontSize={10} fill="#64748b" fontFamily="Vazirmatn">{d.day}</text>
              </g>
            );
          })}

          {/* Axis line */}
          <line x1={PL} y1={PT + chartH} x2={W - PR} y2={PT + chartH} stroke="#cbd5e1" strokeWidth={1.5} />
        </svg>
      </div>
    </div>
  );
}

export default function Reports() {
  return (
    <div className="flex flex-col h-full overflow-hidden bg-slate-50">
      <Header title="گزارش‌ها" subtitle="گزارش‌های عملکردی و آماری" />
      <div className="flex-1 overflow-auto hide-scroll p-6 space-y-5">
        {/* Report filters */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 flex items-center gap-3">
          <select className="text-xs border border-slate-200 rounded-lg px-3 py-2 text-slate-700 bg-white focus:outline-none focus:ring-1 focus:ring-blue-500">
            <option>این هفته</option>
            <option>این ماه</option>
            <option>امروز</option>
          </select>
          <button className="text-xs bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium">تولید گزارش</button>
          <button className="text-xs bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors font-medium mr-auto">📥 دریافت Excel</button>
        </div>

        {/* Summary stats */}
        <div className="grid grid-cols-4 gap-4">
          {[
            { label: "کل ویزیت‌ها", value: kpiData.totalVisits, sub: "امروز", color: "text-blue-700" },
            { label: "تکمیل‌شده", value: kpiData.completedVisits, sub: `${kpiData.completionRate}٪ از برنامه`, color: "text-green-700" },
            { label: "از دست رفته", value: kpiData.delayedVisits, sub: "نیاز به بررسی", color: "text-red-600" },
            { label: "مسافت کل", value: `${kpiData.totalDistance} km`, sub: "توسط همه رانندگان", color: "text-slate-800" },
          ].map((s) => (
            <div key={s.label} className="bg-white rounded-xl border border-slate-200 shadow-sm p-4">
              <div className="text-xs text-slate-500 mb-1">{s.label}</div>
              <div className={`text-3xl font-bold ${s.color}`}>{s.value}</div>
              <div className="text-xs text-slate-400 mt-1">{s.sub}</div>
            </div>
          ))}
        </div>

        {/* Weekly visit trend — proper chart */}
        <WeeklyVisitChart />

        {/* Driver summary table */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-100">
            <h3 className="text-sm font-bold text-slate-900">خلاصه عملکرد رانندگان</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  {["راننده", "ویزیت برنامه", "تکمیل‌شده", "به‌موقع", "مسافت", "پایبندی"].map((h) => (
                    <th key={h} className="px-4 py-3 text-right text-slate-500 font-semibold whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {performanceData.drivers.map((d) => (
                  <tr key={d.code} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                    <td className="px-4 py-3 font-medium text-slate-900 whitespace-nowrap">{d.name}</td>
                    <td className="px-4 py-3 text-slate-600">{d.totalVisits}</td>
                    <td className="px-4 py-3 font-semibold text-green-600">{d.completed}</td>
                    <td className="px-4 py-3">
                      <span className={`font-semibold ${d.onTime >= 90 ? "text-green-600" : d.onTime >= 75 ? "text-yellow-600" : "text-red-600"}`}>
                        {d.onTime}٪
                      </span>
                    </td>
                    <td className="px-4 py-3 text-slate-600">{d.distanceKm} km</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden w-16">
                          <div className={`h-full rounded-full ${d.routeAdherence >= 90 ? "bg-green-500" : d.routeAdherence >= 80 ? "bg-yellow-500" : "bg-red-500"}`} style={{ width: `${d.routeAdherence}%` }} />
                        </div>
                        <span className={`font-semibold ${d.routeAdherence >= 90 ? "text-green-600" : "text-yellow-600"}`}>{d.routeAdherence}٪</span>
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
