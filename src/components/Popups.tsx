export default function Popups() {
  return (
    <div>
      <h1>Popups</h1>
      <button
        onClick={() => {
          window.open("https://namnguyen.design", "_blank");
          window.open("https://namnguyen.design", "_blank");
          window.open("https://namnguyen.design", "_blank");
        }}
      >
        Open me
      </button>
    </div>
  );
}
