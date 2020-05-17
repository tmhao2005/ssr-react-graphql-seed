import { gql, IResolvers } from "apollo-server";
import { GitAPI } from "./api/github";

export const typeDefs = gql`
  type GitUser {
    id: Int
    login: String
  }

  type GitSearchResult {
    total: Int
    items: [GitUser]
  }

  type Query {
    gitUsers(query: String): GitSearchResult
  }
`
;

export interface DataSources {
  dataSources: {
    gitAPI: GitAPI;
  };
}

export const resolvers: IResolvers<any, DataSources> = {
  Query: {
    gitUsers: async (_source, { query }, { dataSources }) => {
      return dataSources.gitAPI.search(query);
    },
  },
};
