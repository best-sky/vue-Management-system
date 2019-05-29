<template>
  <div class="echart">
    <div id="myChartWrap">
      <!-- 这里是要渲染的图表 -->
      <div id="myChart"></div>
    </div>
    <div class="echart-table">
      <el-table :data="tableData" style="width: 100%" @row-click="openDetails">
        <el-table-column prop="iD" label="ID"></el-table-column>
        <el-table-column prop="waterT1" label="水温1"></el-table-column>
        <el-table-column prop="waterT2" label="水温2"></el-table-column>
        <el-table-column prop="rugRT" label="右毯温"></el-table-column>
        <el-table-column prop="bodyRT" label="右体温"></el-table-column>
        <el-table-column prop="rugLT" label="左毯温"></el-table-column>
        <el-table-column prop="bodyLT" label="左体温"></el-table-column>
        <el-table-column prop="waterLevel" label="水位"></el-table-column>
        <el-table-column prop="pumpL" label="左水泵"></el-table-column>
        <el-table-column prop="pumpR" label="右水泵"></el-table-column>
        <el-table-column prop="comp" label="压缩机"></el-table-column>
        <el-table-column prop="heat" label="加热器"></el-table-column>
        <el-table-column :formatter="dateFormat" prop="date" label="添加时间"></el-table-column>
      </el-table>
    </div>
    <!-- <div class="register">
      <h3>注册病人:</h3><br />
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="150px">
        <el-form-item label="请输入病人编号" prop="id">
          <el-input placeholder="病人ID不可重复" v-model="ruleForm.id" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="请输入名称" prop="username">
          <el-input v-model="ruleForm.username"></el-input>
        </el-form-item>
        <el-form-item label="请输入密码" prop="password">
          <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div> -->
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
      ruleForm: {
        id: "",
        username: "",
        password: ""
      },
      rules: {
        id: [{ required: true, message: "请输入id", trigger: "blur" }],
        username: [
          { required: true, message: "输入病人名称", trigger: "blur" }
        ],
        password: [{ required: true, message: "输入密码", trigger: "blur" }]
      },
      now: new Date(2019, 4, 7),
      value: Math.random() * 1000,
      oneDay: 24 * 3600 * 1000,
      oneHours: 3600 * 1000,
      data: [],
      data2: [],
      tableData: [],
      waterT1: [],
      waterT2: [],
      RunLT: [],
      RunRT: [],
      bodyLT: [],
      bodyRT: [],
      timeData: []
    };
  },
  computed: {
    myChart() {
      console.log("生成myChart实例");
      return echarts.init(document.getElementById("myChart"));
    }
  },
  methods: {
    //格式化日期
    dateFormat(row, column, cellValue, index) {
      const daterc = row[column.property];
      var date = new Date(daterc);
      var Y = date.getFullYear() + "-";
      var M =
        (date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1) + "-";
      var D =
        (date.getDate() < 10 ? "0" + date.getDate() : date.getDate()) + " ";
      var h =
        (date.getHours() < 10 ? "0" + date.getHours() : date.getHours()) + ":";
      var m =
        date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
      var s =
        date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
      return Y + M + D + h + m;
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    //表格删除事件
    deleteRow(index, rows) {
      rows.splice(index, 1);
    },
    //表格每一行点击
    openDetails(row) {
      this.$axios({
        url: "/data/OneData",
        method: "POST",
        data: {
          id: row.iD
        }
      }).then(res => {
        if (res.status == 200) {
          this.waterT1 = [];
          this.waterT2 = [];
          this.RunLT = [];
          this.RunRT = [];
          this.bodyLT = [];
          this.bodyRT = [];
          this.timeData = [];
          this.conductData(res.data);
          this.drawLine();
        }
      });
    },
    //图表接口
    getEchartData(){
      var id = this.$route.query.id
      this.$axios.get('/data/OneData',{
        params: {
          id: id
        }
      }).then(res => {
          this.tableData = res.data
          this.waterT1 = [];
          this.waterT2 = [];
          this.RunLT = [];
          this.RunRT = [];
          this.bodyLT = [];
          this.bodyRT = [];
          this.timeData = [];
          this.conductData(res.data);
          this.drawLine();
      });
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
    //图表参数配置
    drawLine() {
      // for (var i = 0; i < 2; i++) {
      //   this.echartData.push(this.randomData());
      //   this.echartData2.push(this.randomData2());
      // }
      // for (var i = 0; i < 24; i++) {
      //   this.data.push(this.randomData());
      //   this.data2.push(this.randomData2());
      // }
      this.myChart.setOption({
        title: {
          text: "时间坐标轴"
        },
        tooltip: {
          trigger: "axis"
        },
        legend: {
          data: ["水温1", "水温2", "毯温1", "毯温2", "体温1", "体温2"]
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: this.timeData
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            name: "水温1",
            type: "line",
            data: this.waterT1,
            itemStyle: {
              normal: {
                color: "red"
              }
            }
          },
          {
            name: "水温2",
            type: "line",
            data: this.waterT2,
            itemStyle: {
              normal: {
                color: "black"
              }
            }
          },
          {
            name: "毯温1",
            type: "line",
            data: this.RunLT,
            itemStyle: {
              normal: {
                color: "red"
              }
            }
          },
          {
            name: "毯温2",
            type: "line",
            data: this.RunRT,
            itemStyle: {
              normal: {
                color: "black"
              }
            }
          },
          {
            name: "体温1",
            type: "line",
            data: this.bodyLT,
            itemStyle: {
              normal: {
                color: "red"
              }
            }
          },
          {
            name: "体温2",
            type: "line",
            data: this.bodyRT,
            itemStyle: {
              normal: {
                color: "black"
              }
            }
          }
        ]
      });
    },
    //获取表格的数据
    getTableData() {
      this.$axios({
        url: "/data/newata",
        method: "POST"
      }).then(res => {
        if (res.status == 200) {
          this.tableData = res.data;
          this.$axios({
            url: "/data/OneData",
            method: "POST",
            data: {
              id: res.data[0].iD
            }
          }).then(res => {
            if (res.status == 200) {
              this.conductData(res.data);
              this.drawLine();
            }
          });
        }
      });
    },
    //处理图表数据
    conductData(data) {
      for (var i = 0; i < data.length; i++) {
        var data1 = {
          name: timestampToTime(data[i].date),
          value: [timestampToTime(data[i].date), data[i].waterT1]
        };
        var data2 = {
          name: timestampToTime(data[i].date),
          value: [timestampToTime(data[i].date), data[i].waterT2]
        };
        var data3 = {
          name: timestampToTime(data[i].date),
          value: [timestampToTime(data[i].date), data[i].rugLT]
        };
        var data4 = {
          name: timestampToTime(data[i].date),
          value: [timestampToTime(data[i].date), data[i].rugRT]
        };
        var data5 = {
          name: timestampToTime(data[i].date),
          value: [timestampToTime(data[i].date), data[i].bodyLT]
        };
        var data6 = {
          name: timestampToTime(data[i].date),
          value: [timestampToTime(data[i].date), data[i].bodyRT]
        };
        this.waterT1.push(data1.value[1]);
        this.waterT2.push(data2.value[1]);
        this.RunLT.push(data3.value[1]);
        this.RunRT.push(data4.value[1]);
        this.bodyLT.push(data5.value[1]);
        this.bodyRT.push(data6.value[1]);
        this.timeData.push(data1.name);
      }
      console.log(this.bodyRT);
    }
  },
  // created() {
  //   //检测select下拉变化
  //   window.addEventListener("setItem", () => {
  //     console.log(localStorage.getItem("selectData"));
  //   });
  // },
  mounted() {
    //this.getTableData();
    this.getEchartData()
    this.setSize();
    this.drawLine();
    // 添加监听事件，监听窗口变化，窗口一变，包裹层的宽高也就变了
    window.onresize = () => {
      //设置图表宽高
      this.setSize();
    };
  }
  // destroyed() {
  //   clearInterval(this.timer);
  // }
};
</script>
<style lang="less" scoped>
#myChartWrap {
  width: 100%;
  height: 55vh;
  position: relative;
}
.echart-table {
  padding: 0 1%;
}
.register {
  margin-top: 40px;
  width: 60%;
}
</style>

