import React, { useState } from "react";

const context = React.createContext();

const GrandFather = () => {
  const [data, setData] = useState("Hello from Grandfather");
  return (
    <context.Provider value={data}>
      <Parent>
        <Child>
          <ChilChild data="Hello from GrandFather" />
        </Child>
      </Parent>
    </context.Provider>
  );
};

const Parent = ({ children }) => {
  return <Child>{children}</Child>;
};

const Child = ({ children }) => {
  return children;
};

const ChilChild = ({ data }: { data: string }) => {
  return <h1>{data}</h1>;
};

const ChilChild2 = ({ data }: { data: string }) => {
  return <h4>{data}</h4>;
};

const GrandMother = () => {
  return (
    <>
      <context.Provider value={"Hello from Grandmother"}>
        <ChilChild2 data="Hello from Grandmother" />
      </context.Provider>
    </>
  );
};
