import { useState } from "react";

export default function Rerender({ children }: { children?: React.ReactNode }) {
  const [value, setValue] = useState("");
  return (
    <div>
      {children}
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
}

export function Button() {
  console.log("Button rendered");
  return <button>Click me</button>;
}
