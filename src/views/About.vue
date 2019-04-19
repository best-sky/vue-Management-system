<template>
  <div class="about">
    <div id="myChartWrap">
    <!-- 这里是要渲染的图表 -->
    <div id="myChart"></div>
    </div>
  </div>
</template>
<script>
import echarts from "echarts";
export default {
  name: "echart",
  data() {
    return {
      now: 0,
      value: Math.random() * 1000,
      echartData: [
        {
          name: "0",
          value: [0, 0]
        }
      ]
    };
  },
  computed: {
    myChart () {
      console.log("生成myChart实例");
      return echarts.init(document.getElementById("myChart"));
    }
  },
  methods: {
    //设置图表的宽高
    setSize () {
      console.log("setSize被执行");
      let wrapWidth = document.getElementById("myChartWrap").clientWidth;
      let wrapHeight = document.getElementById("myChartWrap").clientHeight;
      this.myChart.resize({
        width: wrapWidth,
        height: wrapHeight
      });
    },
    drawLine() {
      // let myChart = echarts.init(document.getElementById("myChart"));
      for (var i = 0; i < 2; i++) {
        this.echartData.push(this.randomData());
      }
      this.myChart.setOption({
        title: {
          text: "亚低温监控系统"
        },
        tooltip: {
          trigger: "axis",
          formatter: function(params) {
            params = params[0];
            var date = new Date(params.name);
            return params.value[1];
          },
          axisPointer: { animation: false }
        },
        xAxis: {
          type: "value",
          boundaryGap: false
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            name: "模拟数据",
            type: "line",
            showSymbol: true,
            hoverAnimation: false,
            data: this.echartData,
            smooth: true,
            symbolSize:8,
            itemStyle:{
              normal:{
                color:'red'
              }
            },
          }
        ]
      });
    },
    randomData() {
      this.now = this.now + 1;
      this.value = this.value + Math.random() * 21 - 10;
      return {
        name: this.now.toString(),
        value: [this.now, Math.random() * 100]
      };
    }
  },
  mounted() {
    this.drawLine();
    this.timer = setInterval(() => {
      // let myChart = echarts.init(document.getElementById("myChart"));
      if (this.echartData.length < 8) {
        this.echartData.push(this.randomData());
      } else {
        for (var i = 0; i < 1; i++) {
          this.echartData.shift();
          this.echartData.push(this.randomData());
        }
      }
      this.myChart.setOption({
        series: [
          {
            name: "模拟数据",
            type: "line",
            showSymbol: true,
            hoverAnimation: false,
            //stack: '总量',
            data: this.echartData,
            smooth: true,
            symbolSize:8,
            itemStyle:{
              normal:{
                color:'orange'
              }
            },
          }
        ]
      });
      this.myChart.setOption({
        xAxis: [
          {
            type: "value",
            splitLine: { show: false },
            min: +this.echartData[0].name
          }
        ]
      });
    }, 5000);
    this.setSize();
    // 渲染图表
    // this.renderLine();
    // 添加监听事件，监听窗口变化，窗口一变，包裹层的宽高也就变了
    window.onresize = () => {
      //设置图表宽高
      this.setSize();
    };
  },
  destroyed(){
    clearInterval(this.timer);
  }
};
</script>
<style lang="less" scoped>
#myChartWrap {
  width: 100%;
  height: 55vh;
}
</style>

