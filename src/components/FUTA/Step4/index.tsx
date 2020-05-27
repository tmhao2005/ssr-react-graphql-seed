import React from "react";
import { Button, List, PageHeader } from "antd";
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
      <List
        header={<h4>Select your seat?</h4>}
        bordered={true}
        dataSource={seats.seats.Data.filter(item => item.BookStatus < 1)}
        renderItem={({ Id, Chair }) => (
          <List.Item key={Id}>
            <Button>{Chair}</Button>
          </List.Item>
        )}
      />
    </>
  )
}

// function splitAB(arr: Seat[]) {
//   return arr.filter(item => item.BookStatus < 1).reduce((acc, seat) => {
//     if (/^A/.test(seat.Chair)) {
//       acc[0].push(seat);
//     }

//     if (/^B/.test(seat.Chair)) {
//       acc[1].push(seat);
//     }

//     return acc;
//   }, [[], []]);
// }
