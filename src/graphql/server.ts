import { ApolloServer } from "apollo-server-express";
import { makeExecutableSchema } from "graphql-tools";
import { GitAPI } from "./api/github";
import { typeDefs, resolvers } from "./schema";

export function buildServer() {
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

  return server;
}
