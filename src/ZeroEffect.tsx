import { useState } from "react";

export default function ZeroEffect() {
  const [value, setValue] = useState(0);
  return (
    <div>
      <input
        type="number"
        value={value}
        onChange={(event) => {
          setValue(+event.target.value);
        }}
      />

      <Banner key={value} value={value} />
    </div>
  );
}

function Banner(props: { value: number }) {
  const [showBanner, setShowBanner] = useState(props.value <= 0);
  return (
    <div>
      {showBanner && <h1>Banner CTA 🚨</h1>}
      <button
        onClick={() => {
          setShowBanner(false);
        }}
      >
        Dismiss banner
      </button>
    </div>
  );
}
