import { useEffect, useState } from "react";

export default function ReactRendering() {
  const [count, setCount] = useState(0);
  const [updating, setUpdating] = useState(false);

  //   useEffect(() => {
  //     if (updating) {
  //       setCount((c) => c + 1);
  //       setUpdating(false);
  //     }
  //   }, [updating]);

  const nullComponentUI = NullComponent();

  if (nullComponentUI === null) {
    return null;
  }

  return (
    <div>
      ReactRendering {count}
      <button
        onClick={() => {
          //   setUpdating(true);
          setCount((c) => c + 1);
        }}
      >
        Update
      </button>
    </div>
  );
}

const NullComponent = () => {
  return null;
};
