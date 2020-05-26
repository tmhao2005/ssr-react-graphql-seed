import React from "react";
import { Button, List, PageHeader } from "antd";
import { useTimeTable, useSeats, useMutationFuta } from "../shared";

interface Props {
  slider: any;
  onDone: () => void;
}

export const Step3: React.FC<Props> = (props) => {
  const [time, setTime] = React.useState<any>({});
  const { data: timeTable, loading, error } = useTimeTable();
  const { data: seats } = useSeats();

  const setRoute = useMutationFuta({
    ...time,
  });

  React.useEffect(() => {
    if (time.timeId) {
      setRoute();
    }
  }, [time]);

  React.useEffect(() => {
    if (seats) {
      props.onDone();
    }
  }, [seats]);

  if (error) return <div>:((((</div>
  if (loading || !timeTable) return <div>Loading...</div>

  return (
    <>
      <PageHeader
        onBack={() => props.slider.current.decrement()}
        title="Select destinations"
      />
      <List
        header={<h4>Which time works for you?</h4>}
        bordered
        dataSource={timeTable.timeTable.Data}
        renderItem={({ Id, Kind, Time }) => (
          <List.Item key={Id}>
            <Button className={time.timeId === Id ? "active" : void 0} onClick={() => setTime({ timeId: Id, time: Time, kind: Kind })}>{Time}</Button>
          </List.Item>
        )}
      />
    </>
  )
}
