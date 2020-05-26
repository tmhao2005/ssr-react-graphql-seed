import React from "react";
import ReactDOM from "react-dom";
import { ApolloProvider } from "@apollo/react-hooks";
import { BrowserRouter } from "react-router-dom";
import { App } from "../components/App";
import { buildClient } from "../graphql/client";

const client = buildClient(false);

render();

if (process.env.NODE_ENV !== 'production') {
  module.hot.accept("../components/App", () => {
    render();
  });
}

function render() {
  const root = document.getElementById("root");

  ReactDOM[root.innerHTML ? "hydrate" : "render"](
    <ApolloProvider client={client}>
      <BrowserRouter basename="/">
        <App />
      </BrowserRouter>
    </ApolloProvider>,
    document.getElementById("root")
  );
}
