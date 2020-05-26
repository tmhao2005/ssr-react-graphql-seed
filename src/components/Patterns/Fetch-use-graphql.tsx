import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { List, PageHeader } from "antd";
import { UserItem } from "../UserItem";
import { QueryUsersQuery, QueryUsersQueryVariables } from "../../generated/graphql";
import * as q from "./queryUsers.graphql";

interface Props {
  query: string;
}

export const FetchWithGraphQL: React.FC<Props> = ({ query }) => {

  const { loading, error, data } = useQuery<QueryUsersQuery, QueryUsersQueryVariables>(q.QueryUsers, {
    variables: {
      query,
    },
    skip: !query,
  });

  if (error) return <p>Error :(</p>;

  return (
    <>
      <PageHeader
        title="with GraphQL"
      />

      {loading && "Loading..."}
      {!loading && data && data.users &&
        <List
          itemLayout="horizontal"
          dataSource={data.users}
          renderItem={item => <UserItem user={item} />}
        />
      }
    </>
  )
}
