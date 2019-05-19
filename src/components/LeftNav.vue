<template>
  <div class="LeftNav">
    <el-col :span="24">
      <el-menu router
               :default-active="$route.path"
               unique-opened
               class="el-menu-vertical-demo"
               background-color="#30363E"
               text-color="#a0aebc"
               active-text-color="#ffffff"
              >
          <!-- <el-menu-item index="/index">
            <i class="el-icon-document"></i>
            <span slot="title">水温</span>
          </el-menu-item>
          <el-menu-item index="/temperature">
            <i class="el-icon-document"></i>
            <span slot="title">毯温</span>
          </el-menu-item>
          <el-menu-item index="/temperature2">
            <i class="el-icon-document"></i>
            <span slot="title">体温</span>
          </el-menu-item> -->
          <el-menu-item index="/new" v-show="this.userName =='admin'">
            <i class="el-icon-document"></i>
            <span slot="title">总览</span>
          </el-menu-item>
          <el-menu-item index="/myTable" v-show="this.userName =='admin'">
            <i class="el-icon-document"></i>
            <span slot="title">病历</span>
          </el-menu-item>
          <el-menu-item index="/register" v-show="this.userName =='admin'">
            <i class="el-icon-document"></i>
            <span slot="title">注册病人</span>
          </el-menu-item>
          <el-menu-item index="/myEchart" v-show="this.userName !=='admin'">
            <i class="el-icon-document"></i>
            <span slot="title">我的病例</span>
          </el-menu-item>
      </el-menu>
    </el-col>
  </div>
</template>

<script>
export default {
  name: "LeftNav",
  data () {
    return {
      userName:''
    };
  },
  methods: {
    
  },
  mounted(){
    this.userName = JSON.parse(sessionStorage.getItem("user"))
  }
};
</script>
<style >
.LeftNav {
  float: left;
  width: 160px;
  height: 100%;
  background: #30363E;
  z-index: 10;
}
.LeftNav .el-submenu .el-menu-item {
  height: 50px;
  line-height: 50px;
  padding: 0 45px;
  min-width: 160px;
}
.LeftNav .el-menu {
  border-right: none;
  list-style: none;
  position: relative;
  margin: 0;
  padding-left: 0;
}
.LeftNav .el-menu li.is-active {
  background: #409EFF !important;
}
</style>