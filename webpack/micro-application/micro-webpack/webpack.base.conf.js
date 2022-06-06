const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
 
  output: {
    publicPath: "auto",
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: "babel-loader",
        exclude: /node_modules/,
        options: {
          presets: ["@babel/preset-react"],
        },
      },
    ],
  },

  plugins:[
    new HtmlWebpackPlugin({
      template: "../public/index.html",
    }),
  ]
  
};

