/**
 * @file base configuration
 */

const path = require('path');
const webpack = require('webpack');
const config = require('../config');
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
        include: [path.join(__dirname, '../src')],
      },
    ],
  },

  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common',
      minChunks: config.entryChunks,
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
  ],
};
