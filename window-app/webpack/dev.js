import webpack from "webpack";
import WebpackDevServer from "webpack-dev-server";
import { merge } from "webpack-merge";
import { commonConf, getWebpackModuleConf, getWebpackResolver, getWebpackPlugins, getDevMizationAndCache } from "./webpack.config.js";

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
      historyApiFallback: true
    }
  );

  server.start();


}


devServer();

export default devConfig;