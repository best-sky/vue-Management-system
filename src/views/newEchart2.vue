<template>
  <div class="echart">
    <div id="myChartWrap">
      <!-- 这里是要渲染的图表 -->
      <div id="myChart"></div>
    </div>
    <div class="echart-table">
      <el-table
        :data="tableData"
        style="width: 100%"
        @row-click="openDetails"
        >
        <el-table-column
          fixed
          prop="date"
          label="日期"
          width="150">
        </el-table-column>
        <el-table-column
          prop="name"
          label="姓名"
          width="120">
        </el-table-column>
        <el-table-column
          prop="province"
          label="省份"
          width="120">
        </el-table-column>
        <el-table-column
          prop="city"
          label="市区"
          width="120">
        </el-table-column>
        <el-table-column
          prop="address"
          label="地址"
          width="300">
        </el-table-column>
        <el-table-column
          prop="zip"
          label="邮编"
          width="120">
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="120">
          <template slot-scope="scope">
            <el-button
              @click.stop="deleteRow(scope.$index, tableData)"
              type="text"
              size="small">
              移除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
import echarts from "echarts";
import { timestampToTime } from "../utils/index.js";
export default {
  name: "echart",
  props: {
    lineTitle1: {
      type: String,
      default: "模拟数据1"
    },
    lineTitle2: {
      type: String,
      default: "模拟数据2"
    }
  },
  data() {
    return {
      now: new Date(2019,4,7),
      value: Math.random() * 1000,
      oneDay:24 * 3600 * 1000,
      oneHours:3600 * 1000,
      data: [],
      data2: [],
      tableData: [{
          date: '2016-05-03',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2016-05-02',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2016-05-04',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2016-05-01',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2016-05-08',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2016-05-06',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2016-05-07',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
      }]
    };
  },
  computed: {
    myChart() {
      console.log("生成myChart实例");
      return echarts.init(document.getElementById("myChart"));
    }
  },
  methods: {
    //表格删除事件
    deleteRow(index, rows) {
      rows.splice(index, 1);
    },
    openDetails(){
      alert(1)
    },
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
      // for (var i = 0; i < 2; i++) {
      //   this.echartData.push(this.randomData());
      //   this.echartData2.push(this.randomData2());
      // }
      for (var i = 0; i < 24; i++) {
            this.data.push(this.randomData());
            this.data2.push(this.randomData2())
        }
        console.log(this.data)
        console.log(this.data2)
      this.myChart.setOption({
         title: {
            text: '动态数据 + 时间坐标轴'
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                animation: false
            }
        },
        legend: {
            data:['模拟数据1','模拟数据2']
        },
        xAxis: {
            type: 'time',
            splitLine: {
                show: false
            },
            axisLabel:{
                show: true
            }
        },
         yAxis: {
            type: 'value',
            boundaryGap: [0, '100%'],
            splitLine: {
                show: false
            }
        },
        series: [
          {
            name: this.lineTitle1,
            type: "line",
            showSymbol: false,
            hoverAnimation: false,
            data:this.data,
            itemStyle: {
              normal: {
                color: "red"
              }
            }
          },
          {
            name: this.lineTitle2,
            type: "line",
            showSymbol: false,
            hoverAnimation: false,
            data:this.data2,
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
      this.now = new Date(+this.now + 3600*1000);
      this.value = this.value + Math.random() * 21 - 10;
      return {
        name: this.now.toString(),
        value: [
         this.now,
          Math.round(this.value)
        ]
      };
    },
    randomData2() {
      return {
        name: this.now.toString(),
        value: [
          this.now,
          Math.round(this.value+100)
        ]
      };
    },
  },
  created() {
    //检测select下拉变化
    window.addEventListener("setItem", () => {
      console.log(localStorage.getItem("selectData"));
    });
  },
  mounted() {
    console.log(timestampToTime(1533293827000));
    this.timer = setInterval(() => {
      // let myChart = echarts.init(document.getElementById("myChart"));
      for (var i = 0; i < 24; i++) {
            this.data.shift();
            this.data2.shift()
            this.data.push(this.randomData());
            this.data2.push(this.randomData2());
        }
      this.myChart.setOption({
        series: [
          {
            name: this.lineTitle1,
            type: "line",
            showSymbol: false,
            hoverAnimation: false,
            data:this.data,
            itemStyle: {
              normal: {
                color: "red"
              }
            }
          },
          {
            name: this.lineTitle2,
            type: "line",
            showSymbol: false,
            hoverAnimation: false,
            data:this.data2,
            itemStyle: {
              normal: {
                color: "black"
              }
            }
          }
        ]
      });
    }, 500000);
    this.setSize();
    this.drawLine()
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
.echart-table {
  padding: 0 3%;
}
</style>

