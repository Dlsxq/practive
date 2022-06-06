const { ModuleFederationPlugin } = require('webpack').container;
const path = require('path');
const { merge } = require("webpack-merge");
const baseConf = require("../webpack.base.conf");


// child
module.exports = merge(baseConf,{
  entry: './index',
  mode: 'development',
  devServer: {
    static: path.join(__dirname, 'dist'),
    port: 3023,
  },
 
  plugins: [
    // To learn more about the usage of this plugin, please visit https://webpack.js.org/plugins/module-federation-plugin/
    new ModuleFederationPlugin({
      name: 'subapp',
      filename: 'remoteEntry.js',
      exposes: {
        './child': './index',
      },
      shared: { react: { singleton: true }, 'react-dom': { singleton: true } },
    }),
  
  ],
});