import { Outlet } from "react-router";
import Sidebar from "../components/Sidebar";

export default function RootLayout() {
  return (
    <div className="flex h-full" style={{ direction: "rtl" }}>
      <Sidebar />
      <main className="flex-1 overflow-hidden flex flex-col" style={{ direction: "rtl" }}>
        <Outlet />
      </main>
    </div>
  );
}
