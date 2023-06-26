import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import * as ReactDOM from "react-dom/client";
import App from "./App";

const client = new ApolloClient({
  uri: "https://flyby-router-demo.herokuapp.com",
  cache: new InMemoryCache(),
});

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLDivElement
);

root.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);
