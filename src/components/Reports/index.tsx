import React, { useState } from "react";
import { Space, Typography } from "antd";
import { FrownTwoTone, LoadingOutlined, SmileTwoTone } from "@ant-design/icons";

import { useReportsQuery } from "../../generated/graphql";

interface Props {
  userId?: string;
}

export const Reports: React.FC<Props> = ({ userId }) => {
  const { loading, data, error } = useReportsQuery({
    variables: {
      id: userId,
    },
  });

  if (error) return <p>Error :(</p>;

  return (
    <>
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

      {data &&
        data.reports.map((elem) => {
          const survey = JSON.parse(elem.survey);
          const comment = survey["70d0d64e3ab4f20fcd11e9913516a75c"];

          return (
            <Typography.Paragraph key={elem.id}>
              <blockquote
                dangerouslySetInnerHTML={{ __html: comment.answer }}
              />
            </Typography.Paragraph>
          );
        })}
    </>
  );
};
