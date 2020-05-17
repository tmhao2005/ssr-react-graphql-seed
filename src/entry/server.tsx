import path from "path";
import express from "express";
import React from "react";
import ReactDOM from "react-dom/server";
import { ApolloServer } from "apollo-server-express";
import { InMemoryCache } from "apollo-cache-inmemory";
import { makeExecutableSchema } from "graphql-tools";
import { ApolloProvider } from "@apollo/react-hooks";
import { getDataFromTree } from "@apollo/react-ssr";
import { ApolloClient } from "apollo-boost";
import { createHttpLink } from "apollo-link-http";
import fetch from "node-fetch";
import { App } from "../components/App";
import { Html } from "../view/ssr";
import { resolvers, typeDefs } from "../graphql/schema";
import "../../images/favicon.ico";
import { GitAPI } from "../graphql/api/github";

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
  dataSources: () => {
    return {
      gitAPI: new GitAPI(),
    }
  }
});

const client = new ApolloClient({
  ssrMode: true,
  cache: new InMemoryCache(),
  link: createHttpLink({
    uri: GRAPHQL,
    credentials: "same-origin",
    headers: {},
    fetch: fetch as any,
  }),

  // Won't work with dataSources, so we might stop using this
  // link: new SchemaLink({
  //   schema,
  // }),
});

// Register `public` dir as public access so assets folder can be accessed
// NOTE: webpack's configuration
// `output` must be `public/assets`,
// `publicPath`: /assets/ => ['/assets/client.js']
// => server static dir should be `public`. Here's an example:
// http://localhost:3000/assets/client.js
// __dirname = ROOT_DIR/build
app.use(express.static(path.join(__dirname, "/public")));

// http://localhost:3000/static/assets/client.js
app.use("/static", express.static(path.join(__dirname, "/public")));

app.use("/favicon.ico", express.static(path.join(__dirname, "/public/assets/favicon.ico")));

app.get("*", async (req, res, next) => {
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
      title="React + GraphQL + SSR"
      description="A starter project"
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

// NOTE: webpack turns it to false as build if we use directly like: `if (module.hot)`
// module.hot is exported from webpack
const hot = !!module.hot;

if (!hot) {
  app.listen(PORT, () => console.log("The server is running on port %s", PORT));
}

// For webpack-hot-server
export default function serverRenderer() {
  return (req, res, next) => {
    app.handle(req, res, next);
  };
}
