import { Fragment, ReactNode, useEffect, useState } from "react";

export default function Fragments() {
  const [type, setType] = useState<"a" | "b">("a");

  const ui: ReactNode[] = [];

  //   Different key, different value
  if (type === "a") {
    ui.push(
      <Fragment key="a">
        <Child key="same-key" value="a" />
      </Fragment>,
    );
  } else {
    ui.push(
      <Fragment key="b">
        <Child key="same-key" value="a" />
      </Fragment>,
    );
  }

  return (
    <>
      <h1>Fragments</h1>
      <button onClick={() => setType("a")}>A</button>
      <button onClick={() => setType("b")}>B</button>

      {ui}
    </>
  );
}

const Child = ({ value }: { value: string }) => {
  useEffect(() => {
    return () => {
      console.log("unmount", value);
    };
  }, []);

  return <h1>Child {value}</h1>;
};
