import { useEffect } from "react";
import ReactDOM from "react-dom/client";
import "virtual:uno.css";

const rootElement = document.getElementById("root") as HTMLElement;

const root = ReactDOM.createRoot(rootElement);

function syncFunc() {
  throw new Error("This is a sync error");
}

async function asyncFunc() {
  throw new Error("This is an async error");
}

export const App = () => {
  // syncFunc();

  asyncFunc().catch((err) => {
    console.error("Oh no: ", err);
  });

  // syncFunc();

  // useEffect(() => {
  //   syncFunc();
  // }, []);

  return (
    <>
      <p>Simple app</p>
      <button
        onClick={() => {
          syncFunc();
        }}
      >
        Click me
      </button>
    </>
  );
};

root.render(<App />);
