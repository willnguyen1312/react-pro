import ReactDOM from "react-dom/client";
import { ErrorBoundary } from "react-error-boundary";
import "virtual:uno.css";

import App from "./EditableField";

const rootElement = document.getElementById("root") as HTMLElement;

const root = ReactDOM.createRoot(rootElement);

root.render(
  <ErrorBoundary
    onError={(...args) => {
      console.log(args);
    }}
    fallback={<div>Error 😅</div>}
  >
    <App />
  </ErrorBoundary>,
);
