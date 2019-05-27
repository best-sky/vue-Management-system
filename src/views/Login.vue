<template>
  <div class="bg">
    <div class="login-wrap animated flipInY">
      <el-tabs v-model="activeName">
        <el-tab-pane label="登录" name="first">
          <el-form ref="form" :model="form" :rules="rules" label-width="0px">
            <el-form-item prop="name">
              <el-input placeholder="用户名" v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input placeholder="密码" v-model="form.password" type="password"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="Login('form')">登录</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="注册" name="second">
          <el-form ref="register" :model="register" :rules="rules" label-width="0px">
            <el-form-item prop="id">
              <el-input placeholder="请输入id" v-model="register.id"></el-input>
            </el-form-item>
            <el-form-item prop="name">
              <el-input placeholder="请输入用户名" v-model="register.name"></el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input placeholder="请输入密码" v-model="register.password" type="password"></el-input>
            </el-form-item>
            <el-form-item>
              <el-radio v-model="register.sex" label="1">男</el-radio>
              <el-radio v-model="register.sex" label="2">女</el-radio>
            </el-form-item>
            <el-form-item prop="age">
              <el-input placeholder="请输入年龄" v-model="register.age"></el-input>
            </el-form-item>
            <el-form-item prop="phone">
              <el-input placeholder="请输入手机号" v-model="register.phone"></el-input>
            </el-form-item>
            <el-form-item prop="address">
              <el-input placeholder="请输入地址" v-model="register.address"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="userReg('register')">注册</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </div>
    <!-- 粒子漂浮物 -->
    <vue-particles
      color="#fff"
      :particleOpacity="0.7"
      :particlesNumber="30"
      shapeType="star"
      :particleSize="5"
      linesColor="#fff"
      :linesWidth="2"
      :lineLinked="true"
      :lineOpacity="0.4"
      :linesDistance="150"
      :moveSpeed="3"
      :hoverEffect="true"
      hoverMode="grab"
      :clickEffect="true"
      clickMode="push"
    ></vue-particles>
  </div>
</template>
<script>
export default {
  name: "Login",
  data() {
    return {
      activeName: "first",
      form: {
        name: "p0001",
        password: "123456"
      },
      register: {
        name: "",
        password: "",
        id: "",
        sex: "1",
        age: "",
        phone: "",
        address: ""
      },
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
      }
    };
  },
  created() {},
  methods: {
    //登录
    Login(formName) {
      var _this = this;
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$axios({
            url: "login",
            method: "POST",
            data: {
              loginName: this.form.name,
              password: this.form.password
            }
          }).then(res => {
            if(res.data.message == "success"){
              localStorage.setItem("username", JSON.stringify(this.form.name));
              if(res.data.role == "22"){
                sessionStorage.setItem("user", JSON.stringify("admin"));
                _this.$router.push({ path: "/UserManagement" });
              } else {
                sessionStorage.setItem("user", JSON.stringify("other"));
                _this.$router.push({ path: "/UserEquipment" });
              }
            } else {
              this.$message.error(res.data);
              this.form.name = "";
              this.form.password = ""
            }
          });
        } else {
          return false;
        }
      });
    },
    //注册
    userReg(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$axios
            .get("user/customeradd", {
              params: {
                id: this.register.id,
                username: this.register.name,
                password: this.register.password,
                sex: this.register.sex,
                age: this.register.age,
                phone: this.register.phone,
                address: this.register.address
              }
            })
            .then(res => {
                this.$message({
                  message: res.data,
                  type: "success"
                });
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>
<style scoped lang="less">
.bg {
  position: relative;
  overflow: hidden;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url("../assets/images/sky.jpg");
  background-position: -20% 10%;
  background-size: contain;
  #particles-js {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }
}
.login-wrap {
  width: 330px;
  border-radius: 5px;
  padding: 20px;
  z-index: 3;
  margin-right: -37%;
  background: #ffffff;
  .el-form-item {
    margin-bottom: 25px !important;
  }
  h3 {
    text-align: center;
    color: #ebedef;
    margin-top: 0px;
    margin-bottom: 5px;
    span {
      color: #20a0ff;
    }
  }
  form {
    margin-top: 25px;
    .el-form-item {
      margin-bottom: 15px;
    }
  }
  a {
    text-decoration: none;
    color: #1f2d3d;
  }
  button {
    width: 100%;
    font-weight: 600;
  }
}
</style>

