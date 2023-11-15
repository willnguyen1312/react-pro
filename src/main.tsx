import "@unocss/reset/tailwind.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { ErrorBoundary } from "react-error-boundary";
import "virtual:uno.css";
import App from "./App.tsx";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <ErrorBoundary fallback={<div>Something went wrong</div>}>
            <App />
        </ErrorBoundary>
    </React.StrictMode>,
);
