import { useEffect, useState } from "react";

interface EditableInputProps {
  value: string;
  onChange: (value: string) => void;
  onEnter: () => void;
}

function EditableInput({ value, onChange, onEnter }: EditableInputProps) {
  useEffect(
    function fireOnChangeOnValueChange() {
      onChange(value);
    },
    [value],
  );

  return (
    <input
      ref={(node) => {
        node?.focus();
      }}
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          onEnter();
        }
      }}
      style={{ fontSize: "1.2rem", padding: "0.25rem 0.5rem" }}
    />
  );
}

export default function EditableField() {
  const [isEditing, setIsEditing] = useState(true);
  const [value, setValue] = useState("Hello World");

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Editable Field ✏️</h1>

      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
        {isEditing ? (
          <EditableInput
            value={value}
            onChange={(newValue) => {
              console.log(`newValue, ${newValue}`);
              console.log(`oldValue, ${value}`);
              setValue(newValue);
            }}
            onEnter={() => setIsEditing(false)}
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
        <button
          onClick={() => {
            setValue("Hi");
          }}
          style={{ padding: "0.25rem 0.75rem", fontSize: "1rem" }}
        >
          Say Hi
        </button>
      </div>
    </div>
  );
}
