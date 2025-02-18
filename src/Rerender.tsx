import { memo, useState } from "react";

export default function Rerender({ children }: { children?: React.ReactNode }) {
  const [value, setValue] = useState("");
  return (
    <div>
      <Button>
        <Child />
      </Button>
      {/* {children} */}
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
}

export const Button = memo(({ children }: { children?: React.ReactNode }) => {
  console.log("Button rendered");
  return <button>{children}</button>;
});

export function Child() {
  console.log("Child rendered");
  return <div>Child</div>;
}
