import { useEffect, useState } from "react";

export default function MutationObserverApp() {
  const [list, setList] = useState<string[]>([]);

  useEffect(() => {
    const observer = new MutationObserver((mutations) => {
      const newNode = mutations[0].addedNodes[0];

      if (newNode) {
        console.log("New node added:", newNode);
      }

      const removedNode = mutations[0].removedNodes[0];

      if (removedNode) {
        console.log("Node removed:", removedNode);
      }
    });

    const ul = document.querySelector("ul") as HTMLUListElement;

    observer.observe(ul, {
      childList: true,
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div>
      <h1>Mutation observer</h1>
      <button
        onClick={() => {
          setList((prev) => [...prev, `${prev.length + 1}`]);
        }}
      >
        Append new child
      </button>
      <button
        onClick={() => {
          setList((prev) => {
            const newList = [...prev];
            newList.pop();
            return newList;
          });
        }}
      >
        Remove last child
      </button>

      <ul>
        {list.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
