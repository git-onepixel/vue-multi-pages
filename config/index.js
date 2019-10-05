/**
 * @file configuration.
 */

const path = require('path');
const pages = require('./pages.json');

module.exports = {

  entryChunks: pages.length,

  dev: {
    host: '0.0.0.0',
    env: JSON.stringify('development'),
    port: 8080,
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {},
    useSourceMap: true,
    devtool: '#cheap-module-eval-source-map',
  },

  build: {
    env: JSON.stringify('production'),
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    useSourceMap: false,
    devtool: '#source-map',
  },
};
