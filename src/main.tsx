import ReactDOM from "react-dom/client";
import "virtual:uno.css";

import App from "./Diff";

const rootElement = document.getElementById("root") as HTMLElement;

const root = ReactDOM.createRoot(rootElement);

root.render(<App />);
