const webpack = require("webpack");
const WebpackDevServer = require("webpack-dev-server");
const { merge } = require("webpack-merge");

const configFactory = require("./webpack.config.js");



const { commonConf, getWebpackModuleConf, getWebpackResolver, getWebpackPlugins, getDevMizationAndCache } = configFactory("production");

const devConfig = merge(
  commonConf,
  { mode: "development", devtool: "eval-cheap-module-source-map" },
  // ⑦cheap-module-souce-map（生产环境下的最佳选择）
  getDevMizationAndCache(),
  getWebpackPlugins(),
  getWebpackResolver(),
  getWebpackModuleConf()
);

function devServer() {

  let compiler = webpack(devConfig);

  const server = new WebpackDevServer(
    compiler,
    {
      compress: true,
      port: 8090,
      client: {
        logging: "error",
        progress: false
      },
      hot: true,
      historyApiFallback: true,
      // static:
    }
  );

  server.start();
}


devServer();

// export default devConfig;