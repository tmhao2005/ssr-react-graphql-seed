import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

export const Books: React.SFC = () => {
  const { loading, error, data } = useQuery<Record<"books", any[]>>(gql`
    {
      books {
        id
        title
      }
    }
  `);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <ul className="list">
      {data.books.map(item => <li key={item.id}>{item.title}</li>)}
    </ul>
  )
}
