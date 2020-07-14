import { Resolvers } from "apollo-client";
import { setPhone } from "./phone";
import { setRoute } from "./setRoute";

export const resolvers: Resolvers = {
  User: {
    phoneCustom: setPhone,
  },
  Mutation: {
    setRoute,
  }
};
