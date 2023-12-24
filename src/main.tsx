import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App.tsx"
import "./index.css"
import { SmartAccountProvider } from "@/context/SmartAccountContext"
import { BrowserRouter as Router } from "react-router-dom"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Router>
      <SmartAccountProvider>
        <App />
      </SmartAccountProvider>
    </Router>
  </React.StrictMode>,
)
