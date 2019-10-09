/**
 * @file dev configuration
 */

const webpack = require('webpack');
const merge = require('webpack-merge');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const baseWebpackConfig = require('./webpack.base.conf');
const config = require('./config');
const helper = require('./helper');

const assetsPath = (filename) => `${config.dev.assetsSubDirectory}/${filename}`;

module.exports = merge(baseWebpackConfig, {
  output: {
    publicPath: config.dev.assetsPublicPath,
    filename: assetsPath('js/[name].js'),
  },

  devtool: config.dev.useSourceMap ? config.dev.devtool : false,

  devServer: {
    hot: true,
    host: config.dev.host,
    port: process.env.PORT || config.dev.port,
    proxy: config.dev.proxyTable,
    quiet: true,
  },

  module: {
    rules: [
      helper.createVueLoader(false),
      helper.createStyleLoader(false),
      helper.createImageLoader(assetsPath('img/[name].[ext]')),
      helper.createFontLoader(assetsPath('fonts/[name].[ext]')),
    ],
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: config.dev.env,
      },
    }),

    new ExtractTextPlugin({
      filename: assetsPath('css/[name].css'),
    }),

    new FriendlyErrorsPlugin(),

    new webpack.HotModuleReplacementPlugin(),

    ...helper.createHtmlWebpackPlugins(false),
  ],
});
