const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const linkfile = require('./lib/linkfile')

let DefinePluginConfig = {
  'process.env.dir': `"${process.env.currentdir}"`,
  'process.env.file': `"${process.env.file}"`
}

DefinePluginConfig['process.env.uuid'] = process.env.list !== 'false' ? `"${process.env.uuid}"` : '""'

module.exports = {
  mode: "development",
  entry: { index: path.resolve(__dirname, "template", "index.js") },
  devServer: {
    contentBase: './template',
    compress: true,
    port: process.env.port
  },
  module: {
    rules: [
      {
        test: /\.md$/,
        use: [
          {
            loader: "html-loader"
          },
          path.resolve(__dirname, './loader/markdown-loader')
        ]
      },
      {
        test: /\.(png|jpg|gif|jpeg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 50000,
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "template", "index.html")
    }),
    new webpack.DefinePlugin(DefinePluginConfig)
  ]
};