import { useEffect, useRef, useState } from "react";
import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
  useNavigate,
} from "react-router-dom";

// ----------------------------------------------------------------------------
// Minimal version — verified on real iPad
//
// What's here:
//   - navigate(to, { flushSync: true })  ← react-router-dom's typed opt-out
//     of the default React.startTransition wrapping. Required.
//   - useEffect on Route B mount focuses the input. Required.
//
// What's NOT here (confirmed unnecessary in this scenario):
//   - The "proxy input" trick. The folklore rule that "iOS needs an element
//     that existed at gesture start" appears to NOT apply here — flushSync
//     alone is sufficient for the keyboard to open on the freshly-mounted
//     destination input. This contradicts what I (and most blog posts)
//     claim about the iOS keyboard rules. I don't have a precise model for
//     why; the empirical answer is "flushSync alone works on real iPad."
//
// What still doesn't work, regardless:
//   - Refreshing directly on /b. There's no user gesture to anchor focus
//     to, no React-side trick gets past that.
// ----------------------------------------------------------------------------

function Layout() {
  return (
    <div style={{ padding: "2rem" }}>
      <h1>Route A → B autofocus 🎯 (flushSync only)</h1>
      <p style={{ color: "#666" }}>
        No proxy. Just <code>navigate(to, {`{ flushSync: true }`})</code>{" "}
        and a <code>useEffect</code> on Route B that focuses the input on
        mount.
      </p>
      <Outlet />
    </div>
  );
}

function RouteA() {
  const navigate = useNavigate();
  return (
    <section>
      <h2>Route A</h2>
      <button
        onClick={() => navigate("/b", { flushSync: true })}
        style={{ padding: "0.25rem 0.75rem", fontSize: "1rem" }}
      >
        Go to B
      </button>
    </section>
  );
}

function RouteB() {
  const navigate = useNavigate();
  const [value, setValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(function focusInputOnMount() {
    inputRef.current?.focus();
  }, []);

  return (
    <section>
      <h2>Route B</h2>
      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Auto-focused on arrival"
          style={{ fontSize: "1.2rem", padding: "0.25rem 0.5rem" }}
        />
        <button
          onClick={() => navigate("/")}
          style={{ padding: "0.25rem 0.75rem", fontSize: "1rem" }}
        >
          Back to A
        </button>
      </div>
    </section>
  );
}

const router = createBrowserRouter([
  {
    Component: Layout,
    children: [
      { index: true, Component: RouteA },
      { path: "b", Component: RouteB },
    ],
  },
]);

export default function RouteFocus() {
  return <RouterProvider router={router} />;
}
