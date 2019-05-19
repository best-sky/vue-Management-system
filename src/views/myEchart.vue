<template>
  <div class="echart">
    <div id="select">
      <el-select v-model="selectValue" placeholder="请选择" @change="getValue()">
        <el-option v-for="item in options" :key="item.value" :value="item.value"></el-option>
      </el-select>
    </div>
    <div class="echart-table">
      <el-table :data="tableData" style="width: 100%" @row-click="openDetails">
        <el-table-column prop="iD" label="ID"></el-table-column>
        <el-table-column prop="waterT" label="水温"></el-table-column>
        <el-table-column prop="rugT" label="毯温"></el-table-column>
        <el-table-column prop="bodyT" label="体温"></el-table-column>
        <el-table-column prop="waterLevel" label="水位"></el-table-column>
        <el-table-column prop="comp" label="压缩机"></el-table-column>
        <el-table-column prop="heat" label="加热器"></el-table-column>
        <el-table-column :formatter="dateFormat" prop="date" label="添加时间"></el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
import echarts from "echarts";
import { timestampToTime } from "../utils/index.js";
export default {
  name: "echart",
  data() {
    return {
      options: [
      ],
      selectValue: "",
      tableData: []
    };
  },
  methods: {
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
    //表格删除事件
    deleteRow(index, rows) {
      rows.splice(index, 1);
    },
    openDetails() {
      alert(1);
    },
    //获取selectList的数据
    getSelectList() {
      this.$axios({
        url: "/patient/myself",
        method: "POST",
        data:{
          NameID:JSON.parse(localStorage.getItem("username"))
        }
      }).then(res => {
        if(res.status == 200){
          for(var i = 0;i<res.data.length;i++){
            var data = {
              value:res.data[i]
            }
            this.options.push(data)
          }
          this.selectValue = res.data[0]
          this.getValue()
        }
        console.log(res)
      });
    },
    //下拉改变
    getValue() {
      this.$axios({
        url: "/patient/myselfData",
        method: "POST",
        data:{
          NameID:JSON.parse(localStorage.getItem("username")),
          ID:this.selectValue
        }
      }).then(res => {
        if(res.status == 200){
          this.tableData = res.data
        }
      });
    },
  },
  mounted() {
    console.log(timestampToTime(1533293827000));
    this.getSelectList();
  }
};
</script>
<style lang="less" scoped>
#select {
  padding: 0 3%;
}
.echart-table {
  padding: 0 3%;
}
</style>

