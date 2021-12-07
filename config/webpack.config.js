const path = require("path");
const fs = require("fs");

const { merge } = require("webpack-merge");
// @ts-ignore
const CopyPlugin = require("copy-webpack-plugin");
// @ts-ignore
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// @ts-ignore
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const express = require("express");

const {
  srcDir,
  distDir,
  utilsDir,
  entryDir,
  assetsDir,
  templatesDir,
  scriptsDir,
  componentsDir,
  uiComponentsDir,
  pagesDir,
  layoutsDir,
  typesDir,
  appsDir,
  configDir,
  apiDir,
  generatedWebPagesDir,
} = require("./paths");
const { generateStyleRules, generateScriptRules } = require("./generate-rules");

const isDev = process.env.NODE_ENV === "development";
const entryFiles = fs.readdirSync(entryDir);
const entryFileNameToPath = entryFiles.reduce((accum, currentFile) => {
  const fileName = currentFile.split(".")[0];
  // @ts-ignore
  accum[fileName] = path.join(entryDir, currentFile);
  return accum;
}, {});

const commonConfig = {
  entry: entryFileNameToPath,
  output: {
    path: distDir,
  },
  devtool: "source-map",
  resolve: {
    alias: {
      "@src": path.resolve(__dirname, "..", "src"),
      "@assets": assetsDir,
      "@templates": templatesDir,
      "@js": scriptsDir,
      "@utils": utilsDir,
      "@entry": entryDir,
      "@components": componentsDir,
      "@ui": uiComponentsDir,
      "@pages": pagesDir,
      "@layouts": layoutsDir,
      "@my-types": typesDir,
      "@apps": appsDir,
      "@styling": path.resolve(srcDir, "styling"),
      "@config": configDir,
      "@api": apiDir,
    },
    extensions: [".js", ".jsx", ".json", ".ts", ".tsx"],
  },
  module: {
    rules: [
      {
        test: /\.(png|svg|jpe?g|gif)$/,
        type: "asset/resource",
      },
      {
        test: /\.hbs$/,
        loader: "handlebars-loader",
        options: {
          precompileOptions: { knownHelpersOnly: false },
          helpersDirs: path.resolve(
            __dirname,
            "node_modules/handlebars-helpers/lib"
          ),
        },
      },
    ],
  },
  plugins: [
    new CopyPlugin({
      patterns: [{ from: "src/webpages/**/*.html", to: "[name].html" }],
    }),
  ],
};

const devConfig = {
  output: {
    filename: "[name].bundle.js",
  },
  devtool: "inline-source-map",
  devServer: {
    historyApiFallback: true,
    devMiddleware: {
      writeToDisk: true,
    },
    // static: distDir,
    static: [
      distDir,
      /*
      {
        directory: generatedWebPagesDir,
        publicPath: "/static",
      },
      */
    ],
    hot: true,
  },
  module: {
    rules: [...generateScriptRules(false), ...generateStyleRules(false)],
  },
  plugins: [new ReactRefreshWebpackPlugin()],
};
const prodConfig = {
  output: {
    filename: "[name].[contenthash].bundle.js",
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css",
    }),
  ],
  module: {
    rules: [...generateScriptRules(true), ...generateStyleRules(true)],
  },
  optimization: {
    minimizer: [new CssMinimizerPlugin()],
  },
};

const toMergeWithConfig = isDev ? devConfig : prodConfig;

// @ts-ignore
module.exports = merge(commonConfig, toMergeWithConfig);
