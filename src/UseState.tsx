import { useReducer, useState } from "react";

export default function UseState() {
    const [_, forceRerender] = useReducer(() => ({}), {});
    console.log("rendering");

    return (
        <div>
            <Count />
            <button onClick={forceRerender}>Rerender</button>
        </div>
    );
} 


const Count = () => {
    const [count, setCount] = useState(() => {
        console.log("initializing count");
        return 0;
    });

    return (
        <div>
            <h1>Count: {count}</h1>
            <button onClick={() => setCount(count + 1)}>Increment</button>
        </div>
    );
}