import { NavLink, useLocation } from "react-router";
import { alerts } from "../data/mockData";

const unread = alerts.filter((a) => !a.read).length;

const navItems = [
  { path: "/", label: "داشبورد", icon: "🏠" },
  { path: "/drivers", label: "رانندگان", icon: "🚚" },
  { path: "/planning", label: "برنامه‌ریزی ویزیت", icon: "📅" },
  { path: "/customers", label: "مشتریان", icon: "👥" },
  { path: "/visits", label: "ویزیت‌ها", icon: "📍" },
  { path: "/routes", label: "مسیرها", icon: "🗺️" },
  { path: "/performance", label: "عملکرد", icon: "📊" },
  { path: "/alerts", label: "هشدارها", icon: "⚠️", badge: unread },
  { path: "/reports", label: "گزارش‌ها", icon: "📈" },
  { path: "/settings", label: "تنظیمات", icon: "⚙️" },
];

export default function Sidebar() {
  const location = useLocation();
  return (
    <aside
      className="flex flex-col h-full text-slate-300"
      style={{ width: "var(--sidebar-width)", backgroundColor: "var(--sidebar-bg)", direction: "rtl" }}
    >
      {/* Logo */}
      <div className="px-4 py-5 border-b border-slate-700/50">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400 text-base flex-shrink-0">🚚</div>
          <div className="text-white font-semibold text-sm leading-tight">شرکت سایه سمن</div>
        </div>
      </div>

      {/* User */}
      <div className="px-4 py-3 border-b border-slate-700/50">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-blue-500/20 border border-blue-500/30 flex items-center justify-center text-blue-400 font-bold text-sm flex-shrink-0">
            ع
          </div>
          <div className="min-w-0">
            <div className="text-white text-sm font-medium truncate">علی محمدی</div>
            <div className="text-slate-400 text-xs">مدیر ویزیت</div>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-2 py-3 overflow-y-auto hide-scroll">
        {navItems.map((item) => {
          const isActive = item.path === "/" ? location.pathname === "/" : location.pathname.startsWith(item.path);
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg mb-0.5 text-sm transition-all relative group ${
                isActive
                  ? "bg-blue-600/20 text-blue-400 border-r-2 border-blue-400"
                  : "text-slate-400 hover:bg-slate-700/40 hover:text-slate-200"
              }`}
            >
              <span className="text-base w-5 text-center flex-shrink-0">{item.icon}</span>
              <span className="flex-1">{item.label}</span>
              {item.badge ? (
                <span className="bg-red-500 text-white text-xs rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1 font-medium">
                  {item.badge}
                </span>
              ) : null}
            </NavLink>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="px-2 py-3 border-t border-slate-700/50">
        <button className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-slate-400 hover:bg-slate-700/40 hover:text-slate-200 w-full transition-all">
          <span className="text-base w-5 text-center">🚪</span>
          <span>خروج</span>
        </button>
      </div>
    </aside>
  );
}
