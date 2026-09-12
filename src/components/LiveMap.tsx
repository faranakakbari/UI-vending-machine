import { useState, useEffect, useRef } from "react";
import type { Driver, Customer, Visit } from "../data/mockData";
import type { DriverStatus } from "../data/mockData";

interface Props {
  drivers: Driver[];
  customers: Customer[];
  visits: Visit[];
  selectedDriverId: string | null;
  onSelectDriver: (id: string) => void;
  onSelectCustomer?: (id: string) => void;
  showAllDrivers?: boolean;
}

// Map coordinate transforms — map Tehran coords to SVG space
const MAP_W = 900;
const MAP_H = 520;
const LAT_MIN = 35.67;
const LAT_MAX = 35.74;
const LNG_MIN = 35.35;
const LNG_MAX = 51.47;

function toSVG(lat: number, lng: number): [number, number] {
  const x = ((lng - 51.35) / (51.47 - 51.35)) * MAP_W;
  const y = ((35.74 - lat) / (35.74 - 35.67)) * MAP_H;
  return [Math.max(20, Math.min(MAP_W - 20, x)), Math.max(20, Math.min(MAP_H - 20, y))];
}

const statusColor: Record<DriverStatus, string> = {
  online: "#16a34a",
  driving: "#2563eb",
  visiting: "#ea580c",
  delayed: "#ca8a04",
  offline: "#94a3b8",
  problem: "#dc2626",
};

interface Popup {
  type: "driver" | "customer";
  id: string;
  x: number;
  y: number;
}

export default function LiveMap({ drivers, customers, visits, selectedDriverId, onSelectDriver, onSelectCustomer, showAllDrivers = true }: Props) {
  const [popup, setPopup] = useState<Popup | null>(null);
  const [liveTime, setLiveTime] = useState(8);
  const [driverPositions, setDriverPositions] = useState(() =>
    drivers.reduce((acc, d) => ({ ...acc, [d.id]: { lat: d.lat, lng: d.lng } }), {} as Record<string, { lat: number; lng: number }>)
  );
  const animRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Live animation
  useEffect(() => {
    animRef.current = setInterval(() => {
      setLiveTime((t) => (t >= 15 ? 1 : t + 1));
      setDriverPositions((prev) => {
        const next = { ...prev };
        drivers.forEach((d) => {
          if (d.status !== "offline" && d.status !== "visiting") {
            next[d.id] = {
              lat: prev[d.id].lat + (Math.random() - 0.5) * 0.0005,
              lng: prev[d.id].lng + (Math.random() - 0.5) * 0.0005,
            };
          }
        });
        return next;
      });
    }, 4000);
    return () => { if (animRef.current) clearInterval(animRef.current); };
  }, [drivers]);

  const visibleDrivers = showAllDrivers ? drivers : drivers.filter((d) => d.id === selectedDriverId);
  const selectedDriver = drivers.find((d) => d.id === selectedDriverId);

  // Route points for selected driver
  const routeVisits = visits.filter((v) => v.driverId === selectedDriverId).sort((a, b) => a.order - b.order);

  const getVisitStatus = (customerId: string) => {
    const v = visits.find((vi) => vi.customerId === customerId && vi.driverId === selectedDriverId);
    return v?.status ?? "planned";
  };

  const visitStatusColor: Record<string, string> = {
    completed: "#16a34a",
    visiting: "#ea580c",
    planned: "#94a3b8",
    delayed: "#dc2626",
    missed: "#dc2626",
  };

  return (
    <div className="relative w-full h-full bg-[#e8eef4] overflow-hidden rounded-xl">
      {/* Street grid background */}
      <svg
        viewBox={`0 0 ${MAP_W} ${MAP_H}`}
        className="w-full h-full"
        style={{ display: "block" }}
        onClick={() => setPopup(null)}
      >
        {/* City block fills */}
        <rect width={MAP_W} height={MAP_H} fill="#e8eef4" />
        {/* Major blocks */}
        {[
          [30, 30, 200, 120], [240, 30, 180, 120], [430, 30, 160, 120], [600, 30, 140, 120], [750, 30, 130, 120],
          [30, 170, 200, 100], [240, 170, 180, 100], [430, 170, 160, 100], [600, 170, 200, 100], [810, 170, 70, 100],
          [30, 290, 200, 90], [240, 290, 180, 90], [430, 290, 160, 90], [600, 290, 160, 90], [770, 290, 110, 90],
          [30, 400, 200, 100], [240, 400, 180, 100], [430, 400, 160, 100], [600, 400, 200, 100],
        ].map(([x, y, w, h], i) => (
          <rect key={i} x={x} y={y} width={w} height={h} fill="#dde5ed" rx={2} />
        ))}

        {/* Major roads — horizontal */}
        {[60, 160, 280, 390, 500].map((y) => (
          <rect key={`hr-${y}`} x={0} y={y} width={MAP_W} height={14} fill="#f0f4f8" />
        ))}
        {/* Major roads — vertical */}
        {[120, 230, 420, 600, 760].map((x) => (
          <rect key={`vr-${x}`} x={x} y={0} width={12} height={MAP_H} fill="#f0f4f8" />
        ))}

        {/* Road center lines */}
        {[60, 160, 280, 390, 500].map((y) => (
          <line key={`hl-${y}`} x1={0} y1={y + 7} x2={MAP_W} y2={y + 7} stroke="#dde5ed" strokeWidth={1} strokeDasharray="12 8" />
        ))}

        {/* Street labels */}
        <text x={MAP_W / 2} y={155} textAnchor="middle" fontSize={9} fill="#8faec0" fontFamily="Vazirmatn">خیابان ولیعصر</text>
        <text x={MAP_W / 2} y={275} textAnchor="middle" fontSize={9} fill="#8faec0" fontFamily="Vazirmatn">خیابان انقلاب</text>
        <text x={MAP_W / 2} y={385} textAnchor="middle" fontSize={9} fill="#8faec0" fontFamily="Vazirmatn">خیابان آزادی</text>
        <text x={MAP_W / 2} y={495} textAnchor="middle" fontSize={9} fill="#8faec0" fontFamily="Vazirmatn">خیابان رسالت</text>
        <text x={125} y={MAP_H / 2} textAnchor="middle" fontSize={9} fill="#8faec0" fontFamily="Vazirmatn" transform={`rotate(-90, 125, ${MAP_H / 2})`}>خ. جمهوری</text>
        <text x={425} y={MAP_H / 2} textAnchor="middle" fontSize={9} fill="#8faec0" fontFamily="Vazirmatn" transform={`rotate(-90, 425, ${MAP_H / 2})`}>خ. بهشتی</text>

        {/* Planned route — dashed blue */}
        {selectedDriverId && routeVisits.length > 1 && (() => {
          const pts = routeVisits.map((v) => toSVG(v.lat, v.lng));
          if (selectedDriver) {
            const dpos = driverPositions[selectedDriverId] ?? { lat: selectedDriver.lat, lng: selectedDriver.lng };
            const [dx, dy] = toSVG(dpos.lat, dpos.lng);
            const dPt = `${dx},${dy}`;
            const pathPts = pts.map(([x, y]) => `${x},${y}`).join(" L ");
            return (
              <polyline
                points={`${dPt} L ${pathPts}`}
                fill="none"
                stroke="#93c5fd"
                strokeWidth={2.5}
                strokeDasharray="8 5"
                opacity={0.8}
              />
            );
          }
        })()}

        {/* Actual route — solid */}
        {selectedDriverId && routeVisits.filter((v) => v.status === "completed" || v.status === "visiting").length > 0 && (() => {
          const doneVisits = routeVisits.filter((v) => v.status === "completed" || v.status === "visiting");
          const pts = doneVisits.map((v) => toSVG(v.lat, v.lng));
          if (pts.length < 1) return null;
          if (selectedDriver) {
            const dpos = driverPositions[selectedDriverId] ?? { lat: selectedDriver.lat, lng: selectedDriver.lng };
            const [dx, dy] = toSVG(dpos.lat, dpos.lng);
            const allPts = [[dx, dy], ...pts];
            const d = allPts.map(([x, y], i) => `${i === 0 ? "M" : "L"} ${x} ${y}`).join(" ");
            return <path d={d} fill="none" stroke="#1d4ed8" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" opacity={0.9} />;
          }
        })()}

        {/* Geofence circles for customers */}
        {customers.map((c) => {
          const [cx, cy] = toSVG(c.lat, c.lng);
          const vStatus = getVisitStatus(c.id);
          const col = visitStatusColor[vStatus] ?? "#94a3b8";
          return (
            <circle key={`gf-${c.id}`} cx={cx} cy={cy} r={18} fill={col} fillOpacity={0.08} stroke={col} strokeWidth={1.5} strokeDasharray="4 3" strokeOpacity={0.4} />
          );
        })}

        {/* Customer markers */}
        {customers.map((c) => {
          const [cx, cy] = toSVG(c.lat, c.lng);
          const vStatus = getVisitStatus(c.id);
          const col = visitStatusColor[vStatus] ?? "#94a3b8";
          return (
            <g key={`cus-${c.id}`} onClick={(e) => { e.stopPropagation(); setPopup({ type: "customer", id: c.id, x: cx, y: cy }); onSelectCustomer?.(c.id); }} style={{ cursor: "pointer" }}>
              <circle cx={cx} cy={cy} r={7} fill={col} stroke="white" strokeWidth={2} />
              <text x={cx} y={cy - 11} textAnchor="middle" fontSize={9} fill="#1e293b" fontFamily="Vazirmatn" fontWeight="500">{c.name.substring(0, 8)}</text>
            </g>
          );
        })}

        {/* Driver markers */}
        {visibleDrivers.map((d) => {
          const pos = driverPositions[d.id] ?? { lat: d.lat, lng: d.lng };
          const [mx, my] = toSVG(pos.lat, pos.lng);
          const isSelected = d.id === selectedDriverId;
          const col = statusColor[d.status];
          const r = isSelected ? 14 : 10;
          return (
            <g key={`drv-${d.id}`} onClick={(e) => { e.stopPropagation(); onSelectDriver(d.id); setPopup({ type: "driver", id: d.id, x: mx, y: my }); }} style={{ cursor: "pointer" }}>
              {isSelected && <circle cx={mx} cy={my} r={r + 8} fill={col} opacity={0.2} className="pulse-ring" />}
              <circle cx={mx} cy={my} r={r + 2} fill="white" stroke={col} strokeWidth={isSelected ? 3 : 2} />
              <text x={mx} y={my + 5} textAnchor="middle" fontSize={isSelected ? 11 : 9} fill={col} fontWeight="bold">🚚</text>
              <text x={mx} y={my - r - 5} textAnchor="middle" fontSize={9} fill="#1e293b" fontFamily="Vazirmatn" fontWeight="600">{d.name.split(" ")[0]}</text>
            </g>
          );
        })}

      </svg>

      {/* Map controls */}
      <div className="absolute top-3 left-3 flex flex-col gap-1.5">
        {["+", "−", "⊕", "⛶"].map((icon, i) => (
          <button key={i} className="w-8 h-8 bg-white rounded-lg shadow border border-slate-200 text-slate-600 hover:bg-slate-50 text-sm font-bold flex items-center justify-center transition-colors">
            {icon}
          </button>
        ))}
      </div>

      {/* Live badge */}
      <div className="absolute top-3 right-3 flex items-center gap-1.5 bg-white rounded-lg shadow px-2.5 py-1.5 border border-slate-200">
        <span className="w-2 h-2 rounded-full bg-green-500 live-dot" />
        <span className="text-green-600 font-bold text-xs">LIVE</span>
        <span className="text-slate-400 text-xs mr-1">آخرین بروزرسانی: {liveTime} ثانیه قبل</span>
      </div>

      {/* Driver popup */}
      {popup?.type === "driver" && (() => {
        const d = drivers.find((dr) => dr.id === popup.id);
        if (!d) return null;
        const currentVisit = visits.find((v) => v.driverId === d.id && v.status === "visiting");
        const nextVisit = visits.find((v) => v.driverId === d.id && v.status === "planned");
        return (
          <div
            className="absolute bg-white rounded-xl shadow-xl border border-slate-200 p-4 w-56 z-10"
            style={{ left: 20, top: 60, direction: "rtl" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-2">
              <div>
                <div className="font-bold text-sm text-slate-900">{d.name}</div>
                <div className="text-xs text-slate-500">{d.code}</div>
              </div>
              <button onClick={() => setPopup(null)} className="text-slate-400 hover:text-slate-600 text-lg leading-none">×</button>
            </div>
            <div className="space-y-1.5 text-xs text-slate-600">
              <div className="flex justify-between"><span className="text-slate-400">موقعیت:</span><span>{d.address}</span></div>
              <div className="flex justify-between"><span className="text-slate-400">سرعت:</span><span>{d.speed} km/h</span></div>
              {currentVisit && <div className="flex justify-between"><span className="text-slate-400">ویزیت فعلی:</span><span className="font-medium text-orange-600">{currentVisit.customerName}</span></div>}
              {nextVisit && <div className="flex justify-between"><span className="text-slate-400">بعدی:</span><span>{nextVisit.customerName}</span></div>}
              <div className="flex justify-between"><span className="text-slate-400">پیشرفت:</span><span>{d.completedVisits} / {d.totalVisits} ویزیت</span></div>
            </div>
            <div className="flex gap-1.5 mt-3">
              <button onClick={() => { onSelectDriver(d.id); setPopup(null); }} className="flex-1 bg-blue-600 text-white text-xs py-1.5 rounded-lg hover:bg-blue-700 transition-colors">مشاهده راننده</button>
              <button className="flex-1 bg-slate-100 text-slate-700 text-xs py-1.5 rounded-lg hover:bg-slate-200 transition-colors">مسیر</button>
            </div>
          </div>
        );
      })()}

      {/* Customer popup */}
      {popup?.type === "customer" && (() => {
        const c = customers.find((cu) => cu.id === popup.id);
        if (!c) return null;
        const v = visits.find((vi) => vi.customerId === c.id);
        return (
          <div
            className="absolute bg-white rounded-xl shadow-xl border border-slate-200 p-4 w-52 z-10"
            style={{ right: 20, top: 60, direction: "rtl" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="font-bold text-sm text-slate-900">{c.name}</div>
              <button onClick={() => setPopup(null)} className="text-slate-400 hover:text-slate-600 text-lg leading-none">×</button>
            </div>
            <div className="space-y-1.5 text-xs text-slate-600">
              <div className="flex justify-between"><span className="text-slate-400">کد:</span><span>{c.code}</span></div>
              <div className="flex justify-between"><span className="text-slate-400">راننده:</span><span>{drivers.find((d) => d.id === c.assignedDriver)?.name ?? "—"}</span></div>
              {v && <div className="flex justify-between"><span className="text-slate-400">وضعیت:</span><span className={v.status === "completed" ? "text-green-600" : v.status === "visiting" ? "text-orange-600" : "text-slate-500"}>{v.status === "completed" ? "انجام شد" : v.status === "visiting" ? "در حال ویزیت" : "برنامه‌ریزی‌شده"}</span></div>}
              {v?.scheduledTime && <div className="flex justify-between"><span className="text-slate-400">زمان برنامه:</span><span>{v.scheduledTime}</span></div>}
              {v?.arrivalTime && <div className="flex justify-between"><span className="text-slate-400">ورود:</span><span>{v.arrivalTime}</span></div>}
            </div>
          </div>
        );
      })()}

    </div>
  );
}
