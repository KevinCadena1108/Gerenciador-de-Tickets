import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ClientProvider } from "./context/ClientContext"; // Importa o ClientProvider

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ClientProvider>
      <App />
    </ClientProvider>
  </React.StrictMode>
);