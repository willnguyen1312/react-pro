import { useState } from "react";

export default function App() {
  console.log("rendering App...");
  const { count, setCount } = customHook();
  return (
    <div>
      <h1>Hooks {count}</h1>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}

const customHook = () => {
  console.log("rendering customHook...");
  const [count, setCount] = useState(0);
  return { count, setCount };
};
