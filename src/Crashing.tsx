import { useState, useEffect } from "react";

export default function App() {
  const [terms, setTerms] = useState(false);
  const [stuff, setStuff] = useState({});

  const acceptTerms = () => {
    setTerms(true);
  };

  useEffect(() => {
    if (terms) {
      setStuff({});
    }
  }, [terms, stuff]);

  return (
    <>
      <label>
        <input type="checkbox" onChange={acceptTerms} /> Accept the Terms
      </label>
      <button onClick={() => setStuff({})}>Crash</button>
    </>
  );
}
