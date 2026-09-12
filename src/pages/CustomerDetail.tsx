import { useParams, useNavigate } from "react-router";
import Header from "../components/Header";
import { customers, drivers, visits } from "../data/mockData";

export default function CustomerDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const customer = customers.find((c) => c.id === id) ?? customers[0];
  const driver = drivers.find((d) => d.id === customer.assignedDriver);
  const customerVisits = visits.filter((v) => v.customerId === customer.id);

  return (
    <div className="flex flex-col h-full overflow-hidden bg-slate-50">
      <Header title={`جزئیات مشتری — ${customer.name}`} subtitle="اطلاعات، تاریخچه ویزیت و موقعیت مشتری" />
      <div className="flex-1 overflow-auto hide-scroll p-6 space-y-5">
        {/* Header card */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 flex items-center gap-5">
          <div className="w-14 h-14 rounded-xl bg-blue-100 flex items-center justify-center text-3xl">🏪</div>
          <div className="flex-1">
            <div className="flex items-center gap-3">
              <h2 className="text-xl font-bold text-slate-900">{customer.name}</h2>
              <span className="text-sm text-slate-400 font-mono">{customer.code}</span>
            </div>
            <div className="flex gap-4 mt-1 text-sm text-slate-500">
              <span>📍 {customer.address}</span>
              <span>👤 {customer.contact}</span>
              <span>📞 {customer.phone}</span>
            </div>
          </div>
          <button onClick={() => navigate("/customers")} className="text-sm bg-slate-100 text-slate-700 px-4 py-2 rounded-xl hover:bg-slate-200 transition-colors">← بازگشت</button>
        </div>

        <div className="grid grid-cols-3 gap-5">
          {/* Info */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4">
            <h3 className="text-xs font-bold text-slate-700 mb-3 pb-2 border-b border-slate-100">اطلاعات مشتری</h3>
            <div className="space-y-2.5">
              {[
                ["کد مشتری", customer.code],
                ["منطقه", customer.zone],
                ["شخص تماس", customer.contact],
                ["تلفن", customer.phone],
                ["راننده اختصاص‌یافته", driver?.name ?? "—"],
                ["آخرین ویزیت", customer.lastVisit],
                ["ویزیت بعدی", customer.nextVisit],
                ["تعداد کل ویزیت‌ها", customer.totalVisits.toString()],
                ["میانگین مدت ویزیت", `${customer.avgDuration} دقیقه`],
                ["جئوفنس", `${customer.geofenceRadius} متر`],
                ["موقعیت GPS", `${customer.lat.toFixed(4)}, ${customer.lng.toFixed(4)}`],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between text-xs">
                  <span className="text-slate-400">{k}:</span>
                  <span className="text-slate-700 font-medium">{v}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Visit history */}
          <div className="col-span-2 bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="px-5 py-4 border-b border-slate-100">
              <h3 className="text-xs font-bold text-slate-700">تاریخچه ویزیت</h3>
            </div>
            {customerVisits.length === 0 ? (
              <div className="p-8 text-center">
                <div className="text-slate-300 text-3xl mb-2">📋</div>
                <div className="text-sm text-slate-400">ویزیتی برای این مشتری ثبت نشده است</div>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200">
                      {["راننده", "زمان برنامه", "ورود", "خروج", "مدت", "فاصله از مسیر", "وضعیت"].map((h) => (
                        <th key={h} className="px-4 py-3 text-right text-slate-500 font-semibold whitespace-nowrap">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {customerVisits.map((v) => {
                      const d = drivers.find((dr) => dr.id === v.driverId);
                      return (
                        <tr key={v.id} className="border-b border-slate-100 hover:bg-slate-50">
                          <td className="px-4 py-3 font-medium text-slate-900 whitespace-nowrap">{d?.name ?? "—"}</td>
                          <td className="px-4 py-3 text-slate-600">{v.scheduledTime}</td>
                          <td className="px-4 py-3 text-slate-600">{v.arrivalTime ?? "—"}</td>
                          <td className="px-4 py-3 text-slate-600">{v.departureTime ?? "—"}</td>
                          <td className="px-4 py-3 text-slate-600">{v.duration ? `${v.duration} دقیقه` : "—"}</td>
                          <td className="px-4 py-3 text-slate-600">{v.distanceFromRoute !== null ? `${v.distanceFromRoute} متر` : "—"}</td>
                          <td className="px-4 py-3">
                            <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${v.status === "completed" ? "bg-green-50 text-green-700" : v.status === "visiting" ? "bg-orange-50 text-orange-700" : "bg-slate-100 text-slate-500"}`}>
                              {v.status === "completed" ? "انجام شد" : v.status === "visiting" ? "در حال ویزیت" : "برنامه‌ریزی‌شده"}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
