<template>
  <div class="LeftNav">
    <el-col :span="24">
      <el-menu router
               default-active="/index"
               unique-opened
               class="el-menu-vertical-demo"
               background-color="#30363E"
               text-color="#a0aebc"
               active-text-color="#ffffff"
               @open="handleOpen"
               @close="handleClose">
        <el-menu-item index="/index">
          <i class="el-icon-document"></i>
          <span slot="title">数据</span>
        </el-menu-item>
        <el-menu-item index="/message">
          <i class="el-icon-document"></i>
          <span slot="title">关于</span>
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
      
    };
  },
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath);
    }
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