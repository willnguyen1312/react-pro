import { useEffect, useRef, useState } from "react";

export default function ResizeObserverComponent() {
  const [dimensions, setDimensions] = useState<{
    width: number;
    height: number;
  }>();

  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;

    if (!wrapper) {
      return;
    }

    const boundingBox = wrapper.getBoundingClientRect();
    setDimensions({
      width: boundingBox.width,
      height: boundingBox.height,
    });

    const observer = new ResizeObserver((entries) => {
      const { width, height } = entries[0].contentRect;

      setDimensions({ width, height });
    });

    observer.observe(wrapper);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div
      ref={wrapperRef}
      style={{
        border: "1px solid red",
      }}
    >
      <h1>Parent size: {JSON.stringify(dimensions)} </h1>
    </div>
  );
}
