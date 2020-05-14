import path from "path";
import express from "express";
import webpack from "webpack";
import webpackDevMiddleware from "webpack-dev-middleware";
import webpackHotServerMiddleware from "webpack-hot-server-middleware";
import clientConfig from "./webpack/client";
import serverConfig from "./webpack/server";
import { common } from "./global";

(async () => {
  // common.spinner.start("Starting...");
  await start();
  // common.spinner.stop();
})();

let server: express.Application;

async function start() {
  if (server)
    return server;

  // Build a dev server
  server = express();

  server.use(express.static(path.resolve(__dirname, "../public")));

  clientConfig.output.filename = (clientConfig.output.filename as string).replace("chunkhash", "hash");
  clientConfig.output.chunkFilename = clientConfig.output.chunkFilename.replace("chunkhash", "hash");
  clientConfig.module.rules = clientConfig.module.rules.filter(x => x.loader !== "null-loader");
  clientConfig.plugins.push(new webpack.HotModuleReplacementPlugin());

  serverConfig.output.hotUpdateMainFilename = "updates/[hash].hot-update.json";
  serverConfig.output.hotUpdateChunkFilename = "updates/[id].[hash].hot-update.js";
  serverConfig.module.rules = serverConfig.module.rules.filter(x => x.loader !== "null-loader");
  serverConfig.plugins.push(new webpack.HotModuleReplacementPlugin());

  // await run(clean);

  const multiCompiler = webpack([clientConfig, serverConfig]);

  server.use(
    webpackDevMiddleware(multiCompiler, {
      serverSideRender: true,
    })
  );

  server.use(webpackHotServerMiddleware(multiCompiler, {
    chunkName: "server",
  }));

  server.listen(3000, () => console.log("server is running now"));

  return server;
}
