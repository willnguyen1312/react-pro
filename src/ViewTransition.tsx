import { useState } from "react";
import "./ViewTransition.css";

function App() {
  const [page, setPage] = useState("home");

  const handleTransition = (newPage: string) => {
    document.startViewTransition(() => {
      setPage(newPage);
    });
  };

  return (
    <div className="App">
      <header>
        <h1>View Transitions Example</h1>
        <nav>
          <button onClick={() => handleTransition("home")}>Home</button>
          <button onClick={() => handleTransition("about")}>About</button>
        </nav>
      </header>
      <main>
        {page === "home" && (
          <div className="page">
            <h2>Home Page</h2>
            <p>Welcome to the home page!</p>
          </div>
        )}
        {page === "about" && (
          <div className="page">
            <h2>About Page</h2>
            <p>This is the about page of our app.</p>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
