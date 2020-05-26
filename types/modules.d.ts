declare module 'webpack-merge' {
  export function smart<T = any>(...args: T[]): T;
}

declare module '*.graphql' {
  // import { DocumentNode } from 'graphql'
  const Schema: any; // Record<string, DocumentNode>;

  export = Schema
}
