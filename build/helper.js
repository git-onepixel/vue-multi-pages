const path = require('path');
const config = require('./config');
const pages = require('./pages.conf');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {

  createVueLoader(isProd) {
    const self = this;
    return {
      test: /\.vue$/,
      loader: 'vue-loader',
      options: {
        loaders: {
          css: ExtractTextPlugin.extract({
            fallback: 'vue-style-loader',
            use: self.getStyleLoaders(isProd),
          }),
        },
      },
    };
  },

  createStyleLoader(isProd) {
    const self = this;
    return {
      test: /\.(css|less)$/,
      use: ExtractTextPlugin.extract({
        fallback: 'vue-style-loader',
        use: self.getStyleLoaders(isProd),
      }),
    };
  },

  createImageLoader(filename) {
    return {
      test: /\.(png|jpe?g|gif|svg)$/,
      loader: 'url-loader',
      options: {
        limit: 8192,
        name: filename,
      },
    };
  },

  createFontLoader(filename) {
    return {
      test: /\.(woff2?|eot|ttf|otf)$/,
      loader: 'url-loader',
      options: {
        limit: 8192,
        name: filename,
      },
    };
  },

  getStyleLoaders(isProd) {
    const env = isProd ? 'build' : 'dev';
    const loaders = ['css-loader', 'postcss-loader', 'less-loader'];
    return loaders.map((loader) => {
      const options = {
        sourceMap: config[env].useSourceMap,
      };
      if (loader === 'css-loader' && isProd) {
        options.minimize = true;
      }
      return { loader, options };
    });
  },

  createPageEntries() {
    const entry = {};
    pages.forEach((page) => {
      const { name } = page;
      entry[name] = `./src/pages/${name}/${name}.js`;
    });
    return entry;
  },

  createHtmlWebpackPlugins(isProd) {
    const plugins = [];
    pages.forEach((page) => {
      const { name } = page;
      plugins.push(
        new HtmlWebpackPlugin({
          ...page,
          template: path.join(__dirname, '../public/index.html'),
          filename: `${name}.html`,
          inject: true,
          chunks: ['common', 'vendor', 'manifest', name],
          chunksSortMode: 'dependency',
          minify: {
            minifyJS: isProd,
            minifyCSS: isProd,
            removeComments: isProd,
            collapseWhitespace: isProd,
          },
        }),
      );
    });
    return plugins;
  },
};
