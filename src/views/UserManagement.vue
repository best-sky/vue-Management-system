<template>
  <div class="userManagement">
    <div class="add-btn">
      <el-input class="searchInput" v-model="searchInput" placeholder="请输入客户ID"></el-input>
      <el-button type="primary" @click="search()">搜索</el-button>
      <el-button type="primary" @click="addUser()">增加客户</el-button>
    </div>
    <div class="table-content">
      <el-table :data="tableData" style="width: 100%" @row-click="openDetails">
        <el-table-column prop="id" label="ID"></el-table-column>
        <el-table-column prop="username" label="用户名"></el-table-column>
        <el-table-column prop="phone" label="手机号码"></el-table-column>
        <el-table-column prop="equipNum" label="设备数量"></el-table-column>
        <el-table-column prop="address" label="地址"></el-table-column>
        <el-table-column fixed="right" label="操作" width="120">
          <template slot-scope="scope">
            <el-button
              @click.stop="deleteRow(scope.$index, tableData)"
              type="primary"
              size="small"
              v-if="tableData[scope.$index].equipNum == 0"
            >删除</el-button>
            <el-button disabled type="primary" size="small" v-else>删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="dialog">
      <el-dialog title="增加客户" :visible.sync="dialogFormVisible">
        <el-form :model="form" ref="form" :rules="rules">
          <el-form-item label="用户名" :label-width="formLabelWidth" prop="name">
            <el-input v-model="form.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="密码" :label-width="formLabelWidth" prop="password">
            <el-input v-model="form.password" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="ID" :label-width="formLabelWidth" prop="name">
            <el-input v-model="form.id" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="年龄" :label-width="formLabelWidth" prop="password">
            <el-input v-model="form.age" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="手机号" :label-width="formLabelWidth" prop="name">
            <el-input v-model="form.phone" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="地址" :label-width="formLabelWidth" prop="password">
            <el-input v-model="form.address" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="性别" :label-width="formLabelWidth" prop="password">
            <el-radio v-model="form.sex" label="1">男</el-radio>
            <el-radio v-model="form.sex" label="2">女</el-radio>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="cancel()">取 消</el-button>
          <el-button type="primary" @click="sure()">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  name: "userManagement",
  data() {
    return {
      form: {
        name: "",
        password: "",
        id: "",
        sex: "1",
        age: "",
        phone: "",
        address: ""
      },
      formLabelWidth: "120px",
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
        ],
        id: [
          {
            required: true,
            message: "请输入id",
            trigger: "blur"
          }
        ],
        age: [
          {
            required: true,
            message: "请输入年龄",
            trigger: "blur"
          }
        ],
        phone: [
          {
            required: true,
            message: "请输入手机号",
            trigger: "blur"
          }
        ],
        address: [
          {
            required: true,
            message: "请输入地址",
            trigger: "blur"
          }
        ]
      },
      tableData: [
        // {
        //   id: "001",
        //   username: "王小虎1"
        // },
        // {
        //   id: "002",
        //   username: "王小虎2"
        // },
        // {
        //   id: "003",
        //   username: "王小虎3"
        // },
        // {
        //   id: "004",
        //   username: "王小虎4"
        // }
      ]
    };
  },
  methods: {
    deleteRow(index, rows) {
      rows.splice(index, 1);
      this.$axios
        .get("/user/delete", {
          params: {
            id: rows[index].id
          }
        })
        .then(res => {
          console.log(res);
        });
    },
    getList() {
      this.$axios.get("/user/customlook").then(res => {
        this.tableData = res.data;
      });
    },
    openDetails(row) {
      // this.$router.push({path: '/new2', query: {id:row.iD}})
    },
    //增加客户
    addUser() {
      this.dialogFormVisible = true;
      this.resetForm();
    },
    search() {
      if (this.searchInput == "") {
        this.getList();
      } else {
        this.$axios
          .get("/user/search", {
            params: {
              id: this.searchInput
            }
          })
          .then(res => {
            var arr = [];
            arr.push(res.data);
            this.tableData = arr;
            console.log(this.tableData);
          });
      }
    },
    sure() {
      this.$axios
        .get("user/customeradd", {
          params: {
            id: this.form.id,
            username: this.form.name,
            password: this.form.password,
            sex: this.form.sex,
            age: this.form.age,
            phone: this.form.phone,
            address: this.form.address
          }
        })
        .then(res => {
          this.dialogFormVisible = false;
          
            this.$message({
              message: res.data,
              type: "success"
            });
            this.getList();
        });
    },
    cancel() {
      (this.dialogFormVisible = false), this.resetForm();
    },
    //重置
    resetForm() {
      this.$refs["form"].resetFields();
    }
  },
  mounted() {
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