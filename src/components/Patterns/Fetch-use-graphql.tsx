import React from "react";
import { useQuery } from "@apollo/react-hooks";
import {
 Button, Drawer, List, PageHeader, Select, Space
} from "antd";
import { UserItem } from "../UserItem";
import {
 QueryUsersQuery, QueryUsersQueryVariables, QueryUsersDocument
} from "../../generated/graphql";
import { Review } from "../../pages/Review";

const Option = Select.Option;

export const FetchWithGraphQL: React.FC<{}> = () => {
  const [offset, setOffset] = React.useState<number>(0);
  const [code, setCode] = React.useState<string>('Tân Bình');
  const [chosenUser, setChosenUser] = React.useState<string>();

  const urlMaker = (values?: any) => {
    const sp = new URLSearchParams({
      cityCode: `Hồ+Chí+Minh`,
      mode: 'directory',
      orderBy: 'byRate',
      districtCode: code,
      offset,
      ...values,
    });

    return sp.toString();
  };

  const { loading, error, data, fetchMore } = useQuery<QueryUsersQuery, QueryUsersQueryVariables>(QueryUsersDocument, {
    variables: {
      query: urlMaker(),
    },
    // skip: !query,
  });

  const handleChange = (code: string) => {
    setCode(code);
  };

  if (error) return <p>Error :(</p>;

  return (
    <>
      <PageHeader
        title={`Users ${data && data.users.length > 0 ? `${data.users.length}` : ''}`}
      />

      <Space direction="vertical" style={{
 width: '100%'
}}>
        <Select defaultValue={code} style={{
 width: 120
}} onChange={handleChange}>
          <Option value="Tân Bình">TB</Option>
          <Option value="Tân Phú">TP</Option>
          <Option value="Phú Nhuận">PN</Option>
          <Option value="Quận 10">Q10</Option>
          <Option value="Quận 1">Q1</Option>
        </Select>

        {
          <List
            itemLayout="horizontal"
            dataSource={data ? data.users : []}
            renderItem={item => <UserItem user={item} onClick={setChosenUser} />}
            loading={loading}
            loadMore={
              <Button type="primary" ghost style={{
 marginTop: 8
}} onClick={() => {
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
                      users: [...prev.users, ...fetchMoreResult.users]
                    });
                  }
                });
              }}>
                Load more...
              </Button>
            }
          />
        }
        <Drawer visible={!!chosenUser} width={'100%'} destroyOnClose={true} onClose={() => setChosenUser(undefined)}>
          <Review userId={chosenUser} />
        </Drawer>
      </Space>
    </>
  );
};
