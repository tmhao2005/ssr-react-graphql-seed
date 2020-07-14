import { useQuery, useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { Query, QueryTimeTableArgs, QuerySeatsArgs, Futa, MutationSetRouteArgs } from "../../generated/graphql";
import { AppCache } from "../../graphql/client";

const FUTA_CLIENT_QUERY = gql`
  {
    futa @client {
      d1
      d2
      date
      time
      routeId
      timeId
      kind
      lovedTimes
      lovedChairs
      bookTelephone
    }
  }
`;

const TIME_TABLE_QUERY = gql`  
  query GetTimeTable($payload: TimeTableInput) {
    timeTable(payload: $payload) {
      Data {
        Id
        Time
        Kind
      }
    }
  }
`;

export const SEATS_QUERY = gql`  
  query GetSeats($payload: SeatsInput) {
    seats(payload: $payload) {
      Data {
        Id
        Chair
        BookStatus
      }
    }
  }
`;

const ROUTE_CLIENT_MUTATION = gql`
  mutation setRoute($payload: Futa) {
    setRoute(payload: $payload) @client
  }
`;

const initial = {
  futa: {}
} as AppCache;

export const useFUTA = () => {
  const { data } = useQuery<AppCache>(FUTA_CLIENT_QUERY);
  return !data ? initial : data;
};

export function useTimeTable() {
  const { futa } = useFUTA();
  const result = useQuery<Query, QueryTimeTableArgs>(TIME_TABLE_QUERY, {
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
  const result = useQuery<Query, QuerySeatsArgs>(SEATS_QUERY, {
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

export function useMutationFuta(values?: Partial<Futa>) {
  const [setRoute] = useMutation<{}, MutationSetRouteArgs>(ROUTE_CLIENT_MUTATION, {
    variables: {
      payload: {
        ...values,
      },
    },
  });

  return setRoute;
}
