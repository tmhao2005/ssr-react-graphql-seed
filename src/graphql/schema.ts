import { IResolvers } from "apollo-server";
import { mergeSchemas, makeExecutableSchema } from "graphql-tools";
import { GitAPI } from "./api/github";
import { FutaAPI } from "./api/futa";
import userSchema from "./query/user.graphql";
import futaSchema from "./query/futa.graphql";

export interface DataSources {
  dataSources: {
    gitAPI: GitAPI;
    futaAPI: FutaAPI;
  };
}

const userResolvers: IResolvers<any, DataSources> = {
  Query: {
    users: async (_source, { query }, { dataSources }) => {
      return dataSources.gitAPI.search(query);
    },

    user: async (_source, { id }, { dataSources }) => {
      return  await dataSources.gitAPI.getOne(id);
    },
  },
};


const futaResolvers: IResolvers<any, DataSources> = {
  Query: {
    route: async (_source, { payload }, { dataSources }) => {
      return dataSources.futaAPI.queryRoute(payload.d1, payload.d2, payload.date);
    },

    timeTable: async (_source, { payload }, { dataSources }) => {
      return dataSources.futaAPI.queryTimeTable(payload);
    },

    seats: async (_source, { payload }, { dataSources }) => {
      return dataSources.futaAPI.querySeats(payload);
    },
  },
};

export const schema = mergeSchemas({
  subschemas: [
    {
      schema: makeExecutableSchema({
        typeDefs: userSchema,
        resolvers: userResolvers,
      }),
    },
    {
      schema: makeExecutableSchema({
        typeDefs: futaSchema,
        resolvers: futaResolvers,
      }),
    },
  ],
});
