const path = require("path");
const fs = require("fs");

// @ts-ignore
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// @ts-ignore
const HtmlWebpackPlugin = require("html-webpack-plugin");

const { webpageDir } = require("./paths");

// @ts-ignore
const generateCssModuleLoaderRule = (importLoaders, cssModules) => {
  const config = {
    loader: "css-loader",
    options: {
      importLoaders,
      /*
      modules: {
        localIdentName: "[path][name]__[local]--[hash:base64:5]",
      },
      */
    },
  };

  if (cssModules) {
    config.options.modules = {
      localIdentName: "[path][name]__[local]--[hash:base64:5]",
    };
  }

  return config;
};

module.exports = {
  generateDevWebpageRules: () => {
    const webpageNames = fs.readdirSync(webpageDir);
    return webpageNames.map((pageName) => {
      return new HtmlWebpackPlugin({
        template: path.join(webpageDir, pageName),
      });
    });
  },
  // @ts-ignore
  generateScriptRules: (isProd) => {
    const presets = ["env", "react", "typescript"].map(
      (suffix) => `@babel/preset-${suffix}`
    );
    const plugins = ["react-refresh/babel"];

    // @ts-ignore
    const generateRule = (
      test,
      presets,
      plugins = [],
      custom = {
        babelPresetsLevel: [],
        babelPluginsLevel: [],
        babelOptionsLevel: {},
        useLevel: {},
        baseLevel: {},
      }
    ) => {
      return {
        test,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              ...presets,
              // ...(custom?.babelPresetsLevel || [])
            ],
            plugins: [
              ...plugins,
              // ...(custom?.babelPluginsLevel || []),
            ],
            // ...(custom?.babelOptionsLevel || {}),
          },
          // ...(custom?.useLevel || {}),
        },
        // ...(custom?.baseLevel || {}),
      };
    };
    // console.log([...presets.slice(0, 3), !isProd && presets[3]].filter(Boolean));
    return [
      generateRule(/\.js$/, presets.slice(0, 1), []),
      generateRule(
        /\.jsx$/,
        [...presets.slice(0, 2)],
        // [!isProd && presets[0]].filter(Boolean)
      ),
      generateRule(/\.ts$/, [presets[0], presets[2]], []),
      generateRule(
        /\.tsx$/,
        [...presets.slice(0, 3)],
        // [!isProd && plugins[0]].filter(Boolean)
      ),
    ];
  },
  // @ts-ignore
  generateStyleRules: (isProd) => {
    // @ts-ignore
    const generateUse = (forCSSModules = false, moreLoaders = []) => [
      isProd ? MiniCssExtractPlugin.loader : "style-loader",
      generateCssModuleLoaderRule(moreLoaders.length, forCSSModules),
      ...moreLoaders,
    ];
    // @ts-ignore
    const generateRule = (ext, moreLoaders = []) => {
      const regularStyleRegex = new RegExp(`\\.${ext}$`, "i");
      const cssModuleRegex = new RegExp(`\\.module\\.${ext}$`, "i");
      return [
        {
          test: regularStyleRegex,
          use: generateUse(false, moreLoaders),
          exclude: cssModuleRegex,
        },
        {
          test: cssModuleRegex,
          use: generateUse(true, moreLoaders),
        },
      ];
    };
    return [
      ...generateRule("css"),
      ...generateRule("less", ["less-loader"]),
      ...generateRule("scss", ["resolve-url-loader", "sass-loader"]),
    ];
  },
};
