// import 'react';
// export {};
// declare file won't work in case of having import/export same level with `declare` 

declare namespace Express {
  export interface Request {
      baz?: string;
  }
}
