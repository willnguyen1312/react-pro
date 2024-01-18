import { ElementRef, useRef } from "react";
import ReactDOM from "react-dom/client";
import "virtual:uno.css";
// import App from "./App";

const rootElement = document.getElementById("root") as HTMLElement;

const root = ReactDOM.createRoot(rootElement);

const App = () => {
  const buttonRef = useRef<ElementRef<"button">>(null);
  return (
    <div
      onClick={(event) => {
        const btnElement = buttonRef.current;

        if (btnElement) {
          const isFromButton = event.target === (btnElement as HTMLElement);

          if (isFromButton) {
            console.log("clicked from button");
          } else {
            console.log("clicked from elsewhere");
          }
        }
      }}
    >
      <h1>Hi</h1>
      <button ref={buttonRef}>Click me</button>
    </div>
  );
};

root.render(
  <>
    <App />
  </>,
);
