import React from "react";

function Child({ show }: { show: boolean }) {
    React.useEffect(() => {
        console.log("Child mounted");

        return () => {
            console.log("Child unmounted");
        };
    }, []);

    console.log("Child rendered");

    return show ? <h1>I am a child</h1> : null;
}

function Parent() {
    const [show, setShow] = React.useState(true);

    return (
        <div>
            <h1 className="text-red">I am a parent</h1>
            <button
                onClick={() => {
                    setShow(!show);
                }}
            >
                Toggle show
            </button>

            {show && <Child show={show} />}
        </div>
    );
}

export default function App() {
    return <Parent />;
}
