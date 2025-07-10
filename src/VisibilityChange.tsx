import { useEffect } from "react";

export default function VisibilityChange() {
  useEffect(() => {
    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "visible") {
        alert("visible");
      } else {
        alert("hidden");
      }
    });
  }, []);
  return (
    <div>
      <h1>Visibility Change</h1>
    </div>
  );
}
