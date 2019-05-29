<template>
  <div class="register">
    <div class="register">
      <h3>注册管理员:</h3>
      <br>
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="150px">
        <el-form-item label="请输入id" prop="id">
          <el-input placeholder="ID不可重复" v-model="ruleForm.id" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="请输入名称" prop="username">
          <el-input v-model="ruleForm.username"></el-input>
        </el-form-item>
        <el-form-item label="请输入密码" prop="password">
          <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="请输入手机号" prop="phone">
          <el-input type="text" v-model="ruleForm.phone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="请输入年龄" prop="age">
          <el-input v-model="ruleForm.age" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="请输入地址" prop="address">
          <el-input v-model="ruleForm.address" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-radio v-model="ruleForm.sex" label="1">男</el-radio>
          <el-radio v-model="ruleForm.sex" label="2">女</el-radio>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "register",
  data() {
    return {
      ruleForm: {
        name: "",
        password: "",
        id: "",
        sex: "1",
        age: "",
        phone: "",
        address: ""
      },
      rules: {
        id: [{ required: true, message: "请输入id", trigger: "blur" }],
        username: [
          { required: true, message: "输入管理员名称", trigger: "blur" }
        ],
        password: [{ required: true, message: "输入密码", trigger: "blur" }],
        age: [{ required: true, message: "请输入年龄", trigger: "blur" }],
        phone: [{ required: true, message: "输入手机号", trigger: "blur" }],
        address: [{ required: true, message: "输入地址", trigger: "blur" }]
      }
    };
  },
  methods: {
    //提交注册
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$axios
            .get("/user/adminadd", {
              params: {
                id: this.ruleForm.id,
                username: this.ruleForm.username,
                password: this.ruleForm.password,
                sex: this.ruleForm.sex,
                age: this.ruleForm.age,
                phone: this.ruleForm.phone,
                address: this.ruleForm.address
              }
            })
            .then(res => {
                this.$message({
                  message: res.data.message,
                  type: "success"
                });
                this.resetForm()
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>

<style lang="less" scoped>
.register {
  margin-top: 40px;
  width: 60%;
}
</style>