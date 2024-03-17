import { useState } from "react";

export default function ExpensiveComponent() {
  const [arr, setArr] = useState(
    Array.from({ length: 800 }, (_, index) => index),
  );
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
        <input key={index} placeholder="placeholder" />
      ))}
    </>
  );
}
