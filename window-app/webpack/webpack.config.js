import { resolve, dirname } from "path";
import ESLintPlugin from "eslint-webpack-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import webpack from "webpack";
import MiniCss from "mini-css-extract-plugin";

const { DefinePlugin } = webpack;

export const dirResolve = src => resolve(dirname("."), src);

export const commonConf = {
  entry: {
    main: "./src/index.ts"
  },
  output: {
    path: dirResolve("out"),
    filename: "js/[name].js",
    clean: true,
  }
};

export const getWebpackResolver = () => {

  let alias = {
    "~": dirResolve("./src"),
    "~events": dirResolve("./src/events")
  };

  let resolver = {
    resolve: {
      alias,
      enforceExtension: false,
      extensions: [".ts", ".tsx", ".js", ".jsx", ".json"]
    }
  };

  return resolver;
};


export const getWebpackPlugins = (isDev = true) => {

  let plugins = [
    new ESLintPlugin({
      // eslintPath: "./src",
      extensions: ["ts", "tsx", "jsx", "js"],
      fix: true
    }),
    new HtmlWebpackPlugin({
      title: "Windown-App",
      template:"./public/index.html"
      // templateContent: `<div id="bootstrap"></div>`
      
    }),
    new DefinePlugin({
      DEV: true
    })
  ];

  if (!isDev) {
    plugins.push(new MiniCss({
      filename: "style/main.css",
      experimentalUseImportModule: true,
    }));
  }

  return {
    plugins
  };
};

export const getWebpackLoader = (isDev = true) => {

  return [
    {
      test: /\.css$/i,
      exclude: /node_modules/,
      use: [
        isDev ? "style-loader" : MiniCss.loader,
        "css-loader"
      ]
    },
    {
      test: /\.less$/i,
      exclude: /node_modules/,
      use: [
        isDev ? "style-loader" : MiniCss.loader,
        "css-loader",
        "less-loader"
      ]
    },
    {
      test: /\.ts$/i,
      exclude: /node_modules/,
      use: [
        "ts-loader"
      ]
    },
    {
      test: /\.tsx$/i,
      exclude: /node_modules/,
      use: [
        "ts-loader"
      ]
    },
    {
      test:/\.(png|jpg)/i,
      exclude: /node_modules/,
      use: [
        "file-loader"
      ]
    }
  ];
};


export const getWebpackModuleConf = (isDev) => {
  let loaders = getWebpackLoader(isDev);

  return {
    module: {
      rules: loaders
    }
  };
};


export const getDevMizationAndCache = () => {
  return {
    cache: true,
    optimization: {
      runtimeChunk: 'single',
      splitChunks: {
        chunks: 'all',
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            priority: 10,
            reuseExistingChunk: true,
          }
        }
      }
    }
  };
};