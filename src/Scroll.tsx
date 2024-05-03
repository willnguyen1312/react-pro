import { useLayoutEffect, useRef, useState } from "react";

export default function ScrollingList() {
  const [list, setList] = useState([1, 2, 3, 4, 5, 6, 7]);
  const listRef = useRef<HTMLDivElement>(null);
  const prevListLength = useRef(list.length);

  useLayoutEffect(() => {
    const listElement = listRef.current;
    if (prevListLength.current < list.length && listElement) {
      const scrollTop = listElement.scrollTop;
      listElement.scrollTop = scrollTop;
    }
    prevListLength.current = list.length;
  }, [list]);

  return (
    <div
      ref={listRef}
      style={{
        height: 200,
        width: 200,
        display: "flex",
        flexDirection: "column",
        gap: 10,
        overflow: "scroll",
      }}
    >
      {list.map((item, index) => (
        <button
          key={index}
          onClick={() => {
            const newList = [...list, list.length + 1];
            setList(newList);
          }}
        >
          {item}
        </button>
      ))}
    </div>
  );
}
