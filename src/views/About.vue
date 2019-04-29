<template>
  <div class="Temperature">
    <line-echart lineTitle1="水温1" lineTitle2="水温2"></line-echart>
  </div>
</template>

<script>
  import lineEchart from "../components/echarts.vue"
  export default {
    name:"temperature",
    components: {
      lineEchart,
    }
  }
</script>

<style lang="less" scoped>

</style>