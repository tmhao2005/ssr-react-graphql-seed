import React from "react";
import { Button, List, PageHeader, Divider, Tag } from "antd";
import { useSeats } from "../shared";

interface Props {
  slider: any;
  onDone: () => void;
}

export const Step4: React.FC<Props> = (props) => {
  const { data: seats, error, loading } = useSeats();

  if (error) return <div>:((((</div>
  if (loading || !seats) return <div>Loading...</div>

  return (
    <>
      <PageHeader
        onBack={() => props.slider.current.decrement()}
        title="Select time"
      />

      <h4>Here is all the available seats for you to select:</h4>
      
      <Divider />

      {seats.seats.Data.map(({ Id, Chair }) => (
        <Tag key={Id} style={{ marginBottom: 8 }}>
          {Chair}
        </Tag>
      ))}
    </>
  )
}

