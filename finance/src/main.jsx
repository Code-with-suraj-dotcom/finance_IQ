import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { FinanceProvider } from "./context/FinanceContext";
import { UIProvider } from "./context/UIContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <FinanceProvider>
      <UIProvider>
        <App />
      </UIProvider>
    </FinanceProvider>
  </React.StrictMode>
);
