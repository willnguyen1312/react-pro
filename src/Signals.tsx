import { signal } from "@preact/signals-react";
import { useSignals } from "@preact/signals-react/runtime";

const countSignal = signal(0);

export default function App() {
  useSignals();

  return (
    <div>
      <h1>Count value: </h1>
      <p>{countSignal.value}</p>

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
