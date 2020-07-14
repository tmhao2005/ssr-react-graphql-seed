import React from "react";
import fetch from "node-fetch";
import { State, renderer } from "./shared";

interface Props {
  url: string;
}

// we can share this component too
export const withFetch = (Component: React.ComponentType<State>) => {
  class Fetch extends React.Component<Props, State> {
    constructor(props: any) {
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
      return <Component {...this.state} />;
    }

    private doFetch() {
      fetch(this.props.url).then(data => data.json()).then(data => this.setState({
        data,
        loading: false,
      }));
    }
  }

  return (props: Props) => <Fetch {...props} />;
};

export const FetchWithHOC = withFetch((payload) => (
  renderer(payload)
));
