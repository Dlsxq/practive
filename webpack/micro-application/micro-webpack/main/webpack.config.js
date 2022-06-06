const { merge } = require("webpack-merge");
const baseConf = require("../webpack.base.conf");
const { ModuleFederationPlugin } = require("webpack").container;
const ExternalTemplateRemotesPlugin = require("external-remotes-plugin");
const path = require("path");

// main
module.exports = merge(baseConf, {
  entry: "./index",
  devServer: {
    static: path.join(__dirname, "dist"),
    port: 3022,
    hot: true
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "main",
      remotes: {
        subapp: "subapp@http://192.168.1.100:3023/remoteEntry.js",
      },
      shared: { react: { singleton: true }, "react-dom": { singleton: true } },
    }),
    new ExternalTemplateRemotesPlugin(),

  ],
});
