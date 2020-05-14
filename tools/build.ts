import webpack from "webpack";
import clientConfig from "./webpack/client";
import serverConfig from "./webpack/server";
import { common } from "./global";

(async () => {
  common.spinner.start("Building...");
  await bundle();
  common.spinner.stop().succeed("Finished building");
})();

function bundle() {
  return new Promise((resolve, reject) => {
    webpack([clientConfig, serverConfig]).run((err, stats) => {
      if (err) {
        return reject(err);
      }

      common.spinner.info(stats.toString(serverConfig.stats));
      return resolve();
    });
  });
}
