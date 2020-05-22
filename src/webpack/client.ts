import fs from "fs";
import webpack from "webpack";
import WebpackAssetsManifest from "webpack-assets-manifest";
import { smart } from "webpack-merge";
import base, { BUILD_DIR, CLIENT_ENTRY } from "./base";

export const AssestKeys = [
  "asset-manifest.json",
  "chunk-manifest.json",
];

const client = {
  name: "client",
  entry: {
    client: [CLIENT_ENTRY],
  },
  target: "web",
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          "css-loader",
        ],
      },
    ],
  },
  plugins: [
    new WebpackAssetsManifest({
      output: `${BUILD_DIR}/${AssestKeys[0]}`,
      publicPath: true,
      writeToDisk: true,
      customize: ({ key, value }) => {
        if (key.toLowerCase().endsWith(".map")) return false;
        return { key, value };
      },
      done: (manifest, stats) => {
        const chunkFileName = `${BUILD_DIR}/${AssestKeys[1]}`;

        try {
          const fileFilter = file => !file.endsWith(".map");
          const addPath = file => manifest.getPublicPath(file);

          const chunkFiles = stats.compilation.chunkGroups.reduce((acc, c) => {
            acc[c.name] = [
              ...(acc[c.name] || []),
              ...c.chunks.reduce((files, cc) => [
                ...files,
                ...cc.files.filter(fileFilter).map(addPath)
              ], []),
            ];

            return acc;
          }, Object.create(null));

          fs.writeFileSync(chunkFileName, JSON.stringify(chunkFiles, null, 2));

        } catch (err) {
          console.error(`ERROR: Cannot write ${chunkFileName}: `, err);
          process.exit(1);
        }
      },
    }),
    new webpack.DefinePlugin({
      BROWSER: true,
    }),
  ],
} as webpack.Configuration;

export default smart(base, client);
