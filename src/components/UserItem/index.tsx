import React from "react";
import {
 List, Popover, Space, Typography
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
          {!loading && data && (
            <Space direction="vertical">
              <Typography.Link onClick={() => {
                onShow(false)
                onClick?.(user.id as any);
              }}>{data.user.name}</Typography.Link>
              <Typography.Text mark={true}>{data.user.phone}</Typography.Text>
            </Space>
          )}
        </>
      )}>
        <List.Item.Meta
          title={`${user.id} (${user.price})`}
          description={user.ratingCount}
        />
      </Popover>
      
      {/* <Link to={`/review/${user.id}`}>
        <SelectOutlined onClick={() => onClick?.(user.id as any)} />
      </Link> */}
    </List.Item>
  );
};
