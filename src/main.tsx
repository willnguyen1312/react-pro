import ReactDOM from "react-dom/client";
import "virtual:uno.css";

import { lazy, Suspense } from "react";

const AyncApp = lazy(() => import("./Sticky"));

const rootElement = document.getElementById("root") as HTMLElement;

const root = ReactDOM.createRoot(rootElement);

root.render(
  <Suspense fallback={<div>Loading...</div>}>
    <AyncApp />
  </Suspense>,
);
