import { useQuery, useMutation } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import { Query, QueryTimeTableArgs, QuerySeatsArgs } from "../../generated/graphql";

const FUTA_INFO = gql`
  {
    futa @client {
      d1,
      d2,
      date,
      time,
      routeId,
      timeId,
      kind,
    }
  }
`;

const GET_TIMETABLE = gql`  
  query GetTimeTable($payload: TimeTableInput) {
    timeTable(payload: $payload) {
      Data {
        Id,
        Time,
        Kind,
      }
    }
  }
`;

const GET_SEATS = gql`  
  query GetSeats($payload: SeatsInput) {
    seats(payload: $payload) {
      Data {
        Id,
        Chair,
        BookStatus,
      }
    }
  }
`;

const SET_ROUTE = gql`
  mutation SetRoute($d1: String, $d2: String, $date: String, $time: String, $routeId: Int, $timeId: Int, $kind: String) {
    setRoute(d1: $d1, d2: $d2, date: $date, time: $time, routeId: $routeId, timeId: $timeId, kind: $kind) @client
  }
`;

const initial = {
  futa: {}
}

export const useFUTA = () => {
  const { data } = useQuery(FUTA_INFO);
  return !data ? initial : data;
}

export function useTimeTable() {
  const { futa } = useFUTA();
  const result = useQuery<Query, QueryTimeTableArgs>(GET_TIMETABLE, {
    variables: {
      payload: {
        routeId: futa.routeId,
        departureDate: futa.date,
      },
    },
    skip: !futa.routeId,
  });

  return result;
}

export function useSeats() {
  const { futa } = useFUTA();
  const result = useQuery<Query, QuerySeatsArgs>(GET_SEATS, {
    variables: {
      payload: {
        routeId: futa.routeId,
        departureDate: futa.date,
        departureTime: futa.time,
        timeId: futa.timeId,
        kind: futa.kind,
      },
    },
    skip: !futa.timeId,
  });

  return result;
}

export function useMutationFuta(values: any) {
  const { futa } = useFUTA();
  const [setRoute] = useMutation(SET_ROUTE, {
    variables: {
      ...futa,
      ...values,
    },
  });

  return setRoute;
}