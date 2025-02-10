import { createContext, ReactNode, useContext, useState } from "react";

// Create the context
const CountContext = createContext<{
  count: number;
  increment: () => void;
}>({
  count: 0,
  increment: () => {},
});

CountContext.displayName = "CountContext";

// Create a provider component
const CountProvider = ({ children }: { children: ReactNode }) => {
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount((prev) => prev + 1);
  };

  return (
    <CountContext.Provider value={{ count, increment }}>
      {children}
    </CountContext.Provider>
  );
};

// Button component that uses the context
const CountButton = () => {
  const { count, increment } = useContext(CountContext);

  return (
    <button
      onClick={increment}
      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
    >
      Count is: {count}
    </button>
  );
};

// Main app component
const App = () => {
  return (
    <CountProvider>
      <div className="p-4">
        <h1 className="text-xl font-bold mb-4">Context Example</h1>
        <CountButton />
      </div>
    </CountProvider>
  );
};

export default App;
