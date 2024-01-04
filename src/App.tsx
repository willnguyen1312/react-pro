import React from "react";

export function App() {
    const data = [1];

    return (
        <>
            <h1>Data</h1>
            {data.map((item) => (
                <p key={item}>{item}</p>
            ))}
        </>
    );
}
