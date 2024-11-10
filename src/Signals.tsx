import {
  batch,
  Signal,
  useSignal,
  useSignalEffect,
} from "@preact/signals-react";
// import { useSignals } from "@preact/signals-react/runtime";

// const countSignal = signal(0);

export default function App() {
  // useSignals();

  const countSignal = useSignal(0);

  useSignalEffect(() => {
    console.log("countSignal changed", countSignal.value);
  });

  return (
    <div>
      <h1>Count value: </h1>
      <ValueDisplay countSignal={countSignal} />

      <button
        onClick={() => {
          // batch(() => {
          countSignal.value += 1;
          countSignal.value += 1;
          countSignal.value += 1;
          countSignal.value += 1;
          countSignal.value += 1;
          // });
        }}
      >
        Increment
      </button>
    </div>
  );
}

function ValueDisplay(props: { countSignal: Signal<number> }) {
  console.log("ValueDisplay render");
  return <h1>Value: {props.countSignal.value}</h1>;
}
