import React from "react";
import { SnackbarProvider, useSnackbar } from "notistack";

// Wrapper Component for Notifications
export const NotistackProvider = ({ children }) => {
  return (
    <SnackbarProvider
      maxSnack={3}
      autoHideDuration={3000}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
    >
      {children}
    </SnackbarProvider>
  );
};

// Custom Hook to Use Snackbar
export const useMessage = () => {
  const { enqueueSnackbar } = useSnackbar();

  return {
    success: (msg) => enqueueSnackbar(msg, { variant: "success" }),
    error: (msg) => enqueueSnackbar(msg, { variant: "error" }),
    info: (msg) => enqueueSnackbar(msg, { variant: "info" }),
    warning: (msg) => enqueueSnackbar(msg, { variant: "warning" }),
  };
};
