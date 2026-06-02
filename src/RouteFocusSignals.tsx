import { useSignal, useSignalEffect } from "@preact/signals-react";
import { useSignalRef } from "@preact/signals-react/utils";
import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
  useNavigate,
} from "react-router-dom";

// ----------------------------------------------------------------------------
// Signals port of RouteFocus.tsx. Same shape, with @preact/signals-react in
// place of useState / useRef / useEffect. Untested on hardware in this form
// — the React-hooks version was verified; this port hasn't been run on iPad
// yet.
//
// Load-bearing for the iPad keyboard (regardless of state library):
//
//   - navigate(to, { flushSync: true }) — opts out of react-router-dom's
//     default startTransition wrapping so the destination route commits
//     synchronously. Without this, iOS treats the post-mount focus call as
//     programmatic and the keyboard stays closed.
//   - The mount-time focus call on Route B's input — the actual focus.
//
// What still won't work, regardless:
//
//   - Refreshing directly on /b. No user gesture → no keyboard, on any
//     mobile browser.
//
// Signals-specific note: useSignalEffect takes no deps array because
// useSignalRef makes the ref itself a signal. When React assigns the DOM
// node via `inputRef.current = node`, the signal setter fires and the
// effect re-runs with the node in scope — same one-shot focus-on-mount
// behaviour as useEffect(fn, []), expressed in signal vocabulary.
//
// The @preact/signals-react-transform Babel plugin (vite.config.ts) auto-
// tracks signal `.value` reads in component bodies, so the controlled
// <input> re-renders on every keystroke without a manual useSignals() call.
// ----------------------------------------------------------------------------

function Layout() {
  return (
    <div style={{ padding: "2rem" }}>
      <h1>Route A → B autofocus 🎯 (signals)</h1>
      <p style={{ color: "#666" }}>
        <code>@preact/signals-react</code> port of <code>RouteFocus.tsx</code>.{" "}
        <code>useSignal</code>, <code>useSignalRef</code>,{" "}
        <code>useSignalEffect</code> in place of React hooks.
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
  const value = useSignal("");
  const inputRef = useSignalRef<HTMLInputElement | null>(null);

  useSignalEffect(() => {
    inputRef.current?.focus();
  });

  return (
    <section>
      <h2>Route B</h2>
      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
        <input
          ref={inputRef}
          type="text"
          value={value.value}
          onChange={(e) => {
            value.value = e.target.value;
          }}
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

export default function RouteFocusSignals() {
  return <RouterProvider router={router} />;
}
