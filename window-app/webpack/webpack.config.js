const { resolve, dirname } = require("path");
const ESLintPlugin = require("eslint-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

const { DefinePlugin } = webpack;



const dirResolve = src => resolve(dirname("."), src);
const { ESBuildMinifyPlugin } = require('esbuild-loader');
const provateAssign = Object.assign.bind(Object);

module.exports = function config(ENV) {
  const isDev = ENV === "development";
  const isProd = ENV === "production";

  const commonConf = {
    entry: {
      // shared: ["react", "react-dom", "lodash"],
      main: "./src/index.ts"
      // react: "react",
      // reactDOM: "react-dom",
      // lodash: "lodash",
      // main: {
      //   import: "./src/index.ts",
      //   dependOn: ["react", "reactDOM", "lodash"]
      // }
    },
    output: {
      path: dirResolve("out"),
      filename: "js/[name].[hash:6].js",
      clean: true,
      assetModuleFilename: "assets/[name].[hash:8][ext]",
      chunkFilename: "static/js/[name].[contenthash:8].chunk.js"
    },
    infrastructureLogging: {
      level: 'none',
    },
    performance: false,
    // publicPath:"./"
  };


  const getWebpackResolver = () => {

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




  const getWebpackPlugins = () => {

    let plugins = [
      new ESLintPlugin({
        extensions: ["ts", "tsx", "jsx", "js"],
        fix: true
      }),
      new HtmlWebpackPlugin(provateAssign(
        {
          template: "./public/index.html"
        },
        isProd && {
          minify: {
            removeComments: true,
            collapseWhitespace: true,
            removeRedundantAttributes: true,
            useShortDoctype: true,
            removeEmptyAttributes: true,
            removeStyleLinkTypeAttributes: true,
            keepClosingSlash: true,
            minifyJS: true,
            minifyCSS: true,
            minifyURLs: true,
          },
        }
      )),
      new DefinePlugin({
        DEV: true
      })
    ];
    if (isProd) {
      plugins.push(new MiniCssExtractPlugin({
        filename: 'style/[name].[contenthash:8].css',
        chunkFilename: 'style/[name].[contenthash:8].chunk.css',
        experimentalUseImportModule: true,
      }));
    }
    if (isDev) {
      plugins.push(new ForkTsCheckerWebpackPlugin({
        async: true,
        context: process.cwd(),
        diagnosticOptions: {
          syntactic: true,
        },
        mode: 'write-references',
        issue: {
          include: [
            { file: '../**/src/**/*.{ts,tsx}' },
            { file: '**/src/**/*.{ts,tsx}' },
          ],
          exclude: [
            { file: 'node_modules/**/*.{ts,tsx}' },
          ],
        },
        logger: {
          infrastructure: 'silent',
        },
      }));
    }

    return {
      plugins
    };
  };




  const getWebpackModuleConf = () => {
    let loaders = [
      {
        test: /\.css$/i,
        exclude: /node_modules/,
        use: [
          isDev ? "style-loader" : MiniCssExtractPlugin.loader,
          "css-loader"
        ],
        sideEffects: true,
      },
      {
        test: /\.less$/i,
        exclude: /node_modules/,
        use: [
          isDev ? "style-loader" : MiniCssExtractPlugin.loader,
          "css-loader",
          "less-loader"
        ],
        sideEffects: true,
      },
      {
        test: /\.(js|ts|jsx|tsx)$/i,
        exclude: /node_modules/,
        loader:"babel-loader",

        // loader: 'esbuild-loader',
        // options: {
        //   loader: "tsx",
        //   target: "es2015",
        

        //   // tsconfigRaw: require('../tsconfig.json')
        // },
      },
      // {

      //   test: /\.(png|jpg)/i,
      //   use: [
      //     {
      //       loader: 'file-loader',
      //       options: {
      //         name: '[name].[hash:6].[ext]',
      //         outputPath: 'assets',
      //       },
      //     }
      //   ],
      //   type:"typescript/auto"


      // }
    ];
    return {
      module: {
        rules: loaders
      }
    };
  };
  /* 
     
  
  
  */


  const getDevMizationAndCache = () => {
    return {
      cache: {
        type: 'filesystem',
        store: 'pack',
      },
      optimization: {
        minimize: isProd,
        minimizer: [
        
          new TerserPlugin({
            test: /\.(js|jsx|ts|tsx)/i,
            // include:"./src",
            // exclude:"node_modules",
            // parallel:4,
            // extractComments: false,
            // minify: TerserPlugin.esbuildMinify,
            terserOptions: {
              parse: {
                ecma: 8,
              },
              compress: {
                ecma: 5,
                warnings: false,
                comparisons: false,
                inline: 2,
              },
              mangle: {
                safari10: true,
              },
              output: {
                comments: false,
              },
            },
          }),
          new CssMinimizerPlugin(),
        ],
        runtimeChunk: 'single',
        usedExports: true,
        splitChunks: {
          chunks: 'all',
          //   cacheGroups: {
          //     vendor: {
          //       test: /[\\/]node_modules[\\/]/,
          //       priority: 10,
          //       reuseExistingChunk: true,
          //     }
          //   }
        }
      }
    };
  };


  return {
    getDevMizationAndCache, getWebpackModuleConf, getWebpackPlugins, getWebpackResolver, commonConf
  };
};




