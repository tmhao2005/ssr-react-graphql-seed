import { RESTDataSource, RequestOptions } from "apollo-datasource-rest";

interface TimeTablePayload {
  routeId: number;
  departureDate: string;
}

interface SeatsPayload {
  routeId: number;
  timeId: number;
  departureDate: string;
  departureTime: string;
  kind: string;
}

export class FutaAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = FUTA_API;
  }

  willSendRequest(request: RequestOptions) {
    request.headers.set("X-Apikey", FUTA_TOKEN);
    request.headers.set("Content-Type", "application/json;charset=UTF-8");
  }

  async queryRoute(d1: string, d2: string, date: string) {
    return this.post("/api/queryroutewithprice", {
      DepartureDate: date,
      OriginCode: d1,
      DestCode: d2,
      Version: 221,
    });
  }

  async queryTimeTable({ routeId, departureDate }: TimeTablePayload) {
    return this.post("/api/querytimetable", {
      DepartureDate: departureDate,
      RouteId: routeId,
      Version: 221,
    });
  }

  async querySeats({ routeId, timeId, departureDate, departureTime, kind }: SeatsPayload) {
    return this.post("/api/queryseat", {
      CarBookingId: timeId,
      DepartureDate: departureDate,
      DepartureTime: departureTime,
      Kind: kind,
      RouteId: routeId,
      Version: 221
    });
  }
}
