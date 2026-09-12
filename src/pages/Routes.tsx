import Header from "../components/Header";
import LiveMap from "../components/LiveMap";
import { drivers, customers, visits } from "../data/mockData";
import { useState } from "react";

export default function Routes() {
  const [selectedId, setSelectedId] = useState("drv-001");
  return (
    <div className="flex flex-col h-full overflow-hidden bg-slate-50">
      <Header title="مسیرها" subtitle="نمایش مسیر برنامه‌ریزی‌شده و طی‌شده رانندگان" />
      <div className="flex-1 p-6 flex flex-col gap-4 overflow-hidden">
        <div className="flex gap-3 items-center bg-white rounded-xl border border-slate-200 shadow-sm p-3 flex-shrink-0">
          <label className="text-xs text-slate-500">انتخاب راننده:</label>
          <select
            value={selectedId}
            onChange={(e) => setSelectedId(e.target.value)}
            className="text-xs border border-slate-200 rounded-lg px-3 py-2 text-slate-700 bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            {drivers.map((d) => <option key={d.id} value={d.id}>{d.name}</option>)}
          </select>
          <div className="flex gap-3 text-xs text-slate-500 mr-auto items-center">
            <span className="flex items-center gap-1.5"><span className="w-6 border-t-2 border-dashed border-blue-300 inline-block" />مسیر برنامه‌ریزی‌شده</span>
            <span className="flex items-center gap-1.5"><span className="w-6 border-t-2 border-blue-700 inline-block" />مسیر طی‌شده</span>
            <span className="flex items-center gap-1.5"><span className="w-6 border-t-2 border-orange-500 inline-block" />انحراف</span>
          </div>
        </div>
        <div className="flex-1 min-h-0">
          <LiveMap
            drivers={drivers}
            customers={customers}
            visits={visits}
            selectedDriverId={selectedId}
            onSelectDriver={setSelectedId}
            showAllDrivers={false}
          />
        </div>
      </div>
    </div>
  );
}
