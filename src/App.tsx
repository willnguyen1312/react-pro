import { AppProvider, Button } from "@shopify/polaris";
import "@shopify/polaris/build/esm/styles.css";
import enTranslations from "@shopify/polaris/locales/en.json";
import { useEffect } from "react";

export function App() {
    useEffect(() => {
        window.addEventListener(
            "click",
            (event) => {
                console.log("Document clicked");
                event.preventDefault();
                event.stopPropagation();
            },
            true,
        );
    }, []);
    return (
        <AppProvider i18n={enTranslations}>
            <Button
                onClick={() => {
                    alert("Button clicked");
                }}
                children="Button"
            />
        </AppProvider>
    );
}
