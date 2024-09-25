import ReactDOM from "react-dom/client";
import "virtual:uno.css";

import { Suspense, useEffect, useRef } from "react";

// const AsyncApp = lazy(() => import("./Signals"));

const rootElement = document.getElementById("root") as HTMLElement;

const root = ReactDOM.createRoot(rootElement);

function App() {
  const intervalIdRef = useRef<ReturnType<typeof setInterval>>();

  useEffect(() => {
    const handler = () => {
      console.log("focus");
    };

    window.addEventListener("focus", handler);

    return () => {
      if (intervalIdRef.current) {
        clearInterval(intervalIdRef.current);
      }

      window.removeEventListener("focus", handler);
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1>voila</h1>
      <button
        onClick={() => {
          const popup = window.open(
            "https://namnguyen.design",
            "popupWindow",
            "width=600,height=400",
          );

          intervalIdRef.current = setInterval(() => {
            if (popup?.closed) {
              clearInterval(intervalIdRef.current);
              console.log("Popup closed");
            }
          }, 1000);
        }}
        className="text-4xl font-bold"
      >
        Click to open popup
      </button>
    </div>
  );
}

root.render(
  <Suspense fallback={<div>Loading...</div>}>
    <App />
  </Suspense>,
);
