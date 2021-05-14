import fetch from "node-fetch";
import { createHttpLink } from "apollo-link-http";
import { onError } from "apollo-link-error";
import { InMemoryCache } from "apollo-cache-inmemory";
import ApolloClient from "apollo-client";
import { ApolloLink } from "apollo-link";
import { Futa } from "../generated/graphql";
import { resolvers } from "./resolvers/client";

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${JSON.stringify(locations)}, Path: ${path}`
      )
    );
  if (networkError) console.log(`[Network error]: ${networkError}`);
});

const cache = new InMemoryCache();

export interface AppCache {
  futa: Futa;
}

cache.writeData<AppCache>({
  data: {
    futa: {
      id: '1',
      __typename: "Futa",
      d1: null,
      d2: null,
      date: null,
      time: null,
      routeId: null,
      timeId: null,
      kind: null,
      bookTelephone: null,
      lovedTimes: [],
      lovedChairs: [],
    },
  },
});

export function buildClient(server: boolean) {
  const client = new ApolloClient({
    connectToDevTools: !server && __DEV__,
    ssrMode: server,
    cache: server ? cache : cache.restore(window.__APOLLO_STATE__),
    link: ApolloLink.from([
      errorLink,
      createHttpLink({
        uri: GRAPHQL,
        // credentials: "same-origin",
        headers: {},
        fetch: fetch as any,
      }),
    ]),

    resolvers,

    // Won't work with dataSources, so we might stop using this
    // link: new SchemaLink({
    //   schema,
    // }),
  });

  return client;
}

