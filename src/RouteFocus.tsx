import { useEffect, useLayoutEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
  useNavigate,
} from "react-router-dom";

// ----------------------------------------------------------------------------
// Module-level proxy element
// ----------------------------------------------------------------------------
//
// Always-mounted hidden <input>. iOS Safari needs an element that existed in
// the DOM at gesture start to accept "user-initiated focus" and open the
// soft keyboard. We focus this first; whichever route mounts during the
// navigation steals focus afterwards.

let proxyElement: HTMLInputElement | null = null;

// ----------------------------------------------------------------------------
// useNavigateAndOpenKeyboard
// ----------------------------------------------------------------------------
//
// Run on the click handler. Captures the keyboard via the proxy, then
// triggers a synchronous route commit. The destination route is responsible
// for focusing its own real input on mount (see RouteB's useLayoutEffect).
//
// `flushSync: true` is react-router-dom's typed per-call option that swaps
// the default React.startTransition wrapping for ReactDOM.flushSync. That's
// what keeps the destination's useLayoutEffect inside the gesture's call
// stack, instead of deferring it to a transition flush after the gesture
// has expired.

function useNavigateAndOpenKeyboard() {
  const navigate = useNavigate();

  return function navigateAndOpenKeyboard(to: string) {
    proxyElement?.focus();
    navigate(to, { flushSync: true });
  };
}

// ----------------------------------------------------------------------------
// Layout — owns the always-mounted proxy input
// ----------------------------------------------------------------------------

function Layout() {
  return (
    <div style={{ padding: "2rem" }}>
      <h1>Route A → B autofocus 🎯 (useLayoutEffect on B)</h1>
      <p style={{ color: "#666" }}>
        Route A only triggers the navigation. Route B owns the focus call
        via <code>useLayoutEffect</code> — which runs synchronously inside
        the <code>flushSync</code> commit, still on the click handler&apos;s
        call stack.
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

// ----------------------------------------------------------------------------
// Routes
// ----------------------------------------------------------------------------

function RouteA() {
  const navigateAndOpenKeyboard = useNavigateAndOpenKeyboard();
  return (
    <section>
      <h2>Route A</h2>
      <button
        onClick={() => navigateAndOpenKeyboard("/b")}
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

  // Single focus call covers BOTH arrival paths:
  //
  //   A → B click:  inside flushSync, on the gesture's call stack. iOS
  //                 transfers focus from the (already focused) proxy to
  //                 this input. Keyboard stays open.
  //
  //   /b refresh:   no gesture exists. Input is focused, caret visible,
  //                 but iOS Safari and Android Chrome both refuse to open
  //                 the soft keyboard. User taps once to type.
  //
  // useLayoutEffect (not useEffect) so focus is set before paint — no
  // unfocused-then-focused flash.
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

// ----------------------------------------------------------------------------
// Top-level router setup
// ----------------------------------------------------------------------------

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
