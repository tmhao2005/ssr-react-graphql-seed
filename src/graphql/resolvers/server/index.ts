import { IResolvers } from "apollo-server";
import { GitAPI } from "../../api/github";
import { FutaAPI } from "../../api/futa";

export interface DataSources {
  dataSources: {
    gitAPI: GitAPI;
    futaAPI: FutaAPI;
  };
}

export const userResolvers: IResolvers<any, DataSources> = {
  Query: {
    users: async (_source, { query }, { dataSources }) => {
      return dataSources.gitAPI.search(query);
    },

    user: async (_source, { id }, { dataSources }) => {
      return await dataSources.gitAPI.getOne(id);
    },

    reviews: async (_source, { query }, { dataSources }) => {
      return dataSources.gitAPI.getReviews(query);
    },

    review: async (_source, { id }, { dataSources }) => {
      return dataSources.gitAPI.getReview(id);
    },

    photos: async (_source, { id }, { dataSources }) => {
      return dataSources.gitAPI.getPhotos(id);
    },
  },
};

export const futaResolvers: IResolvers<any, DataSources> = {
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
