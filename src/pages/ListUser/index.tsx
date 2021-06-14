import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { Button, Drawer, List, PageHeader, Select, Space, Tag } from "antd";
import { UserItem } from "../../components/UserItem";
import {
  QueryUsersQuery,
  QueryUsersQueryVariables,
  QueryUsersDocument,
} from "../../generated/graphql";
import { Review } from "../../pages/Review";

const Option = Select.Option;

export const ListUser: React.FC<{}> = () => {
  const [offset, setOffset] = React.useState<number>(0);
  const [code, setCode] = React.useState<string>("Tân Phú");
  const [chosenUser, setChosenUser] = React.useState<number>();
  const favourites = [41709, 41276, 35088, 40844];

  const urlMaker = (values?: any) => {
    const sp = new URLSearchParams({
      cityCode: `Hồ+Chí+Minh`,
      mode: "directory",
      orderBy: "byRate",
      districtCode: code,
      offset,
      ...values,
    });

    return sp.toString();
  };

  const { loading, error, data, fetchMore } = useQuery<
    QueryUsersQuery,
    QueryUsersQueryVariables
  >(QueryUsersDocument, {
    variables: {
      query: urlMaker(),
    },
  });

  const handleChange = (value: string) => {
    setCode(value);
    setOffset(0);
  };

  if (error) {
    return <p>{error.message}</p>;
  }

  return (
    <>
      <PageHeader
        title={`Users ${
          data && data.users.length > 0 ? `${data.users.length}` : ""
        }`}
      />

      <Space
        direction="vertical"
        style={{
          width: "100%",
        }}
      >
        <div
          style={{
            paddingBottom: 20,
          }}
        >
          {favourites.map((id) => (
            <div
              key={id}
              style={{
                display: "flex",
              }}
            >
              <UserItem id={id} onClick={setChosenUser} />
            </div>
          ))}
        </div>

        <Select
          defaultValue={code}
          style={{
            width: 120,
          }}
          onChange={handleChange}
        >
          <Option value="Tân Bình">TB</Option>
          <Option value="Tân Phú">TP</Option>
          <Option value="Phú Nhuận">PN</Option>
          <Option value="Quận 10">Q10</Option>
          <Option value="Quận 1">Q1</Option>
          <Option value="Quận 8">Q8</Option>
          <Option value="Gò Vấp">QV</Option>
          <Option value="Bình Tân">BT</Option>
        </Select>
        {
          <List
            itemLayout="horizontal"
            dataSource={data ? data.users : []}
            renderItem={(item) => (
              <UserItem
                key={item.id}
                id={item.id}
                user={item}
                onClick={setChosenUser}
              />
            )}
            loading={loading}
            loadMore={
              <Button
                type="primary"
                ghost={true}
                style={{
                  marginTop: 8,
                }}
                onClick={() => {
                  const newOffset = offset + 20;
                  setOffset(newOffset);
                  fetchMore({
                    variables: {
                      query: urlMaker({
                        offset: newOffset,
                      }),
                    },
                    updateQuery: (prev, { fetchMoreResult }) => {
                      if (!fetchMoreResult) return prev;

                      return Object.assign({}, prev, {
                        users: [...data.users, ...fetchMoreResult.users],
                      });
                    },
                  });
                }}
              >
                Load more...
              </Button>
            }
          />
        }
        <Drawer
          visible={!!chosenUser}
          destroyOnClose={true}
          onClose={() => setChosenUser(undefined)}
          width={"100%"}
          bodyStyle={{ display: "flex", flexDirection: "column" }}
        >
          <Review userId={chosenUser} />
        </Drawer>
      </Space>
    </>
  );
};
