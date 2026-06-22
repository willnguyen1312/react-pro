import { useRef, useState } from "react";

const CAP = 10;
const OVER = 20;

type Report = {
  maxlengthAttr: string | null;
  assertionGreen: boolean;
  valueLength: number;
  tooLong: boolean;
  passesNativeValidity: boolean;
  passesSchema: boolean;
  submittedLength: number;
  exceedsCap: boolean;
};

export default function MaxLengthDemo() {
  const [name, setName] = useState("");
  const [report, setReport] = useState<Report | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  function clearReport() {
    setReport(null);
  }

  function seedExistingName() {
    setName("a".repeat(OVER));
    clearReport();
  }

  function restoreDraft() {
    setName("b".repeat(OVER));
    clearReport();
  }

  function reset() {
    setName("");
    clearReport();
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    const input = inputRef.current;
    const maxlengthAttr = input?.getAttribute("maxlength") ?? null;
    const passesNativeValidity = input?.checkValidity() ?? false;
    const tooLong = input?.validity.tooLong ?? false;
    const passesSchema = name.length >= 1;

    setReport({
      maxlengthAttr,
      assertionGreen: maxlengthAttr === String(CAP),
      valueLength: name.length,
      tooLong,
      passesNativeValidity,
      passesSchema,
      submittedLength: passesSchema ? name.length : 0,
      exceedsCap: passesSchema && name.length > CAP,
    });
  }

  const valueLength = name.length;
  const overCapNow = valueLength > CAP;

  return (
    <div style={{ padding: "2rem", maxWidth: 760 }}>
      <h1>maxLength does not cap the app's output 🎭</h1>

      <form onSubmit={handleSubmit}>
        <input
          ref={inputRef}
          type="text"
          value={name}
          maxLength={CAP}
          aria-label="Batch name"
          onChange={(e) => setName(e.target.value)}
          placeholder={`Type here — typing IS capped at ${CAP}`}
          style={{
            fontSize: "1.1rem",
            padding: "0.25rem 0.5rem",
            width: "100%",
            boxSizing: "border-box",
            marginBottom: "0.5rem",
            borderColor: overCapNow ? "#b00020" : undefined,
          }}
        />

        <p
          style={{
            margin: "0.25rem 0 1rem",
            color: overCapNow ? "#b00020" : "#0a7d28",
            fontFamily: "ui-monospace, Menlo, monospace",
          }}
        >
          value length: {valueLength}
          {overCapNow ? ` — over the ${CAP} cap` : ""}
        </p>

        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
          <button type="button" onClick={seedExistingName}>
            Open editing existing {OVER}-char name
          </button>
          <button type="button" onClick={restoreDraft}>
            Restore draft / autofill ({OVER} chars)
          </button>
          <button type="button" onClick={reset}>
            Reset
          </button>
          <button type="submit">Submit (rename)</button>
        </div>
      </form>

      {report ? <ReportPanel report={report} /> : null}
    </div>
  );
}

function ReportPanel({ report }: { report: Report }) {
  const rows: [string, string, boolean][] = [
    [
      `PR assertion: maxlength === '${CAP}'`,
      report.assertionGreen ? `PASS (green) — attr is "${report.maxlengthAttr}"` : "FAIL",
      report.assertionGreen,
    ],
    ["Native validity.tooLong", String(report.tooLong), !report.tooLong],
    [
      "Native checkValidity()",
      report.passesNativeValidity ? "valid" : "invalid",
      report.passesNativeValidity,
    ],
    [
      "Schema (min(1), no max)",
      report.passesSchema ? "valid" : "invalid",
      report.passesSchema,
    ],
    ["Submitted name length", String(report.submittedLength), !report.exceedsCap],
  ];

  return (
    <div
      style={{
        marginTop: "1.5rem",
        border: "1px solid #ccc",
        borderRadius: 6,
        padding: "1rem",
        fontFamily: "ui-monospace, Menlo, monospace",
      }}
    >
      <strong>On submit:</strong>
      <table style={{ borderCollapse: "collapse", width: "100%", marginTop: "0.5rem" }}>
        <tbody>
          {rows.map(([label, value, good]) => (
            <tr key={label}>
              <td style={{ padding: "4px 8px", borderBottom: "1px solid #eee" }}>{label}</td>
              <td
                style={{
                  padding: "4px 8px",
                  borderBottom: "1px solid #eee",
                  color: good ? "#0a7d28" : "#b00020",
                  fontWeight: "bold",
                }}
              >
                {value}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <p style={{ marginBottom: 0, color: report.exceedsCap ? "#b00020" : "#0a7d28" }}>
        {report.exceedsCap
          ? `Verdict: the assertion stayed GREEN, yet a ${report.submittedLength}-char name was emitted. maxlength did NOT cap the output.`
          : "Verdict: output within cap."}
      </p>
    </div>
  );
}
