import React from "react";
import fetch from "node-fetch";
import { renderer, State } from "./shared";

interface Props {
  url: string;
}

export class Fetch extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {} as State;
  }

  private doFetch() {
    fetch(this.props.url).then(data => data.json()).then(data => this.setState({
      data,
      loading: false,
    }));
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
    return renderer(this.state);
  }
}
