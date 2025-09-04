import { signal } from "@preact/signals-react";

const countSignal = signal(0);

export default function App() {
  return (
    <div>
      <h1>Count value: {countSignal.value}</h1>

      <button
        onClick={() => {
          countSignal.value += 1;
        }}
      >
        Increment
      </button>
    </div>
  );
}
