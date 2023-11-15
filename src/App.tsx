import { useEffect } from "react";

function App() {
    useEffect(() => {
        try {
            setTimeout(() => {
                try {
                    // throw new Error("Something went wrong");
                } catch (error) {
                    console.log(error + "nha");
                }
            }, 3000);
        } catch (error) {
            console.log(error);
        }
    }, []);
    return (
        <form>
            <div id="error-message">Okela</div>
            <button
                type="button"
                onClick={() => {
                    throw new Error("Something went wrong from button");
                }}
            >
                Click me
            </button>
        </form>
    );
}

export default App;
