import { signal } from "@preact/signals-react";

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
  console.log("Counter rendered");

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

export function Nested() {
  console.log("App rendered");

  return (
    <div className="App">
      <button
        onClick={() => {
          showSignal.value = !showSignal.value;
        }}
      >
        Toggle
      </button>
      {showSignal.value ? (
        <>
          <h1>Message: {count.value.hi.there}</h1>
          <Counter />
        </>
      ) : null}
    </div>
  );
}

const countSignal = signal(0);

export default function App() {
  console.log("App rendered");
  return (
    <div>
      <h1>Signals value: </h1>
      <p>{countSignal}</p>

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
