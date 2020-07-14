import * as React from "react";

export interface User {
  id: number;
  login: string;
  ratingCount: number;
  phone: string;
}

export interface SearchResult {
  items: User[];
}

export interface State {
  data: SearchResult;
  loading: boolean;
}

export const renderer = ({ loading, data }: State): React.ReactElement => (
  <>
    {loading && "Loading"}
    {!loading && data && (
      <ul>
        {data.items.map(item => <li key={item.id}>{item.login}</li>)}
      </ul>
    )}
  </>
);
