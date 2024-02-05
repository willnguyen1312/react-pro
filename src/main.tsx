import { useMemo, useState } from "react";
import ReactDOM from "react-dom/client";
import "virtual:uno.css";

const rootElement = document.getElementById("root") as HTMLElement;

const root = ReactDOM.createRoot(rootElement);

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

  const array = useMemo(() => {
    const isOdd = counter % 2 === 1;

    if (isOdd) {
      return [<div>Odd One</div>];
    }

    return [<div>Even One</div>];
  }, [counter]);

  return (
    <>
      <p>Simple app</p>
      <button
        onClick={() => {
          setCounter((prev) => prev + 1);
        }}
      >
        Click me
      </button>
      <p>{counter}</p>

      {array}
    </>
  );
};

root.render(<App />);
