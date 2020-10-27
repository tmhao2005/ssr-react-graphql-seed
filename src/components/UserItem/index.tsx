import React from "react";
import { List, Popover } from "antd";
import { useQuery } from "@apollo/react-hooks";
import { User, GetUserDocument, Query, GetUserQueryVariables } from "../../generated/graphql";

interface Props {
  user: User;
}

export const UserItem: React.FC<Props> = ({ user }) => {
  const [show, onShow] = React.useState(false);

  const { loading, data } = useQuery<Query, GetUserQueryVariables>(GetUserDocument, {
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
  );
};
