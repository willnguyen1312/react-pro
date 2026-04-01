import { useRef, useState } from "react";

export default function EditableField() {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState("Hello World");
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Editable Field ✏️</h1>

      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
        {isEditing ? (
          <input
            ref={(node) => {
              inputRef.current = node;
              node?.focus();
            }}
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                setIsEditing(false);
              }
            }}
            style={{ fontSize: "1.2rem", padding: "0.25rem 0.5rem" }}
          />
        ) : (
          <span style={{ fontSize: "1.2rem" }}>{value}</span>
        )}

        <button
          onClick={() => setIsEditing(!isEditing)}
          style={{ padding: "0.25rem 0.75rem", fontSize: "1rem" }}
        >
          {isEditing ? "Save" : "Edit"}
        </button>
      </div>
    </div>
  );
}
