import React from "react";
import { Button, List, PageHeader, Tag, Divider } from "antd";
import { useTimeTable, useSeats, useMutationFuta } from "../shared";
import { Spinner } from "../Spinner";

interface Props {
  slider: any;
  onDone: () => void;
}

export const Step3: React.FC<Props> = (props) => {
  const [time, setTime] = React.useState<any>({});
  const { data: timeTable } = useTimeTable();
  const { data: seats, loading, error } = useSeats();

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
      <Spinner spin={loading} tip="searching for available seats...">
        <>
          <h4>Select the suitable time:</h4>
          <Divider />
          {timeTable.timeTable.Data.map(({ Id, Time, Kind }) => (
            <Tag
              key={Id}
              style={{ marginBottom: 8 }}
              color={time.timeId === Id ? "blue" : void 0} 
              onClick={() => setTime({ timeId: Id, time: Time, kind: Kind })}
            >
              {Time}
            </Tag>
          ))}
        </>
      </Spinner>
    </>
  )
}
