import React from "react";
import { Button, List, Tag } from "antd";
import { useMutationFuta, useFUTA } from "../shared";

interface Props {
  slider: any;
  onDone: () => void;
}

export const Step1: React.FC<Props> = (props) => {
  const [info, setInfo] = React.useState<Record<'date', string>>();
  const { futa } = useFUTA();

  const setRoute = useMutationFuta();

  React.useEffect(() => {
    if (info && info.date) {
      setRoute({
        variables: {
          payload: {
            date: info.date,
            timeId: null,
            routeId: null,
          }
        }
      }).then(() => props.slider.current.increment());
    }
  }, [info]);

  return (
    <List
      header={<h4>Bạn muốn đi vào ngày nào?</h4>}
      dataSource={buildProposedDate(10)}
      renderItem={(item) => (
        <List.Item key={item.name}>
          <Button
            style={{ display: "flex", alignItems: "center" }}
            className={futa.date === item.date ? "active" : void 0}
            onClick={() => setInfo({ date: item.date })}
          >
            <span style={{ marginRight: 8 }}>{item.name}</span>
            <Tag color={item.tag.color}>{item.tag.label}</Tag>
          </Button>
        </List.Item>
      )}
    />
  );
};

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

function getWeekDay(date: Date) {
  const weekday = ["Chủ nhật", "Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7"];
  return weekday[date.getDay()];
}

function buildSuffix(idx: number, fallback: string) {
  switch (idx) {
    case 0:
      return {
        label: "Hôm nay",
        color: "green",
      };

    case 1:
      return {
        label: "Ngày mai",
        color: "blue",
      };

    default:
      return {
        label: fallback,
        color: "",
      };
  }
}

function buildProposedDate(size: number) {
  return Array.from({ length: size }).map((_, idx) => {
    const date = getDateAhead(idx);
    const formatted = formatDate(date);
    const weekDay = getWeekDay(date);

    return {
      name: formatted,
      date: formatted,
      tag: buildSuffix(idx, weekDay),
    };
  });
}
