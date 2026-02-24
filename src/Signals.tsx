import { computed, signal } from "@preact/signals-react";

const count = signal(1);
const double = computed(() => count.value * 2);

const increment = () => {
  count.value += 1;
};

const decrement = () => {
  count.value -= 1;
};

function App() {
  console.log("rendering App");
  // Remove .value to avoid re-rendering

  return (
    <div>
      <span>{count.value}</span>
      <span>Double: {double}</span>
      <button onClick={decrement}>-</button>
      <button onClick={increment}>+</button>
    </div>
  );
}

export default App;
