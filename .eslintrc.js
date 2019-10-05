module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: [
    'plugin:vue/essential',
    'airbnb-base',
  ],
  parser: 'vue-eslint-parser',
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: [
    'vue',
  ],
  rules: {
    'no-console': 0,
    'linebreak-style': 0,
    'import/no-extraneous-dependencies': 0,
    'import/order': 0,
  },
  settings: {
    'import/ignore': ['node_modules'],
    'import/resolver': {
      webpack: {
        config: './build/webpack.base.conf.js'
      }
    },
    'import/extensions': ['.js', '.vue']
  }
};
