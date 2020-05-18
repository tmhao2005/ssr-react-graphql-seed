import path from "path";
import webpack from "webpack";

const isDebug = process.env.NODE_ENV !== "production";
const isVerbose = false;
const ROOT_DIR = path.resolve(__dirname, "..", "..");
const ASSET_PATH = process.env.ASSET_PATH || "/assets/";

export const resolvePath = (...args: string[]) => path.resolve(ROOT_DIR, ...args);

export const CLIENT_ENTRY = resolvePath("src/entry/client.tsx");
export const SERVER_ENTRY = resolvePath("src/entry/server.tsx");
export const BUILD_DIR = resolvePath("build");

const base = {
  mode: isDebug ? "development" : "production",

  output: {
    path: resolvePath(BUILD_DIR, "public", "assets"),
    publicPath: ASSET_PATH,
    filename: isDebug ? "[name].js" : "[name].[chunkhash:8].js",
    chunkFilename: isDebug ? "[name].chunk.js" : "[name].[chunkhash:8].chunk.js",
    devtoolModuleFilenameTemplate: info => path.resolve(info.absoluteResourcePath).replace(/\\/g, "/"),
  },

  resolve: {
    extensions: [".js", ".json", ".jsx", ".ts", ".tsx"],
  },

  module: {
    strictExportPresence: true,
    rules: [
      {
        exclude: /node_modules/,
        test: /\.(j|t)sx?$/i,
        use: [
          {
            loader: "babel-loader",
            options: {
              cacheDirectory: true,
              presets: [
                ["@babel/env", {
                  "targets": {
                    "node": "current"
                  }
                }],
                "@babel/typescript",
                "@babel/react",
              ]
            }
          }
        ]
      },
      ...(isDebug
        ? []
        : [
          {
            test: resolvePath("node_modules/react-deep-force-update/lib/index.js"),
            loader: "null-loader",
          },
        ]),
    ],
  },

  plugins: [
    new webpack.WatchIgnorePlugin([/css\.d\.ts$/]),
    new webpack.DefinePlugin({
      __DEV__: isDebug,
      PORT: process.env.PORT,
      GRAPHQL: JSON.stringify(process.env.GRAPHQL),
    }),
    isDebug && new webpack.HotModuleReplacementPlugin(),
  ].filter(Boolean),

  // Don't attempt to continue if there are any errors.
  bail: !isDebug,

  cache: isDebug,

  stats: {
    cached: isVerbose,
    cachedAssets: isVerbose,
    chunks: isVerbose,
    chunkModules: isVerbose,
    colors: true,
    hash: isVerbose,
    modules: isVerbose,
    reasons: isDebug,
    timings: true,
    version: isVerbose,
  },

  devtool: isDebug ? "source-map" : false,
} as webpack.Configuration;

export { base };
export default base;
