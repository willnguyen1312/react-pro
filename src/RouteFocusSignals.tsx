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
// place of useState / useRef / useEffect. Verified on real iPad (Bluetooth
// keyboard disconnected) — useSignalEffect schedules at a compatible enough
// time to useEffect that the iPad keyboard still opens.
//
// Load-bearing for the iPad keyboard (regardless of state library):
//
//   - navigate(to, { flushSync: true }) — opts out of react-router-dom's
//     default startTransition wrapping so the destination route commits
//     synchronously. Without this, the iPad keyboard doesn't open from the
//     post-mount focus call.
//   - The mount-time focus call on Route B's input — the actual focus.
//
// Mechanism (now source-verified):
//
//   - { flushSync: true } puts the location state update on React's SyncLane.
//   - In react-dom@18.2.0/cjs/react-dom.development.js lines 26925–26934,
//     commitRootImpl synchronously flushes passive effects (useEffect) at
//     the end of commit when the lane is SyncLane ("flush them synchronously
//     at the end of the current task so that the result is immediately
//     observable").
//   - useSignalEffect wraps useEffect (source: signals-react/runtime), so it
//     inherits this same sync-flush behaviour.
//   - So Route B's useSignalEffect fires INSIDE the click handler's task —
//     not on a Scheduler MessageChannel task in a later event-loop turn, as
//     it would for a transition-lane update.
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
// Signals-specific note: useSignalEffect has no deps array — it tracks
// signals automatically. useSignalRef returns a signal whose `.current`
// getter/setter proxies to `.value`, so reading `inputRef.current` inside
// the effect subscribes to the ref signal. By the time the effect first
// fires (after commit, like useEffect), React has already populated the
// ref, so the input element is in scope. Same one-shot focus-on-mount
// outcome as useEffect(() => input.focus(), []), expressed in signal
// vocabulary.
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
