/**
 * @file base configuration
 */

const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const pages = require('./pages.conf');
const helper = require('./helper');

module.exports = {
  entry: helper.createPageEntries(),

  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      vue$: 'vue/dist/vue.esm.js',
      '@': path.join(__dirname, '../src'),
    },
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        exclude: /node_modules/,
      },
    ],
  },

  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common',
      minChunks: pages.length,
    }),

    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks(module) {
        return (
          module.resource
          && /\.js$/.test(module.resource)
          && module.resource.indexOf(
            path.join(__dirname, '../node_modules'),
          ) === 0
        );
      },
      chunks: ['common'],
    }),

    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      chunks: Infinity,
    }),

    new CopyWebpackPlugin([{
      from: 'public',
    }], {
      ignore: ['*.html'],
    }),
  ],
};
