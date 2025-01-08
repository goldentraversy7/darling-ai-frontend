import { lazy } from "react";

const DashboardPage = lazy(() => import("./DashboardPage"));

const DashboardConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: "dashboard",
      element: <DashboardPage />,
    },
  ],
};

export default DashboardConfig;
