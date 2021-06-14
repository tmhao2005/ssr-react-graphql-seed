import React, { useState } from "react";
import { Col, Image, PageHeader, Row, Space, Switch, Typography } from "antd";
import { FrownTwoTone, LoadingOutlined, SmileTwoTone } from "@ant-design/icons";

import { useParams } from "react-router";
import {
  PhotoDimensions,
  User,
  useGetUserQuery,
  usePhotosQuery,
} from "../../generated/graphql";
import { Reports } from "../../components/Reports";

interface Props {
  userId?: number;
}

interface Params {
  id: string;
}

export const Review: React.FC<Props> = ({ userId }) => {
  const id = userId || useParams<Params>().id;
  const [showComment, setShowComments] = useState(true);

  const { loading: isUserLoading, data: userData } = useGetUserQuery({
    variables: {
      id: Number(id),
    },
    skip: !id,
  });

  const {
    loading: isPhotoLoading,
    error,
    data,
  } = usePhotosQuery({
    variables: {
      id: `${id}`,
    },
    skip: !id || showComment,
  });

  let urls: PhotoDimensions[] = [];
  const loading = isUserLoading || isPhotoLoading;

  if (data) {
    urls = data.photos.reduce((result, item) => {
      item.photos.forEach((photo) => {
        result.push({
          ...photo.data.dimensions,
        });
      });

      return result;
    }, []);
  }

  let user: User | undefined;
  if (userData) {
    user = userData.user;
  }

  const statusMap = {
    "1": <SmileTwoTone twoToneColor="#52c41a" />,
    "2": <FrownTwoTone twoToneColor="red" />,
  };

  if (error) return <p>Error :(</p>;

  return (
    <>
      <PageHeader
        title={
          <>
            {id}
            &nbsp;
            {user ? statusMap[user.status] : null}
          </>
        }
      >
        <Typography.Text mark={true}>{user?.phone}</Typography.Text>
        <Typography.Text type="secondary">
          {user ? ` (${user.price}) ` : null}
        </Typography.Text>

        <Switch checked={showComment} onChange={setShowComments} />
      </PageHeader>

      {loading && (
        <Space
          direction="vertical"
          style={{
            flex: "1 1 auto",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <LoadingOutlined style={{ fontSize: 24 }} spin={true} />
        </Space>
      )}

      {!loading && !showComment && urls.length > 0 && (
        <Row gutter={[16, 16]}>
          {urls.map((item, idx) => (
            <Col key={idx} md={4} sm={2}>
              {item.small && (
                <Image
                  src={item.small.url}
                  width={140}
                  height={140}
                  preview={{
                    src: item.original.url,
                  }}
                />
              )}
            </Col>
          ))}
        </Row>
      )}

      {showComment && (
        <Space>
          <Reports userId={`${id}`} />
        </Space>
      )}
    </>
  );
};
