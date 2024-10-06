import ReactDOM from "react-dom/client";
import "virtual:uno.css";

import App from "./Popup";

async function main() {
  const firstPromise = Promise.resolve("first");

  const second = undefined;

  const data = await Promise.all([firstPromise, second]);

  console.log(data);
}

main();

const rootElement = document.getElementById("root") as HTMLElement;

const root = ReactDOM.createRoot(rootElement);

root.render(<App />);
