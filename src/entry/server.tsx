import path from "path";
import express from "express";
import React from "react";
import ReactDOM from "react-dom/server";
import { ApolloServer } from "apollo-server-express";
import { InMemoryCache } from "apollo-cache-inmemory";
import { SchemaLink } from "apollo-link-schema";
import { makeExecutableSchema } from "graphql-tools";
import { ApolloProvider } from "@apollo/react-hooks";
import { getDataFromTree } from "@apollo/react-ssr";
import { ApolloClient } from "apollo-boost";
import { App } from "../components/App";
import { Html } from "../view/ssr";
import { resolvers, typeDefs } from "../graphql/book";
import "../../images/favicon.ico";

interface App extends express.Application {
  handle?: any;
}

const app: App = express();

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

const server = new ApolloServer({
  schema,
});

const client = new ApolloClient({
  ssrMode: true,
  cache: new InMemoryCache(),
  link: new SchemaLink({
    schema,
  }),
});

//-----------------
// public
// - assets
// -- client.js
// -- client.map.js
//-----------------

// http://localhost:3000/assets/client.js
app.use(express.static(path.join(__dirname, "/public")));

// http://localhost:3000/static/assets/client.js
app.use("/static", express.static(path.join(__dirname, "/public")));

app.use("/favicon.ico", express.static(path.join(__dirname, "/public/assets/favicon.ico")));

app.get("*", async (req, res, next) => {
  // 4 graphql
  if (req.originalUrl.startsWith(`${server.graphqlPath}`)) {
    return next();
  }

  const chunks = require("./chunk-manifest.json");
  const scripts = new Set<string>();

  const addChunk = (chunk: string) => {
    if (chunks[chunk]) {
      chunks[chunk].forEach((asset: string) => {
        scripts.add(asset);
      });
    }
  };

  addChunk("client");

  const Root = (
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  );

  await getDataFromTree(Root);

  const state = client.extract();

  const render = ReactDOM.renderToString(Root);
  const html = ReactDOM.renderToStaticMarkup(
    <Html
      title="My app"
      description="My app"
      children={render}
      scripts={Array.from<string>(scripts)}
      state={state}
    />
  );

  res.status(200);
  res.send(`<!doctype html>${html}`);
});

server.applyMiddleware({
  app,
});

if (!__DEV__) {
  app.listen(3000, () => console.log("The server is running with PROD mode"));
}

export default function serverRenderer() {
  return (req, res, next) => {
    app.handle(req, res, next);
  };
}
