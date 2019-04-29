<template>
  <div class="echart">
    <div id="myChartWrap">
      <!-- 这里是要渲染的图表 -->
      <div id="myChart"></div>
    </div>
  </div>
</template>
<script>
import echarts from "echarts";
import {timestampToTime} from '../utils/index.js'
export default {
  name: "echart",
  props: {
    lineTitle1:{
      type:String,
      default:"水温1"
    },
    lineTitle2:{
      type:String,
      default:"水温2"
    },
  },
  data() {
    return {
      now: 0,
      value: Math.random() * 1000,
      echartData: [
        {
          name: "0",
          value: [0, 0]
        }
      ],
      echartData2:[
        {
          name: "0",
          value: [0, 0]
        }
      ]
    };
  },
  computed: {
    myChart() {
      console.log("生成myChart实例");
      return echarts.init(document.getElementById("myChart"));
    }
  },
  methods: {
    //设置图表的宽高
    setSize() {
      console.log("setSize被执行");
      let wrapWidth = document.getElementById("myChartWrap").clientWidth;
      let wrapHeight = document.getElementById("myChartWrap").clientHeight;
      this.myChart.resize({
        width: wrapWidth,
        height: wrapHeight
      });
    },
    drawLine() {
      for (var i = 0; i < 2; i++) {
        this.echartData.push(this.randomData());
        this.echartData2.push(this.randomData2());
      }
      this.myChart.setOption({
        title: {
          text: "亚低温监控系统",
          x: "center",
          y: "bottom"
        },
        tooltip: {
          trigger: "axis",
          axisPointer: { animation: false }
        },
        xAxis: {
          type: 'value',
          boundaryGap: false
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            name: this.lineTitle1,
            type: "line",
            showSymbol: true,
            hoverAnimation: false,
            data: this.echartData,
            smooth: true,
            symbolSize: 8,
            itemStyle: {
              normal: {
                color: "red"
              }
            }
          },
          {
            name: this.lineTitle2,
            type: "line",
            showSymbol: true,
            hoverAnimation: false,
            data: this.echartData2,
            smooth: true,
            symbolSize: 8,
            itemStyle: {
              normal: {
                color: "black"
              }
            }
          }
        ]
      });
    },
    randomData() {
      this.now = this.now +1
      this.value = this.value +Math.random()*21 -10
      return {
        name: this.now.toString(),
        value: [this.now, Math.random() * 100]
      };
    },
    randomData2() {
     return {
        name: this.now.toString(),
        value: [this.now, Math.random() * 100]
      };
    },
    //获取图表数据
    // getEchartsData(){
    //   this.$axios({
    //     url: "data/OneData",
    //     method: "POST",
    //     data:{
    //       id:this.selectValue
    //     }
    //   }).then(res => {
    //     if(res.status == 200){
    //       console.log(res)
    //     }
    //   });
    // }
  },
  mounted() {
    console.log(timestampToTime (1533293827000))
    this.drawLine();
    this.timer = setInterval(() => {
      // let myChart = echarts.init(document.getElementById("myChart"));
      if (this.echartData.length < 8) {
        this.echartData.push(this.randomData());
        this.echartData2.push(this.randomData2());
      } else {
        for (var i = 0; i < 1; i++) {
          this.echartData.shift();
          this.echartData2.shift();
          this.echartData.push(this.randomData());
          this.echartData2.push(this.randomData2());
        }
      }
      this.myChart.setOption({
        series: [
          {
            name: this.lineTitle1,
            type: "line",
            showSymbol: true,
            hoverAnimation: false,
            //stack: '总量',
            data: this.echartData,
            smooth: true,
            symbolSize: 8,
            itemStyle: {
              normal: {
                color: "red"
              }
            }
          },
          {
            name: this.lineTitle2,
            type: "line",
            showSymbol: true,
            hoverAnimation: false,
            data: this.echartData2,
            smooth: true,
            symbolSize: 8,
            itemStyle: {
              normal: {
                color: "black"
              }
            }
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
  destroyed() {
    clearInterval(this.timer);
  }
};
</script>
<style lang="less" scoped>
#myChartWrap {
  width: 100%;
  height: 55vh;
  position: relative;
}
</style>

