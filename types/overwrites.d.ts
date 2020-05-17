declare interface Window {
  __APOLLO_STATE__: any;
}

declare interface NodeModule {
  hot?: {
    accept: (param: string, cb?: () => void) => any;
  };
}

declare module NodeJS {
  interface ProcessEnv {
    PORT: number;
    GRAPHQL: string;
  }
}
