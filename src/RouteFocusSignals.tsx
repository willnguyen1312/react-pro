import type { CSSProperties } from "react";
import { useSignal, useSignalEffect } from "@preact/signals-react";
import { useSignalRef } from "@preact/signals-react/utils";
import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
  useNavigate,
} from "react-router-dom";

// ----------------------------------------------------------------------------
// Signals port of RouteFocus.tsx + 2s route loader + PROXY INPUT (Pattern 4).
//
// Previous variant (without proxy) was confirmed empirically on iPad at
// 100ms: even that short loader broke { flushSync: true } +
// useSignalEffect-focus, because Route B's commit was deferred past the
// gesture's task. See FocusSchedulers.tsx / the handoff doc for the
// verified mechanism.
//
// This variant adds the canonical proxy-input fix AND bumps the loader to
// 2 seconds to stress-test it:
//
//   1. A hidden focusable <input> lives in Layout (so it's always mounted
//      across route transitions). Module-level `proxyElement` captures its
//      DOM node via a ref callback.
//   2. Route A's click handler focuses the proxy SYNCHRONOUSLY before
//      navigating. This opens the iPad keyboard immediately, while the
//      click handler still holds user activation.
//   3. The 2s loader runs; the proxy holds focus throughout. The OPEN
//      QUESTION this variant probes is whether iOS will keep the keyboard
//      up for a full 2 seconds on a hidden, no-input-events proxy — the
//      handoff doc explicitly warns about long pauses: "iOS may decide
//      the focused element is 'no longer interactive' (not formally
//      documented; don't push the timing)."
//   4. Route B mounts, useSignalEffect fires, and focus transfers from the
//      proxy to the real input. iOS keeps the keyboard up across this
//      transfer because focus is moving between two text inputs (the
//      documented WebKit behaviour for keyboard-preserving focus
//      transitions).
//
// VERIFIED on real iPad (Bluetooth keyboard disconnected): outcome A.
// Keyboard opens immediately on tap, stays open for the full 2-second
// loader wait, and transfers cleanly to the real input when Route B
// mounts. iOS does not time out stale focus on a visuallyHidden proxy
// input within 2 seconds. The handoff doc's "don't push the timing"
// hedge is more conservative than this empirical ceiling.
//
// What we now know about Pattern 4's duration envelope:
//   - 2s wait on hidden proxy → keyboard stays open. ✅ (this test)
//   - Longer waits not tested. The practical UX ceiling is probably
//     lower than the technical one anyway — users tapping a button and
//     waiting >2s think the app is broken regardless of keyboard state.
//
// What still won't work, regardless:
//
//   - Refreshing directly on /b. No user gesture, no keyboard.
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

// Module-level ref to the always-mounted proxy input. Set by Layout's ref
// callback; read by RouteA's click handler. Module-level (not React state)
// because we need the synchronous current DOM node, and a re-render isn't
// useful here.
let proxyElement: HTMLInputElement | null = null;

// CSS that hides an element visually while keeping it in the layout tree.
// iOS will refuse focus() on elements that are display:none, visibility:hidden,
// or have the `hidden` attribute — so the proxy must use this pattern, not
// any of those.
const visuallyHidden: CSSProperties = {
  position: "absolute",
  width: 1,
  height: 1,
  padding: 0,
  margin: -1,
  overflow: "hidden",
  clip: "rect(0 0 0 0)",
  whiteSpace: "nowrap",
  border: 0,
};

function Layout() {
  return (
    <div style={{ padding: "2rem" }}>
      <h1>Route A → B autofocus 🎯 (signals + 2s loader + proxy)</h1>
      <p style={{ color: "#666" }}>
        Hidden proxy input in Layout opens the keyboard inside the gesture.
        Route B has a 2-second loader. Question: does iOS keep the keyboard
        open for the full 2s while the proxy holds focus?
      </p>
      <input
        ref={(el) => {
          proxyElement = el;
        }}
        type="text"
        tabIndex={-1}
        aria-hidden="true"
        style={visuallyHidden}
      />
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
        onClick={() => {
          // Open the keyboard NOW, while we still hold user activation.
          // The proxy is always mounted in Layout, so this focus() call
          // runs synchronously inside the click handler's task.
          proxyElement?.focus();
          // Kick off the navigation; the 2s loader will defer Route B's
          // mount. Whether the keyboard stays open for the full 2s is the
          // experiment this variant is running.
          navigate("/b", { flushSync: true });
        }}
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
      {
        path: "b",
        Component: RouteB,
        loader: async function delayedLoader() {
          await new Promise((resolve) => setTimeout(resolve, 2000));
          return null;
        },
      },
    ],
  },
]);

export default function RouteFocusSignals() {
  return <RouterProvider router={router} />;
}
