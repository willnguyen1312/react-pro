import "@unocss/reset/tailwind.css";
import React from "react";
import ReactDOM from "react-dom/client";
import "virtual:uno.css";
import App from "./Zustand.tsx";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
);
