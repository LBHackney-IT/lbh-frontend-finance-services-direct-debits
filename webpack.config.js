const { merge } = require("webpack-merge");
const singleSpaDefaults = require("webpack-config-single-spa-react-ts");
const webpack = require("webpack");
const dotenv = require("dotenv").config();
const {
  ImportMapWebpackPlugin,
} = require("@hackney/webpack-import-map-plugin");

module.exports = (webpackConfigEnv, argv) => {
  const defaultConfig = singleSpaDefaults({
    orgName: "mtfh",
    projectName: "finance-details",
    webpackConfigEnv,
    argv,
  });

  return merge(defaultConfig, {
    entry: {
      'finance-details': defaultConfig.entry,
    },
    output: {
      filename: "[name].[contenthash].js",
    },
    module: {
      rules: [
        {
          test: /\.svg$/,
          use: "file-loader",
        },
        {
          test: /\.scss$/i,
          use: ["style-loader", "css-loader", "sass-loader"],
        },
      ],
    },
    externals: ["react-router-dom", "formik", "yup"],
    plugins: [
      // Add any required environment variables eg api endpoint here
      new webpack.EnvironmentPlugin({
        APP_ENV: dotenv.APP_ENV || "development",
      }),
      new ImportMapWebpackPlugin({
        namespace: "@mtfh",
        basePath: process.env.APP_CDN || "http://localhost:9010",
      }),
    ],
  });
};
