import { AppProvider, Button } from "@shopify/polaris";
import "@shopify/polaris/build/esm/styles.css";
import enTranslations from "@shopify/polaris/locales/en.json";
import { ElementRef, ReactNode, useEffect, useReducer, useRef } from "react";

function callMe() {
  console.log("called");
}

function ReactComment({ children }: { children: ReactNode }) {
  const ref = useRef<ElementRef<"div">>(null);

  useEffect(
    function injectChildrenToDOM() {
      const element = ref.current;

      if (element) {
        element.outerHTML = `<!-- ${children} -->`;
      }
    },
    [children],
  );

  return <div ref={ref} />;
}

export default function App() {
  // Rerender this component using reducer
  const [, rerender] = useReducer((state) => state + 1, 0);

  // Bad stuff
  useRef(callMe());

  return (
    <AppProvider i18n={enTranslations}>
      <Button onClick={rerender}>Click me to re-render 🚀</Button>

      <ReactComment>This is cool</ReactComment>
    </AppProvider>
  );
}
