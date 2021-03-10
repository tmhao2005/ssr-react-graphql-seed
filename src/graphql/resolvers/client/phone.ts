import { InMemoryCache } from "apollo-cache-inmemory";
import ApolloClient from "apollo-client";
import { User } from "../../../generated/graphql";

interface Context {
  cache: InMemoryCache;
  getCacheKey: any;
  client: ApolloClient<any>;
}

export function setPhone(
  root: Omit<User, 'phoneCustom'>,
  variables: any,
  { cache, getCacheKey }: Context,
) {
  return root.phone;
}
