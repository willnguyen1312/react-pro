import { useEffect, useRef, useState } from "react";

type EventTarget = "input" | "checkbox";

type LogEntry = {
  seq: number;
  target: EventTarget;
  type: string;
};

const TRACKED_EVENTS = [
  "pointerdown",
  "mousedown",
  "focus",
  "focusin",
  "blur",
  "focusout",
  "pointerup",
  "mouseup",
  "click",
  "input",
  "change",
];

export default function EventOrder() {
  const inputRef = useRef<HTMLInputElement>(null);
  const checkboxRef = useRef<HTMLInputElement>(null);
  const seqRef = useRef(0);
  const [log, setLog] = useState<LogEntry[]>([]);
  const [isCheckboxDisabled, setIsCheckboxDisabled] = useState(false);

  useEffect(() => {
    const input = inputRef.current;
    const checkbox = checkboxRef.current;

    if (!input || !checkbox) {
      return;
    }

    const record = (target: EventTarget) => (event: Event) => {
      seqRef.current += 1;
      const seq = seqRef.current;
      setLog((prev) => [...prev, { seq, target, type: event.type }]);
    };

    const recordInput = record("input");
    const recordCheckbox = record("checkbox");

    for (const type of TRACKED_EVENTS) {
      input.addEventListener(type, recordInput);
      checkbox.addEventListener(type, recordCheckbox);
    }

    return () => {
      for (const type of TRACKED_EVENTS) {
        input.removeEventListener(type, recordInput);
        checkbox.removeEventListener(type, recordCheckbox);
      }
    };
  }, []);

  const clearLog = () => {
    seqRef.current = 0;
    setLog([]);
    setIsCheckboxDisabled(false);
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "system-ui, sans-serif" }}>
      <h1>Focus input → click checkbox: what fires first?</h1>
      <ol style={{ color: "#555", maxWidth: "60ch", lineHeight: 1.5 }}>
        <li>Click into the text input so it has focus.</li>
        <li>Then click the checkbox.</li>
        <li>Read the log below — every native event, in real order.</li>
      </ol>

      <div
        style={{
          display: "flex",
          gap: "2rem",
          alignItems: "center",
          margin: "1.5rem 0",
        }}
      >
        <label style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
          <span>Text input</span>
          <input
            ref={inputRef}
            type="text"
            placeholder="Focus me first"
            onFocus={() => setIsCheckboxDisabled(false)}
            onBlur={() => setIsCheckboxDisabled(true)}
            style={{ fontSize: "1.1rem", padding: "0.4rem 0.6rem" }}
          />
        </label>

        <label style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <input ref={checkboxRef} type="checkbox" disabled={isCheckboxDisabled} />
          <span>Then click me {isCheckboxDisabled ? "(disabled)" : ""}</span>
        </label>

        <button onClick={clearLog} style={{ padding: "0.4rem 0.9rem" }}>
          Clear log
        </button>
      </div>

      <table style={{ borderCollapse: "collapse", minWidth: "24rem" }}>
        <thead>
          <tr>
            <th style={cellStyle}>#</th>
            <th style={cellStyle}>Element</th>
            <th style={cellStyle}>Event</th>
          </tr>
        </thead>
        <tbody>
          {log.map((entry) => (
            <tr
              key={entry.seq}
              style={{
                background: entry.target === "input" ? "#fff3cd" : "#d1e7dd",
              }}
            >
              <td style={cellStyle}>{entry.seq}</td>
              <td style={cellStyle}>{entry.target}</td>
              <td style={{ ...cellStyle, fontFamily: "monospace" }}>
                {entry.type}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const cellStyle = {
  border: "1px solid #ccc",
  padding: "0.35rem 0.75rem",
  textAlign: "left" as const,
};
