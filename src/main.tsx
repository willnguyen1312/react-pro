import ReactDOM from "react-dom/client";
import "virtual:uno.css";
import App from "./App";

import { injectedComponentName } from "@namnode/vite-plugin-inspect-react/utils";

console.log(injectedComponentName);

const rootElement = document.getElementById("root") as HTMLElement;

const root = ReactDOM.createRoot(rootElement);

root.render(
  <>
    <App />
  </>,
);
