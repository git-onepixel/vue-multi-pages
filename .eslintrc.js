module.exports = {
  root: true, 
  extends: [
    'vue-recommend',
  ],
  rules: {
     
  },
  settings: {
    'import/resolver': {
      webpack: {
        config: './build/webpack.base.conf.js'
      }
    },
  }
};
