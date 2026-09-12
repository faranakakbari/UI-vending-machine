import { useState } from "react";
import { useNavigate } from "react-router";
import Header from "../components/Header";
import StatusBadge from "../components/StatusBadge";
import { drivers } from "../data/mockData";

const inputCls = "w-full text-sm border border-slate-200 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 bg-white";
const selectCls = inputCls;
function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-xs text-slate-500 mb-1">{label}</label>
      {children}
    </div>
  );
}

export default function Drivers() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [addDriverModal, setAddDriverModal] = useState(false);

  const filtered = drivers.filter(
    (d) =>
      d.name.includes(search) ||
      d.code.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full overflow-hidden bg-slate-50">
      <Header title="لیست و مدیریت رانندگان" subtitle="مدیریت و پایش وضعیت تمام رانندگان" />
      <div className="flex-1 overflow-auto hide-scroll p-6">
        {/* Summary cards */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          {[
            { label: "کل رانندگان", value: drivers.length, color: "bg-blue-50 border-blue-200 text-blue-700", icon: "🚚" },
            { label: "آنلاین", value: drivers.filter((d) => d.status !== "offline").length, color: "bg-green-50 border-green-200 text-green-700", icon: "🟢" },
            { label: "آفلاین", value: drivers.filter((d) => d.status === "offline").length, color: "bg-slate-50 border-slate-200 text-slate-600", icon: "⚫" },
            { label: "دارای تأخیر", value: drivers.filter((d) => d.status === "delayed").length, color: "bg-yellow-50 border-yellow-200 text-yellow-700", icon: "⚠️" },
          ].map((c) => (
            <div key={c.label} className={`rounded-xl border p-4 ${c.color} flex items-center gap-3`}>
              <span className="text-2xl">{c.icon}</span>
              <div>
                <div className="text-2xl font-bold">{c.value}</div>
                <div className="text-sm opacity-80">{c.label}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-100 flex items-center gap-3">
            <h2 className="text-sm font-bold text-slate-900 flex-1">رانندگان</h2>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="جستجو..."
              className="text-xs border border-slate-200 rounded-lg px-3 py-2 w-48 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            <button
              onClick={() => setAddDriverModal(true)}
              className="text-xs bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              + افزودن راننده
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  {["راننده", "کد", "وضعیت", "خودرو", "پلاک", "ویزیت", "مسافت", "پایبندی", "عملیات"].map((h) => (
                    <th key={h} className="px-4 py-3 text-right text-slate-500 font-semibold whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((d) => (
                  <tr key={d.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold ${d.status === "offline" ? "bg-slate-300" : "bg-blue-600"}`}>
                          {d.avatar}
                        </div>
                        <span className="font-medium text-slate-900 whitespace-nowrap">{d.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-slate-500 font-mono">{d.code}</td>
                    <td className="px-4 py-3"><StatusBadge status={d.status} size="sm" /></td>
                    <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{d.vehicle}</td>
                    <td className="px-4 py-3 text-slate-600 font-mono">{d.plate}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden w-16">
                          <div className="h-full bg-blue-500 rounded-full" style={{ width: `${Math.round((d.completedVisits / d.totalVisits) * 100)}%` }} />
                        </div>
                        <span className="text-slate-700 font-medium whitespace-nowrap">{d.completedVisits}/{d.totalVisits}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-slate-600">{d.distanceKm} km</td>
                    <td className="px-4 py-3">
                      <span className={`font-semibold ${d.routeAdherence >= 90 ? "text-green-600" : d.routeAdherence >= 80 ? "text-yellow-600" : "text-red-600"}`}>
                        {d.routeAdherence}٪
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => navigate(`/drivers/${d.id}`)}
                        className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
                      >
                        جزئیات
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Add Driver Modal */}
      {addDriverModal && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" onClick={() => setAddDriverModal(false)}>
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[92vh] flex flex-col" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
              <h2 className="text-base font-bold text-slate-900">افزودن راننده</h2>
              <button onClick={() => setAddDriverModal(false)} className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 text-lg leading-none">×</button>
            </div>
            <div className="overflow-y-auto flex-1 px-6 py-5 space-y-3">
              {[["نام و نام خانوادگی", "text"], ["شماره موبایل", "tel"], ["کد راننده", "text"], ["نوع خودرو", "text"], ["پلاک", "text"], ["ساعت کاری", "text"]].map(([l, type]) => (
                <Field key={l} label={l}>
                  <input type={type} className={inputCls} placeholder={l} />
                </Field>
              ))}
              <Field label="وضعیت">
                <select className={selectCls}><option>فعال</option><option>غیرفعال</option></select>
              </Field>
            </div>
            <div className="px-6 pb-6 flex gap-3">
              <button onClick={() => setAddDriverModal(false)} className="flex-1 border border-slate-200 text-slate-700 py-2.5 rounded-xl text-sm hover:bg-slate-50 transition-colors">لغو</button>
              <button onClick={() => setAddDriverModal(false)} className="flex-1 bg-blue-600 text-white py-2.5 rounded-xl text-sm hover:bg-blue-700 transition-colors font-medium">ایجاد راننده</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
