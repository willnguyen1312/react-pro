import { useEffect, useRef } from "react";

export default function ReactRef() {
  const reactRef = useRef<string>();

  useEffect(() => {
    console.log("ReactRef mounted");

    return () => {
      console.log("ReactRef unmounted");
    };
  }, []);

  if (!reactRef.current) {
    reactRef.current = "⚛️";
  }

  return (
    <div>
      <h1>React Ref</h1>
      <p>{reactRef.current}</p>
    </div>
  );
}
