import { memo, useCallback, useState } from "react";

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

  const onChange = useCallback((newValue: string, id: string) => {
    setList((prevList) => {
      return prevList.reduce<Item[]>((acc, item) => {
        acc.push(item);

        if (item.id === id) {
          acc[acc.length - 1] = {
            ...item,
            order: {
              name: newValue,
            },
          };
        }

        return acc
      }, []);
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
