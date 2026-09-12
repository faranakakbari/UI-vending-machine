import { useParams, useNavigate } from "react-router";
import Header from "../components/Header";
import StatusBadge from "../components/StatusBadge";
import { drivers, visits } from "../data/mockData";

export default function DriverDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const driver = drivers.find((d) => d.id === id) ?? drivers[0];
  const driverVisits = visits.filter((v) => v.driverId === driver.id).sort((a, b) => a.order - b.order);

  return (
    <div className="flex flex-col h-full overflow-hidden bg-slate-50">
      <Header title={`جزئیات راننده — ${driver.name}`} subtitle="اطلاعات کامل، وضعیت فعلی و عملکرد" />
      <div className="flex-1 overflow-auto hide-scroll p-6 space-y-5">
        {/* Driver header */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 flex items-center gap-5">
          <div className="w-16 h-16 rounded-full bg-blue-600 flex items-center justify-center text-white text-2xl font-bold flex-shrink-0">
            {driver.avatar}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-3">
              <h2 className="text-xl font-bold text-slate-900">{driver.name}</h2>
              <StatusBadge status={driver.status} />
              <span className="text-sm text-slate-400 font-mono">{driver.code}</span>
            </div>
            <div className="flex gap-4 mt-1 text-sm text-slate-500">
              <span>📱 {driver.phone}</span>
              <span>🚗 {driver.vehicle}</span>
              <span>🪪 {driver.plate}</span>
            </div>
          </div>
          <div className="flex gap-2">
            <button onClick={() => navigate("/drivers")} className="text-sm bg-slate-100 text-slate-700 px-4 py-2 rounded-xl hover:bg-slate-200 transition-colors">← بازگشت</button>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-5">
          {/* Stats */}
          <div className="col-span-6 space-y-4">
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4">
              <h3 className="text-xs font-bold text-slate-700 mb-3">آمار امروز</h3>
              <div className="grid grid-cols-2 gap-2">
                {[
                  ["شروع کار", driver.startTime],
                  ["ویزیت", `${driver.completedVisits}/${driver.totalVisits}`],
                  ["مسافت", `${driver.distanceKm} km`],
                  ["زمان رانندگی", driver.drivingTime],
                  ["تأخیر", `${driver.delayedVisits} مورد`],
                  ["پایبندی", `${driver.routeAdherence}٪`],
                ].map(([k, v]) => (
                  <div key={k} className="bg-slate-50 rounded-lg p-2.5">
                    <div className="text-xs text-slate-400">{k}</div>
                    <div className="text-sm font-bold text-slate-900 mt-0.5">{v}</div>
                  </div>
                ))}
              </div>
              <div className="mt-4">
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="text-slate-500">پیشرفت امروز</span>
                  <span className="font-bold text-blue-600">{Math.round((driver.completedVisits / driver.totalVisits) * 100)}٪</span>
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500 rounded-full" style={{ width: `${Math.round((driver.completedVisits / driver.totalVisits) * 100)}%` }} />
                </div>
              </div>
            </div>

            {/* Visit timeline */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4">
              <h3 className="text-xs font-bold text-slate-700 mb-3">برنامه ویزیت</h3>
              <div className="space-y-3">
                {driverVisits.map((v, i) => (
                  <div key={i} className="flex gap-3 items-start">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs flex-shrink-0 ${
                      v.status === "completed" ? "bg-green-100 text-green-700" :
                      v.status === "visiting" ? "bg-orange-100 text-orange-700" :
                      "bg-slate-100 text-slate-500"
                    }`}>
                      {v.status === "completed" ? "✓" : v.status === "visiting" ? "●" : "○"}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-medium text-slate-900 truncate">{v.customerName}</div>
                      <div className="text-xs text-slate-400">{v.scheduledTime}{v.arrivalTime ? ` · ورود: ${v.arrivalTime}` : ""}</div>
                    </div>
                    <StatusBadge status={v.status} size="sm" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Performance history */}
          <div className="col-span-6 bg-white rounded-xl border border-slate-200 shadow-sm p-4">
            <h3 className="text-xs font-bold text-slate-700 mb-3">عملکرد هفته اخیر</h3>
            <div className="space-y-2">
              {[
                { day: "شنبه", completed: 8, total: 9 },
                { day: "یکشنبه", completed: 7, total: 9 },
                { day: "دوشنبه", completed: 9, total: 9 },
                { day: "سه‌شنبه", completed: 8, total: 10 },
                { day: "چهارشنبه", completed: 9, total: 9 },
              ].map((row) => (
                <div key={row.day} className="flex items-center gap-3 text-xs">
                  <span className="text-slate-500 w-16 flex-shrink-0">{row.day}</span>
                  <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500 rounded-full" style={{ width: `${Math.round((row.completed / row.total) * 100)}%` }} />
                  </div>
                  <span className="text-slate-600 font-medium w-10 flex-shrink-0 text-left">{row.completed}/{row.total}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 grid grid-cols-2 gap-3">
              <div className="bg-blue-50 rounded-lg p-2.5 text-xs">
                <div className="text-slate-400">میانگین پایبندی</div>
                <div className="font-bold text-blue-700 text-sm mt-0.5">{driver.routeAdherence}٪</div>
              </div>
              <div className="bg-green-50 rounded-lg p-2.5 text-xs">
                <div className="text-slate-400">مسافت هفتگی</div>
                <div className="font-bold text-green-700 text-sm mt-0.5">{driver.distanceKm * 5} km</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
