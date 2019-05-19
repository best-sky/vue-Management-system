<template>
  <div class="myTable">
    <el-table :data="tableData" style="width: 100%" @row-click="openDetails">
      <el-table-column prop="iD" label="ID"></el-table-column>
      <el-table-column prop="username" label="病人ID"></el-table-column>
      <el-table-column fixed="right" label="操作" width="120">
        <template slot-scope="scope">
          <el-button
            @click.native.prevent="deleteRow(scope.$index, tableData)"
            type="text"
            size="small"
          >移除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "myTable",
  data() {
      return {
          tableData: []
      }
  },
  methods: {
    deleteRow(index, rows) {
      rows.splice(index, 1);
      console.log(rows)
      this.$axios({
        url: "/patient/delete",
        method: "POST",
        data:{
          NameID:rows[index].iD
        }
      }).then(res => {
        if (res.status == 200) {

        }
      });
    },
    getList() {
      this.$axios({
        url: "/patient/list",
        method: "POST"
      }).then(res => {
        if (res.status == 200) {
          this.tableData = res.data
        }
      });
    },
    openDetails(row) {
      this.$router.push({path: '/new2', query: {id:row.iD}})
    },
  },
  mounted(){
      this.getList();
  }
};
</script>

<style lang="less" scoped>
.myTable {
    padding: 30px 2%;
}
</style>