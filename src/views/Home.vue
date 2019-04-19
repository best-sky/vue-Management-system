<template>
  <div class="content">
    <div class="header">
      <el-col :span="21" class="header-left">
        <img src="../assets/images/logo.png" alt="">
        <span>亚低温监控系统</span>
      </el-col>
      <el-col :span="3"
              class="userinfo">
        <el-dropdown trigger="hover">
          <span class="el-dropdown-link userinfo-inner"><img src="../assets/images/icon.jpg" />{{this.name}}</span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>我的消息</el-dropdown-item>
            <el-dropdown-item>设置</el-dropdown-item>
            <el-dropdown-item divided
                              @click.native="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-col>
    </div>
    <div class="main-content">
      <left-nav></left-nav>
      <div class="right-content">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import LeftNav from '@/components/LeftNav.vue'

export default {
  name: 'home',
  data () {
    return {
      name: "管理员",
    }
  },
  components: {
    LeftNav
  },
  methods: {
    //退出登录
    logout: function () {
      var _this = this;
      this.$confirm('确认退出吗?', '提示', {
      }).then(() => {
        sessionStorage.removeItem('user');
        _this.$router.push('/login');
      }).catch(() => {

      });
    },
  },
}
</script>
<style lang="less" scoped>
.content {
  position: absolute;
  top: 0px;
  bottom: 0px;
  width: 100%;
}
.header {
  z-index: 20;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 65px;
  background: #3B3F4F;
  /*	min-width: 1024px;*/
}
.header .el-dropdown {
  float: right;
  margin-right: 20px;
}
.userinfo {
  float: right;
}
.userinfo span {
  color: #ffffff;
  display: block;
  line-height: 65px;
  cursor: pointer;
  float: left;
  margin-right: 10px;
}
.userinfo img {
  width: 40px;
  height: 40px;
  border-radius: 20px;
  margin: 10px;
  float: left;
}
.header-left span {
  line-height: 65px;
  color: #ffffff;
  padding-left: 20px;
  vertical-align: middle;
}
.header-left img{
  vertical-align: middle;
  margin-left: 20px;
}
.main-content {
  overflow: hidden;
  width: 100%;
  height: 100%;
  padding-top: 65px;
}

.right-content {
  margin-left: 160px;
  padding: 20px;
  overflow-y: auto;
  height: 100%;
}
</style>

