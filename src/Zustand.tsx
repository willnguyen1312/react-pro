import { StoreApi, UseBoundStore } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { shallow } from "zustand/shallow";
import { createWithEqualityFn } from "zustand/traditional";

type WithSelectors<S> = S extends { getState: () => infer T }
    ? S & { use: { [K in keyof T]: () => T[K] } }
    : never;

const createSelectors = <S extends UseBoundStore<StoreApi<object>>>(
    _store: S,
) => {
    const store = _store as WithSelectors<typeof _store>;
    store.use = {};
    const keys = Object.keys(store.getState());
    for (const key of keys) {
        (store.use as any)[key] = () => store((s) => s[key as keyof typeof s]);
    }

    return store;
};

interface Todo {
    id: string;
    title: string;
    done: boolean;
}

type State = {
    todos: Record<string, Todo>;
};

type Actions = {
    toggleTodo: (todoId: string) => void;
};

const useTodoStoreBase = createWithEqualityFn(
    devtools(
        persist(
            immer<State & Actions>((set) => ({
                todos: {
                    "82471c5f-4207-4b1d-abcb-b98547e01a3e": {
                        id: "82471c5f-4207-4b1d-abcb-b98547e01a3e",
                        title: "Learn Zustand",
                        done: false,
                    },
                    "354ee16c-bfdd-44d3-afa9-e93679bda367": {
                        id: "354ee16c-bfdd-44d3-afa9-e93679bda367",
                        title: "Learn Jotai",
                        done: false,
                    },
                    "771c85c5-46ea-4a11-8fed-36cc2c7be344": {
                        id: "771c85c5-46ea-4a11-8fed-36cc2c7be344",
                        title: "Learn Valtio",
                        done: false,
                    },
                    "363a4bac-083f-47f7-a0a2-aeeee153a99c": {
                        id: "363a4bac-083f-47f7-a0a2-aeeee153a99c",
                        title: "Learn Signals",
                        done: false,
                    },
                },
                toggleTodo: (todoId: string) =>
                    set((state) => {
                        state.todos[todoId].done = !state.todos[todoId].done;
                    }),
            })),
            { name: "todos" },
        ),
    ),
    shallow,
);

const useTodoStore = createSelectors(useTodoStoreBase);

export default function App() {
    const todos = useTodoStore.use.todos();
    const toggleTodo = useTodoStore.use.toggleTodo();

    return (
        <div className="App">
            <ul>
                {Object.values(todos).map((todo) => (
                    <li key={todo.id}>
                        <input
                            type="checkbox"
                            checked={todo.done}
                            onChange={() => toggleTodo(todo.id)}
                        />
                        {todo.done ? <s>{todo.title}</s> : todo.title}
                    </li>
                ))}
            </ul>
        </div>
    );
}
