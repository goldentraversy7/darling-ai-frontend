import { lazy } from "react";

const StockAIPage = lazy(() => import("./StockAIPage"));

const StockAIConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: "stock-ai",
      element: <StockAIPage />,
    },
  ],
};

export default StockAIConfig;
