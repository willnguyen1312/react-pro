import ReactDOM from "react-dom/client";
import "virtual:uno.css";

import App from "./ResizeObserver";

const rootElement = document.getElementById("root") as HTMLElement;

const root = ReactDOM.createRoot(rootElement);

// export const App = () => {
//   const [arr, setArr] = useState([1, 2, 3, 4, 5, 6, 7]);

//   return (
//     <>
//       <p>Simple app</p>
//       <button
//         onClick={() => {
//           arr.unshift(arr.length);

//           setArr([...arr]);
//         }}
//       >
//         Click me
//       </button>

//       {arr.map((_, index) => (
//         <input key={index} />
//       ))}
//     </>
//   );
// };

root.render(<App />);
