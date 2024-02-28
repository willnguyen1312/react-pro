import { useState } from "react";
import ReactDOM from "react-dom/client";
import "virtual:uno.css";

const rootElement = document.getElementById("root") as HTMLElement;

const root = ReactDOM.createRoot(rootElement);

export const App = () => {
  const [arr, setArr] = useState([1, 2, 3, 4, 5, 6, 7]);

  // const array = useMemo(() => {
  //   const isOdd = counter % 2 === 1;

  //   if (isOdd) {
  //     return [<div>Odd One</div>];
  //   }

  //   return [<div>Even One</div>];
  // }, [counter]);

  console.log(arr);

  return (
    <>
      <p>Simple app</p>
      <button
        onClick={() => {
          arr.unshift(arr.length);

          setArr([...arr]);
        }}
      >
        Click me
      </button>

      {arr.map((_, index) => (
        <input key={index} />
      ))}
    </>
  );
};

root.render(<App />);
