import {
 mergeSchemas, makeExecutableSchema
} from "graphql-tools";
import * as userSchema from "./query/user.graphql";
import * as futaSchema from "./query/futa.graphql";
import {
 userResolvers, futaResolvers
} from "./resolvers/server";

export const schema = mergeSchemas({
  subschemas: [
    {
      schema: makeExecutableSchema({
        typeDefs: userSchema,
        resolvers: userResolvers as any,
      }),
    },
    {
      schema: makeExecutableSchema({
        typeDefs: futaSchema,
        resolvers: futaResolvers as any,
      }),
    },
  ],
});
