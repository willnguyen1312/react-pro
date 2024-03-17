import { AppProvider, Button } from "@shopify/polaris";
import "@shopify/polaris/build/esm/styles.css";
import enTranslations from "@shopify/polaris/locales/en.json";
import {
  ElementRef,
  ReactNode,
  Suspense,
  lazy,
  useEffect,
  useReducer,
  useRef,
  useState,
} from "react";

const AsyncExpensiveComponent = lazy(() => import("./ExpensiveComponent"));

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
  const [isMounted, setIsMounted] = useState(false);

  // Rerender this component using reducer
  const [, rerender] = useReducer((state) => state + 1, 0);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <AppProvider i18n={enTranslations}>
      <Button onClick={rerender}>Click me to re-render 🚀</Button>

      <ReactComment>This is cool</ReactComment>

      <Suspense>{isMounted && <AsyncExpensiveComponent />}</Suspense>
    </AppProvider>
  );
}
