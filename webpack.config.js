/* eslint @typescript-eslint/no-var-requires: "off" */

const path = require("path");

module.exports = [
  {
    entry: "./main.js",
    context: __dirname,
    target: "electron-main",
    mode: process.env.NODE_ENV ?? "production",
    devtool: process.env.NODE_ENV === "development" ? "cheap-module-source-map" : "source-map",
    cache: process.env.NODE_ENV === "development" ? { type: "filesystem" } : false,
    externals: [
      {
        "@k8slens/extensions": "var global.LensExtensions",
        mobx: "var global.Mobx"
      }
    ],
    resolve: {
      extensions: [".js"]
    },
    output: {
      libraryTarget: "commonjs2",
      filename: "main.js",
      path: path.resolve(__dirname, "dist")
    },
    node: {
      __dirname: false,
      __filename: false
    }
  },
  {
    entry: "./renderer.jsx",
    context: __dirname,
    target: "electron-renderer",
    mode: process.env.NODE_ENV ?? "production",
    devtool: process.env.NODE_ENV === "development" ? "cheap-module-source-map" : "source-map",
    cache: process.env.NODE_ENV === "development" ? { type: "filesystem" } : false,
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader" // Лоадер для обработки JavaScript с Babel
          }
        }
      ]
    },
    externals: [
      {
        "@k8slens/extensions": "var global.LensExtensions",
        react: "var global.React",
        "react-dom": "var global.ReactDOM",
        "mobx-react": "var global.MobxReact",
        mobx: "var global.Mobx"
      }
    ],
    resolve: {
      extensions: [".jsx", ".js"]
    },
    output: {
      libraryTarget: "commonjs2",
      globalObject: "this",
      filename: "renderer.js",
      path: path.resolve(__dirname, "dist")
    },
    node: {
      __dirname: false,
      __filename: false
    }
  }
];
