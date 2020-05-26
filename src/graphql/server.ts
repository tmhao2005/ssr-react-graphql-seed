import { ApolloServer } from "apollo-server-express";
import { GitAPI } from "./api/github";
import { schema } from "./schema";
import { FutaAPI } from "./api/futa";

export function buildServer() {
  const server = new ApolloServer({
    schema,
    dataSources: () => {
      return {
        gitAPI: new GitAPI(),
        futaAPI: new FutaAPI(),
      };
    },
    playground: true,
    introspection: true,
  });

  return server;
}
