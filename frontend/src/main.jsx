import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router";

import "./index.css";
import { router } from "./app/Router";
import { Toaster } from "sonner";
import { ThemeProvider } from "./components/theme/ThemeProvider";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <RouterProvider router={router} />
      <Toaster />
    </ThemeProvider>
  </React.StrictMode>,
);
