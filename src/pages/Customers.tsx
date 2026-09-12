import { useState } from "react";
import { useNavigate } from "react-router";
import Header from "../components/Header";
import { customers, drivers } from "../data/mockData";

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

export default function Customers() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [addModal, setAddModal] = useState(false);

  const filtered = customers.filter(
    (c) => c.name.includes(search) || c.code.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full overflow-hidden bg-slate-50">
      <Header title="لیست مشتریان" subtitle="مدیریت اطلاعات و تاریخچه ویزیت مشتریان" />
      <div className="flex-1 overflow-auto hide-scroll p-6">
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-100 flex items-center gap-3">
            <h2 className="text-sm font-bold text-slate-900 flex-1">مشتریان</h2>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="جستجوی مشتری..."
              className="text-xs border border-slate-200 rounded-lg px-3 py-2 w-48 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            <button
              onClick={() => setAddModal(true)}
              className="text-xs bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              + افزودن مشتری
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  {["نام مشتری", "کد", "آدرس", "منطقه", "شخص تماس", "تلفن", "راننده", "آخرین ویزیت", "ویزیت بعدی", "میانگین مدت ویزیت"].map((h) => (
                    <th key={h} className="px-4 py-3 text-right text-slate-500 font-semibold whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((c) => {
                  const driver = drivers.find((d) => d.id === c.assignedDriver);
                  return (
                    <tr key={c.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors cursor-pointer" onClick={() => navigate(`/customers/${c.id}`)}>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-lg bg-blue-100 flex items-center justify-center text-blue-700 text-xs font-bold">🏪</div>
                          <span className="font-medium text-slate-900 whitespace-nowrap">{c.name}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-slate-500 font-mono">{c.code}</td>
                      <td className="px-4 py-3 text-slate-500 whitespace-nowrap">{c.address}</td>
                      <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{c.zone}</td>
                      <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{c.contact}</td>
                      <td className="px-4 py-3 text-slate-600 font-mono">{c.phone}</td>
                      <td className="px-4 py-3 text-slate-700 whitespace-nowrap">{driver?.name ?? "—"}</td>
                      <td className="px-4 py-3 text-slate-500 whitespace-nowrap">{c.lastVisit}</td>
                      <td className="px-4 py-3 text-slate-500 whitespace-nowrap">{c.nextVisit}</td>
                      <td className="px-4 py-3 text-slate-600">{c.geofenceRadius ? `${Math.round(c.geofenceRadius / 3)} دقیقه` : "—"}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Add Customer Modal */}
      {addModal && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" onClick={() => setAddModal(false)}>
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[92vh] flex flex-col" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
              <h2 className="text-base font-bold text-slate-900">افزودن مشتری</h2>
              <button onClick={() => setAddModal(false)} className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 text-lg leading-none">×</button>
            </div>
            <div className="overflow-y-auto flex-1 px-6 py-5 space-y-3">
              <Field label="نام مشتری">
                <input type="text" className={inputCls} placeholder="نام مشتری" />
              </Field>
              <Field label="کد مشتری">
                <input type="text" className={inputCls} placeholder="مثال: C-001" />
              </Field>
              <Field label="آدرس">
                <input type="text" className={inputCls} placeholder="آدرس کامل" />
              </Field>
              <div className="grid grid-cols-2 gap-3">
                <Field label="منطقه">
                  <select className={selectCls}>
                    <option>منطقه ۱</option><option>منطقه ۲</option><option>منطقه ۳</option><option>منطقه ۴</option><option>منطقه ۵</option>
                  </select>
                </Field>
                <Field label="راننده اختصاصی">
                  <select className={selectCls}>
                    <option value="">انتخاب راننده...</option>
                    {drivers.map((d) => <option key={d.id} value={d.id}>{d.name}</option>)}
                  </select>
                </Field>
              </div>
              <Field label="شخص تماس">
                <input type="text" className={inputCls} placeholder="نام مسئول پذیرش" />
              </Field>
              <Field label="شماره تلفن">
                <input type="tel" className={inputCls} placeholder="021-XXXXXXXX" />
              </Field>
              <Field label="ساعات کاری">
                <input type="text" className={inputCls} placeholder="مثال: ۰۸:۰۰–۱۷:۰۰" />
              </Field>
              <Field label="مدت زمان ویزیت (دقیقه)">
                <input type="number" className={inputCls} placeholder="۳۰" min={5} max={120} />
              </Field>
            </div>
            <div className="px-6 pb-6 flex gap-3">
              <button onClick={() => setAddModal(false)} className="flex-1 border border-slate-200 text-slate-700 py-2.5 rounded-xl text-sm hover:bg-slate-50 transition-colors">لغو</button>
              <button onClick={() => setAddModal(false)} className="flex-1 bg-blue-600 text-white py-2.5 rounded-xl text-sm hover:bg-blue-700 transition-colors font-medium">ثبت مشتری</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
