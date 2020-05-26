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

cache.writeData({
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
        phone: () => {
          // const { data } = await client.query({
          //   query: gql`
          //   query Foo($id: Int = ${item.id}) {
          //     user(id: $id) {
          //       id,
          //       phone,
          //     }
          //   }
          // `});
          // return data.user.phone;
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
                }
              }
            `
          });

          if (__DEV__)
            console.log("Mutation", variables);

          mem.writeData({
            data: {
              futa: {
                ...result.futa,
                ...variables,
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

