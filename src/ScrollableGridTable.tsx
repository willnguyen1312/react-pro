/**
 * A table-like layout built with CSS Grid that scrolls vertically while the
 * header row stays pinned (sticky). Three columns: id, name, and a deliberately
 * long "summary" column whose header is exactly 255 characters and whose cells
 * are exactly 250 characters of mock blurb each.
 *
 * Why CSS Grid instead of <table>? A single grid container lets every column
 * share one sizing track, so the id/name columns stay perfectly aligned with
 * the wide, wrapping summary column without manual width juggling.
 */

// --- Mock data -------------------------------------------------------------

/** Trim (or repeat-then-trim) `text` to an exact character length. */
function fitToLength(text: string, length: number): string {
  const filled =
    text.length >= length ? text : text.repeat(Math.ceil(length / text.length));
  return filled.slice(0, length);
}

/** Source text long enough to slice an exact 255-char column header from. */
const SUMMARY_HEADER = fitToLength(
  "A Comprehensive and Unabridged Editorial Overview of the Book's Central Themes, Narrative Arc, Principal Characters, Setting, Historical Context, Critical Reception, and the Author's Intended Takeaway for Readers Seeking a Thorough Synopsis Before Reading the Full Text",
  255,
);

/** A few long blurbs; each gets sliced to exactly 250 chars per row. */
const BLURB_SOURCES = [
  "A gripping story that follows its characters across years of quiet triumph and sudden loss, weaving together memory, ambition, and the small everyday choices that quietly reshape a life, until the final pages reframe everything the reader believed they understood about the beginning.",
  "Set against a sweeping landscape, this novel traces the slow unraveling of a family secret, balancing tenderness with tension as each chapter peels back another layer of motive, regret, and longing, building toward a resolution that feels both inevitable and entirely surprising at once.",
  "An ambitious meditation on time, distance, and the people we become when no one is watching, told through interlocking voices that argue, forgive, and misremember one another, ultimately asking whether anyone can truly know the inner life of someone they have loved for a lifetime.",
];

interface Book {
  id: number;
  name: string;
  summary: string;
}

const BOOK_TITLES = [
  "The Silent Patient",
  "Where the Crawdads Sing",
  "Project Hail Mary",
  "The Midnight Library",
  "Klara and the Sun",
  "A Little Life",
  "The Night Circus",
  "Circe",
  "The Goldfinch",
  "Normal People",
  "The Overstory",
  "Pachinko",
  "The Vanishing Half",
  "Cloud Cuckoo Land",
  "The Seven Husbands of Evelyn Hugo",
  "Tomorrow, and Tomorrow, and Tomorrow",
  "Lessons in Chemistry",
  "Demon Copperhead",
  "The Lincoln Highway",
  "Sea of Tranquility",
  "Hamnet",
  "The Song of Achilles",
  "Anxious People",
  "The Invisible Life of Addie LaRue",
];

const books: Book[] = BOOK_TITLES.map((name, index) => ({
  id: index + 1,
  name,
  summary: fitToLength(BLURB_SOURCES[index % BLURB_SOURCES.length], 250),
}));

// --- Styles ----------------------------------------------------------------

// `minmax(0, 1fr)` instead of bare `1fr`: a `1fr` track has an `auto` floor that
// refuses to shrink below its content, so a single-line (nowrap) cell would blow
// the column out to the full text width. A `0` floor lets the cell clip + ellipsis.
const GRID_TEMPLATE_COLUMNS = "repeat(3, minmax(0, 1fr))";
const BORDER = "1px solid #e2e2e2";

const headerCellStyle: React.CSSProperties = {
  position: "sticky",
  top: 0,
  zIndex: 1,
  background: "#f5f5f5",
  fontWeight: 600,
  padding: "10px 12px",
  borderBottom: "2px solid #d0d0d0",
  textAlign: "left",
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
};

const cellStyle: React.CSSProperties = {
  padding: "10px 12px",
  borderBottom: BORDER,
  lineHeight: 1.45,
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
};

// --- Component -------------------------------------------------------------

export default function ScrollableGridTable() {
  return (
    <div
      style={{
        fontFamily: "Inter, system-ui, sans-serif",
        padding: 24,
        maxWidth: 820,
      }}
    >
      <h2 style={{ margin: "0 0 4px" }}>Scrollable grid table</h2>
      <p style={{ margin: "0 0 16px", color: "#666", fontSize: 13 }}>
        Header is {SUMMARY_HEADER.length} chars · each summary is{" "}
        {books[0].summary.length} chars · cells clip to one line with “…” (hover
        to see the full text); the header stays pinned while you scroll down.
      </p>

      <div
        role="table"
        aria-label="Books"
        style={{
          display: "grid",
          gridTemplateColumns: GRID_TEMPLATE_COLUMNS,
          maxHeight: 360,
          overflow: "auto",
          border: BORDER,
          borderRadius: 8,
          fontSize: 14,
        }}
      >
        {/* Header row — three sticky cells, one per column */}
        <div role="columnheader" style={headerCellStyle}>
          id
        </div>
        <div role="columnheader" style={headerCellStyle}>
          name
        </div>
        <div role="columnheader" style={headerCellStyle} title={SUMMARY_HEADER}>
          {SUMMARY_HEADER}
        </div>

        {/* Body rows — cells placed directly so all three columns stay aligned */}
        {books.map((book) => (
          <div key={book.id} role="row" style={{ display: "contents" }}>
            <div
              role="cell"
              style={{
                ...cellStyle,
                color: "#888",
                fontVariantNumeric: "tabular-nums",
              }}
            >
              {book.id}
            </div>
            <div
              role="cell"
              style={{ ...cellStyle, fontWeight: 500 }}
              title={book.name}
            >
              {book.name}
            </div>
            <div
              role="cell"
              style={{ ...cellStyle, color: "#444" }}
              title={book.summary}
            >
              {book.summary}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
