import fs from "fs";
import path from "path";
import fetch from "node-fetch";
import dotenv from "dotenv";

const envFilePath = path.resolve(__dirname, "..", "..", ".env");
const parsed = dotenv.config({
  path: envFilePath,
});

if (parsed.error) {
  throw new Error(`Can't find the ".env" file at ${envFilePath}`);
}

fetch(`${process.env.GRAPHQL}`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    variables: {},
    query: `
      {
        __schema {
          types {
            kind
            name
            possibleTypes {
              name
            }
          }
        }
      }
    `,
  }),
})
.then(result => result.json())
.then(result => {
  // here we're filtering out any type information unrelated to unions or interfaces
  const filteredData = result.data.__schema.types.filter(
    type => type.possibleTypes !== null,
  );
  result.data.__schema.types = filteredData;

  fs.writeFile(path.resolve(__dirname, '..', 'generated/fragmentTypes.json'), JSON.stringify(result.data), err => {
    if (err) {
      console.error('Error writing fragmentTypes file', err);
    } else {
      console.log('Fragment types successfully extracted!');
    }
  });
});
