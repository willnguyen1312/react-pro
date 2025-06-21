const longText = "I'm a long text that should be truncated";

const truncatedText = longText.slice(0, 10) + "...";

// CSS for screen reader only content
const srOnlyStyles = `
  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }
`;

export default function Accessibility() {
  return (
    <div>
      <style>{srOnlyStyles}</style>
      <button>Click me</button>
      <h1>Accessibility</h1>

      {/* NEW: Option 4: Hide truncated text from screen readers */}
      <p>
        <span aria-hidden="true">{truncatedText}</span>
        <span className="sr-only">{longText}</span>
      </p>

      {/* Option 5: Using aria-label to replace truncated text entirely */}
      <p aria-label={longText}>
        <span aria-hidden="true">{truncatedText}</span>
      </p>
    </div>
  );
}
