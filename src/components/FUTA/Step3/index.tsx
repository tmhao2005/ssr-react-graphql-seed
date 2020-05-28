import React from "react";
import { Button, PageHeader, Tag, Divider } from "antd";
import { useApolloClient } from "@apollo/react-hooks";
import { useTimeTable, useSeats, useMutationFuta, GET_SEATS, useFUTA } from "../shared";
import { Spinner } from "../Spinner";
import { TagInput } from "../TagInput";
import { TimeTable, Query } from "../../../generated/graphql";

interface Props {
  slider: any;
  onDone: () => void;
}

interface State {
  lovedTimes: string[];
  lovedChairs: string[];
  suggestions: string[];
  running: boolean;
}

interface Action {
  payload: Partial<State>;
  type?: string;
}

type Reducer = (state: State, action: Action) => State;

export const Step3: React.FC<Props> = (props) => {
  const { futa } = useFUTA();
  const { data: timeTable } = useTimeTable();
  const { data: seats, loading, error } = useSeats();
  const client = useApolloClient();

  const [time, setTime] = React.useState<any>({});
  const [state, dispatch] = React.useReducer<Reducer>((state, action) => {
    if (action.type === "ADD_SUGGESTION") {
      return {
        ...state,
        suggestions: [
          ...state.suggestions,
          ...action.payload.suggestions,
        ]
      }
    }

    return {
      ...state,
      ...action.payload,
    }

  }, {
    lovedTimes: ["0:45", "9:00"],
    lovedChairs: ["B06", "B09"],
    suggestions: [],
    running: false,
  });

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

  const table = React.useMemo(() => {
    if (timeTable) {
      return searchTimes(timeTable.timeTable.Data, state.lovedTimes);
    }
    return [];
  }, [state.lovedTimes, timeTable]);

  const onSuggest = () => {
    const chairs = state.lovedChairs.map(elem => elem.toLowerCase());
    dispatch({
      payload: {
        suggestions: [],
        running: true,
      },
    });

    table.forEach(async (item, idx) => {
      const { data } = await client.query<Query>({
        query: GET_SEATS,
        variables: {
          payload: {
            routeId: futa.routeId,
            departureDate: futa.date,
            departureTime: item.Time,
            timeId: item.Id,
            kind: item.Kind,
          },
        },
      });

      if (data) {
        const allSeats = data.seats.Data
          .filter(elem => elem.BookStatus === 0)
          .map(elem => elem.Chair.toLowerCase())
          ;

        if (chairs.every(elem => allSeats.indexOf(elem) > -1)) {
          dispatch({
            type: "ADD_SUGGESTION",
            payload: {
              suggestions: [
                item.Time,
              ],
            }
          })
        }
      }

      if (idx + 1 >= table.length) {
        dispatch({
          payload: {
            running: false,
          }
        })
      }
    });
  }

  if (error) return <div>:((((</div>
  if (!timeTable) return null;

  return (
    <>
      <PageHeader
        onBack={() => {
          props.slider.current.decrement();
          dispatch({
            payload: {
              suggestions: [],
            }
          });
        }}
        title="Chọn lại điểm khởi hành"
      />

      <h4>Thêm vào thời gian mà bạn muốn đi và số ghế mà bạn yêu thích</h4>
      <Divider />

      <div style={{ marginBottom: 16 }}>
        <TagInput defaultTags={state.lovedTimes} onChange={(tags) => {
          dispatch({
            payload: {
              lovedTimes: tags,
              suggestions: [],
            }
          })
        }} />
      </div>
      <div>
        <TagInput defaultTags={state.lovedChairs} onChange={(tags) => {
          dispatch({
            payload: {
              lovedChairs: tags,
              suggestions: [],
            }
          });
        }} />
      </div>

      <Divider />
      <Spinner spin={loading} tip="đang lục ghế cho bạn nhé...">
        <>
          <h4>Đây là thời gian gợi ý cho bạn</h4>
          <Divider />
          {table.map(({ Id, Time, Kind }) => (
            <Tag
              key={Id}
              style={{ marginBottom: 8 }}
              color={state.suggestions.indexOf(Time) > -1 ? "green" : void 0}
              onClick={() => setTime({ timeId: Id, time: Time, kind: Kind })}
            >
              {Time}
            </Tag>
          ))}

          <Divider />
          <Button type="primary" size="small" loading={state.running} onClick={onSuggest}>đang lục ghế...</Button>
        </>
      </Spinner>
    </>
  )
}

const SEARCHING_RADIUS = 2;  // 2 hours

function searchTimes(arr: TimeTable[], input: string[]) {
  // accepted patterns 1|11|1:5|11:5|11:30
  const re = /^(([\d]{1,2})$|^[\d]{1,2}:[\d]{1,2}$)/;

  // parse number
  const inputHours: number[] = input.reduce((acc, x) => {
    if (re.test(x)) {
      acc.push(toNumber(x));
    }
    return acc;
  }, []);

  const results: TimeTable[] = [];

  inputHours.sort((a, b) => a - b).forEach(inputHour => {
    arr.forEach(item => {
      const hour = toNumber(item.Time);

      // inputHour: 5, hour: 3 => 5 - 2 <= 3 && 3 <= 5 + 2
      // inputHour: 5, hour: 7 => 7 <= 2 + 5 && 5 - 2 < 7
      if (inputHour - SEARCHING_RADIUS <= hour && hour <= inputHour + SEARCHING_RADIUS) {
        if (results.map(elem => elem.Time).indexOf(item.Time) < 0) {
          results.push(item);
        }
      }
    });
  });

  return results.length > 0 ? results : arr;
}

function toNumber(hour: string) {
  const h = hour.split(":")[0];
  return Number(h);
}
