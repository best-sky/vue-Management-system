<template>
  <div class="EquipmentManagement">
    <div class="addManagement">
      <el-input class="searchInput"
                v-model="searchInput"
                placeholder="请输入设备ID"></el-input>
      <el-button type="primary"
                 @click="search()">搜索</el-button>
      <el-button type="primary"
                 @click="addManagement()">增加设备</el-button>
    </div>
    <div class="table-content">
      <el-table :data="tableData"
                stripe
                style="width: 100%"
                @row-click="openDetails">
        <el-table-column prop="date"
                         label="日期"
                         width="180"
                         align='center'>
        </el-table-column>
        <el-table-column prop="name"
                         label="姓名"
                         width="180"
                         align='center'>
        </el-table-column>
        <el-table-column prop="address"
                         label="地址"
                         align='center'>
        </el-table-column>
        <el-table-column label="操作"
                         align='center'>
          <template slot-scope="scope">
            <el-button @click.stop="deleteRow(scope.$index, tableData)"
                       type="primary"
                       size="small">
              销毁设备
            </el-button>
            <el-button @click.stop="deleteRow(scope.$index, tableData)"
                       type="primary"
                       size="small">
              回收设备
            </el-button>
            <el-button @click.stop="distribution(scope.$index, tableData)"
                       type="primary"
                       size="small">
              分配设备
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="dialog-add">
      <el-dialog title="增加设备"
                 :visible.sync="dialogTableVisible">
        <el-radio-group v-model="radio">
          <el-radio :label="item.label"
                    :key="item.label"
                    v-for="item in radioData">{{item.label}}</el-radio>
        </el-radio-group>
        <div slot="footer"
             class="dialog-footer">
          <el-button @click="cancel()">取 消</el-button>
          <el-button type="primary"
                     @click="sure()">确 定</el-button>
        </div>
      </el-dialog>
    </div>
    <div class="dialog-distribution">
      <el-dialog title="分配设备"
                 :visible.sync="dialogDistribution">
        <el-radio-group v-model="radio">
          <el-radio :label="item.label"
                    :key="item.label"
                    v-for="item in userNameData">{{item.label}}</el-radio>
        </el-radio-group>
        <div slot="footer"
             class="dialog-footer">
          <el-button @click="cancelDistribution()">取 消</el-button>
          <el-button type="primary"
                     @click="sureDistribution()">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  name: "EquipmentManagement",
  data () {
    return {
      radio: "",
      //点选数组
      radioData: [
        {
          label: "00001",
          value: "00001"
        },
        {
          label: "000011",
          value: "000011"
        },
        {
          label: "00002",
          value: "00002"
        },
      ],
      userNameData: [
        {
          label: "admin1",
          value: "admin1"
        },
        {
          label: "admin2",
          value: "admin2"
        },
        {
          label: "admin3",
          value: "admin3"
        },
      ],
      dialogTableVisible: false,
      dialogDistribution:false,
      searchInput: "",
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄',
        isdel: false,
        isRecycle: true
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄',
        isdel: true,
        isRecycle: false
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄',
        isdel: false,
        isRecycle: true
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄',
        isdel: false,
        isRecycle: true
      }]
    }
  },
  methods: {
    search () {
      alert("搜索")
    },
    addManagement () {
      this.dialogTableVisible = true
      this.radio = ""
    },
    openDetails (row) {
      //this.$router.push({path: '/new2', query: {id:row.iD}})
      alert("设备详情")
    },
    deleteRow (index, rows) {
      //rows.splice(index, 1);
      alert(1)
    },
    cancel () {
      this.dialogTableVisible = false
    },
    sure () {
      this.dialogTableVisible = false
      console.log(this.radio)
    },
    //分配机器
    distribution(){
      this.dialogDistribution = true
    },
    cancelDistribution(){
      this.dialogDistribution = false
    }
  },
}
</script>

<style lang="less" scoped>
.EquipmentManagement {
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