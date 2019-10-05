<template>
    <div class="me-about-view">
        this is about view
        <div>Url 参数：{{urlParams.name}}</div>
    </div>
</template>
<script>

import date from '@/utils/date';

date.dateFormat();

export default {
  data() {
    return {

    };
  },
};
</script>
<style lang="less" scoped>
    .me-about-view {
        color: green;
        text-align: center;
        line-height: 40px;
    }
</style>
