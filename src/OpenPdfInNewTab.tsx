import { useEffect, useRef, useState } from "react";

const PDF_URL = "https://pdfobject.com/pdf/sample.pdf";
const DELAY_MS = 10000;

// HTML painted into the new tab while we wait. Self-contained — no network
// requests — so it appears instantly inside the blank `about:blank` tab.
const LOADING_HTML = `<!DOCTYPE html>
<title>Loading…</title>
<style>
  body {
    margin: 0; height: 100vh; display: grid; place-items: center;
    font: 16px system-ui, sans-serif; color: #444;
  }
  .dot {
    display: inline-block; width: 8px; height: 8px; margin: 0 3px;
    border-radius: 50%; background: #2563eb;
    animation: pulse 1.2s infinite ease-in-out;
  }
  .dot:nth-of-type(2) { animation-delay: 0.15s }
  .dot:nth-of-type(3) { animation-delay: 0.30s }
  @keyframes pulse { 0%, 80%, 100% { opacity: 0.25 } 40% { opacity: 1 } }
</style>
<div>
  <span class="dot"></span><span class="dot"></span><span class="dot"></span>
  Preparing your PDF…
</div>`;

export default function OpenPdfInNewTab() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const timeoutRef = useRef<number | null>(null);

  // Cancel the pending navigation if we unmount mid-wait.
  useEffect(() => {
    return () => {
      if (timeoutRef.current !== null) window.clearTimeout(timeoutRef.current);
    };
  }, []);

  const handleClick = () => {
    setError("");

    window.open(PDF_URL, "_blank");
    window.open(PDF_URL, "_blank");
  };

  return (
    <div style={{ padding: 16, fontFamily: "system-ui, sans-serif" }}>
      <h1>Open PDF (with loading tab)</h1>
      <button onClick={handleClick} disabled={isLoading}>
        {isLoading ? "Preparing…" : "Open PDF"}
      </button>
      {isLoading && <p>The new tab will load the PDF in 5 seconds…</p>}
      {error && <p style={{ color: "crimson" }}>{error}</p>}
    </div>
  );
}
