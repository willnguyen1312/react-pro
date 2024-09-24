import { effect, signal, useSignalEffect } from "@preact/signals-react";

// const randomSignal = signal(0);

// effect(() => {
//   console.log("Random signal value changed once", randomSignal.value);
// });

// effect(() => {
//   console.log("Random signal value changed twice", randomSignal.value);
// });

// setInterval(() => {
//   randomSignal.value += 1;
// }, 1000);

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
  // console.log("Counter rendered");

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
  // console.log("App rendered");

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

effect(() => {
  // console.log("Signal value changed", countSignal.value);

  return () => {
    // console.log("Signal value changed cleanup");
  };
});

function App1() {
  // console.log("App rendered");

  useSignalEffect(() => {
    // console.log("Signal value changed", countSignal.value);

    return () => {
      // console.log("Signal value changed cleanup");
    };
  });

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

const countSignal2 = signal(0);

setInterval(() => {
  console.log(document.visibilityState);
}, 1000);

export default function App2() {
  if (countSignal2.value) {
    effect(() => {
      console.log(countSignal2.value);
    });
  }

  return (
    <div>
      <h1>Count value: </h1>
      <p>{countSignal2}</p>

      <button
        onClick={() => {
          countSignal2.value += 1;
        }}
      >
        Increment
      </button>
    </div>
  );
}
