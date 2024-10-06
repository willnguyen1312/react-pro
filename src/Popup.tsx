import { useEffect, useRef } from "react";

export default function Popup() {
  const intervalIdRef = useRef<ReturnType<typeof setInterval>>();

  useEffect(() => {
    const handler = () => {
      console.log("focus");
    };

    window.addEventListener("focus", handler);

    return () => {
      if (intervalIdRef.current) {
        clearInterval(intervalIdRef.current);
      }

      window.removeEventListener("focus", handler);
    };
  }, []);

  const nameArr = ["Nam Nguyen", ""];

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1>voila</h1>
      <button
        onClick={() => {
          const popup = window.open(
            "https://namnguyen.design",
            "popupWindow",
            "width=600,height=400",
          );

          intervalIdRef.current = setInterval(() => {
            if (popup?.closed) {
              clearInterval(intervalIdRef.current);
              console.log("Popup closed");
            }
          }, 1000);
        }}
        className="text-4xl font-bold"
      >
        Click to open popup
      </button>

      {nameArr}
    </div>
  );
}
