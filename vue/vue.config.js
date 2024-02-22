const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const webpack = require('webpack')
module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/'
    : '/',
  devServer: {
    host: 'localhost',
    port: 8082
  },
  configureWebpack: {
    plugins: [/*new BundleAnalyzerPlugin(),*/ new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)]
  }
}
