export default function Grid() {
  // Generate a grid of 3x3
  const grid = Array.from({ length: 3 }, (_, index) =>
    Array.from({ length: 3 }, (_, jndex) => {
      return `${index + 1},${jndex + 1}`;
    }),
  );

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, auto)",
        gridTemplateRows: "repeat(3, auto)",
      }}
    >
      {grid.map((row, rowIndex) => (
        <div
          key={rowIndex}
          style={{
            display: "contents",
          }}
        >
          {row.map((cell, cellIndex) => (
            <div key={cellIndex}>{cell}</div>
          ))}
        </div>
      ))}
    </div>
  );
}
