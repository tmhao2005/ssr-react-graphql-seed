import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';
export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type RouteResult = {
  __typename?: 'RouteResult';
  Data?: Maybe<Array<Maybe<Route>>>;
  Status?: Maybe<Scalars['Int']>;
};

export type Route = {
  __typename?: 'Route';
  Id?: Maybe<Scalars['Int']>;
  DestCode?: Maybe<Scalars['String']>;
  OriginCode?: Maybe<Scalars['String']>;
  Distance?: Maybe<Scalars['Int']>;
  Duration?: Maybe<Scalars['Int']>;
  Price?: Maybe<Scalars['String']>;
};

export type TimeTable = {
  __typename?: 'TimeTable';
  IDKind?: Maybe<Scalars['Int']>;
  IDTimeStart?: Maybe<Scalars['Int']>;
  IDWay?: Maybe<Scalars['Int']>;
  Id?: Maybe<Scalars['Int']>;
  Kind?: Maybe<Scalars['String']>;
  Time?: Maybe<Scalars['String']>;
};

export type TimeTableResult = {
  __typename?: 'TimeTableResult';
  Status?: Maybe<Scalars['Int']>;
  Data?: Maybe<Array<Maybe<TimeTable>>>;
};

export type SeatsResult = {
  __typename?: 'SeatsResult';
  Status?: Maybe<Scalars['Int']>;
  Data?: Maybe<Array<Maybe<Seat>>>;
};

export type Seat = {
  __typename?: 'Seat';
  BookStatus?: Maybe<Scalars['Int']>;
  Chair?: Maybe<Scalars['String']>;
  ColumnNo?: Maybe<Scalars['Int']>;
  Discount?: Maybe<Scalars['Int']>;
  FloorNo?: Maybe<Scalars['Int']>;
  Id?: Maybe<Scalars['Int']>;
  InSelect?: Maybe<Scalars['Int']>;
  LockChair?: Maybe<Scalars['Int']>;
  RowNo?: Maybe<Scalars['Int']>;
};

export type RouteInput = {
  d1: Scalars['String'];
  d2: Scalars['String'];
  date: Scalars['String'];
};

export type TimeTableInput = {
  routeId: Scalars['Int'];
  departureDate: Scalars['String'];
};

export type SeatsInput = {
  routeId: Scalars['Int'];
  timeId: Scalars['Int'];
  departureDate: Scalars['String'];
  departureTime: Scalars['String'];
  kind: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  route?: Maybe<RouteResult>;
  seats?: Maybe<SeatsResult>;
  timeTable?: Maybe<TimeTableResult>;
  user?: Maybe<User>;
  users?: Maybe<Array<Maybe<User>>>;
};


export type QueryRouteArgs = {
  payload?: Maybe<RouteInput>;
};


export type QuerySeatsArgs = {
  payload?: Maybe<SeatsInput>;
};


export type QueryTimeTableArgs = {
  payload?: Maybe<TimeTableInput>;
};


export type QueryUserArgs = {
  id?: Maybe<Scalars['Int']>;
};


export type QueryUsersArgs = {
  query?: Maybe<Scalars['String']>;
};

export type Futa = {
  __typename?: 'Futa';
  id?: Maybe<Scalars['String']>;
  d1?: Maybe<Scalars['String']>;
  d2?: Maybe<Scalars['String']>;
  date?: Maybe<Scalars['String']>;
  time?: Maybe<Scalars['String']>;
  routeId?: Maybe<Scalars['Int']>;
  timeId?: Maybe<Scalars['Int']>;
  kind?: Maybe<Scalars['String']>;
  lovedTimes?: Maybe<Array<Maybe<Scalars['String']>>>;
  lovedChairs?: Maybe<Array<Maybe<Scalars['String']>>>;
  bookTelephone?: Maybe<Scalars['String']>;
};

export type FutaMutationInput = {
  d1?: Maybe<Scalars['String']>;
  d2?: Maybe<Scalars['String']>;
  date?: Maybe<Scalars['String']>;
  time?: Maybe<Scalars['String']>;
  routeId?: Maybe<Scalars['Int']>;
  timeId?: Maybe<Scalars['Int']>;
  kind?: Maybe<Scalars['String']>;
  lovedTimes?: Maybe<Array<Maybe<Scalars['String']>>>;
  lovedChairs?: Maybe<Array<Maybe<Scalars['String']>>>;
  bookTelephone?: Maybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  setRoute?: Maybe<Futa>;
};


export type MutationSetRouteArgs = {
  payload?: Maybe<FutaMutationInput>;
};

export type User = {
  __typename?: 'User';
  id?: Maybe<Scalars['Int']>;
  login?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  phoneCustom?: Maybe<Scalars['String']>;
  ratingCount?: Maybe<Scalars['Int']>;
};

export type QueryUsersQueryVariables = {
  query?: Maybe<Scalars['String']>;
};


export type QueryUsersQuery = (
  { __typename?: 'Query' }
  & { users?: Maybe<Array<Maybe<(
    { __typename?: 'User' }
    & FieldsOnUserFragment
  )>>>; }
);

export type GetUserQueryVariables = {
  id: Scalars['Int'];
};


export type GetUserQuery = (
  { __typename?: 'Query' }
  & { user?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'phone' | 'phoneCustom'>
    & FieldsOnUserFragment
  )>; }
);

export type FieldsOnUserFragment = (
  { __typename?: 'User' }
  & Pick<User, 'id' | 'name' | 'login' | 'ratingCount'>
);

export type FieldsOnFutaFragment = (
  { __typename?: 'Futa' }
  & Pick<Futa, 'd1' | 'd2' | 'date' | 'time' | 'routeId' | 'timeId' | 'kind' | 'lovedTimes' | 'lovedChairs' | 'bookTelephone'>
);

export const FieldsOnUserFragmentDoc = gql`
    fragment fieldsOnUser on User {
  id
  name
  login
  ratingCount
}
    `;
export const FieldsOnFutaFragmentDoc = gql`
    fragment fieldsOnFuta on Futa {
  d1
  d2
  date
  time
  routeId
  timeId
  kind
  lovedTimes
  lovedChairs
  bookTelephone
}
    `;
export const QueryUsersDocument = gql`
    query QueryUsers($query: String) {
  users(query: $query) {
    ...fieldsOnUser
  }
}
    ${FieldsOnUserFragmentDoc}`;

/**
 * __useQueryUsersQuery__
 *
 * To run a query within a React component, call `useQueryUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useQueryUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useQueryUsersQuery({
 *   variables: {
 *      query: // value for 'query'
 *   },
 * });
 */
export function useQueryUsersQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<QueryUsersQuery, QueryUsersQueryVariables>) {
        return ApolloReactHooks.useQuery<QueryUsersQuery, QueryUsersQueryVariables>(QueryUsersDocument, baseOptions);
      }
export function useQueryUsersLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<QueryUsersQuery, QueryUsersQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<QueryUsersQuery, QueryUsersQueryVariables>(QueryUsersDocument, baseOptions);
        }
export type QueryUsersQueryHookResult = ReturnType<typeof useQueryUsersQuery>;
export type QueryUsersLazyQueryHookResult = ReturnType<typeof useQueryUsersLazyQuery>;
export type QueryUsersQueryResult = ApolloReactCommon.QueryResult<QueryUsersQuery, QueryUsersQueryVariables>;
export const GetUserDocument = gql`
    query GetUser($id: Int!) {
  user(id: $id) {
    ...fieldsOnUser
    phone
    phoneCustom @client
  }
}
    ${FieldsOnUserFragmentDoc}`;

/**
 * __useGetUserQuery__
 *
 * To run a query within a React component, call `useGetUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetUserQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetUserQuery, GetUserQueryVariables>) {
        return ApolloReactHooks.useQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, baseOptions);
      }
export function useGetUserLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetUserQuery, GetUserQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, baseOptions);
        }
export type GetUserQueryHookResult = ReturnType<typeof useGetUserQuery>;
export type GetUserLazyQueryHookResult = ReturnType<typeof useGetUserLazyQuery>;
export type GetUserQueryResult = ApolloReactCommon.QueryResult<GetUserQuery, GetUserQueryVariables>;

      export interface IntrospectionResultData {
        __schema: {
          types: {
            kind: string;
            name: string;
            possibleTypes: {
              name: string;
            }[];
          }[];
        };
      }
      const result: IntrospectionResultData = {
  "__schema": {
    "types": []
  }
};
      export default result;
