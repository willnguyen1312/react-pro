import ReactDOM from "react-dom/client";
import "virtual:uno.css";
// import App from "./App";

const rootElement = document.getElementById("root") as HTMLElement;

const root = ReactDOM.createRoot(rootElement);

const App = () => {
  return (
    <div
      onClick={(event) => {
        console.log(event.target);
        console.log(event.currentTarget);
      }}
    >
      <h1>Hi</h1>
      <button>Click me</button>
    </div>
  );
};

root.render(
  <>
    <App />
  </>,
);
