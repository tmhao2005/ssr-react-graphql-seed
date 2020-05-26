import React from "react";
import fetch from "node-fetch";
import { renderer, State } from "./shared";

interface Props {
  url: string;
  children: (arg: State) => React.ReactElement;
}

// This can be shared now
export class Fetch extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {} as State;
  }

  componentDidMount() {
    this.setState({
      loading: true,
    });
    this.doFetch();
  }

  componentDidUpdate(nextProps: Props) {
    if (nextProps.url !== this.props.url) {
      this.doFetch();
    }
  }

  render() {
    return this.props.children(this.state);
  }

  private doFetch() {
    fetch(this.props.url).then(data => data.json()).then(data => this.setState({
      data,
      loading: false,
    }));
  }
}

export const FetchRenderProp: React.SFC<{ url: string }> = (props) => {
  return (
  <Fetch url={props.url}>
    {(data) => renderer(data)}
  </Fetch>)
}
