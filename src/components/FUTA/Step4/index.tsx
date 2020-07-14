import React from "react";
import { PageHeader, Divider, Tag } from "antd";
import { useSeats } from "../shared";

interface Props {
  slider: any;
  onDone: () => void;
}

export const Step4: React.FC<Props> = (props) => {
  const { data: seats, error, loading } = useSeats();

  if (error) return <div>:((((</div>;
  if (loading || !seats) return <div>Loading...</div>;

  return (
    <>
      <PageHeader
        onBack={() => props.slider.current.decrement()}
        title="Select time"
      />

      <h4>Đây là toàn bộ ghế trống:</h4>
      <Divider />
      {seats.seats.Data.map(({ Id, Chair }) => (
        <Tag key={Id} style={{ marginBottom: 8 }}>
          {Chair}
        </Tag>
      ))}
    </>
  );
};

