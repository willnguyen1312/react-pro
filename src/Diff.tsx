import { useEffect, useState } from "react";

const Diff = () => {
  const [value, setValue] = useState(5);

  let ui = null;
  if (value % 2 === 0) {
    ui = (
      <section>
        <List value={value} />
      </section>
    );
  } else {
    ui = (
      <section>
        <List value={value} />
      </section>
    );
  }

  return (
    <div>
      {ui}

      <button
        onClick={() => {
          setValue(value + 1);
        }}
      >
        Click me
      </button>
    </div>
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
