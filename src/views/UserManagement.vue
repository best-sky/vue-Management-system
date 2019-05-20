<template>
  <div class="userManagement">
    <div class="add-btn">
      <el-input class="searchInput"
                v-model="searchInput"
                placeholder="请输入客户ID"></el-input>
      <el-button type="primary"
                 @click="search()">搜索</el-button>
      <el-button type="primary"
                 @click="addUser()">增加客户</el-button>
    </div>
    <div class="table-content">
      <el-table :data="tableData"
                style="width: 100%"
                @row-click="openDetails">
        <el-table-column prop="id"
                         label="ID"></el-table-column>
        <el-table-column prop="username"
                         label="用户名"></el-table-column>
        <el-table-column fixed="right"
                         label="操作"
                         width="120">
          <template slot-scope="scope">
            <el-button @click.stop="deleteRow(scope.$index, tableData)"
                       type="primary"
                       size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="dialog">
      <el-dialog title="增加客户"
                 :visible.sync="dialogFormVisible">
        <el-form :model="form"
                  ref="form"
                 :rules="rules">
          <el-form-item label="用户名"
                        :label-width="formLabelWidth" prop="name">
            <el-input v-model="form.name"
                      autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="密码"
                        :label-width="formLabelWidth" prop="password">
            <el-input v-model="form.password"
                      autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer"
             class="dialog-footer">
          <el-button @click="cancel()">取 消</el-button>
          <el-button type="primary"
                     @click="sure()">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  name: "userManagement",
  data () {
    return {
      form: {
        name: '',
        password: ''
      },
      formLabelWidth: '120px',
      dialogFormVisible: false,
      searchInput: "",
      rules: {
        name: [
          {
            required: true,
            message: "请输入用户名",
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur"
          }
        ]
      },
      tableData: [{
        id: '001',
        username: '王小虎1'
      }, {
        id: '002',
        username: '王小虎2'
      }, {
        id: '003',
        username: '王小虎3'
      }, {
        id: '004',
        username: '王小虎4'
      }]
    }
  },
  methods: {
    deleteRow (index, rows) {
      rows.splice(index, 1);
      console.log(rows)
      // this.$axios({
      //   url: "/patient/delete",
      //   method: "POST",
      //   data:{
      //     NameID:rows[index].iD
      //   }
      // }).then(res => {
      //   if (res.status == 200) {

      //   }
      // });
    },
    getList () {
      // this.$axios({
      //   url: "/patient/list",
      //   method: "POST"
      // }).then(res => {
      //   if (res.status == 200) {
      //     this.tableData = res.data
      //   }
      // });
    },
    openDetails (row) {
      // this.$router.push({path: '/new2', query: {id:row.iD}})
    },
    //增加客户
    addUser () {
      this.dialogFormVisible = true
      this.resetForm()
    },
    search () {
      alert("搜索")
    },
    sure(){
      this.dialogFormVisible = false
    },
    cancel(){
      this.dialogFormVisible = false,
      this.resetForm()
    },
    //重置
    resetForm() {
      this.$refs['form'].resetFields();
    }
  },
  mounted () {
    this.getList();
  }
};
</script>

<style lang="less" scoped>
.userManagement {
  padding: 30px 2%;
}
.table-content {
  margin-top: 20px;
}
.searchInput {
  width: 300px;
  margin-right: 10px;
}
</style>