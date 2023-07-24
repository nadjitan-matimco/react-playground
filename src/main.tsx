import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App.tsx"
import "./index.css"
import { SnackbarListProvider } from "./components/snackbar.tsx"

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <SnackbarListProvider>
      <App />
    </SnackbarListProvider>
  </React.StrictMode>
)
