import React, { useEffect } from "react";
import { Button, List, PageHeader } from "antd";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import { useFUTA, useTimeTable, useMutationFuta } from "../shared";
import { Query, QueryRouteArgs } from "../../../generated/graphql";
import { Spinner } from "../Spinner";
import { FutaState } from "../../../graphql/client";

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
  ["TPHCM", "RACHGIA", "HCM - Rạch Giá", "19006067"],
  ["RACHGIA", "TPHCM", "Rạch Giá - HCM", "02973691691"],
  ["TPHCM", "CANTHO", "HCM - Cần Thơ"],
  ["CANTHO", "TPHCM", "Cần Thơ - HCM"],
  ["TPHCM", "NHATRANG", "HCM - Nha Trang"],
  ["NHATRANG", "TPHCM", "Nha Trang - HCM"],
];

interface Props {
  slider: React.RefObject<any>;
  onDone: () => void;
}

export const Step2: React.FC<Props> = (props) => {
  const [info, setInfo] = React.useState<Partial<FutaState>>({});
  const [move, setMove] = React.useState<boolean>(false);
  const { futa } = useFUTA();

  const { data: route } = useQuery<Query, QueryRouteArgs>(GET_ROUTE, {
    variables: {
      payload: {
        date: futa.date,
        d1: info.d1!,
        d2: info.d2!,
      },
    },
    skip: !info.d1 || !info.d2,
  });

  // Preload to cache them all if routeId has set
  const { data: timeTable, loading: timeTableLoading } = useTimeTable();

  const setRoute = useMutationFuta({
    ...info,
    routeId: route ? route.route.Data[0].Id : null,
    // Remove value set before what makes wrongly at step 3
    // Clear data at step 3 in a nutshell
    timeId: null,
  });

  // This will save the session once it has enough data
  useEffect(() => {
    if (info.d1 && info.d2 && route) {
      setRoute();
    }
  }, [info, route]);

  // The carousel renders twice making an error for now???
  // so I switched to `react-responsive-carousel` to fix the issue
  useEffect(() => {
    if (timeTable && move) {
      props.slider.current.increment();
      setMove(false);
    }
  }, [timeTable, move]);

  return (
    <>
      <PageHeader
        onBack={() => {
          props.slider.current.decrement();
        }}
        title="Chọn lại ngày đi"
      />
      <Spinner spin={timeTableLoading} tip="đang tìm chuyến đi ...">
        <List
          header={<h4>Bạn muốn đi đâu?</h4>}
          bordered={true}
          dataSource={proposedDestinations}
          renderItem={([d1, d2, name, bookTelephone =  null], idx) => (
            <List.Item key={idx}>
              <Button
                className={futa.d1 === d1 && futa.d2 === d2 ? "active" : void 0}
                onClick={() => {
                  setInfo({ d1, d2, bookTelephone });
                  setMove(true);
                }}
              >
                {name}
              </Button>
            </List.Item>
          )}
        />
      </Spinner>
    </>
  )
}
