import * as React from "react";

interface GitUser {
  id: number;
  login: string;
}

export interface SearchResult {
  items: GitUser[];
}

export interface State {
  data: SearchResult;
  loading: boolean;
}

export const renderer = ({ loading, data }: State): React.ReactElement => (
  <>
    {loading && "Loading"}
    {!loading && (
      <ul>
        {data.items.map(item => <li key={item.id}>{item.login}</li>)}
      </ul>
    )}
  </>
)
