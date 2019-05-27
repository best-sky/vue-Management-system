<template>
  <div class="myTable">
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="name" label="设备名称"></el-table-column>
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
    getList() {
      var id = this.$route.query.id
      this.$axios
        .get("/equip/customerGetEquip", {
          params: {
            id: id
          }
        })
        .then(res => {
           for(var i=0;i<res.data.length;i++){
               var data = {
                   name:res.data[i]
               }
               this.tableData.push(data)
            }
        });
    }
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