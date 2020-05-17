import path from "path";
import dotenv from "dotenv";

const parsed = dotenv.config({
  path: path.resolve(__dirname, "..", ".env"),
});

if (parsed.error) {
  console.log("You don't have any env file");
}

if (!process.env.RUNNER) {
  console.error("No runner specified");
  process.exit(1);
}

const script = path.resolve(__dirname, "./tools/", `${process.env.RUNNER}.ts`);

require(script);
