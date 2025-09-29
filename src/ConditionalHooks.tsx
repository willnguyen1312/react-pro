import { useState } from "react";

const oldHook = () => {
  console.log("call oldHook");
  const [count, setCount] = useState(0);
  return { count, setCount };
};

const newHook = () => {
  console.log("call newHook");
  const [count, setCount] = useState(0);
  return { count, setCount: (value: number) => setCount(value * 2) };
};

let flag = false;

export default function App() {
  const hookToCall = flag ? newHook : oldHook;
  const { count, setCount } = hookToCall();

  const increment = () => {
    setCount(count + 1);
    // flag = !flag;
  };
  return (
    <div>
      <div>Conditional Hooks</div>

      <button onClick={increment}>Click me</button>

      <h1>Value: {count}</h1>
    </div>
  );
}
