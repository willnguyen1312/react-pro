import React, { useEffect, useState } from "react";

const Diff = () => {
  const [value, setValue] = useState(5);

  return (
    <React.Fragment key={value}>
      <List value={value} />

      <button
        onClick={() => {
          setValue(value + 1);
        }}
      >
        Click me
      </button>
    </React.Fragment>
  );
};

const block = (time: number) => {
  let start = Date.now();
  while (Date.now() - start < time) {}
};

const List = (props: { value: number }) => {
  useEffect(() => {
    // Block 1s
    block(1000);
  }, []);

  return Array.from({ length: props.value }).map((_, index) => (
    <p key={index}>{index + 1}</p>
  ));
};

export default Diff;
