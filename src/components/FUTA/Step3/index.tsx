import React from "react";
import { Button, List, PageHeader } from "antd";
import { useTimeTable, useSeats, useMutationFuta } from "../shared";
import { Checker } from "../Checker";

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
  if (!timeTable) return null;

  return (
    <>
      <PageHeader
        onBack={() => props.slider.current.decrement()}
        title="Select destinations"
      />
      <Checker spin={loading} tip="searching for available seats...">
        <List
          header={<h4>Which time works for you?</h4>}
          bordered={true}
          dataSource={timeTable.timeTable.Data}
          renderItem={({ Id, Kind, Time }) => (
            <List.Item key={Id}>
              <Button className={time.timeId === Id ? "active" : void 0} onClick={() => setTime({ timeId: Id, time: Time, kind: Kind })}>{Time}</Button>
            </List.Item>
          )}
        />
      </Checker>
    </>
  )
}
