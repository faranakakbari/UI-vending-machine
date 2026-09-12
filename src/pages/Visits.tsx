import { useState } from "react";
import Header from "../components/Header";
import StatusBadge from "../components/StatusBadge";
import { visits, drivers } from "../data/mockData";
import type { VisitStatus } from "../data/mockData";

interface ModalVisit {
  id: string;
}

export default function Visits() {
  const [modal, setModal] = useState<ModalVisit | null>(null);
  const modalVisit = modal ? visits.find((v) => v.id === modal.id) : null;
  const modalDriver = modalVisit ? drivers.find((d) => d.id === modalVisit.driverId) : null;

  return (
    <div className="flex flex-col h-full overflow-hidden bg-slate-50">
      <Header title="ویزیت‌های امروز" subtitle="پایش وضعیت تمام ویزیت‌های جاری" />
      <div className="flex-1 overflow-auto hide-scroll p-6">
        {/* Summary */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          {(["completed", "visiting", "delayed", "missed"] as VisitStatus[]).map((s) => {
            const count = visits.filter((v) => v.status === s).length;
            const labels: Record<VisitStatus, string> = { completed: "انجام شد", visiting: "در حال ویزیت", planned: "برنامه‌ریزی‌شده", delayed: "تأخیر", missed: "از دست‌رفته" };
            return (
              <div key={s} className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 text-center">
                <div className="text-2xl font-bold text-slate-900">{count}</div>
                <div className="mt-1"><StatusBadge status={s} size="sm" /></div>
                <div className="text-xs text-slate-400 mt-1">{labels[s]}</div>
              </div>
            );
          })}
        </div>

        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-100">
            <h2 className="text-sm font-bold text-slate-900">جدول ویزیت‌های امروز</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  {["ردیف", "مشتری", "آدرس", "راننده", "وضعیت", "ورود", "خروج", "مدت ویزیت", "فاصله از مسیر"].map((h) => (
                    <th key={h} className="px-4 py-3 text-right text-slate-500 font-semibold whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {visits.map((v, i) => {
                  const driver = drivers.find((d) => d.id === v.driverId);
                  return (
                    <tr key={v.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                      <td className="px-4 py-3 text-slate-500">{i + 1}</td>
                      <td className="px-4 py-3 font-medium text-slate-900 whitespace-nowrap">{v.customerName}</td>
                      <td className="px-4 py-3 text-slate-500 whitespace-nowrap">{v.customerAddress}</td>
                      <td className="px-4 py-3 text-slate-700 whitespace-nowrap">{driver?.name ?? "—"}</td>
                      <td className="px-4 py-3"><StatusBadge status={v.status} size="sm" /></td>
                      <td className="px-4 py-3 text-slate-600">{v.arrivalTime ?? "—"}</td>
                      <td className="px-4 py-3 text-slate-600">{v.departureTime ?? "—"}</td>
                      <td className="px-4 py-3 text-slate-600">{v.duration ? `${v.duration} دقیقه` : "—"}</td>
                      <td className="px-4 py-3 text-slate-600">{v.distanceFromRoute !== null ? `${v.distanceFromRoute} متر` : "—"}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Visit Detail Modal */}
      {modal && modalVisit && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" onClick={() => setModal(null)}>
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg" onClick={(e) => e.stopPropagation()}>
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <h2 className="text-base font-bold text-slate-900">جزئیات ویزیت</h2>
              <button onClick={() => setModal(null)} className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 transition-colors">×</button>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                {[
                  ["مشتری", modalVisit.customerName],
                  ["راننده", modalDriver?.name ?? "—"],
                  ["زمان برنامه", modalVisit.scheduledTime],
                  ["زمان ورود", modalVisit.arrivalTime ?? "—"],
                  ["زمان خروج", modalVisit.departureTime ?? "—"],
                  ["مدت ویزیت", modalVisit.duration ? `${modalVisit.duration} دقیقه` : "—"],
                  ["فاصله از مسیر", modalVisit.distanceFromRoute !== null ? `${modalVisit.distanceFromRoute} متر` : "—"],
                  ["آدرس", modalVisit.customerAddress],
                ].map(([k, v]) => (
                  <div key={k} className="bg-slate-50 rounded-xl p-3">
                    <div className="text-xs text-slate-400">{k}</div>
                    <div className="text-sm font-semibold text-slate-900 mt-0.5">{v}</div>
                  </div>
                ))}
              </div>
              <div className="bg-slate-50 rounded-xl p-3">
                <div className="text-xs text-slate-400 mb-1">وضعیت</div>
                <StatusBadge status={modalVisit.status} />
              </div>
              {modalVisit.notes && (
                <div className="bg-slate-50 rounded-xl p-3">
                  <div className="text-xs text-slate-400 mb-1">یادداشت</div>
                  <div className="text-sm text-slate-700">{modalVisit.notes}</div>
                </div>
              )}
            </div>
            <div className="px-6 pb-6 flex gap-3">
              <button onClick={() => setModal(null)} className="flex-1 border border-slate-200 text-slate-700 py-2.5 rounded-xl text-sm hover:bg-slate-50 transition-colors font-medium">بستن</button>
              <button className="flex-1 bg-blue-600 text-white py-2.5 rounded-xl text-sm hover:bg-blue-700 transition-colors font-medium">مشاهده روی نقشه</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
