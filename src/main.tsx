import { createPortal } from "react-dom";
import ReactDOM from "react-dom/client";
import "virtual:uno.css";
// import App from "./App";

const rootElement = document.getElementById("root") as HTMLElement;

const root = ReactDOM.createRoot(rootElement);

export const App = () => {
  return (
    <div
      onFocus={(event) => {
        console.log(event.target);
      }}
    >
      <p>This child is placed in the parent div.</p>
      <input type="text" placeholder="Hi there" />
      {/* {createPortal(
        <p>This child is placed in the document body.</p>,
        document.body,
      )} */}
    </div>
  );
};

root.render(<App />);
