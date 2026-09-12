import { alerts } from "../data/mockData";

const unread = alerts.filter((a) => !a.read).length;

interface Props {
  title: string;
  subtitle?: string;
}

export default function Header({ title, subtitle }: Props) {
  return (
    <div className="flex items-center justify-between px-6 py-4 bg-white border-b border-slate-200 flex-shrink-0">
      <div>
        <h1 className="text-xl font-bold text-slate-900">{title}</h1>
        {subtitle && <p className="text-sm text-slate-500 mt-0.5">{subtitle}</p>}
      </div>
      <div className="flex items-center gap-3">
        <button className="relative w-9 h-9 rounded-lg bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors">
          <span className="text-lg">🔔</span>
          {unread > 0 && (
            <span className="absolute -top-1 -left-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center font-medium">
              {unread}
            </span>
          )}
        </button>
        <div className="flex items-center gap-2 bg-slate-100 rounded-lg px-3 py-1.5">
          <div className="w-7 h-7 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold">ع</div>
          <div className="text-sm">
            <div className="font-medium text-slate-900 leading-tight">علی محمدی</div>
            <div className="text-slate-500 text-xs">مدیر ویزیت</div>
          </div>
        </div>
      </div>
    </div>
  );
}
