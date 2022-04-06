const webpack = require("webpack");
const { merge } = require("webpack-merge");
const configFactory = require("./webpack.config.js");



const { commonConf, getWebpackModuleConf, getWebpackResolver, getWebpackPlugins, getDevMizationAndCache } = configFactory("production");
process.env.NODE_ENV = process.env.ENV = "production";


const prodConf = {
  mode: "production"
  // mode: "development"
};

const webpackConfig = merge(
  commonConf,
  prodConf,
  getDevMizationAndCache(),
  getWebpackResolver(),
  getWebpackPlugins(),
  getWebpackModuleConf()
);
function prod() {

  let compile = webpack(webpackConfig);

  compile.run((_, result) => {

    let info = result.toJson({});

    if (result.hasErrors()) {
      console.log(result.toString({ colors: true }));
      return;
    }
    if (result.hasWarnings()) {
      console.warn(info.warnings);
      return;
    }

    console.log(result.toString({ colors: true }));
  });

}

prod();


module.exports = webpackConfig;