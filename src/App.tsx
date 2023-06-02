import { useEffect, useRef, useState } from "react";
import "./App.css";

function App() {
  const [progress, setProgress] = useState(1);
  const circularProgressRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const circularProgress = circularProgressRef.current as HTMLDivElement;

    let progressStartValue = 0;
    const progressEndValue = 90;
    const speed = 100;

    const progress = setInterval(() => {
      // progressStartValue++;
      // progressValue.textContent = `${progressStartValue}%`;
      setProgress(progressStartValue++);
      circularProgress.style.background = `conic-gradient(#306285 ${
        progressStartValue * 3.6
      }deg, #ededed 0deg)`;
      if (progressStartValue === progressEndValue) {
        clearInterval(progress);
      }
    }, speed);
  }, []);

  return (
    <div className="p-4">
      <div ref={circularProgressRef} className="circular-progress">
        <span className="relative font-600 text-[40px] text-[#306285]">
          {`${progress}%`}
        </span>
      </div>
    </div>
  );
}

export default App;
