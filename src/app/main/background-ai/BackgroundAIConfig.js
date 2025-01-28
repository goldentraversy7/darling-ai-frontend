import { lazy } from "react";

const BackgroundAIPage = lazy(() => import("./BackgroundAIPage"));

const BackgroundAIConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: "background-ai",
      element: <BackgroundAIPage />,
    },
  ],
};

export default BackgroundAIConfig;
