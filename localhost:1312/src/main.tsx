import { useEffect } from "react";
import ReactDOM from "react-dom/client";
import "virtual:uno.css";

const rootElement = document.getElementById("root") as HTMLElement;

const root = ReactDOM.createRoot(rootElement);

function syncFunc() {
  throw new Error("This is a sync error");
}

async function asyncFunc() {
  // Block main thread 3s
  // const now = Date.now();
  // while (Date.now() < now + 3000) {
    // do nothing
  // }

  // throw new Error("This is an async error");
  console.log("Async function done");
}

export const App = () => {
  console.log("Ready to render");

  // asyncFunc();

  useEffect(() => {
    asyncFunc();
  }, []);

  console.log("About to render");

  return (
    <>
      <p>Simple app</p>
      <button
        onClick={() => {
          // syncFunc();
          console.log("Button clicked");
        }}
      >
        Click me
      </button>
    </>
  );
};

root.render(<App />);
