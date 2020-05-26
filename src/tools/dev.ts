import express from "express";
import webpack from "webpack";
import webpackDevMiddleware from "webpack-dev-middleware";
import webpackHotMiddleware from "webpack-hot-middleware";
import webpackHotServerMiddleware from "webpack-hot-server-middleware";
import browserSync from "browser-sync";
import clientConfig from "../webpack/client";
import serverConfig from "../webpack/server";
import { spinner } from "../shared/spinner";

(async () => {
  spinner.start("Starting...");
  await start();
  spinner.stop();
})();

let server: express.Application;

async function start() {
  // Build a dev server
  server = express();

  const clientEntry = clientConfig.entry as webpack.Entry;
  clientEntry.client = ["webpack-hot-middleware/client"].concat(clientEntry.client);

  clientConfig.output.filename = (clientConfig.output.filename as string).replace("chunkhash", "hash");
  clientConfig.output.chunkFilename = clientConfig.output.chunkFilename.replace("chunkhash", "hash");
  // Won't remvove any modules
  clientConfig.module.rules = clientConfig.module.rules.filter(x => x.loader !== "null-loader");

  serverConfig.output.hotUpdateMainFilename = "updates/[hash].hot-update.json";
  serverConfig.output.hotUpdateChunkFilename = "updates/[id].[hash].hot-update.js";
  serverConfig.module.rules = serverConfig.module.rules.filter(x => x.loader !== "null-loader");

  const multiCompiler = webpack([clientConfig, serverConfig]);

  server.use(
    webpackHotMiddleware(multiCompiler.compilers.find(compiler => compiler.name === "client"), {
      publicPath: clientConfig.output.publicPath,
      reload: true,
    })
  );
  server.use(
    webpackDevMiddleware(multiCompiler, {
      serverSideRender: true,
    })
  );

  server.use(
    webpackHotServerMiddleware(multiCompiler, {
      chunkName: "server",
    })
  );

  await Promise.all([
    webpackTask("client", multiCompiler),
    webpackTask("server", multiCompiler),
  ]);

  await new Promise((resolve, reject) => {
    browserSync.create().init({
      open: true,
      server: "build",
      middleware: [server],
      port: Number(process.env.PORT),
    },
    (error, bs) => (error ? reject(error) : resolve(bs))
    );
  });

  return server;
}

function webpackTask(name: string, multiCompiler: webpack.MultiCompiler) {
  return new Promise((resolve, reject) => {
    const compiler = multiCompiler.compilers.find(x => x.name === name);

    compiler.hooks.done.tap(name, stats => {
      if (stats.hasErrors()) {
        reject(new Error("Compilation failed!"));
      } else {
        resolve(stats);
      }
    });
  });
}
