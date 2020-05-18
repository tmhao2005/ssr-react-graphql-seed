import React from "react";
import fetch from "node-fetch";
import { renderer, State, SearchResult } from "./shared";

interface Props {
  url: string;
}

// we can share this custom Hook too
const useFetch = (props: Props): State => {
  const [loading, setLoading] = React.useState(true);
  const [data, setData] = React.useState<SearchResult>();

  React.useEffect(() => {
    fetch(props.url).then(data => data.json()).then(data => {
      setData(data);
      setLoading(false);
    });
  }, [props.url]);

  return {
    loading,
    data,
  }
}

export const FetchWithHook: React.FC<Props> = (props) => {
  const result = useFetch({ url: props.url });

  return renderer(result);
}
