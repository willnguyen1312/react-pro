import { greeting } from "./CircularDependenciesShared";

export const CircularDependencies = "CircularDependencies";

export default function App() {
  return (
    <div>
      <div>Hello from CircularDependencies</div>
      <button onClick={() => alert(greeting())}>Greet</button>
    </div>
  );
}
