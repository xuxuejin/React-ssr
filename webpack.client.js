const path = require("path");
const { merge } = require("webpack-merge");
const baseConfig = require("./webpack.base");

module.exports = merge(baseConfig, {
  entry: "./src/client/index.js",
  output: {
    path: path.resolve(__dirname, "public"),
    filename: "client.js",
  },
  module: {
    // rules: [
    //   {
    //     test: /\.less$/,
    //     use: [
    //       "style-loader",
    //       {
    //         loader: "css-loader",
    //         options: {
    //           importLoaders: 1,
    //           modules: true,
    //           localIdentName: "[name]_[local]_[hash:base64:5]",
    //         },
    //       },
    //       "less-loader",
    //     ],
    //   },
    // ],
    rules: [
      {
        test: /\.less$/i,
        use: [
          //   {
          //     loader: "style-loader",
          //   },

          "isomorphic-style-loader",
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
              modules: true,
              //   localIdentName: "[name]_[local]_[hash:base64:5]",
            },
          },
          {
            loader: "less-loader",
          },
        ],
      },
    ],
  },
});
