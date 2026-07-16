import { useEffect, useRef, useState } from "react";

type ListenerTarget = "window" | "document";
type ListenerPhase = "capture" | "bubble";

type LogEntry = {
  seq: number;
  target: ListenerTarget;
  phase: ListenerPhase;
  key: string;
};

export default function KeydownWindowDocument() {
  const seqRef = useRef(0);
  const [log, setLog] = useState<LogEntry[]>([]);

  useEffect(() => {
    const record =
      (target: ListenerTarget, phase: ListenerPhase) => (event: Event) => {
        const key = (event as KeyboardEvent).key;
        seqRef.current += 1;
        const seq = seqRef.current;
        setLog((prev) => [...prev, { seq, target, phase, key }]);
      };

    const windowCapture = record("window", "capture");
    const windowBubble = record("window", "bubble");
    const documentCapture = record("document", "capture");
    const documentBubble = record("document", "bubble");

    window.addEventListener("keydown", windowCapture, { capture: true });
    window.addEventListener("keydown", windowBubble);
    document.addEventListener("keydown", documentCapture, { capture: true });
    document.addEventListener("keydown", documentBubble);

    return () => {
      window.removeEventListener("keydown", windowCapture, { capture: true });
      window.removeEventListener("keydown", windowBubble);
      document.removeEventListener("keydown", documentCapture, {
        capture: true,
      });
      document.removeEventListener("keydown", documentBubble);
    };
  }, []);

  const clearLog = () => {
    seqRef.current = 0;
    setLog([]);
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "system-ui, sans-serif" }}>
      <h1>keydown on window vs document — which fires first?</h1>
      <ol style={{ color: "#555", maxWidth: "70ch", lineHeight: 1.5 }}>
        <li>Click into the input and press any key.</li>
        <li>Read the log — every listener fires, in real propagation order.</li>
        <li>
          Capture goes top-down (<code>window → document</code>), bubble goes
          bottom-up (<code>document → window</code>).
        </li>
      </ol>

      <div
        style={{
          display: "flex",
          gap: "1rem",
          alignItems: "center",
          margin: "1.5rem 0",
        }}
      >
        <input
          type="text"
          placeholder="Focus me, then press a key"
          style={{ fontSize: "1.1rem", padding: "0.4rem 0.6rem", width: "22rem" }}
        />
        <button onClick={clearLog} style={{ padding: "0.4rem 0.9rem" }}>
          Clear log
        </button>
      </div>

      <table style={{ borderCollapse: "collapse", minWidth: "32rem" }}>
        <thead>
          <tr>
            <th style={cellStyle}>#</th>
            <th style={cellStyle}>Target</th>
            <th style={cellStyle}>Phase</th>
            <th style={cellStyle}>Key</th>
          </tr>
        </thead>
        <tbody>
          {log.map((entry) => (
            <tr key={entry.seq} style={{ background: rowBackground(entry) }}>
              <td style={cellStyle}>{entry.seq}</td>
              <td style={{ ...cellStyle, fontFamily: "monospace" }}>
                {entry.target}
              </td>
              <td style={{ ...cellStyle, fontFamily: "monospace" }}>
                {entry.phase}
              </td>
              <td style={{ ...cellStyle, fontFamily: "monospace" }}>
                {entry.key}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const rowBackground = (entry: LogEntry) => {
  if (entry.phase === "capture") {
    return entry.target === "window" ? "#cfe2ff" : "#e2d9f3";
  }
  return entry.target === "document" ? "#d1e7dd" : "#fff3cd";
};

const cellStyle = {
  border: "1px solid #ccc",
  padding: "0.35rem 0.75rem",
  textAlign: "left" as const,
};
