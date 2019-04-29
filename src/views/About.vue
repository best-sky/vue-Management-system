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
      ],
      echartData2:[
        {
          name: "0",
          value: [0, 0]
        }
      ],
      xData:[]
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
      // // let myChart = echarts.init(document.getElementById("myChart"));
      for (var i = 0; i < 7; i++) {
        this.now = this.now + 1;
        this.echartData.push(this.randomData());
        this.echartData2.push(this.randomData());
        this.xData.push(this.now)
      }
      console.log(this.echartData)
      console.log(this.echartData2)
      this.myChart.setOption({
        title: {
          text: "亚低温监控系统",
          x: "center",
          y: "bottom"
        },
        tooltip: {
          trigger: "axis",
          // formatter: function(params) {
          //   params = params[0];
          //   var date = new Date(params.name);
          //   return params.value[1];
          // },
          // axisPointer: { animation: false }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: this.xData
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            name: "水温1",
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
            name: "水温2",
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
    //下拉改变
    getValue() {
      console.log(this.selectValue);
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
    this.drawLine();
    var _this = this
    this.timer = setInterval(() => {
      // let myChart = echarts.init(document.getElementById("myChart"));
      _this.now = _this.now + 1;
      if (_this.echartData.length < 8) {
        _this.echartData.push(this.randomData());
        _this.echartDat2.push(this.randomData2());
      } else {
        for (var i = 0; i < 1; i++) {
          _this.echartData.shift();
          _this.echartData2.shift();
          _this.xData.shift()
          _this.echartData.push(_this.randomData());
          _this.echartDat2.push(_this.randomData2());
          _this.xData.push(_this.now)
        }
      }
      console.log(_this.echartData)
      console.log(_this.echartData2)
      _this.myChart.setOption({
        series: [
          {
            name: "水温1",
            type: "line",
            showSymbol: true,
            hoverAnimation: false,
            //stack: '总量',
            data: _this.echartData,
            smooth: true,
            symbolSize: 8,
            itemStyle: {
              normal: {
                color: "red"
              }
            }
          },
          {
            name: "水温2",
            type: "line",
            showSymbol: true,
            hoverAnimation: false,
            data: _this.echartData2,
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
            data: _this.xData
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

