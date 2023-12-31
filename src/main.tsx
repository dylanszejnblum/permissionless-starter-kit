import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { SmartAccountProvider } from "@/context/SmartAccountContext";
import { WagmiProvider } from "@/context/WagmiContext.tsx";
import { BrowserRouter as Router } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Router>
      <WagmiProvider>
        <SmartAccountProvider>
          <App />
        </SmartAccountProvider>
      </WagmiProvider>
    </Router>
  </React.StrictMode>,
);
