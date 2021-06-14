import React from "react";
import { List, Popover, Space, Typography } from "antd";
import { useQuery } from "@apollo/react-hooks";
import {
  User,
  GetUserDocument,
  Query,
  GetUserQueryVariables,
} from "../../generated/graphql";

interface Props {
  user?: User;
  id: number;
  onClick?: (id: number) => any;
}

export const UserItem: React.FunctionComponent<Props> = ({
  id,
  user,
  onClick,
}) => {
  const [show, onShow] = React.useState(false);

  const { loading, data } = useQuery<Query, GetUserQueryVariables>(
    GetUserDocument,
    {
      variables: {
        id: user ? user.id : id,
      },
      skip: !show,
    }
  );

  return (
    <List.Item
      style={{
        cursor: "pointer",
      }}
    >
      <Popover
        onVisibleChange={onShow}
        trigger="click"
        content={() => (
          <>
            {loading && "Loading..."}
            {!loading && data && (
              <Space direction="vertical">
                <Typography.Link
                  onClick={() => {
                    onShow(false);
                    onClick?.(user ? user.id : id);
                  }}
                >
                  {data.user.name}
                </Typography.Link>
                <Typography.Text mark={true}>{data.user.phone}</Typography.Text>
              </Space>
            )}
          </>
        )}
      >
        <List.Item.Meta
          title={user ? `${user.id} (${user.price})` : id}
          description={user ? user.ratingCount : ""}
        />
      </Popover>
    </List.Item>
  );
};
