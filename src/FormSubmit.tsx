import { useState } from "react";

export default function FormSubmit() {
  const [value, setValue] = useState("");

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Form Submit on Enter</h1>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          console.log(value);
        }}
      >
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Type something and hit Enter"
          style={{ fontSize: "1.2rem", padding: "0.25rem 0.5rem" }}
        />
      </form>
    </div>
  );
}
