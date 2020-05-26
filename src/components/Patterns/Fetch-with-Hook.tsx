import React from "react";
import fetch from "node-fetch";
import { renderer, State } from "./shared";

interface Props {
  url: string;
}

interface Action {
  type: string;
  payload: State;
}

type Reducer = (state: State, action: Action) => State;

// we can share this custom Hook too
const useFetch = (props: Props): State => {
  const [state, dispatch] = React.useReducer<Reducer>((init, action) => {

    return {
      ...init,
      ...action.payload,
    }

  }, {
    loading: true,
    data: undefined,
   });

  React.useEffect(() => {
    fetch(props.url).then(data => data.json()).then(data => {
      dispatch({
        type: "ANY",
        payload: {
          loading: false,
          data,
        }
      });
    });
  }, [props.url]);

  return state;
}

export const FetchWithHook: React.FC<Props> = (props) => {
  const result = useFetch({ url: props.url });

  return renderer(result);
}
