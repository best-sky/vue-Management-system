<template>
  <div class="LeftNav">
    <el-col :span="24">
      <el-menu router
               :default-active="$route.path"
               class="el-menu-vertical-demo"
               background-color="#30363E"
               text-color="#a0aebc"
               active-text-color="#ffffff"
              >
          <el-menu-item index="/UserManagement" v-if="this.userName =='admin'">
            <i class="el-icon-document"></i>
            <span slot="title">客户管理</span>
          </el-menu-item>
          <el-menu-item index="/EquipmentManagement" v-if="this.userName =='admin'">
            <i class="el-icon-document"></i>
            <span slot="title">设备管理</span>
          </el-menu-item>
          <el-menu-item index="/register" v-if="this.userName =='admin'">
            <i class="el-icon-document"></i>
            <span slot="title">注册管理员</span>
          </el-menu-item>
          <el-menu-item index="/UserEquipment" v-if="this.userName !=='admin'">
            <i class="el-icon-document"></i>
            <span slot="title">设备管理</span>
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