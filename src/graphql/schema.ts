import { gql, IResolvers } from "apollo-server";
import { GitAPI } from "./api/github";

export const typeDefs = gql`
  type User {
    id: Int
    login: String
    ratingCount: Int
    phone: String
  }

  type Query {
    users(query: String): [User]
    user(id: Int): User
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
    users: async (_source, { query }, { dataSources }) => {
      return dataSources.gitAPI.search(query);
    },

    user: async (_source, { id }, { dataSources }) => {
      const result =  await dataSources.gitAPI.getOne(id);
      return result;
    },
  },
};
