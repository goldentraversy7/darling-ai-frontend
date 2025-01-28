import FuseUtils from "@fuse/utils";
import FuseLoading from "@fuse/core/FuseLoading";
import { Navigate } from "react-router-dom";
import settingsConfig from "app/configs/settingsConfig";
import Error404Page from "../main/404/Error404Page";
import authConfigs from "../main/auth/authConfigs";
import DashboardConfig from "./../main/dashboard/DashboardConfig";
import StockAIConfig from "./../main/stock-ai/StockAIConfig";
import BackgroundAIConfig from "./../main/background-ai/BackgroundAIConfig";

const routeConfigs = [
  ...authConfigs,
  DashboardConfig,
  StockAIConfig,
  BackgroundAIConfig,
];

const routes = [
  ...FuseUtils.generateRoutesFromConfigs(
    routeConfigs
    // settingsConfig.defaultAuth
  ),
  {
    path: "/",
    element: <Navigate to="/stock-ai" />,
    // auth: settingsConfig.defaultAuth,
  },
  {
    path: "loading",
    element: <FuseLoading />,
  },
  {
    path: "404",
    element: <Error404Page />,
  },
  {
    path: "*",
    element: <Navigate to="404" />,
  },
];

export default routes;
