import {
    AccountConnection,
    AppProvider,
    BlockStack,
    Card,
    Checkbox,
    Layout,
    Page,
    Text,
    TextField,
} from "@shopify/polaris";
import "@shopify/polaris/build/esm/styles.css";
import enTranslations from "@shopify/polaris/locales/en.json";

export default function App() {
    return (
        <AppProvider i18n={enTranslations}>
            <Page title="Settings">
                <Layout>
                    <Layout.AnnotatedSection
                        description="Shopify and your customers will use this information to contact you."
                        title="Store details"
                    >
                        <AccountConnection
                            title="Open Polaris"
                            details="No account connected"
                            termsOfService="By clicking Connect, you agree to accept terms and conditions. You’ll pay a commission rate of 15% on sales made."
                            action={{ content: "Connect" }}
                        />
                    </Layout.AnnotatedSection>
                    <Layout.AnnotatedSection
                        description="Manage products, pricing, shipping and customer notifications."
                        title="Selling and shipping"
                    >
                        <BlockStack gap="400">
                            <Card>
                                <Text
                                    as="h2"
                                    children="Shipping"
                                    variant="headingMd"
                                />
                                <Checkbox
                                    label="Email customers when orders are fulfilled"
                                    checked
                                />
                            </Card>
                            <Card>
                                <Text
                                    as="h2"
                                    children="Products"
                                    variant="headingMd"
                                />
                                <Checkbox
                                    label="Automatically publish new products"
                                    checked
                                    helpText="New products added will immediately be published to all Shopify sales channels."
                                />
                                <TextField
                                    label="Custom shipment tracking URL"
                                    autoComplete="off"
                                    helpText="Override the normal shipping tracking link emailed to your customer."
                                />
                            </Card>
                        </BlockStack>
                    </Layout.AnnotatedSection>
                    <Layout.AnnotatedSection
                        description="Manage how you track success"
                        title="Reporting"
                    >
                        <Card>
                            <Text
                                as="h2"
                                children="Receive reports via email:"
                                variant="headingMd"
                            />
                            <BlockStack>
                                <Checkbox label="Never" />
                                <Checkbox label="Daily" />
                                <Checkbox label="Weekly" />
                                <Checkbox label="Monthly" />
                            </BlockStack>
                        </Card>
                    </Layout.AnnotatedSection>
                </Layout>
            </Page>
        </AppProvider>
    );
}
