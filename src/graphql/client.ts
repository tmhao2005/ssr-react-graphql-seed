import fetch from "node-fetch";
import { InMemoryCache, ApolloClient, ApolloLink, gql } from "apollo-boost";
import { createHttpLink } from "apollo-link-http";
import { onError } from "apollo-link-error";

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

interface Base {
  __typename: string;
}
export interface FutaState extends Base {
  d1: string | null;
  d2: string | null;
  date: string | null;
  time: string | null;
  routeId: number | null;
  timeId: number | null;
  kind: string | null;
  bookTelephone: string | null;
  lovedTimes: string[];
  lovedChairs: string[];
}

export interface AppState {
  futa: FutaState;
}

cache.writeData<AppState>({
  data: {
    futa: {
      __typename: "futa",
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
        credentials: "same-origin",
        headers: {},
        fetch: fetch as any,
      }),
    ]),

    resolvers: {
      // User is the type returned
      User: {
        // This field is only existed on client side
        phone: () => {
          return "phone";
        }
      },

      Mutation: {
        setRoute: (_root, variables, { cache: mem, getCacheKey }) => {
          const result = mem.readQuery({
            query: gql`
              {
                futa @client {
                  d1,
                  d2,
                  date,
                  time,
                  routeId,
                  timeId,
                  kind,
                  lovedTimes,
                  lovedChairs,
                  bookTelephone,
                }
              }
            `
          });

          if (__DEV__) {
            console.log("Mutation", variables);
          }

          mem.writeData({
            data: {
              futa: {
                ...result.futa,
                ...variables.payload,
              },
            }
          });
        }
      }
    },

    // Won't work with dataSources, so we might stop using this
    // link: new SchemaLink({
    //   schema,
    // }),
  });

  return client;
}

