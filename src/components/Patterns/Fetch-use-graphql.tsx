import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import { List, Avatar, Popover, Row, Col, PageHeader } from "antd";
import { User } from "./shared";

interface Props {
  query: string;
}

export const FetchWithGraphQL: React.FC<Props> = ({ query }) => {
  // const { data: keyword } = useQuery(gql`
  //   {
  //     session @client {
  //       keyword,
  //     }
  //   }
  // `);

  const { loading, error, data } = useQuery<Record<"users", User[]>>(gql`
    query users($query: String) {
      users(query: $query) {
        id,
        login,
        ratingCount,
        phone @client,
      }
    }
  `, {
    variables: {
      query: query,
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
          renderItem={item => (
            <List.Item key={item.id} onClick={() => console.log("touch me")}>
              <List.Item.Meta
                title={item.id}
                description={item.ratingCount}
              />
            </List.Item>
          )}
        />
      }
    </>
  )
}
