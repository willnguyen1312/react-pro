/**
 * Flex sizing demo: a 200px-wide flex row with two items —
 * item 1 has `width: 100%`, item 2 has `width: auto`.
 *
 * The surprising part: item 1 does NOT end up 200px wide.
 *
 * In a flex row `width` only seeds each item's *flex-basis*; it is not the final
 * size. Both items keep the default `flex: 0 1 auto` (grow 0, shrink 1), so once
 * the bases overflow the 200px container they shrink to fit:
 *   - item 1 basis = 100% = 200px
 *   - item 2 basis = auto = its content width
 * The bigger basis (item 1) gives up the most space, so item 1 ends up narrower
 * than 200px and item 2 sits beside it. Neither item can shrink below its
 * min-content size, because flex items default to `min-width: auto`.
 */

const containerStyle: React.CSSProperties = {
  display: "flex",
  width: 200,
  border: "2px solid #475569",
  borderRadius: 8,
  overflow: "hidden", // clip child backgrounds to the rounded corners
};

const itemBaseStyle: React.CSSProperties = {
  boxSizing: "border-box",
  padding: "12px 10px",
  fontSize: 13,
  lineHeight: 1.3,
};

export default function FlexWidth() {
  return (
    <div style={{ fontFamily: "Inter, system-ui, sans-serif", padding: 24 }}>
      <h2 style={{ margin: "0 0 4px" }}>
        Flex sizing: width 100% + width auto
      </h2>
      <p
        style={{
          margin: "0 0 16px",
          color: "#666",
          fontSize: 13,
          maxWidth: 520,
        }}
      >
        A 200px flex row. Item 1 is <code>width: 100%</code>, item 2 is{" "}
        <code>width: auto</code>. Both keep the default{" "}
        <code>flex-shrink: 1</code>, so item 1 shrinks from its 200px basis to
        make room for item 2 — it never actually fills the full 200px.
      </p>

      <div style={containerStyle}>
        <div style={{ ...itemBaseStyle, width: "100%", background: "#bfdbfe" }}>
          width: 100%
        </div>
        <div style={{ ...itemBaseStyle, background: "#fde68a" }}>auto</div>
      </div>
    </div>
  );
}
