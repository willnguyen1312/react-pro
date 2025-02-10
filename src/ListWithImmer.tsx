import { memo, useCallback, useState } from "react";
import { produce } from "immer";

type Item = {
  id: string;
  order: {
    name: string;
  };
};

const ItemRenderer = memo(
  ({
    item,
    onChange,
  }: {
    item: Item;
    onChange: (newValue: string, id: string) => void;
  }) => {
    return (
      <li key={item.id}>
        <input
          type="text"
          value={item.order.name}
          onChange={(event) => {
            onChange(event.target.value, item.id);
          }}
        />
      </li>
    );
  },
);

ItemRenderer.displayName = "ItemRenderer";

let lastList: any = null;

export default function List() {
  const [list, setList] = useState<Item[]>(() => {
    return [
      {
        id: "1",
        order: {
          name: "order 1",
        },
      },
      {
        id: "2",
        order: {
          name: "order 2",
        },
      },
      {
        id: "3",
        order: {
          name: "order 3",
        },
      },
    ];
  });

  if (lastList !== list) {
    lastList = list;
    console.log("List updated");
  }

  const onChange = useCallback((newValue: string, id: string) => {
    setList((prevList) => {
      return produce(prevList, (draft) => {
        const item = draft.find((item) => item.id === id);
        if (item) {
          item.order.name = newValue;
        }
      });
    });
  }, []);

  return (
    <div>
      <h1>List items 😄</h1>
      <ul>
        {list.map((item) => (
          <ItemRenderer key={item.id} item={item} onChange={onChange} />
        ))}
      </ul>
    </div>
  );
}
