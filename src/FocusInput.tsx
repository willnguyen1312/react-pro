import { useId, useState } from "react";

export default function FocusInput() {
  const inputId = useId();
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState("My step name");

  function startEditing() {
    setIsEditing(true);
    requestAnimationFrame(() => {
      const input = document.getElementById(inputId) as HTMLInputElement | null;

      if (input) {
        input.focus();
        const end = input.value.length;
        input.setSelectionRange(end, end);
      }
    });
  }

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Focus Input 🎯</h1>
      <p style={{ color: "#666" }}>
        Simulating the iPad bug: input is only mounted in edit mode, so focus
        has to wait for the next frame — which iOS Safari treats as
        programmatic focus and refuses to open the soft keyboard for.
      </p>

      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
        {isEditing ? (
          <input
            id={inputId}
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === "Escape") {
                setIsEditing(false);
              }
            }}
            onBlur={() => setIsEditing(false)}
            style={{ fontSize: "1.2rem", padding: "0.25rem 0.5rem" }}
          />
        ) : (
          <>
            <span style={{ fontSize: "1.2rem" }}>{value}</span>
            <button
              onClick={startEditing}
              style={{ padding: "0.25rem 0.75rem", fontSize: "1rem" }}
            >
              Edit
            </button>
          </>
        )}
      </div>
    </div>
  );
}
