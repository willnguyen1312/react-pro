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

type Com = "Parent" | "Child";

const Record = {
    Parent,
    Child,
} as const;

type Props =
    | {
          type: "Parent";
      }
    | { type: "Child"; show: boolean };

const Comp = (props: Props) => {
    const { type, ...rest } = props;
    const Comp = Record[type] as any;

    return <Comp {...rest} />;
};

export default function App() {
    const cond = 0
    return (
        <>
            {cond &&<Comp type="Parent" />}
            <Comp type="Child" show />
        </>
    );
}
