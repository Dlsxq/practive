import webpack from "webpack";
import { merge } from "webpack-merge";
import { commonConf, getWebpackModuleConf, getWebpackResolver, getWebpackPlugins, getDevMizationAndCache } from "./webpack.config.js";


const prodConf = {
  // mode: "production"
  mode: "development"
};

const defaultWebpackConfig = merge(
  commonConf,
  prodConf,
  getDevMizationAndCache(),
  getWebpackResolver(),
  getWebpackPlugins(false),
  getWebpackModuleConf(false)
);
function prod() {

  let compile = webpack(
    defaultWebpackConfig
  );

  compile.run((_, result) => {

    let info = result.toJson({});

    if (result.hasErrors()) {
      console.error(info.errors);
    }
    if (result.hasWarnings()) {
      console.warn(info.warnings);
      return;
    }

    console.log(result.toString({ colors: true }));
  });

}

prod();


export default defaultWebpackConfig;