import React from "react";
import {
 List, Popover
} from "antd";
import { useQuery } from "@apollo/react-hooks";
import { SelectOutlined } from "@ant-design/icons";
import {
 User, GetUserDocument, Query, GetUserQueryVariables
} from "../../generated/graphql";
// import { Link } from "react-router-dom";

interface Props {
  user: User;
  onClick?: (id: string) => any;
}

export const UserItem: React.FunctionComponent<Props> = ({ user, onClick }) => {
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
      {/* <Link to={`/review/${user.id}`}> */}
        <SelectOutlined onClick={() => onClick?.(user.id as any)} />
      {/* </Link> */}
    </List.Item>
  );
};
