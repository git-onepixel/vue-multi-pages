import Vue from 'vue';
import FastClick from 'fastclick';
import querystring from 'querystring';
import 'babel-polyfill';
import '@/styles/base.less';

FastClick.attach(document.body);

class Page {
  constructor(component) {
    this.component = component;
    this.addMixin();
  }

  addMixin() {
    const mixins = this.component.mixins || [];

    mixins.push({
      data() {
        return {
          urlParams: querystring.parse(window.location.search.substr(1)),
        };
      },
      methods: {
        forward(pageName, params) {
          const url = `${pageName}.html?${querystring.stringify(params)}`;
          window.location.href = url;
        },
      },
    });

    this.component.mixins = mixins;
  }

  run() {
    return new Vue({
      el: '#app',
      render: (h) => h(this.component),
    });
  }
}

export default Page;
