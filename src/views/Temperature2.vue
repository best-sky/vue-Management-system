<template>
    <div class="temperature2">
       <line-echart lineTitle1="体温1" lineTitle2="体温2"></line-echart>
    </div>
</template>

<script>
    import lineEchart from "../components/echarts.vue"
    export default {
        name:"temperature2",
        components: {
        lineEchart,
        }
    }
</script>

<style lang="less" scoped>

</style>