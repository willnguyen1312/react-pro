import { useId, useState } from "react";
import { flushSync } from "react-dom";

export default function FocusInput() {
  const inputId = useId();
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState("My step name");

  function startEditing() {
    // Force React to render + commit the state update synchronously, so the
    // input is in the DOM before we return from this line. This whole call
    // chain — click → flushSync → focus — runs on the same JS tick as the
    // user gesture, which is what iOS Safari requires before it'll open the
    // soft keyboard. No rAF, no setTimeout, no async boundary.
    flushSync(() => {
      setIsEditing(true);
    });

    const input = document.getElementById(inputId) as HTMLInputElement | null;

    if (input) {
      input.focus();
      const end = input.value.length;
      input.setSelectionRange(end, end);
    }
  }

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Focus Input 🎯 (flushSync fix)</h1>
      <p style={{ color: "#666" }}>
        flushSync forces React to commit the state change synchronously, so
        the input exists by the next line. .focus() runs on the same tick as
        the click, so iOS treats it as user-initiated and opens the keyboard.
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
