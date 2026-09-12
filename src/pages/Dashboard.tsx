import { useState } from "react";
import { useNavigate } from "react-router";
import Header from "../components/Header";
import KPICard from "../components/KPICard";
import DriverCard from "../components/DriverCard";
import LiveMap from "../components/LiveMap";
import StatusBadge from "../components/StatusBadge";
import { drivers, customers, visits, kpiData } from "../data/mockData";

type Tab = "all" | "online" | "offline";

export default function Dashboard() {
  const navigate = useNavigate();
  const [selectedDriverId, setSelectedDriverId] = useState<string>("drv-001");
  const [tab, setTab] = useState<Tab>("all");
  const [showAllDrivers, setShowAllDrivers] = useState(true);

  const selectedDriver = drivers.find((d) => d.id === selectedDriverId);
  const selectedDriverVisits = visits.filter((v) => v.driverId === selectedDriverId).sort((a, b) => a.order - b.order);
  const currentVisit = selectedDriverVisits.find((v) => v.status === "visiting");
  const nextVisit = selectedDriverVisits.find((v) => v.status === "planned");

  const filteredDrivers = drivers.filter((d) => {
    if (tab === "online") return d.status !== "offline";
    if (tab === "offline") return d.status === "offline";
    return true;
  });

  const tabs: { key: Tab; label: string; count: number }[] = [
    { key: "all", label: "همه", count: drivers.length },
    { key: "online", label: "آنلاین", count: drivers.filter((d) => d.status !== "offline").length },
    { key: "offline", label: "آفلاین", count: drivers.filter((d) => d.status === "offline").length },
  ];

  return (
    <div className="flex flex-col h-full overflow-hidden bg-slate-50">
      <Header title="پایش ویزیت رانندگان" subtitle="نمای لحظه‌ای وضعیت، موقعیت و عملکرد رانندگان" />

      {/* Filter toolbar */}
      <div className="px-6 py-3 bg-white border-b border-slate-200 flex items-center gap-3 flex-wrap">
        <div className="flex items-center gap-1.5 text-sm">
          <span className="text-slate-500 text-xs">تاریخ:</span>
          <select className="text-xs border border-slate-200 rounded-lg px-2.5 py-1.5 text-slate-700 bg-white focus:outline-none focus:ring-1 focus:ring-blue-500">
            <option>امروز، ۲۴ اردیبهشت ۱۴۰۴</option>
          </select>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="text-slate-500 text-xs">راننده:</span>
          <select className="text-xs border border-slate-200 rounded-lg px-2.5 py-1.5 text-slate-700 bg-white focus:outline-none focus:ring-1 focus:ring-blue-500">
            <option>همه رانندگان</option>
            {drivers.map((d) => <option key={d.id}>{d.name}</option>)}
          </select>
        </div>
        <button className="text-xs bg-blue-600 text-white px-3 py-1.5 rounded-lg hover:bg-blue-700 transition-colors font-medium">اعمال فیلتر</button>
        <button className="text-xs bg-slate-100 text-slate-600 px-3 py-1.5 rounded-lg hover:bg-slate-200 transition-colors">پاک کردن</button>
      </div>

      <div className="flex-1 overflow-auto hide-scroll">
        {/* KPI Cards */}
        <div className="px-6 pt-4 pb-3 grid grid-cols-7 gap-3">
          <KPICard icon="🚚" label="کل رانندگان" value={kpiData.totalDrivers} secondary={`${kpiData.onlineDrivers} آنلاین · ${kpiData.offlineDrivers} آفلاین`} color="slate" />
          <KPICard icon="📍" label="ویزیت‌های امروز" value={kpiData.totalVisits} color="blue" />
          <KPICard icon="✅" label="ویزیت تکمیل‌شده" value={kpiData.completedVisits} secondary={`${kpiData.completionRate}٪ از برنامه`} color="green" />
          <KPICard icon="🟠" label="در حال ویزیت" value={kpiData.activeVisits} color="orange" />
          <KPICard icon="⏰" label="ویزیت از دست رفته" value={kpiData.delayedVisits} color="red" />
          <KPICard icon="🛣️" label="مسافت طی‌شده" value={`${kpiData.totalDistance} km`} color="blue" />
          <KPICard icon="⚠️" label="انحراف از مسیر" value={`${kpiData.deviations} مورد`} color="orange" />
        </div>

        {/* Main 3-col layout */}
        <div className="px-6 pb-4 grid grid-cols-12 gap-4" style={{ minHeight: 480 }}>
          {/* Left: Driver list */}
          <div className="col-span-3 flex flex-col gap-2 bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="px-4 pt-4 pb-2 border-b border-slate-100">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-sm font-bold text-slate-900">رانندگان</h2>
                <span className="text-xs text-slate-400">{filteredDrivers.length} راننده</span>
              </div>
              <input
                type="text"
                placeholder="جستجوی راننده..."
                className="w-full text-xs border border-slate-200 rounded-lg px-3 py-2 text-slate-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
              <div className="flex gap-1 mt-2 overflow-x-auto hide-scroll">
                {tabs.map((t) => (
                  <button
                    key={t.key}
                    onClick={() => setTab(t.key)}
                    className={`flex-shrink-0 text-xs px-2.5 py-1 rounded-lg font-medium transition-colors ${
                      tab === t.key ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }`}
                  >
                    {t.label} {t.count}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex-1 overflow-y-auto hide-scroll px-3 pb-3 space-y-2 pt-2">
              {filteredDrivers.map((d) => (
                <DriverCard
                  key={d.id}
                  driver={d}
                  selected={d.id === selectedDriverId}
                  onClick={() => setSelectedDriverId(d.id)}
                />
              ))}
            </div>
            <div className="px-3 pb-3">
              <button
                onClick={() => navigate("/drivers")}
                className="w-full text-xs text-blue-600 border border-blue-200 rounded-lg py-2 hover:bg-blue-50 transition-colors font-medium"
              >
                مشاهده همه رانندگان
              </button>
            </div>
          </div>

          {/* Center: Map */}
          <div className="col-span-6 rounded-xl overflow-hidden" style={{ minHeight: 480 }}>
            <LiveMap
              drivers={drivers}
              customers={customers}
              visits={visits}
              selectedDriverId={selectedDriverId}
              onSelectDriver={setSelectedDriverId}
              showAllDrivers={showAllDrivers}
            />
          </div>

          {/* Right: Driver detail */}
          <div className="col-span-3 flex flex-col gap-3 overflow-y-auto hide-scroll">
            {selectedDriver ? (
              <>
                {/* Header */}
                <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                      {selectedDriver.avatar}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-bold text-slate-900">{selectedDriver.name}</div>
                      <StatusBadge status={selectedDriver.status} size="sm" />
                    </div>
                  </div>
                </div>

                {/* Driver info */}
                <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4">
                  <h3 className="text-xs font-bold text-slate-700 mb-3 pb-2 border-b border-slate-100">اطلاعات راننده</h3>
                  <div className="space-y-2">
                    {[
                      ["کد راننده", selectedDriver.code],
                      ["موبایل", selectedDriver.phone],
                      ["خودرو", selectedDriver.vehicle],
                      ["پلاک", selectedDriver.plate],
                    ].map(([k, v]) => (
                      <div key={k} className="flex justify-between text-xs">
                        <span className="text-slate-400">{k}:</span>
                        <span className="text-slate-700 font-medium">{v}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Today stats */}
                <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4">
                  <h3 className="text-xs font-bold text-slate-700 mb-3 pb-2 border-b border-slate-100">آمار امروز</h3>
                  <div className="grid grid-cols-2 gap-2 mb-3">
                    {[
                      ["شروع کار", selectedDriver.startTime],
                      ["ویزیت", `${selectedDriver.completedVisits} / ${selectedDriver.totalVisits}`],
                      ["مسافت", `${selectedDriver.distanceKm} km`],
                      ["زمان رانندگی", selectedDriver.drivingTime],
                      ["عقب‌افتاده", `${selectedDriver.delayedVisits} مورد`],
                      ["پایبندی مسیر", `${selectedDriver.routeAdherence}٪`],
                    ].map(([k, v]) => (
                      <div key={k} className="bg-slate-50 rounded-lg p-2">
                        <div className="text-xs text-slate-400">{k}</div>
                        <div className="text-sm font-bold text-slate-800 mt-0.5">{v}</div>
                      </div>
                    ))}
                  </div>
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-slate-500 font-medium">پیشرفت امروز</span>
                      <span className="font-bold text-blue-600">{Math.round((selectedDriver.completedVisits / selectedDriver.totalVisits) * 100)}٪</span>
                    </div>
                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500 rounded-full" style={{ width: `${Math.round((selectedDriver.completedVisits / selectedDriver.totalVisits) * 100)}%` }} />
                    </div>
                  </div>
                </div>

                {/* Current visit */}
                {currentVisit && (
                  <div className="bg-orange-50 rounded-xl border border-orange-200 shadow-sm p-4">
                    <h3 className="text-xs font-bold text-orange-700 mb-2">ویزیت فعلی</h3>
                    <div className="font-semibold text-slate-900 text-sm mb-2">{currentVisit.customerName}</div>
                    <StatusBadge status="visiting" size="sm" />
                    <div className="space-y-1.5 mt-2">
                      {[
                        ["زمان ورود", currentVisit.arrivalTime ?? "—"],
                        ["مدت ویزیت", `${currentVisit.duration} دقیقه`],
                        ["فاصله از مسیر", `${currentVisit.distanceFromRoute} متر`],
                      ].map(([k, v]) => (
                        <div key={k} className="flex justify-between text-xs">
                          <span className="text-slate-500">{k}:</span>
                          <span className="text-slate-700 font-medium">{v}</span>
                        </div>
                      ))}
                    </div>
                    <button
                      onClick={() => navigate("/visits")}
                      className="mt-3 w-full text-xs bg-orange-500 text-white py-1.5 rounded-lg hover:bg-orange-600 transition-colors font-medium"
                    >
                      مشاهده جزئیات ویزیت
                    </button>
                  </div>
                )}

                {/* Next visit */}
                {nextVisit && (
                  <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4">
                    <h3 className="text-xs font-bold text-slate-700 mb-2">مشتری بعدی</h3>
                    <div className="font-semibold text-slate-900 text-sm mb-2">{nextVisit.customerName}</div>
                    <div className="space-y-1.5">
                      {[
                        ["زمان ورود", nextVisit.scheduledTime],
                        ["فاصله", "۳.۲ کیلومتر"],
                        ["زمان تخمینی رسیدن", "۱۴:۱۸"],
                      ].map(([k, v]) => (
                        <div key={k} className="flex justify-between text-xs">
                          <span className="text-slate-400">{k}:</span>
                          <span className="text-slate-700 font-medium">{v}</span>
                        </div>
                      ))}
                    </div>
                    <button
                      onClick={() => setShowAllDrivers(false)}
                      className="mt-3 w-full text-xs bg-blue-600 text-white py-1.5 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                    >
                      نمایش روی نقشه
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="bg-white rounded-xl border border-slate-200 p-8 text-center">
                <div className="text-slate-300 text-4xl mb-3">🚚</div>
                <div className="text-sm text-slate-500">راننده‌ای انتخاب نشده</div>
              </div>
            )}
          </div>
        </div>

        {/* Visit Timeline — full width */}
        {selectedDriver && (
          <div className="px-6 pb-6">
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-sm font-bold text-slate-900">برنامه ویزیت امروز — {selectedDriver.name}</h2>
                <button onClick={() => navigate("/visits")} className="text-xs text-blue-600 hover:text-blue-800 font-medium">مشاهده همه ویزیت‌ها ←</button>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
                {[
                  { time: "۰۸:۳۰", status: "start", label: "شروع مسیر", icon: "🟢", arrival: null, departure: null, duration: null },
                  ...selectedDriverVisits.map((v) => ({
                    time: v.scheduledTime,
                    status: v.status,
                    label: v.customerName,
                    icon: v.status === "completed" ? "✅" : v.status === "visiting" ? "🟠" : v.status === "delayed" ? "🔴" : "⚪",
                    arrival: v.arrivalTime,
                    departure: v.departureTime,
                    duration: v.duration,
                  })),
                ].map((item, i) => (
                  <div key={i} className={`flex gap-2.5 p-3 rounded-xl border ${
                    item.status === "completed" ? "bg-green-50 border-green-100" :
                    item.status === "visiting" ? "bg-orange-50 border-orange-200" :
                    item.status === "delayed" ? "bg-red-50 border-red-100" :
                    item.status === "start" ? "bg-green-50 border-green-100" : "bg-slate-50 border-slate-100"
                  }`}>
                    <div className="text-base flex-shrink-0">{item.icon}</div>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-semibold text-slate-900 truncate">{item.label}</div>
                      <div className="text-xs text-slate-400">{item.time}</div>
                      {item.arrival && (
                        <div className="text-xs text-slate-500 mt-0.5">ورود: {item.arrival}</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
