import { useState } from "react";

async function callApi() {
  // Wait 1 second to simulate an API call
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return Math.floor(Math.random() * 100);
}

export default function App() {
  const [number, setNumber] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");

  return (
    <div>
      <button
        onClick={async () => {
          setLoading(true);

          try {
            const num = await callApi();
            setNumber(num);
          } catch (e) {
            setError((e as Error).message);
          } finally {
            setLoading(false);
          }
        }}
      >
        Click me
      </button>
      <h1>Value: {number}</h1>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
    </div>
  );
}
