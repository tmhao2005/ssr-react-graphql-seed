import webpack from "webpack";
import clientConfig from "../webpack/client";
import serverConfig from "../webpack/server";
import { spinner } from "../shared/spinner";

(async () => {
  spinner.start("Building...");
  await bundle();
  spinner.stop().succeed("Finished building");
})();

function bundle() {
  return new Promise((resolve, reject) => {
    webpack([clientConfig, serverConfig]).run((err, stats) => {
      if (err) {
        return reject(err);
      }

      spinner.info(stats.toString(serverConfig.stats));
      return resolve(true);
    });
  });
}
