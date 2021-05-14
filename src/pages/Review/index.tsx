import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { Col, Image, PageHeader, Row, Button, Space } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

import { useParams } from "react-router";
import {
  PhotosQuery,
  PhotosQueryVariables,
  PhotosDocument,
  PhotoDimensions,
} from "../../generated/graphql";

interface Props {
  userId?: string;
}

interface Params {
  id: string;
}

export const Review: React.FunctionComponent<Props> = ({ userId }) => {
  const id = userId || useParams<Params>().id;
  const { loading, error, data } = useQuery<PhotosQuery, PhotosQueryVariables>(
    PhotosDocument,
    {
      variables: {
        id,
      },
      skip: !id,
    }
  );

  let urls: PhotoDimensions[] = [];

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

  if (error) return <p>Error :(</p>;

  return (
    <>
      <PageHeader
        title={`Review ${id} ${urls.length > 0 ? `(${urls.length})` : ""}`}
      />

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

      {!loading && urls.length > 0 && (
        <Row gutter={[16, 16]}>
          {urls.map((item, idx) => (
            <Col key={idx} md={4} sm={2}>
              {item.small && (
                <Image
                  src={item.small.url}
                  width={120}
                  height={120}
                  preview={{
                    src: item.original.url,
                  }}
                />
              )}
            </Col>
          ))}
        </Row>
      )}
    </>
  );
};
