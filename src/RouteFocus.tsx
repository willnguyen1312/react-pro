import { useEffect, useRef, useState } from "react";
import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
  useNavigate,
} from "react-router-dom";

// ----------------------------------------------------------------------------
// iPad-keyboard-on-route-change demo. Verified on real iPad (Bluetooth
// keyboard disconnected).
//
// Load-bearing pieces:
//
//   - navigate(to, { flushSync: true }) — opts out of react-router-dom's
//     default startTransition wrapping so the destination route commits
//     synchronously. Without this, the iPad keyboard doesn't open from the
//     post-mount focus call.
//   - useEffect on Route B mount focuses the input — the actual focus.
//
// Mechanism (now source-verified):
//
//   - { flushSync: true } puts the location state update on React's SyncLane.
//   - In react-dom@18.2.0/cjs/react-dom.development.js lines 26925–26934,
//     commitRootImpl synchronously flushes passive effects (useEffect) at
//     the end of commit when the lane is SyncLane ("flush them synchronously
//     at the end of the current task so that the result is immediately
//     observable").
//   - So Route B's useEffect fires INSIDE the click handler's task — not on
//     a Scheduler MessageChannel task in a later event-loop turn, as it
//     would for a transition-lane update.
//   - iOS requires focus() to execute in the same task as the originating
//     gesture for the soft keyboard to open. Microtasks count (they drain
//     before the task yields); macrotasks (timers, MessageChannel, rAF)
//     don't. Empirically verified across all six scheduling primitives in
//     FocusSchedulers.tsx.
//   - Net: flushSync keeps the focus() call in the gesture task, satisfying
//     iOS's activation requirement.
//
// What still won't work, regardless:
//
//   - Refreshing directly on /b. No user gesture, no keyboard. (Tested on
//     iPad Safari only here; mobile browsers generally require user
//     activation to open the soft keyboard, but other browsers weren't
//     directly verified in this demo.)
//
// Signals port in RouteFocusSignals.tsx (also verified on iPad).
// ----------------------------------------------------------------------------

function Layout() {
  return (
    <div style={{ padding: "2rem" }}>
      <h1>Route A → B autofocus 🎯</h1>
      <p style={{ color: "#666" }}>
        <code>navigate(to, {`{ flushSync: true }`})</code> +{" "}
        <code>useEffect</code> on Route B that focuses the input on mount.
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
