import React, { ChangeEvent } from "react";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

interface Props {
  query: string;
}

export const GitUsers: React.FC<Props> = ({ query }) => {
  const { loading, error, data } = useQuery<Record<"gitUsers", any>>(gql`
    query users($query: String) {
      gitUsers(query: $query) {
        items {
          id,
          login
        }
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
      {loading && "Loading..."}
      {!loading && data && data.gitUsers &&
        <ul>
          {data.gitUsers.items.map(item => <li key={item.id}>{item.login}</li>)}
        </ul>
      }
    </>
  )
}
