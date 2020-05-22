import webpack from "webpack";
import nodeExternals from "webpack-node-externals";
import { smart } from "webpack-merge";
import base, { BUILD_DIR, SERVER_ENTRY } from "./base";
import { AssestKeys } from "./client";

const reScss = /\.(css|scss|sass)$/;
const reImage = /\.(ico|jpg|jpeg|png|gif|eot|otf|svg|webp|ttf|woff|woff2)$/;

const server = {
  name: "server",
  entry: {
    server: [SERVER_ENTRY],
  },
  target: "node",
  output: {
    path: BUILD_DIR,
    filename: "[name].js",
    chunkFilename: "chunks/[name].js",
    libraryTarget: "commonjs2",
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: "css-loader",
            options: {
              importLoaders: 1
            },
          },
        ],
      },
      {
        test: reImage,
        loader: "file-loader",
        options: {
          name: "[name].[ext]",
          outputPath: "./public/assets/",
        },
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      BROWSER: false,
    }),
  ],
  externals: [
    ...AssestKeys.map(key => `./${key}`),
    nodeExternals({
      whitelist: [reScss, reImage],
    }),
  ],
  node: {
    fs: "empty",
    net: "empty",
    tls: "empty",
    __dirname: false,
    __filename: false,
  },
} as webpack.Configuration;

export default smart(base, server);
