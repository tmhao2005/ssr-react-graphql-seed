import React from "react";
import { GitUsers } from "../GitUsers";
import { Fetch } from "../Patterns/Fetch";
import { FetchRenderProp } from "../Patterns/Fetch-render-prop";
import { FetchWithHOC } from "../Patterns/Fetch-with-HOC";
import { FetchWithHook } from "../Patterns/Fetch-with-Hook";

export const App: React.FC = () => {
  const [keyword, setKeyword] = React.useState<string>("tmhao");

  const url = "https://api.github.com/search/users?q=" + keyword;

  return (
    <>
      <h2>SSR + React + GraphQL</h2>

      <input type="text" defaultValue={keyword} onChange={(e) => setKeyword(e.target.value)} />

      <hr />
      <h2>with GraphQL</h2>
      <GitUsers query={keyword} />

      <hr />
      <h2>normal</h2>
      <Fetch url={url} />

      <hr />
      <h2>with "render prop" pattern</h2>
      <FetchRenderProp url={url} />

      <hr />
      <h2>with "HOC" pattern</h2>
      <FetchWithHOC url={url} />

      <hr />
      <h2>with "Hook" pattern</h2>
      <FetchWithHook url={url} />
    </>
  )
}
