import { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import "virtual:uno.css";

const rootElement = document.getElementById("root") as HTMLElement;

// const root = ReactDOM.createRoot(rootElement);

function syncFunc() {
  throw new Error("This is a sync error");
}

function sleep(ms: number) {
  const now = Date.now();
  while (Date.now() < now + ms) {
    // do nothing
  }
}

async function asyncFunc() {
  // Block main thread 3s
  const now = Date.now();
  while (Date.now() < now + 3000) {
    // do nothing
  }

  // throw new Error("This is an async error");
  console.log("Async function done");
}

export const App = () => {
  const [counter, setCounter] = useState(0);
  // console.log("Ready to render");

  useEffect(() => {
    sleep(2000);
    console.log("Counter changed");
  }, [counter]);

  // console.log("About to render");

  return (
    <>
      <p>Simple app</p>
      <button
        onClick={() => {
          // syncFunc();
          // console.log("Button clicked");
          setCounter((prev) => prev + 1);
        }}
      >
        Click me
      </button>
      <p>{counter}</p>
    </>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
