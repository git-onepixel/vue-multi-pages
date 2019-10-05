<template>
    <div class="me-home-view">
        <Header />
        this is home view
        <div class="go" @click="goAbout">跳转</div>
        <Footer />
    </div>
</template>
<script>

import date from '@/utils/date';
import Header from '@/components/Header.vue';

date.dateFormat();

export default {

  components: {
    Header,
  },

  methods: {
    goAbout() {
      this.forward('about', {
        name: 'Alice',
      });
    },
  },
};
</script>
