import { AppProvider, Button } from "@shopify/polaris";
import "@shopify/polaris/build/esm/styles.css";
import enTranslations from "@shopify/polaris/locales/en.json";
import { useEffect } from "react";

export function App() {
    useEffect(() => {
        document.addEventListener("mousedown", (event) => {
            event.preventDefault();
            event.stopPropagation();
            console.log("Document clicked");
        });
    }, []);
    return (
        <AppProvider i18n={enTranslations}>
            <Button
                onClick={() => {
                    console.log("Button clicked");
                }}
                children="Button"
            />
        </AppProvider>
    );
}
