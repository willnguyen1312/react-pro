import { signal } from "@preact/signals-react";

// import { useSignals } from "@preact/signals-react/runtime";

const count = signal({
  hi: {
    there: "123",
  },
  numb: 1,
});

function increaseCount() {
  count.value = {
    ...count.value,
    numb: count.value.numb + 1,
  };
}

function Counter() {
  // useSignals();
  return (
    <>
      <h1>Value: {count.value.numb}</h1>
      <div>
        <button onClick={increaseCount}>+</button>
      </div>
    </>
  );
}

const showSignal = signal(true);

export default function App() {
  // useSignals();
  return (
    <div className="App">
      <button
        onClick={() => {
          showSignal.value = !showSignal.value;
        }}
      >
        Toggle
      </button>
      {showSignal.value ? <Counter /> : null}
    </div>
  );
}
