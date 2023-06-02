import { useEffect, useRef, useState } from "react";

export function CircularProgress() {
  const [progress, setProgress] = useState(1);
  const circularProgressRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let progressStartValue = 0;
    const progressEndValue = 90;
    const speed = 100;

    const progress = setInterval(() => {
      setProgress(progressStartValue++);
      if (progressStartValue > progressEndValue) {
        clearInterval(progress);
      }
    }, speed);

    return () => {
      clearInterval(progress);
    };
  }, []);

  return (
    <div
      ref={circularProgressRef}
      className="w-sm h-sm relative rounded-full flex items-center justify-center bg-[#306285] before:absolute before:w-xs before:h-xs before:rounded-[50%] before:bg-white before:content-['']"
      style={{
        background: `conic-gradient(#306285 ${
          progress * 3.6
        }deg, #91A97C 0deg)`,
      }}
    >
      <span className="relative font-600 text-[40px] text-[#306285]">
        {`${progress}%`}
      </span>
    </div>
  );
}
