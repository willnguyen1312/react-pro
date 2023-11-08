function App() {
    return (
        <form>
            <input
                aria-invalid
                aria-describedby="error-message"
                type="text"
                className="w-32 p-2 border rounded"
            />

            <div id="error-message">Something is wrong</div>
        </form>
    );
}

export default App;
