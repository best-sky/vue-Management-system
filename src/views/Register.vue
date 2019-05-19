<template>
  <div class="register">
    <div class="register">
      <h3>注册病人:</h3>
      <br>
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
    </div>
  </div>
</template>

<script>
export default {
  name: "register",
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
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$axios({
            url: "/data/register",
            method: "POST",
            data: {
              ID: this.ruleForm.id,
              Username: this.ruleForm.username,
              Password: this.ruleForm.password
            }
          }).then(res => {
            if (res.status == 200) {
              this.resetForm(formName);
            }
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