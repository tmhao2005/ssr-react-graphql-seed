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
    NODE_ENV: 'development' | 'production' | 'test';
    PORT: number;
    GRAPHQL: string;
    MY_API: string;
    FUTA_API: string;
    FUTA_TOKEN: string;
  }
}
