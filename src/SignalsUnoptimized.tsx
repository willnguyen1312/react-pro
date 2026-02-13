import { Signal, useSignal } from "@preact/signals-react";
// import { Show } from "@preact/signals-react/utils";
// import { signal } from "@preact/signals-react";

// const isVisible = signal(true);

// // function App() {
// //   return (
// //     <Show when={isVisible} fallback={<p>Nothing to see here</p>}>
// //       <p>Now you see me!</p>
// //     </Show>
// //   );
// // }

// // You can also use a function to access the value
// function App() {
//   return <Show when={isVisible}>{value => <p>The value is {value ? "true" : "false"}</p>}</Show>;
// }

// import { For } from "@preact/signals-react/utils";
// import { signal } from "@preact/signals-react";

// const items = signal([1, 2]);
// const count = signal(0);

// function App() {
//   return (
//     <div>
//       <button onClick={() => count.value = count.value + 1}>Increase value</button>
//       <button onClick={() => items.value = [...items.value, items.value.length + 1]}>Add item</button>
//       <For each={items} fallback={<p>No items</p>}>
//         {(item, index) => <Item key={index} item={item} count={count} />}
//       </For>
//     </div >
//   );
// }

// import { useSignalRef } from "@preact/signals-react/utils";

// function App() {
//   const ref = useSignalRef(null);
//   return <div ref={ref}>The ref's value is {ref.current}</div>;
// }

import { useLiveSignal } from "@preact/signals-react/utils";
import { useState } from "react";

function App() {
  const local = useSignal(0);
  // local will automatically update when external changes

  console.log("rendering App");
  return (
    <div>
      <ComponentWithLive value={local} />
      <button onClick={() => local.value++}>Increment</button>
    </div>
  );
}

function ComponentWithLive({ value }: { value: Signal<number> }) {
  console.log("rendering ComponentWithLive");
  return (
    <div>
      <p>Local: {value.value}</p>
      <CustomComponent />
    </div>
  );
}

function CustomComponent() {
  console.log("rendering CustomComponent");
  return (
    <div>
      <p>Custom Component</p>
    </div>
  );
}

export default App;
