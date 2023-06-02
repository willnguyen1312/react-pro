import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const circularProgress = document.querySelector(
      ".circular-progress"
    ) as HTMLDivElement;
    const progressValue = document.querySelector(
      ".progress-value"
    ) as HTMLDivElement;

    let progressStartValue = 0;
    const progressEndValue = 90;
    const speed = 100;

    const progress = setInterval(() => {
      progressStartValue++;
      progressValue.textContent = `${progressStartValue}%`;
      circularProgress.style.background = `conic-gradient(#7d2ae8 ${
        progressStartValue * 3.6
      }deg, #ededed 0deg)`;
      if (progressStartValue == progressEndValue) {
        clearInterval(progress);
      }
    }, speed);
  }, []);

  return (
    <div className="container">
      <div className="circular-progress">
        <span className="progress-value">0%</span>
      </div>
      <span className="text">HTML & CSS</span>
    </div>
  );
}

export default App;
