import { useState, useRef, useCallback } from "react";
import Header from "../components/Header";
import LiveMap from "../components/LiveMap";
import { drivers as liveDrivers, customers, visits as liveVisits } from "../data/mockData";
import {
  initialDrivers,
  initialHistory,
  allCustomers,
  calcScheduledMin,
  getCapacityPct,
  isFeasible,
  recalcTimes,
  minutesToHM,
  priorityLabel,
  type PlanDriver,
  type PlanVisit,
  type PlanCustomer,
  type ChangeRecord,
} from "../data/planningData";

// ── tiny helpers ─────────────────────────────────────────────────────────
function newId(prefix = "v") {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 5)}`;
}

// ── Status chip ───────────────────────────────────────────────────────────
const vstatus: Record<string, { dot: string; label: string; row: string }> = {
  completed: { dot: "bg-green-500",  label: "انجام شده",       row: "opacity-60" },
  active:    { dot: "bg-blue-500",   label: "در حال انجام",    row: "ring-1 ring-blue-300 bg-blue-50/40" },
  planned:   { dot: "bg-yellow-400", label: "برنامه‌ریزی شده", row: "" },
  delayed:   { dot: "bg-orange-500", label: "تأخیر",           row: "bg-orange-50/50" },
  problem:   { dot: "bg-red-500",    label: "مشکل",            row: "bg-red-50/50" },
  cancelled: { dot: "bg-slate-300",  label: "لغو شده",         row: "opacity-50" },
};

function StatusDot({ status }: { status: PlanVisit["status"] }) {
  const s = vstatus[status] ?? vstatus.planned;
  return (
    <span className="flex items-center gap-1.5">
      <span className={`w-2 h-2 rounded-full flex-shrink-0 ${s.dot}`} />
      <span className="text-xs text-slate-500">{s.label}</span>
    </span>
  );
}

// ── Capacity bar ──────────────────────────────────────────────────────────
function CapBar({ driver, compact = false }: { driver: PlanDriver; compact?: boolean }) {
  const pct = getCapacityPct(driver);
  const ok = isFeasible(driver);
  const color = pct > 100 ? "bg-red-500" : pct > 88 ? "bg-yellow-500" : "bg-green-500";
  const textColor = pct > 100 ? "text-red-600" : pct > 88 ? "text-yellow-600" : "text-green-600";
  if (compact) {
    return (
      <div className="flex items-center gap-2 mt-1">
        <div className="flex-1 h-1 bg-slate-200 rounded-full overflow-hidden">
          <div className={`h-full ${color}`} style={{ width: `${Math.min(pct, 100)}%` }} />
        </div>
        <span className={`text-[10px] font-bold ${textColor}`}>{pct}%</span>
      </div>
    );
  }
  return (
    <div>
      <div className="flex justify-between text-xs mb-1">
        <span className="text-slate-500">{minutesToHM(calcScheduledMin(driver.visits))} / {minutesToHM(driver.workCapacityMin)}</span>
        <span className={`font-bold ${textColor}`}>{pct}%</span>
      </div>
      <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
        <div className={`h-full rounded-full ${color}`} style={{ width: `${Math.min(pct, 100)}%` }} />
      </div>
      <div className={`text-xs mt-1 font-medium ${ok ? "text-green-600" : "text-red-600"}`}>
        {ok ? "🟢 برنامه قابل اجرا" : "🔴 بیش از ظرفیت"}
      </div>
    </div>
  );
}

// ── Driver status badge ───────────────────────────────────────────────────
const dstatus: Record<string, { dot: string; label: string }> = {
  online:   { dot: "bg-green-500",  label: "آنلاین" },
  offline:  { dot: "bg-slate-400",  label: "آفلاین" },
  driving:  { dot: "bg-blue-500",   label: "در مسیر" },
  visiting: { dot: "bg-orange-500", label: "در حال ویزیت" },
  delayed:  { dot: "bg-yellow-500", label: "تأخیر" },
};
function DriverStatusBadge({ status }: { status: PlanDriver["status"] }) {
  const s = dstatus[status] ?? dstatus.offline;
  return (
    <span className="flex items-center gap-1.5 text-xs text-slate-600">
      <span className={`w-2 h-2 rounded-full ${s.dot}`} />
      {s.label}
    </span>
  );
}

// ── Feasibility badge ─────────────────────────────────────────────────────
function FeasibilityBadge({ ok }: { ok: boolean }) {
  return ok
    ? <span className="inline-flex items-center gap-1 text-xs bg-green-50 text-green-700 border border-green-200 px-2 py-0.5 rounded-full font-medium">🟢 برنامه قابل اجرا</span>
    : <span className="inline-flex items-center gap-1 text-xs bg-red-50 text-red-700 border border-red-200 px-2 py-0.5 rounded-full font-medium">🔴 بیش از ظرفیت</span>;
}

// ── Modal shell ───────────────────────────────────────────────────────────
function Modal({ title, width = "max-w-lg", children, onClose }: { title: string; width?: string; children: React.ReactNode; onClose: () => void }) {
  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className={`bg-white rounded-2xl shadow-2xl w-full ${width} max-h-[92vh] flex flex-col`} onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 flex-shrink-0">
          <h2 className="text-base font-bold text-slate-900">{title}</h2>
          <button onClick={onClose} className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 transition-colors text-lg leading-none">×</button>
        </div>
        <div className="overflow-y-auto flex-1 px-6 py-5">{children}</div>
      </div>
    </div>
  );
}

// ── Field row ─────────────────────────────────────────────────────────────
function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-xs text-slate-500 mb-1">{label}</label>
      {children}
    </div>
  );
}
const inputCls = "w-full text-sm border border-slate-200 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 bg-white";
const selectCls = `${inputCls}`;

// ═══════════════════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════════════════
export default function Planning() {
  const [drivers, setDrivers] = useState<PlanDriver[]>(initialDrivers);
  const [history, setHistory] = useState<ChangeRecord[]>(initialHistory);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [draftState, setDraftState] = useState<"draft" | "published">("draft");
  const [unsaved, setUnsaved] = useState(2);
  const [driverFilter, setDriverFilter] = useState<"all" | "online" | "offline" | "alert" | "ok" | "problem">("all");
  const [searchQ, setSearchQ] = useState("");
  const [showMap, setShowMap] = useState(false);
  const [selectedDay, setSelectedDay] = useState<number | null>(null);

  // drag state (within visit list reorder)
  const dragIndex = useRef<number | null>(null);
  const dragOver = useRef<number | null>(null);

  // context menu
  const [ctxMenu, setCtxMenu] = useState<{ x: number; y: number; visit: PlanVisit } | null>(null);

  // modals
  const [addModal, setAddModal] = useState(false);
  const [editModal, setEditModal] = useState<PlanVisit | null>(null);
  const [deleteModal, setDeleteModal] = useState<PlanVisit | null>(null);
  const [transferModal, setTransferModal] = useState<PlanVisit | null>(null);
  const [publishModal, setPublishModal] = useState(false);
  const [autoModal, setAutoModal] = useState(false);
  const [addDriverModal, setAddDriverModal] = useState(false);
  const [editDriverModal, setEditDriverModal] = useState<PlanDriver | null>(null);

  // undo
  const undoStack = useRef<PlanDriver[][]>([]);
  const pushUndo = useCallback((prev: PlanDriver[]) => { undoStack.current.push(JSON.parse(JSON.stringify(prev))); }, []);
  const undo = () => {
    if (!undoStack.current.length) return;
    setDrivers(undoStack.current.pop()!);
    setUnsaved((n) => n + 1);
  };

  const selected = drivers.find((d) => d.id === selectedId) ?? null;

  const addHistory = (action: string, type: ChangeRecord["type"]) => {
    const now = new Date();
    const time = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;
    setHistory((h) => [{ id: newId("h"), time, user: "علی محمدی", action, type }, ...h]);
    setUnsaved((n) => n + 1);
  };

  const mutate = (driverId: string, fn: (d: PlanDriver) => PlanDriver) => {
    pushUndo(drivers);
    setDrivers((prev) => prev.map((d) => d.id === driverId ? fn(d) : d));
  };

  // ── Visit actions ────────────────────────────────────────────────────
  const deleteVisit = (v: PlanVisit) => {
    if (!selectedId) return;
    mutate(selectedId, (d) => ({
      ...d,
      visits: recalcTimes(d.visits.filter((x) => x.id !== v.id), d.workStart),
    }));
    addHistory(`${v.customerName} از برنامه ${selected?.name} حذف شد.`, "remove");
    setDeleteModal(null);
  };

  const toggleLock = (visitId: string) => {
    if (!selectedId) return;
    const visit = selected?.visits.find((v) => v.id === visitId);
    mutate(selectedId, (d) => ({
      ...d,
      visits: d.visits.map((v) => v.id === visitId ? { ...v, locked: !v.locked } : v),
    }));
    if (visit) addHistory(`${visit.customerName} ${visit.locked ? "قفل‌گشایی" : "قفل"} شد.`, "lock");
    setCtxMenu(null);
  };

  const saveEdit = (updated: PlanVisit) => {
    if (!selectedId) return;
    mutate(selectedId, (d) => ({
      ...d,
      visits: recalcTimes(d.visits.map((v) => v.id === updated.id ? { ...updated } : v), d.workStart),
    }));
    addHistory(`ویزیت ${updated.customerName} ویرایش شد.`, "edit");
    setEditModal(null);
  };

  const addVisit = (customer: PlanCustomer, time: string, duration: number, priority: PlanVisit["priority"], notes: string) => {
    if (!selectedId || !selected) return;
    const [h, m] = time.split(":").map(Number);
    const endMin = h * 60 + m + duration;
    const newV: PlanVisit = {
      id: newId(),
      customerId: customer.id,
      customerName: customer.name,
      terminalId: customer.terminalId,
      address: customer.address,
      zone: customer.zone,
      startTime: time,
      endTime: `${String(Math.floor(endMin / 60)).padStart(2, "0")}:${String(endMin % 60).padStart(2, "0")}`,
      duration,
      travelToNext: 10,
      order: selected.visits.length + 1,
      locked: false,
      priority,
      notes,
      status: "planned",
      frequency: customer.frequency,
      workingHours: customer.workingHours,
    };
    mutate(selectedId, (d) => ({
      ...d,
      visits: recalcTimes([...d.visits, newV], d.workStart),
    }));
    addHistory(`${customer.name} به برنامه ${selected.name} اضافه شد.`, "add");
    setAddModal(false);
  };

  const transferVisit = (visit: PlanVisit, toDriverId: string) => {
    if (!selectedId) return;
    const toDriver = drivers.find((d) => d.id === toDriverId);
    if (!toDriver) return;
    pushUndo(drivers);
    setDrivers((prev) => prev.map((d) => {
      if (d.id === selectedId) return { ...d, visits: recalcTimes(d.visits.filter((v) => v.id !== visit.id), d.workStart) };
      if (d.id === toDriverId) {
        const newV = { ...visit, id: newId() };
        return { ...d, visits: recalcTimes([...d.visits, newV], d.workStart) };
      }
      return d;
    }));
    addHistory(`${visit.customerName} از ${selected?.name} به ${toDriver.name} منتقل شد.`, "transfer");
    setTransferModal(null);
  };

  // ── Drag reorder ──────────────────────────────────────────────────────
  const onDragStart = (idx: number) => { dragIndex.current = idx; };
  const onDragOver = (e: React.DragEvent, idx: number) => { e.preventDefault(); dragOver.current = idx; };
  const onDrop = () => {
    if (dragIndex.current === null || dragOver.current === null || !selectedId || !selected) return;
    if (dragIndex.current === dragOver.current) { dragIndex.current = dragOver.current = null; return; }
    const visits = [...selected.visits];
    const [moved] = visits.splice(dragIndex.current, 1);
    visits.splice(dragOver.current, 0, moved);
    const locked = moved.locked;
    if (locked) { dragIndex.current = dragOver.current = null; return; }
    mutate(selectedId, (d) => ({ ...d, visits: recalcTimes(visits, d.workStart) }));
    addHistory(`ترتیب ویزیت‌های ${selected.name} تغییر کرد.`, "reorder");
    dragIndex.current = null; dragOver.current = null;
  };

  // ── Filter drivers ────────────────────────────────────────────────────
  const visibleDrivers = drivers.filter((d) => {
    if (searchQ && !d.name.includes(searchQ) && !d.zone.includes(searchQ)) return false;
    if (driverFilter === "online") return d.status !== "offline";
    if (driverFilter === "offline") return d.status === "offline";
    if (driverFilter === "alert") return d.status === "delayed" || !isFeasible(d);
    if (driverFilter === "ok") return isFeasible(d);
    if (driverFilter === "problem") return !isFeasible(d);
    return true;
  });

  const totalFilters: { key: typeof driverFilter; label: string; count: number }[] = [
    { key: "all", label: "همه", count: drivers.length },
    { key: "online", label: "آنلاین", count: drivers.filter((d) => d.status !== "offline").length },
    { key: "offline", label: "آفلاین", count: drivers.filter((d) => d.status === "offline").length },
    { key: "alert", label: "دارای هشدار", count: drivers.filter((d) => d.status === "delayed" || !isFeasible(d)).length },
    { key: "ok", label: "برنامه قابل اجرا", count: drivers.filter(isFeasible).length },
    { key: "problem", label: "دارای مشکل", count: drivers.filter((d) => !isFeasible(d)).length },
  ];

  return (
    <div className="flex flex-col h-full overflow-hidden bg-slate-50" onClick={() => setCtxMenu(null)}>

      {/* Header */}
      <Header title="برنامه ویزیت" subtitle="مدیریت و اصلاح برنامه روزانه رانندگان" />

      {/* Toolbar */}
      <div className="flex items-center gap-2 px-6 py-2.5 bg-white border-b border-slate-200 flex-shrink-0 flex-wrap">
        {/* Draft badge */}
        <span className={`flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-lg border ${draftState === "draft" ? "bg-yellow-50 border-yellow-300 text-yellow-700" : "bg-green-50 border-green-300 text-green-700"}`}>
          <span className={`w-1.5 h-1.5 rounded-full ${draftState === "draft" ? "bg-yellow-500" : "bg-green-500"}`} />
          {draftState === "draft" ? "پیش‌نویس" : "منتشرشده"}
        </span>
        {unsaved > 0 && draftState === "draft" && (
          <span className="text-xs text-slate-400">· {unsaved} تغییر ذخیره‌نشده</span>
        )}

        <div className="flex items-center gap-1.5 mr-3">
          <label className="text-xs text-slate-500">📅</label>
          <select className="text-xs border border-slate-200 rounded-lg px-2.5 py-1.5 bg-white focus:outline-none">
            <option>شنبه ۲۴ مرداد ۱۴۰۵</option>
          </select>
          <input value={searchQ} onChange={(e) => setSearchQ(e.target.value)} placeholder="جستجوی راننده یا مشتری..." className="text-xs border border-slate-200 rounded-lg px-3 py-1.5 w-48 focus:outline-none focus:ring-1 focus:ring-blue-500" />
        </div>

        <div className="flex gap-1 mr-1">
          <button onClick={undo} className="w-7 h-7 rounded-lg bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 text-sm font-bold transition-colors" title="بازگشت">↶</button>
        </div>

        <div className="mr-auto flex gap-2">
          {unsaved > 0 && (
            <>
              <button onClick={() => { setDrivers(initialDrivers); setUnsaved(0); }} className="text-xs border border-slate-200 text-slate-600 px-3 py-1.5 rounded-lg hover:bg-slate-50 transition-colors">بازگردانی</button>
              <button className="text-xs bg-slate-700 text-white px-3 py-1.5 rounded-lg hover:bg-slate-800 transition-colors font-medium">ذخیره تغییرات</button>
            </>
          )}
          <button onClick={() => setPublishModal(true)} className="text-xs bg-green-600 text-white px-3 py-1.5 rounded-lg hover:bg-green-700 transition-colors font-medium">انتشار برنامه</button>
          <button onClick={() => setAutoModal(true)} className="text-xs bg-blue-600 text-white px-4 py-1.5 rounded-lg hover:bg-blue-700 transition-colors font-medium">✨ پیشنهاد برنامه</button>
        </div>
      </div>

      {/* BODY */}
      {!selectedId ? (
        /* ── SCREEN 1: Weekly Grid ── */
        <WeeklyGrid
          drivers={drivers}
          visibleDrivers={visibleDrivers}
          totalFilters={totalFilters}
          driverFilter={driverFilter}
          setDriverFilter={setDriverFilter}
          onSelectCell={(driverId, day) => { setSelectedId(driverId); setSelectedDay(day); }}
          onAddDriver={() => setAddDriverModal(true)}
        />
      ) : selected ? (
        /* ── SCREEN 2: Driver Visit List ── */
        <div className="flex-1 overflow-hidden flex">

          {/* Main: visit list */}
          <div className="flex-1 flex flex-col overflow-hidden">

            {/* Driver header bar */}
            <div className="px-6 py-3 bg-white border-b border-slate-200 flex items-center gap-4 flex-shrink-0">
              <button onClick={() => { setSelectedId(null); setSelectedDay(null); }} className="text-xs text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1 flex-shrink-0">
                ← بازگشت به نمای هفتگی
              </button>
              <div className="w-px h-5 bg-slate-200" />
              <div className={`w-9 h-9 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0 ${selected.status === "offline" ? "bg-slate-300" : "bg-blue-600"}`}>
                {selected.avatar}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3">
                  <span className="font-bold text-slate-900 text-base">{selected.name}</span>
                  <DriverStatusBadge status={selected.status} />
                  <span className="text-xs text-slate-400">{selected.code} · {selected.vehicle}</span>
                </div>
                <div className="text-xs text-slate-500">{selectedDay !== null ? `${["شنبه","یکشنبه","دوشنبه","سه‌شنبه","چهارشنبه","پنجشنبه"][selectedDay]} ۱۴۰۵` : "برنامه ویزیت"}</div>
              </div>
              <div className="flex gap-2 flex-shrink-0">
                <button onClick={() => setEditDriverModal(selected)} className="text-xs border border-slate-200 text-slate-700 px-3 py-1.5 rounded-lg hover:bg-slate-50 transition-colors">ویرایش راننده</button>
                <button onClick={() => setShowMap((v) => !v)} className={`text-xs border px-3 py-1.5 rounded-lg transition-colors ${showMap ? "bg-blue-50 border-blue-300 text-blue-700" : "border-slate-200 text-slate-700 hover:bg-slate-50"}`}>
                  {showMap ? "پنهان کردن نقشه" : "نمایش مسیر روی نقشه"}
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-hidden flex flex-col">
              {/* Map (optional secondary view) */}
              {showMap && (
                <div className="h-52 flex-shrink-0 mx-6 mt-4 rounded-xl overflow-hidden border border-slate-200">
                  <LiveMap
                    drivers={liveDrivers}
                    customers={customers}
                    visits={liveVisits}
                    selectedDriverId={liveDrivers.find((d) => d.name === selected.name)?.id ?? liveDrivers[0].id}
                    onSelectDriver={() => {}}
                    showAllDrivers={false}
                  />
                </div>
              )}

              {/* Summary row */}
              <div className="px-6 py-3 flex items-center gap-6 border-b border-slate-100 bg-white/70 flex-shrink-0">
                {[
                  { label: "کل ویزیت", val: selected.visits.length, color: "text-slate-900" },
                  { label: "انجام شده", val: selected.visits.filter((v) => v.status === "completed").length, color: "text-green-600" },
                  { label: "باقی مانده", val: selected.visits.filter((v) => v.status === "planned" || v.status === "active").length, color: "text-blue-600" },
                  { label: "زمان برنامه", val: minutesToHM(calcScheduledMin(selected.visits)), color: "text-slate-700" },
                ].map((s) => (
                  <div key={s.label} className="flex items-center gap-2 text-sm">
                    <span className={`font-bold text-lg ${s.color}`}>{s.val}</span>
                    <span className="text-slate-400 text-xs">{s.label}</span>
                  </div>
                ))}
                <div className="flex-1 max-w-40">
                  <CapBar driver={selected} />
                </div>
                <div className="mr-auto">
                  <FeasibilityBadge ok={isFeasible(selected)} />
                </div>
              </div>

              {/* Visit list */}
              <div className="flex-1 overflow-y-auto hide-scroll px-6 py-4">
                {/* Add button */}
                <button
                  onClick={() => setAddModal(true)}
                  className="w-full flex items-center justify-center gap-2 border-2 border-dashed border-blue-200 text-blue-600 rounded-xl py-3 text-sm font-medium hover:border-blue-400 hover:bg-blue-50 transition-all mb-4"
                >
                  + افزودن مشتری به ویزیت‌لیست
                </button>

                {selected.visits.length === 0 && (
                  <div className="text-center py-16 text-slate-400">
                    <div className="text-4xl mb-3">📋</div>
                    <div className="font-medium">ویزیتی برای این راننده برنامه‌ریزی نشده</div>
                    <div className="text-sm mt-1">با دکمه بالا مشتری اضافه کنید</div>
                  </div>
                )}

                <div className="space-y-2">
                  {selected.visits.map((visit, idx) => {
                    const s = vstatus[visit.status] ?? vstatus.planned;
                    return (
                      <div
                        key={visit.id}
                        draggable={!visit.locked}
                        onDragStart={() => onDragStart(idx)}
                        onDragOver={(e) => onDragOver(e, idx)}
                        onDrop={onDrop}
                        className={`flex items-start gap-3 bg-white rounded-xl border px-4 py-3 transition-all group select-none ${s.row} ${visit.locked ? "border-purple-200" : "border-slate-200 hover:border-slate-300 hover:shadow-sm"}`}
                      >
                        {/* Drag handle */}
                        {!visit.locked ? (
                          <div className="text-slate-300 hover:text-slate-500 cursor-grab pt-1 text-lg leading-none flex-shrink-0">⠿</div>
                        ) : (
                          <div className="text-purple-400 pt-1 text-sm flex-shrink-0">🔒</div>
                        )}

                        {/* Sequence number */}
                        <div className="w-7 h-7 rounded-lg bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-500 flex-shrink-0 mt-0.5">
                          {String(idx + 1).padStart(2, "0")}
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1 flex-wrap">
                            <span className={`w-2 h-2 rounded-full flex-shrink-0 ${s.dot}`} />
                            <span className="text-sm font-bold text-slate-900">{visit.startTime} – {visit.endTime}</span>
                            <span className="text-slate-300">·</span>
                            <span className="text-sm font-semibold text-slate-800">{visit.customerName}</span>
                            {visit.locked && (
                              <span className="text-xs text-purple-600 bg-purple-50 border border-purple-200 px-1.5 py-0.5 rounded-full">قفل شده</span>
                            )}
                          </div>
                          <div className="flex items-center gap-3 text-xs text-slate-400 flex-wrap">
                            <span className="font-mono text-slate-500">{visit.terminalId}</span>
                            <span>⏱ {visit.duration} دقیقه</span>
                            {visit.travelToNext !== null && (
                              <span>🚗 {visit.travelToNext} دقیقه تا بعدی</span>
                            )}
                            <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-medium ${visit.priority === "high" ? "bg-red-50 text-red-600" : visit.priority === "low" ? "bg-slate-100 text-slate-500" : "bg-blue-50 text-blue-600"}`}>
                              {priorityLabel[visit.priority]}
                            </span>
                            <StatusDot status={visit.status} />
                          </div>
                          {visit.notes && <div className="text-xs text-slate-400 mt-1 italic">{visit.notes}</div>}
                        </div>

                        {/* Action buttons */}
                        <div className="flex items-center gap-1.5 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button onClick={() => setEditModal(visit)} className="text-xs text-blue-600 border border-blue-200 bg-blue-50 px-2.5 py-1 rounded-lg hover:bg-blue-100 transition-colors font-medium">ویرایش</button>
                          <button onClick={() => setTransferModal(visit)} className="text-xs text-slate-600 border border-slate-200 bg-slate-50 px-2.5 py-1 rounded-lg hover:bg-slate-100 transition-colors">انتقال</button>
                          <button onClick={() => setDeleteModal(visit)} className="text-xs text-red-600 border border-red-200 bg-red-50 px-2.5 py-1 rounded-lg hover:bg-red-100 transition-colors">حذف</button>
                          <button
                            onClick={(e) => { e.stopPropagation(); setCtxMenu({ x: e.clientX, y: e.clientY, visit }); }}
                            className="w-7 h-7 rounded-lg border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-slate-100 transition-colors"
                          >⋮</button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Right: Validation + History */}
          <div className="w-72 flex-shrink-0 border-r border-slate-200 bg-white flex flex-col overflow-hidden">
            {/* Validation */}
            <div className={`px-4 py-4 border-b border-slate-100 flex-shrink-0 ${isFeasible(selected) ? "bg-green-50/60" : "bg-red-50/60"}`}>
              <div className="text-xs font-bold text-slate-700 mb-2">بررسی برنامه</div>
              {isFeasible(selected) ? (
                <div className="flex items-start gap-2">
                  <span className="text-base">🟢</span>
                  <div>
                    <div className="text-xs font-bold text-green-700">برنامه قابل اجرا</div>
                    <div className="text-[10px] text-green-600 mt-0.5">{selected.visits.length} ویزیت · {minutesToHM(calcScheduledMin(selected.visits))} زمان کل</div>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="flex items-start gap-2 mb-2">
                    <span className="text-base">🔴</span>
                    <div>
                      <div className="text-xs font-bold text-red-700">بیش از ظرفیت</div>
                      <div className="text-[10px] text-red-600 mt-0.5">{minutesToHM(calcScheduledMin(selected.visits) - selected.workCapacityMin)} اضافه‌بار</div>
                    </div>
                  </div>
                  <div className="bg-white rounded-xl border border-red-200 p-3 text-xs">
                    <div className="font-semibold text-slate-700 mb-2">پیشنهاد سیستم:</div>
                    <div className="space-y-1.5">
                      {drivers.filter((d) => d.id !== selected.id && isFeasible(d)).slice(0, 2).map((d) => (
                        <button
                          key={d.id}
                          onClick={() => { const last = selected.visits[selected.visits.length - 1]; if (last) transferVisit(last, d.id); }}
                          className="w-full text-right text-[10px] bg-blue-50 border border-blue-200 text-blue-700 px-2.5 py-1.5 rounded-lg hover:bg-blue-100 transition-colors font-medium"
                        >
                          انتقال آخرین ویزیت به {d.name}
                        </button>
                      ))}
                      <button className="w-full text-right text-[10px] bg-slate-50 border border-slate-200 text-slate-600 px-2.5 py-1.5 rounded-lg hover:bg-slate-100 transition-colors">انتقال به روز بعد</button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Capacity detail */}
            <div className="px-4 py-3 border-b border-slate-100 flex-shrink-0">
              <div className="text-xs font-bold text-slate-700 mb-2">ظرفیت روزانه</div>
              <CapBar driver={selected} />
              <div className="grid grid-cols-2 gap-2 mt-3 text-xs">
                {[
                  ["ظرفیت کاری", minutesToHM(selected.workCapacityMin)],
                  ["برنامه‌ریزی شده", minutesToHM(calcScheduledMin(selected.visits))],
                  ["زمان سفر", minutesToHM(selected.visits.reduce((s, v) => s + (v.travelToNext ?? 0), 0))],
                  ["باقی مانده", minutesToHM(Math.max(0, selected.workCapacityMin - calcScheduledMin(selected.visits)))],
                ].map(([k, v]) => (
                  <div key={k} className="bg-slate-50 rounded-lg p-2">
                    <div className="text-[10px] text-slate-400">{k}</div>
                    <div className="font-bold text-slate-800 mt-0.5">{v}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Change history */}
            <div className="flex-1 overflow-y-auto hide-scroll px-4 py-3">
              <div className="text-xs font-bold text-slate-700 mb-2">تاریخچه تغییرات</div>
              <div className="space-y-2.5">
                {history.map((h) => (
                  <div key={h.id} className="flex gap-2">
                    <span className="text-[10px] text-slate-400 font-mono flex-shrink-0 pt-0.5">{h.time}</span>
                    <div className="text-[10px] text-slate-600 leading-relaxed">
                      <span className="text-slate-400">{h.user === "سیستم" ? "🤖" : "👤"} {h.user} · </span>
                      {h.action}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : null}

      {/* ── Context menu ─────────────────────────────────────────────── */}
      {ctxMenu && (
        <div
          className="fixed z-50 bg-white rounded-xl shadow-xl border border-slate-200 py-1 w-52 text-sm"
          style={{ left: ctxMenu.x, top: ctxMenu.y, direction: "rtl" }}
          onClick={(e) => e.stopPropagation()}
        >
          {[
            { label: "ویرایش", icon: "✏️", action: () => { setEditModal(ctxMenu.visit); setCtxMenu(null); } },
            { label: ctxMenu.visit.locked ? "🔓 قفل‌گشایی" : "🔒 قفل کردن", icon: "", action: () => toggleLock(ctxMenu.visit.id) },
            { label: "جابجایی در لیست", icon: "↕️", action: () => setCtxMenu(null) },
            { label: "انتقال به راننده دیگر", icon: "↔️", action: () => { setTransferModal(ctxMenu.visit); setCtxMenu(null); } },
            { label: "انتقال به روز دیگر", icon: "📅", action: () => setCtxMenu(null) },
            { label: "🚫 لغو این نوبت", icon: "", action: () => { addHistory(`نوبت ${ctxMenu.visit.customerName} لغو شد (استثنا).`, "remove"); setCtxMenu(null); } },
            { label: "حذف از برنامه", icon: "🗑️", action: () => { setDeleteModal(ctxMenu.visit); setCtxMenu(null); }, danger: true },
          ].map((item) => (
            <button key={item.label} onClick={item.action} className={`w-full text-right px-4 py-2 text-xs hover:bg-slate-50 transition-colors flex items-center gap-2 ${item.danger ? "text-red-600 hover:bg-red-50" : "text-slate-700"}`}>
              {item.icon && <span>{item.icon}</span>}
              {item.label}
            </button>
          ))}
        </div>
      )}

      {/* ── Modals ───────────────────────────────────────────────────── */}

      {/* Delete */}
      {deleteModal && (
        <Modal title="حذف از ویزیت‌لیست" onClose={() => setDeleteModal(null)}>
          <div className="space-y-4">
            <div className="bg-slate-50 rounded-xl p-4 text-sm text-slate-700">
              آیا می‌خواهید <strong className="text-slate-900">{deleteModal.customerName}</strong> از برنامه امروز <strong className="text-slate-900">{selected?.name}</strong> حذف شود؟
            </div>
            {deleteModal.frequency === "روزانه" && (
              <div className="flex items-start gap-2 bg-yellow-50 border border-yellow-200 rounded-xl p-3 text-xs text-yellow-700">
                <span className="flex-shrink-0 mt-0.5">⚠️</span>
                <span>این مشتری دفعات مراجعه <strong>روزانه</strong> دارد. حذف از این لیست، مشتری را از سیستم حذف نمی‌کند.</span>
              </div>
            )}
            <div className="flex gap-3">
              <button onClick={() => setDeleteModal(null)} className="flex-1 border border-slate-200 text-slate-700 py-2.5 rounded-xl text-sm hover:bg-slate-50 transition-colors font-medium">انصراف</button>
              <button onClick={() => deleteVisit(deleteModal)} className="flex-1 bg-red-600 text-white py-2.5 rounded-xl text-sm hover:bg-red-700 transition-colors font-medium">حذف از برنامه</button>
            </div>
          </div>
        </Modal>
      )}

      {/* Edit */}
      {editModal && (
        <EditVisitModal visit={editModal} driver={selected!} drivers={drivers} onSave={saveEdit} onClose={() => setEditModal(null)} />
      )}

      {/* Transfer */}
      {transferModal && selected && (
        <TransferModal visit={transferModal} fromDriver={selected} drivers={drivers} onTransfer={transferVisit} onClose={() => setTransferModal(null)} />
      )}

      {/* Add */}
      {addModal && selected && (
        <AddVisitModal driver={selected} customers={allCustomers} onAdd={addVisit} onClose={() => setAddModal(false)} />
      )}

      {/* Publish */}
      {publishModal && (
        <Modal title="خلاصه تغییرات" onClose={() => setPublishModal(false)}>
          <div className="space-y-3 mb-5">
            <div className="text-xs text-slate-500">{unsaved} تغییر انجام شده:</div>
            {history.slice(0, Math.max(unsaved, 1)).map((h) => (
              <div key={h.id} className="flex items-center gap-2 text-xs bg-slate-50 rounded-lg px-3 py-2">
                <span className="text-slate-400">{h.type === "add" ? "+" : h.type === "remove" ? "−" : h.type === "transfer" ? "↔" : h.type === "reorder" ? "↕" : h.type === "lock" ? "🔒" : "✎"}</span>
                <span className="text-slate-700">{h.action}</span>
              </div>
            ))}
            <div className={`flex items-center gap-2 text-xs p-3 rounded-xl ${drivers.every(isFeasible) ? "bg-green-50 text-green-700 border border-green-200" : "bg-red-50 text-red-700 border border-red-200"}`}>
              {drivers.every(isFeasible) ? "🟢 تمام برنامه‌ها قابل اجرا هستند" : `🔴 ${drivers.filter((d) => !isFeasible(d)).length} راننده بیش از ظرفیت دارد`}
            </div>
          </div>
          <div className="flex gap-3">
            <button onClick={() => setPublishModal(false)} className="flex-1 border border-slate-200 text-slate-700 py-2.5 rounded-xl text-sm hover:bg-slate-50 transition-colors">بازگشت</button>
            <button onClick={() => { setDraftState("published"); setUnsaved(0); setPublishModal(false); addHistory("برنامه توسط مدیر منتشر شد.", "auto"); }} className="flex-1 bg-green-600 text-white py-2.5 rounded-xl text-sm hover:bg-green-700 transition-colors font-medium">انتشار برنامه</button>
          </div>
        </Modal>
      )}

      {/* Auto-generate */}
      {autoModal && (
        <Modal title="پیشنهاد برنامه روزانه" onClose={() => setAutoModal(false)}>
          <div className="space-y-3 mb-4">
            {[["تاریخ", "شنبه ۲۴ مرداد ۱۴۰۵"], ["منطقه", "همه مناطق"], ["رانندگان", "همه رانندگان"], ["حداکثر زمان کاری", "۹ ساعت"], ["زمان Buffer", "۱۵ دقیقه"], ["اولویت‌بندی", "فرکانس بالا اول"]].map(([l, d]) => (
              <Field key={l} label={l}>
                <select className={selectCls}><option>{d}</option></select>
              </Field>
            ))}
          </div>
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 text-xs text-blue-700 mb-5 leading-relaxed">
            🤖 سیستم برنامه را بر اساس <strong>موقعیت مکانی، دفعات مراجعه، ساعت کاری، محدودیت زمانی، زمان خدمت، زمان سفر و ظرفیت رانندگان</strong> تولید خواهد کرد. ویزیت‌های قفل‌شده تغییر نمی‌کنند.
          </div>
          <div className="flex gap-3">
            <button onClick={() => setAutoModal(false)} className="flex-1 border border-slate-200 text-slate-700 py-2.5 rounded-xl text-sm hover:bg-slate-50 transition-colors">لغو</button>
            <button onClick={() => { addHistory("برنامه خودکار تولید شد.", "auto"); setAutoModal(false); }} className="flex-1 bg-blue-600 text-white py-2.5 rounded-xl text-sm hover:bg-blue-700 transition-colors font-medium">✨ تولید برنامه</button>
          </div>
        </Modal>
      )}

      {/* Add driver */}
      {addDriverModal && (
        <Modal title="افزودن راننده" onClose={() => setAddDriverModal(false)}>
          <div className="space-y-3 mb-5">
            {[["نام و نام خانوادگی", "text"], ["شماره موبایل", "tel"], ["کد راننده", "text"], ["نوع خودرو", "text"], ["پلاک", "text"], ["ساعت کاری", "text"]].map(([l, type]) => (
              <Field key={l} label={l}>
                <input type={type} className={inputCls} placeholder={l} />
              </Field>
            ))}
            <Field label="وضعیت">
              <select className={selectCls}><option>فعال</option><option>غیرفعال</option></select>
            </Field>
          </div>
          <div className="flex gap-3">
            <button onClick={() => setAddDriverModal(false)} className="flex-1 border border-slate-200 text-slate-700 py-2.5 rounded-xl text-sm hover:bg-slate-50 transition-colors">لغو</button>
            <button onClick={() => setAddDriverModal(false)} className="flex-1 bg-blue-600 text-white py-2.5 rounded-xl text-sm hover:bg-blue-700 transition-colors font-medium">ایجاد راننده</button>
          </div>
        </Modal>
      )}

      {/* Edit driver */}
      {editDriverModal && (
        <Modal title={`ویرایش راننده — ${editDriverModal.name}`} onClose={() => setEditDriverModal(null)}>
          <div className="space-y-3 mb-5">
            {([["نام و نام خانوادگی", editDriverModal.name], ["شماره موبایل", editDriverModal.phone], ["کد راننده", editDriverModal.code], ["خودرو", editDriverModal.vehicle], ["پلاک", editDriverModal.plate]] as [string, string][]).map(([l, v]) => (
              <Field key={l} label={l}>
                <input type="text" className={inputCls} defaultValue={v} />
              </Field>
            ))}
            {editDriverModal.visits.length > 0 && (
              <div className="flex items-start gap-2 bg-yellow-50 border border-yellow-200 rounded-xl p-3 text-xs text-yellow-700">
                <span>⚠️</span>
                <span>این راننده {editDriverModal.visits.length} ویزیت فعال دارد. در صورت غیرفعال کردن، ویزیت‌ها باید منتقل شوند.</span>
              </div>
            )}
          </div>
          <div className="flex gap-3">
            <button onClick={() => setEditDriverModal(null)} className="flex-1 border border-slate-200 text-slate-700 py-2.5 rounded-xl text-sm hover:bg-slate-50 transition-colors">لغو</button>
            <button onClick={() => setEditDriverModal(null)} className="flex-1 bg-blue-600 text-white py-2.5 rounded-xl text-sm hover:bg-blue-700 transition-colors font-medium">ذخیره تغییرات</button>
          </div>
        </Modal>
      )}
    </div>
  );
}

// ─── Add Visit Modal ──────────────────────────────────────────────────────
const RECURRENCE_OPTS = ["فقط این روز", "روزانه", "یک روز در میان", "هفتگی", "روزهای مشخص"] as const;
const WEEK_DAYS = ["شنبه", "یکشنبه", "دوشنبه", "سه‌شنبه", "چهارشنبه", "پنجشنبه"] as const;

function AddVisitModal({ driver, customers, onAdd, onClose }: {
  driver: PlanDriver;
  customers: PlanCustomer[];
  onAdd: (c: PlanCustomer, time: string, dur: number, priority: PlanVisit["priority"], notes: string) => void;
  onClose: () => void;
}) {
  const [custId, setCustId] = useState("");
  const [time, setTime] = useState("09:00");
  const [dur, setDur] = useState(25);
  const [priority, setPriority] = useState<PlanVisit["priority"]>("normal");
  const [notes, setNotes] = useState("");
  const [recurrence, setRecurrence] = useState<typeof RECURRENCE_OPTS[number]>("فقط این روز");
  const [selectedDays, setSelectedDays] = useState<boolean[]>([true, false, false, false, false, false]);
  const cust = customers.find((c) => c.id === custId);
  const newTotal = calcScheduledMin(driver.visits) + dur + 10;
  const feasible = newTotal <= driver.workCapacityMin;
  const endMin = (() => { const [h, m] = time.split(":").map(Number); const t = h * 60 + m + dur; return `${String(Math.floor(t / 60)).padStart(2, "0")}:${String(t % 60).padStart(2, "0")}`; })();

  return (
    <Modal title="افزودن مشتری به ویزیت‌لیست" onClose={onClose}>
      <div className="space-y-3 mb-4">
        <Field label="مشتری">
          <select value={custId} onChange={(e) => setCustId(e.target.value)} className={selectCls}>
            <option value="">انتخاب مشتری...</option>
            {customers.filter((c) => c.active).map((c) => <option key={c.id} value={c.id}>{c.name} ({c.code})</option>)}
          </select>
        </Field>

        {cust && (
          <div className="bg-slate-50 rounded-xl p-3 text-xs space-y-1.5 text-slate-600 border border-slate-200">
            <div className="grid grid-cols-2 gap-2">
              <div><span className="text-slate-400">کد:</span> {cust.code}</div>
              <div><span className="text-slate-400">ترمینال:</span> <span className="font-mono">{cust.terminalId}</span></div>
              <div><span className="text-slate-400">فرکانس:</span> {cust.frequency}</div>
              <div><span className="text-slate-400">ساعت کاری:</span> {cust.workingHours}</div>
              <div><span className="text-slate-400">زمان خدمت:</span> {cust.serviceDurationMin}–{cust.serviceDurationMax} دقیقه</div>
              {cust.timeWindow && <div className="text-orange-600"><span className="text-slate-400">پنجره:</span> {cust.timeWindow}</div>}
            </div>
          </div>
        )}

        <div className="grid grid-cols-2 gap-3">
          <Field label="زمان پیشنهادی">
            <input type="time" value={time} onChange={(e) => setTime(e.target.value)} className={inputCls} />
          </Field>
          <Field label="مدت ویزیت (دقیقه)">
            <input type="number" value={dur} onChange={(e) => setDur(Number(e.target.value))} min={5} max={120} className={inputCls} />
          </Field>
        </div>
        <Field label="اولویت">
          <select value={priority} onChange={(e) => setPriority(e.target.value as PlanVisit["priority"])} className={selectCls}>
            <option value="high">بالا</option><option value="normal">عادی</option><option value="low">پایین</option>
          </select>
        </Field>
        <Field label="یادداشت">
          <textarea value={notes} onChange={(e) => setNotes(e.target.value)} className={`${inputCls} resize-none h-16`} />
        </Field>

        {/* Recurrence */}
        <div className="border border-slate-200 rounded-xl p-3">
          <div className="text-xs font-semibold text-slate-700 mb-2">الگوی مراجعه</div>
          <div className="space-y-1.5">
            {RECURRENCE_OPTS.map((opt) => (
              <label key={opt} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="recurrence"
                  checked={recurrence === opt}
                  onChange={() => setRecurrence(opt)}
                  className="accent-blue-600"
                />
                <span className="text-xs text-slate-700">{opt}</span>
              </label>
            ))}
          </div>
          {recurrence === "روزهای مشخص" && (
            <div className="flex flex-wrap gap-1.5 mt-2 pt-2 border-t border-slate-100">
              {WEEK_DAYS.map((d, i) => (
                <label key={d} className="flex items-center gap-1 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedDays[i]}
                    onChange={() => setSelectedDays((prev) => prev.map((v, idx) => idx === i ? !v : v))}
                    className="accent-blue-600"
                  />
                  <span className="text-xs text-slate-700">{d}</span>
                </label>
              ))}
            </div>
          )}
        </div>

        {custId && (
          <div className={`rounded-xl border p-3 text-xs space-y-1 ${feasible ? "bg-green-50 border-green-200 text-green-700" : "bg-red-50 border-red-200 text-red-700"}`}>
            <div className="font-semibold">{feasible ? "🟢 این مشتری قابل اضافه شدن است" : "🔴 اضافه کردن باعث اضافه‌بار می‌شود"}</div>
            <div className="text-slate-600">زمان ورود: {time} · زمان پایان: {endMin}</div>
            <div className="text-slate-600">ظرفیت: {minutesToHM(newTotal)} / {minutesToHM(driver.workCapacityMin)}</div>
            {!feasible && <div>اگر این مشتری اضافه شود، زمان پایان برنامه از <strong>{minutesToHM(calcScheduledMin(driver.visits))}</strong> به <strong>{minutesToHM(newTotal)}</strong> تغییر می‌کند.</div>}
          </div>
        )}
      </div>
      <div className="flex gap-3">
        <button onClick={onClose} className="flex-1 border border-slate-200 text-slate-700 py-2.5 rounded-xl text-sm hover:bg-slate-50 transition-colors">لغو</button>
        <button
          disabled={!custId}
          onClick={() => cust && onAdd(cust, time, dur, priority, notes)}
          className="flex-1 bg-blue-600 text-white py-2.5 rounded-xl text-sm hover:bg-blue-700 transition-colors font-medium disabled:opacity-40 disabled:cursor-not-allowed"
        >
          افزودن به برنامه
        </button>
      </div>
    </Modal>
  );
}

const CHANGE_SCOPE_OPTS = ["فقط این روز", "تمام روزهای این هفته", "از این تاریخ به بعد", "تا تاریخ مشخص"] as const;

// ─── Edit Visit Modal ─────────────────────────────────────────────────────
function EditVisitModal({ visit, driver, drivers, onSave, onClose }: {
  visit: PlanVisit;
  driver: PlanDriver;
  drivers: PlanDriver[];
  onSave: (v: PlanVisit) => void;
  onClose: () => void;
}) {
  const [time, setTime] = useState(visit.startTime);
  const [dur, setDur] = useState(visit.duration);
  const [priority, setPriority] = useState(visit.priority);
  const [notes, setNotes] = useState(visit.notes);
  const [changeScope, setChangeScope] = useState<typeof CHANGE_SCOPE_OPTS[number]>("فقط این روز");
  const newTotal = calcScheduledMin(driver.visits.filter((v) => v.id !== visit.id)) + dur + 10;
  const feasible = newTotal <= driver.workCapacityMin;
  const isOver = newTotal > calcScheduledMin(driver.visits);

  return (
    <Modal title={`ویرایش ویزیت — ${visit.customerName}`} onClose={onClose}>
      <div className="space-y-3 mb-4">
        <div className="bg-slate-50 rounded-xl p-3 text-xs text-slate-600 grid grid-cols-2 gap-2 border border-slate-200">
          <div><span className="text-slate-400">مشتری:</span> <strong className="text-slate-900">{visit.customerName}</strong></div>
          <div><span className="text-slate-400">ترمینال:</span> <span className="font-mono">{visit.terminalId}</span></div>
          <div><span className="text-slate-400">آدرس:</span> {visit.address}</div>
          <div><span className="text-slate-400">ساعت کاری:</span> {visit.workingHours}</div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Field label="زمان شروع"><input type="time" value={time} onChange={(e) => setTime(e.target.value)} className={inputCls} /></Field>
          <Field label="مدت ویزیت (دقیقه)"><input type="number" value={dur} onChange={(e) => setDur(Number(e.target.value))} min={5} max={120} className={inputCls} /></Field>
        </div>
        <Field label="اولویت">
          <select value={priority} onChange={(e) => setPriority(e.target.value as PlanVisit["priority"])} className={selectCls}>
            <option value="high">بالا</option><option value="normal">عادی</option><option value="low">پایین</option>
          </select>
        </Field>
        <Field label="یادداشت"><textarea value={notes} onChange={(e) => setNotes(e.target.value)} className={`${inputCls} resize-none h-16`} /></Field>

        {/* Change scope */}
        <div className="border border-blue-100 bg-blue-50/40 rounded-xl p-3">
          <div className="text-xs font-semibold text-slate-700 mb-2">محدوده این تغییر</div>
          <div className="space-y-1.5">
            {CHANGE_SCOPE_OPTS.map((opt) => (
              <label key={opt} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="changeScope"
                  checked={changeScope === opt}
                  onChange={() => setChangeScope(opt)}
                  className="accent-blue-600"
                />
                <span className="text-xs text-slate-700">{opt}</span>
              </label>
            ))}
          </div>
        </div>

        <div className={`rounded-xl border p-3 text-xs ${feasible ? isOver ? "bg-yellow-50 border-yellow-200 text-yellow-700" : "bg-green-50 border-green-200 text-green-700" : "bg-red-50 border-red-200 text-red-700"}`}>
          {feasible
            ? isOver ? "🟡 این تغییر باعث فشرده شدن برنامه می‌شود." : "🟢 تغییر قابل اجراست."
            : "🔴 این تغییر باعث تداخل با ویزیت بعدی می‌شود."}
        </div>
      </div>
      <div className="flex gap-3">
        <button onClick={onClose} className="flex-1 border border-slate-200 text-slate-700 py-2.5 rounded-xl text-sm hover:bg-slate-50 transition-colors">لغو</button>
        <button onClick={() => onSave({ ...visit, startTime: time, duration: dur, priority, notes })} className="flex-1 bg-blue-600 text-white py-2.5 rounded-xl text-sm hover:bg-blue-700 transition-colors font-medium">ذخیره تغییرات</button>
      </div>
    </Modal>
  );
}

// ─── Weekly Grid ─────────────────────────────────────────────────────────
const DAYS = ["شنبه", "یکشنبه", "دوشنبه", "سه‌شنبه", "چهارشنبه", "پنجشنبه"];
const DATES = ["۱۷", "۱۸", "۱۹", "۲۰", "۲۱", "۲۲"];

function hashInt(s: string, n: number): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) & 0xffff;
  return (h + n * 137) % 100;
}

function getWeekCell(driver: PlanDriver, dayIdx: number) {
  const h = hashInt(driver.id, dayIdx);
  const baseCount = driver.visits.length;
  const adj = (h % 3) - 1;
  const count = Math.max(1, baseCount + adj);
  const totalMins = count * 28 + count * 12;
  const pct = Math.round((totalMins / driver.workCapacityMin) * 100);
  const status = pct > 100 ? "overload" : pct > 90 ? "review" : pct > 78 ? "busy" : "ok";
  return { count, totalMins, pct, status };
}

const cellStatus: Record<string, { emoji: string; label: string; cell: string; badge: string }> = {
  ok:       { emoji: "🟢", label: "قابل اجرا",     cell: "hover:bg-green-50/60 border-slate-200",                          badge: "bg-green-50 text-green-700 border-green-200" },
  busy:     { emoji: "🟡", label: "فشرده",          cell: "hover:bg-yellow-50/60 border-slate-200",                        badge: "bg-yellow-50 text-yellow-700 border-yellow-200" },
  review:   { emoji: "🟠", label: "نیازمند بررسی", cell: "hover:bg-orange-50/60 border-orange-200 bg-orange-50/20",       badge: "bg-orange-50 text-orange-700 border-orange-200" },
  overload: { emoji: "🔴", label: "غیرقابل اجرا",  cell: "hover:bg-red-50/60 border-red-200 bg-red-50/20",               badge: "bg-red-50 text-red-700 border-red-200" },
};

function WeeklyGrid({
  drivers,
  visibleDrivers,
  totalFilters,
  driverFilter,
  setDriverFilter,
  onSelectCell,
  onAddDriver,
}: {
  drivers: PlanDriver[];
  visibleDrivers: PlanDriver[];
  totalFilters: { key: string; label: string; count: number }[];
  driverFilter: string;
  setDriverFilter: (f: "all" | "online" | "offline" | "alert" | "ok" | "problem") => void;
  onSelectCell: (driverId: string, day: number) => void;
  onAddDriver: () => void;
}) {
  return (
    <div className="flex-1 overflow-auto hide-scroll p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-base font-bold text-slate-900">نمای هفتگی برنامه ویزیت</h2>
          <p className="text-xs text-slate-400 mt-0.5">هفته جاری · ۱۷ تا ۲۲ مرداد ۱۴۰۵</p>
        </div>
        <button onClick={onAddDriver} className="text-xs bg-blue-600 text-white px-3 py-1.5 rounded-lg hover:bg-blue-700 transition-colors font-medium">+ افزودن راننده</button>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-1.5 mb-4 flex-wrap">
        {totalFilters.map((f) => (
          <button
            key={f.key}
            onClick={() => setDriverFilter(f.key as "all" | "online" | "offline" | "alert" | "ok" | "problem")}
            className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-colors border ${driverFilter === f.key ? "bg-blue-600 text-white border-blue-600" : "bg-white text-slate-600 border-slate-200 hover:border-slate-300"}`}
          >
            {f.label} <span className="opacity-70 ml-0.5">{f.count}</span>
          </button>
        ))}
      </div>

      {/* Legend */}
      <div className="flex items-center gap-4 mb-4 text-xs">
        {Object.entries(cellStatus).map(([k, v]) => (
          <span key={k} className="flex items-center gap-1">
            <span>{v.emoji}</span>
            <span className="text-slate-500">{v.label}</span>
          </span>
        ))}
      </div>

      {/* Grid table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse" style={{ minWidth: 700 }}>
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="px-4 py-3 text-right text-xs font-bold text-slate-600 w-44">راننده</th>
                {DAYS.map((d, i) => (
                  <th key={d} className="px-2 py-3 text-center text-xs font-bold text-slate-600 min-w-[110px]">
                    <div>{d}</div>
                    <div className="text-[10px] text-slate-400 font-normal">{DATES[i]} مرداد</div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {visibleDrivers.map((driver) => (
                <tr key={driver.id} className="border-b border-slate-100 last:border-0">
                  {/* Driver name cell */}
                  <td className="px-4 py-3 border-l border-slate-100">
                    <div className="flex items-center gap-2.5">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0 ${driver.status === "offline" ? "bg-slate-300" : "bg-blue-600"}`}>
                        {driver.avatar}
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs font-semibold text-slate-900 truncate">{driver.name}</div>
                        <DriverStatusBadge status={driver.status} />
                      </div>
                    </div>
                  </td>
                  {/* Day cells */}
                  {DAYS.map((_, dayIdx) => {
                    const cell = getWeekCell(driver, dayIdx);
                    const cfg = cellStatus[cell.status];
                    return (
                      <td key={dayIdx} className="p-1.5">
                        <button
                          onClick={() => onSelectCell(driver.id, dayIdx)}
                          className={`w-full rounded-lg border p-2.5 text-center transition-all cursor-pointer group ${cfg.cell}`}
                        >
                          <div className="text-sm font-bold text-slate-900 group-hover:text-blue-700 transition-colors">{cell.count} ویزیت</div>
                          <div className="text-[10px] text-slate-400 mt-0.5">{minutesToHM(cell.totalMins)}</div>
                          <div className={`inline-flex items-center gap-1 mt-1.5 text-[10px] font-medium px-1.5 py-0.5 rounded-full border ${cfg.badge}`}>
                            {cfg.emoji} {cfg.label}
                          </div>
                        </button>
                      </td>
                    );
                  })}
                </tr>
              ))}
              {visibleDrivers.length === 0 && (
                <tr>
                  <td colSpan={7} className="text-center py-12 text-slate-400">
                    <div className="text-3xl mb-2">🚚</div>
                    <div className="text-sm">راننده‌ای یافت نشد</div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Summary row */}
      <div className="mt-4 grid grid-cols-3 gap-4">
        <div className="bg-white rounded-xl border border-slate-200 p-4">
          <div className="text-xs text-slate-500 mb-1">کل رانندگان این هفته</div>
          <div className="text-2xl font-bold text-slate-900">{drivers.length}</div>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-4">
          <div className="text-xs text-slate-500 mb-1">برنامه‌های قابل اجرا</div>
          <div className="text-2xl font-bold text-green-600">{drivers.filter(isFeasible).length}</div>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-4">
          <div className="text-xs text-slate-500 mb-1">نیازمند بررسی</div>
          <div className="text-2xl font-bold text-orange-600">{drivers.filter((d) => !isFeasible(d)).length}</div>
        </div>
      </div>
    </div>
  );
}

// ─── Transfer Modal ───────────────────────────────────────────────────────
function TransferModal({ visit, fromDriver, drivers, onTransfer, onClose }: {
  visit: PlanVisit;
  fromDriver: PlanDriver;
  drivers: PlanDriver[];
  onTransfer: (v: PlanVisit, toId: string) => void;
  onClose: () => void;
}) {
  const [toId, setToId] = useState("");
  const toDriver = drivers.find((d) => d.id === toId);
  const fromNew = calcScheduledMin(fromDriver.visits.filter((v) => v.id !== visit.id));
  const toNew = toDriver ? calcScheduledMin(toDriver.visits) + visit.duration + 10 : 0;
  const toFeasible = toDriver ? toNew <= toDriver.workCapacityMin : true;

  return (
    <Modal title="انتقال به راننده دیگر" onClose={onClose}>
      <div className="space-y-4 mb-4">
        <div className="bg-slate-50 rounded-xl p-3 text-sm border border-slate-200">
          <span className="text-slate-500">ویزیت: </span><strong className="text-slate-900">{visit.customerName}</strong>
          <div className="text-xs text-slate-400 mt-0.5">{visit.terminalId} · {visit.duration} دقیقه</div>
        </div>
        <Field label="انتقال به:">
          <select value={toId} onChange={(e) => setToId(e.target.value)} className={selectCls}>
            <option value="">انتخاب راننده...</option>
            {drivers.filter((d) => d.id !== fromDriver.id).map((d) => (
              <option key={d.id} value={d.id}>{d.name} ({getCapacityPct(d)}% ظرفیت)</option>
            ))}
          </select>
        </Field>

        {toDriver && (
          <div className="grid grid-cols-2 gap-3">
            {[
              { title: fromDriver.name, before: fromDriver.visits.length, after: fromDriver.visits.length - 1, timeBefore: calcScheduledMin(fromDriver.visits), timeAfter: fromNew, cap: fromDriver.workCapacityMin },
              { title: toDriver.name, before: toDriver.visits.length, after: toDriver.visits.length + 1, timeBefore: calcScheduledMin(toDriver.visits), timeAfter: toNew, cap: toDriver.workCapacityMin },
            ].map((d) => {
              const ok = d.timeAfter <= d.cap;
              return (
                <div key={d.title} className={`rounded-xl border p-3 text-xs ${ok ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200"}`}>
                  <div className="font-bold text-slate-900 mb-2">{d.title}</div>
                  <div className="space-y-1 text-slate-600">
                    <div>{d.before} → {d.after} ویزیت</div>
                    <div>{minutesToHM(d.timeBefore)} → {minutesToHM(d.timeAfter)}</div>
                  </div>
                  <div className={`font-bold mt-2 ${ok ? "text-green-700" : "text-red-700"}`}>{ok ? "🟢 قابل اجرا" : "🔴 بیش از ظرفیت"}</div>
                </div>
              );
            })}
          </div>
        )}
      </div>
      <div className="flex gap-3">
        <button onClick={onClose} className="flex-1 border border-slate-200 text-slate-700 py-2.5 rounded-xl text-sm hover:bg-slate-50 transition-colors">لغو</button>
        <button onClick={() => toId && onTransfer(visit, toId)} disabled={!toId || !toFeasible} className="flex-1 bg-blue-600 text-white py-2.5 rounded-xl text-sm hover:bg-blue-700 transition-colors font-medium disabled:opacity-40 disabled:cursor-not-allowed">انتقال ویزیت</button>
      </div>
    </Modal>
  );
}
