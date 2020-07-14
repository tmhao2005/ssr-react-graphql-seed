import { InMemoryCache } from "apollo-cache-inmemory";
import ApolloClient from "apollo-client";
import { User, FieldsOnFutaFragment } from "../../../generated/graphql";
import { FieldsOnFutaFragmentDoc } from "../../../generated/graphql";

interface Context {
  cache: InMemoryCache;
  getCacheKey: any;
  client: ApolloClient<any>;
}

export function setRoute(
  _root: User,
  variables: any,
  { cache, getCacheKey }: Context,
  _info: any
) {
  const futa = cache.readFragment<FieldsOnFutaFragment>({
    fragment: FieldsOnFutaFragmentDoc,
    id: getCacheKey({ __typename: 'Futa', id: '1' }),
  });

  if (__DEV__) {
    console.log("Mutation", futa, variables);
  }

  cache.writeFragment({
    fragment: FieldsOnFutaFragmentDoc,
    id: getCacheKey({ __typename: 'Futa', id: '1' }),
    data: {
      ...futa,
      ...variables.payload,
    },
  });

  // cache.writeData({
  //   id: 'Futa:1',
  //   data: {
  //     futa: {
  //       id: '1',
  //       ...futa,
  //       ...variables.payload,
  //     },
  //   }
  // });
}
