export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type RouteResult = {
  __typename?: "RouteResult";
  Data?: Maybe<Maybe<Route>[]>;
  Status?: Maybe<Scalars["Int"]>;
};

export type Route = {
  __typename?: "Route";
  Id?: Maybe<Scalars["Int"]>;
  Price?: Maybe<Scalars["String"]>;
};

export type TimeTable = {
  __typename?: "TimeTable";
  IDKind?: Maybe<Scalars["Int"]>;
  IDTimeStart?: Maybe<Scalars["Int"]>;
  IDWay?: Maybe<Scalars["Int"]>;
  Id?: Maybe<Scalars["Int"]>;
  Kind?: Maybe<Scalars["String"]>;
  Time?: Maybe<Scalars["String"]>;
};

export type TimeTableResult = {
  __typename?: "TimeTableResult";
  Status?: Maybe<Scalars["Int"]>;
  Data?: Maybe<Maybe<TimeTable>[]>;
};

export type SeatsResult = {
  __typename?: "SeatsResult";
  Status?: Maybe<Scalars["Int"]>;
  Data?: Maybe<Maybe<Seat>[]>;
};

export type Seat = {
  __typename?: "Seat";
  BookStatus?: Maybe<Scalars["Int"]>;
  Chair?: Maybe<Scalars["String"]>;
  ColumnNo?: Maybe<Scalars["Int"]>;
  Discount?: Maybe<Scalars["Int"]>;
  FloorNo?: Maybe<Scalars["Int"]>;
  Id?: Maybe<Scalars["Int"]>;
  InSelect?: Maybe<Scalars["Int"]>;
  LockChair?: Maybe<Scalars["Int"]>;
  RowNo?: Maybe<Scalars["Int"]>;
};

export type RouteInput = {
  d1: Scalars["String"];
  d2: Scalars["String"];
  date: Scalars["String"];
};

export type TimeTableInput = {
  routeId: Scalars["Int"];
  departureDate: Scalars["String"];
};

export type SeatsInput = {
  routeId: Scalars["Int"];
  timeId: Scalars["Int"];
  departureDate: Scalars["String"];
  departureTime: Scalars["String"];
  kind: Scalars["String"];
};

export type Query = {
  __typename?: "Query";
  route?: Maybe<RouteResult>;
  seats?: Maybe<SeatsResult>;
  timeTable?: Maybe<TimeTableResult>;
  user?: Maybe<User>;
  users?: Maybe<Maybe<User>[]>;
};


export type QueryRouteArgs = {
  payload?: Maybe<RouteInput>;
};


export type QuerySeatsArgs = {
  payload?: Maybe<SeatsInput>;
};


export type QueryTimeTableArgs = {
  payload?: Maybe<TimeTableInput>;
};


export type QueryUserArgs = {
  id?: Maybe<Scalars["Int"]>;
};


export type QueryUsersArgs = {
  query?: Maybe<Scalars["String"]>;
};

export type User = {
  __typename?: "User";
  id?: Maybe<Scalars["Int"]>;
  login?: Maybe<Scalars["String"]>;
  ratingCount?: Maybe<Scalars["Int"]>;
  phone?: Maybe<Scalars["String"]>;
};

export type QueryUsersQueryVariables = {
  query?: Maybe<Scalars["String"]>;
};


export type QueryUsersQuery = (
  { __typename?: "Query" }
  & { users?: Maybe<Maybe<(
    { __typename?: "User" }
    & Pick<User, "id" | "login" | "ratingCount" | "phone">
  )>[]>; }
);
