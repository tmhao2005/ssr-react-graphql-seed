import React from "react";
import { Button, List } from "antd";
import { useMutationFuta, useFUTA } from "../shared";

interface Props {
  slider: any;
  onDone: () => void;
}

const proposedDates = [
  {
    name: "Today",
    date: formatDate(getDateAhead(0)),
  },
  {
    name: "Tomorrow",
    date: formatDate(getDateAhead(1)),
  },
  {
    name: formatDate(getDateAhead(2)),
    date: formatDate(getDateAhead(2)),
  },
  {
    name: formatDate(getDateAhead(3)),
    date: formatDate(getDateAhead(3)),
  },
];

export const Step1: React.FC<Props> = (props) => {
  const [info, setInfo] = React.useState<any>({});
  const { futa } = useFUTA();
  const hasAllParams = !!info.date;

  const setRoute = useMutationFuta({
    date: info.date,
    timeId: null,
    routeId: null,
  });

  React.useEffect(() => {
    if (hasAllParams) {
      setRoute().then(() => props.slider.current.increment());
    }
  }, [info]);

  return (
    <List
      header={<h4>Which date do you want to depart?</h4>}
      bordered
      dataSource={proposedDates}
      renderItem={(item) => (
        <List.Item key={item.name}>
          <Button className={futa.date === item.date ? "active" : void 0} onClick={() => setInfo({ date: item.date })}>{item.name}</Button>
        </List.Item>
      )}
    />
  )
}

function getDateAhead(days: number) {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date;
}

// dd-mm-yyyy
function formatDate(date: string | number | Date) {
  function pad(s) { return (s < 10) ? "0" + s : s; }
  const d = new Date(date);

  return [pad(d.getDate()), pad(d.getMonth()+1), d.getFullYear()].join("-");
}
