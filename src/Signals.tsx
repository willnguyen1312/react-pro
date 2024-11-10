import { useComputed, useSignal } from "@preact/signals-react";
// import { useSignals } from "@preact/signals-react/runtime";

// const countSignal = signal(0);

export default function App() {
  // useSignals();

  const countSignal = useSignal(0);

  const doubleCount = useComputed(() => {
    console.log("doubleCount");
    return countSignal.value * 2;
  });

  return (
    <div>
      <h1>Count value: </h1>
      <p>{countSignal.value}</p>

      <button
        onClick={() => {
          countSignal.value += 1;
          countSignal.value += 1;
        }}
      >
        Increment
      </button>

      <h1>Double Count value: {doubleCount.value}</h1>
    </div>
  );
}
