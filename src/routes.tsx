import { createBrowserRouter } from "react-router";
import RootLayout from "./layouts/RootLayout";
import Dashboard from "./pages/Dashboard";
import Drivers from "./pages/Drivers";
import Planning from "./pages/Planning";
import DriverDetail from "./pages/DriverDetail";
import Customers from "./pages/Customers";
import CustomerDetail from "./pages/CustomerDetail";
import Visits from "./pages/Visits";
import Routes from "./pages/Routes";
import Performance from "./pages/Performance";
import Alerts from "./pages/Alerts";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      { index: true, Component: Dashboard },
      { path: "drivers", Component: Drivers },
      { path: "drivers/:id", Component: DriverDetail },
      { path: "planning", Component: Planning },
      { path: "customers", Component: Customers },
      { path: "customers/:id", Component: CustomerDetail },
      { path: "visits", Component: Visits },
      { path: "routes", Component: Routes },
      { path: "performance", Component: Performance },
      { path: "alerts", Component: Alerts },
      { path: "reports", Component: Reports },
      { path: "settings", Component: Settings },
    ],
  },
]);
