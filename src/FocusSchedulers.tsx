import { useRef } from "react";

// ----------------------------------------------------------------------------
// iPad keyboard activation propagation: which task-scheduling primitives
// carry user activation forward to the soft keyboard?
//
// Verified on real iPad (Bluetooth keyboard disconnected) on 2026-06-02.
//
// Result matrix:
//
//   1. Synchronous focus()         — ✅ keyboard opens
//   2. queueMicrotask              — ✅ keyboard opens
//   3. Promise.resolve().then      — ✅ keyboard opens
//   4. MessageChannel.postMessage  — ❌ keyboard does NOT open
//   5. setTimeout(0)               — ❌ keyboard does NOT open
//   6. requestAnimationFrame       — ❌ keyboard does NOT open
//
// The rule that fits every data point: focus() must execute in the SAME
// TASK as the user gesture. Microtasks count (they drain at the end of the
// current task before it yields). Any macrotask — regardless of which task
// source it comes from (timer, DOM manipulation via MessageChannel, paint
// pipeline via rAF) — starts a new task and loses user activation.
//
// This experiment was prompted by a paradox: focus() inside useSignalEffect
// (which uses useEffect under the hood) opens the keyboard after a
// { flushSync: true } route navigation, but focus() inside setTimeout(0)
// inside the same useSignalEffect does NOT. Naively the React Scheduler
// uses MessageChannel.postMessage, so "MessageChannel works" was the
// suspected mechanism — but #4 above falsifies that.
//
// The actual reason useSignalEffect's focus call works: in
// react-dom@18.2.0/cjs/react-dom.development.js lines 26925–26934,
// commitRootImpl explicitly checks whether the commit's lanes include
// SyncLane and, if so, synchronously flushes passive effects (useEffect)
// at the end of commit, with the comment "If the passive effects are the
// result of a discrete render, flush them synchronously at the end of the
// current task so that the result is immediately observable."
//
// So: { flushSync: true } puts the navigation on SyncLane. The destination
// route's useEffect (and therefore useSignalEffect) fires synchronously
// inside the click handler's task, not on a Scheduler MessageChannel task
// in a later turn of the event loop. Activation is preserved. Keyboard
// opens. The Scheduler/MessageChannel path is only taken for
// non-discrete (transition-lane) updates, and that path — confirmed by #4
// here — wouldn't carry activation.
//
// Cannot be made to work, regardless of scheduling primitive: opening the
// keyboard on page refresh. No user gesture, no activation to propagate.
// ----------------------------------------------------------------------------

export default function FocusSchedulers() {
  const inputRef = useRef<HTMLInputElement>(null);

  const focusInput = () => inputRef.current?.focus();

  const tests: { label: string; handler: () => void }[] = [
    {
      label: "1. Synchronous focus()",
      handler: focusInput,
    },
    {
      label: "2. queueMicrotask",
      handler: () => {
        queueMicrotask(focusInput);
      },
    },
    {
      label: "3. Promise.resolve().then",
      handler: () => {
        Promise.resolve().then(focusInput);
      },
    },
    {
      label: "4. MessageChannel.postMessage",
      handler: () => {
        const channel = new MessageChannel();
        channel.port1.onmessage = focusInput;
        channel.port2.postMessage(null);
      },
    },
    {
      label: "5. setTimeout(0)",
      handler: () => {
        setTimeout(focusInput, 0);
      },
    },
    {
      label: "6. requestAnimationFrame",
      handler: () => {
        requestAnimationFrame(focusInput);
      },
    },
  ];

  return (
    <div style={{ padding: "2rem", maxWidth: "32rem" }}>
      <h1>🧪 iPad keyboard × task schedulers</h1>
      <p style={{ color: "#666" }}>
        Each button schedules a <code>focus()</code> call on the input below,
        using a different task-scheduling primitive. Tap a button; observe
        whether the iPad soft keyboard opens.
      </p>

      <input
        ref={inputRef}
        type="text"
        placeholder="Focus target"
        style={{
          fontSize: "1.2rem",
          padding: "0.5rem",
          marginBottom: "1rem",
          width: "100%",
          boxSizing: "border-box",
        }}
      />

      <button
        onClick={() => inputRef.current?.blur()}
        style={{
          padding: "0.5rem 1rem",
          fontSize: "1rem",
          marginBottom: "1rem",
          background: "#eee",
        }}
      >
        Blur input (reset state)
      </button>

      <div style={{ display: "grid", gap: "0.5rem" }}>
        {tests.map(({ label, handler }) => (
          <button
            key={label}
            onClick={handler}
            style={{
              padding: "0.75rem 1rem",
              fontSize: "1rem",
              textAlign: "left",
            }}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}
