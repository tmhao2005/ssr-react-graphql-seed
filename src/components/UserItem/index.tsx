import React from "react";
import { List, Popover } from "antd";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import { User } from "../../generated/graphql";

interface Props {
  user: User;
}

const GET_USER = gql`
  query getUser($id: Int!) {
    user(id: $id) {
      id,
      phone,
    }
  }
`;

export const UserItem: React.FC<Props> = ({ user }) => {
  const [show, onShow] = React.useState(false);

  const { loading, error, data } = useQuery(GET_USER, {
    variables: {
      id: user.id,
    },
    skip: !show,
  });

  return (
    <List.Item key={user.id}>
      <Popover onVisibleChange={onShow} trigger="click" content={() =>(
        <>
          {loading && "Loading..."}
          {!loading && data && data.user.phone}
        </>
      )}>
        <List.Item.Meta
          title={user.id}
          description={user.ratingCount}
        />
      </Popover>
    </List.Item>
  )
}
