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
  
  .truncated {
    display: inline;
  }
  
  .full-text {
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

      {/* Option 1: Using aria-label on a span with role="text" */}
      {/* <p>
        <span role="text" aria-label={longText}>
          {truncatedText}
        </span>
      </p> */}

      {/* Option 2: Using visually hidden full text */}
      <p>
        {truncatedText}
        <span className="sr-only">{longText}</span>
      </p>

      {/* Option 3: Using CSS to hide full text visually but keep it accessible */}
      {/* <p>
        <span className="truncated">{truncatedText}</span>
        <span className="full-text">{longText}</span>
      </p> */}
    </div>
  );
}
