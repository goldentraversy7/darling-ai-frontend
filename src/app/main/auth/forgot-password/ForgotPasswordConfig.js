import { lazy } from "react";
import authRoles from "src/app/auth/authRoles";

const ForgotPasswordPage = lazy(() => import("./ForgotPasswordPage"));

const ForgotPasswordConfig = {
  settings: {
    layout: {
      config: {
        navbar: {
          display: false,
        },
        toolbar: {
          display: false,
        },
        footer: {
          display: false,
        },
        leftSidePanel: {
          display: false,
        },
        rightSidePanel: {
          display: false,
        },
      },
    },
  },
  auth: authRoles.onlyGuest,
  routes: [
    {
      path: "forgot-password",
      element: <ForgotPasswordPage />,
    },
  ],
};

export default ForgotPasswordConfig;
