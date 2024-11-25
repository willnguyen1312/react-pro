import { lazy, Suspense } from "react";

const Lazy = lazy(() => import("./LazyComponent"));

export default function App() {
  return (
    <div>
      <h1>Lazy app 😊</h1>

      <Suspense fallback={<div>Loading...</div>}>
        <Lazy />
      </Suspense>
    </div>
  );
}
