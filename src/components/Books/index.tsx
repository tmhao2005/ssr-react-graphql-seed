import React, { ChangeEvent } from "react";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

const onChange = (e: ChangeEvent<HTMLInputElement>) => {
  return e.target.value;
}

export const Books: React.SFC = () => {
  const ref = React.useRef<HTMLInputElement>();
  const [fn, keyword] = useThrottle(onChange, 1e3);

  const { loading, error, data } = useQuery<Record<"gitUsers", any>>(gql`
    query users($query: String) {
      gitUsers(query: $query) {
        items {
          id,
          login
        }
      }
    }
  `, {
    variables: {
      query: keyword,
    },
    skip: !keyword,
  });

  React.useEffect(() => {
    ref.current.focus();
  }, []);

  if (error) return <p>Error :(</p>;

  return (
    <>
      <div>
        <label>search acc</label>
        <input ref={ref} type="text" onChange={fn} />
      </div>

      {loading && "Loading..."}
      {!loading && data && data.gitUsers &&
        <ul>
          {data.gitUsers.items.map(item => <li key={item.id}>{item.login}</li>)}
        </ul>
      }
    </>
  )
}

function useThrottle(fn: any, timeout: number) {
  let timerId: NodeJS.Timeout;
  const [value, setResult] = React.useState();

  return [(...args: any) => {
    clearTimeout(timerId);
    args[0].persist();
    timerId = setTimeout(() => {
      setResult(fn(...args));
    }, timeout)
  }, value];
}
