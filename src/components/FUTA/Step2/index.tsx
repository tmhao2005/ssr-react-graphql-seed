import React, { useEffect } from "react";
import { Button, List, PageHeader } from "antd";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import { useFUTA, useTimeTable, useMutationFuta } from "../shared";
import { Query, QueryRouteArgs } from "../../../generated/graphql";

const GET_ROUTE = gql`  
  query GetRoute($payload: RouteInput) {
    route(payload: $payload) {
      Data {
        Id,
      }
    }
  }
`;

const proposedDestinations = [
  ["TPHCM", "RACHGIA", "HCM - Rạch Giá"],
  ["RACHGIA", "TPHCM", "Rạch Giá - HCM"],
  ["TPHCM", "CANTHO", "HCM - Cần Thơ"],
  ["CANTHO", "TPHCM", "Cần Thơ - HCM"],
];

interface Props {
  slider: React.RefObject<any>;
  onDone: () => void;
}

export const Step2: React.FC<Props> = (props) => {
  const [info, setInfo] = React.useState<any>({});
  const { futa } = useFUTA();

  const { data: route } = useQuery<Query, QueryRouteArgs>(GET_ROUTE, {
    variables: {
      payload: {
        date: futa.date,
        ...info,
      },
    },
    skip: !info.d1 || !info.d2,
  });

  // Preload to cache them all
  const { data: timeTable } = useTimeTable();

  const setRoute = useMutationFuta({
    ...info,
    routeId: route ? route.route.Data[0].Id : null,
    // Remove value set before what makes wrongly
    timeId: null,
  });

  // This will save the session once it has enough data
  useEffect(() => {
    if (info.d1 && info.d2 && route) {
      setRoute();
    }
  }, [info, route]); // OR

  // The carousel renders twice making an error for now???
  // so I switched to `react-responsive-carousel` to fix the issue
  useEffect(() => {
    if (timeTable) {
      props.slider.current.increment();
    }
  }, [timeTable]);

  return (
    <>
      <PageHeader
        onBack={() => props.slider.current.decrement()}
        title="Select date"
      />
      <List
        header={<h4>Select where you would like to go</h4>}
        bordered
        dataSource={proposedDestinations}
        renderItem={([d1, d2, name], idx) => (
          <List.Item key={idx}>
            <Button className={futa.d1 === d1 && futa.d2 === d2 ? "active" : void 0} onClick={() => setInfo({ d1, d2 })}>{name}</Button>
          </List.Item>
        )}
      />
    </>
  )
}
