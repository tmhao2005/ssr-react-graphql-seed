import React from "react";
import ReactDOM from "react-dom";
import { ApolloClient, InMemoryCache } from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";
import { createHttpLink } from "apollo-link-http";
import { App } from "../components/App";

const httpLink = createHttpLink({
  uri: `${GRAPHQL}`,
  credentials: "same-origin",
})

const client = new ApolloClient({
  connectToDevTools: __DEV__,
  link: httpLink,
  cache: new InMemoryCache().restore(window.__APOLLO_STATE__),
});

const root = document.getElementById("root");

ReactDOM[root.innerHTML ? "hydrate" : "render"](
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById("root")
);
