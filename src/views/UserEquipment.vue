<template>
  <div class="EquipmentManagement">
    <div class="addManagement">
      <el-input class="searchInput" v-model="searchInput" placeholder="请输入设备ID"></el-input>
      <el-button type="primary" @click="search()">搜索</el-button>
    </div>
    <div class="table-content">
      <el-table :data="tableData" stripe style="width: 100%" @row-click="openDetails">
        <el-table-column prop="equipid" label="设备id" width="180" align="center"></el-table-column>
        <el-table-column prop="equipowner" label="设备分配客户" width="180" align="center"></el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button
              @click.stop="deleteRow(scope.$index, tableData)"
              type="primary"
              v-if="tableData[scope.$index].ifDelete == 1"
              size="small"
            >销毁设备</el-button>
            <el-button disabled type="primary" v-else size="small">销毁设备</el-button>
            <el-button
              @click.stop="recovery(scope.$index, tableData)"
              v-if="tableData[scope.$index].ifRecovery == 1"
              type="primary"
              size="small"
            >退回设备</el-button>
            <el-button disabled v-else type="primary" size="small">退回设备</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="dialog-add">
      <el-dialog title="增加设备" :visible.sync="dialogTableVisible">
        <el-radio-group v-model="radio">
          <el-radio :label="item.label" :key="item.label" v-for="item in radioData">{{item.label}}</el-radio>
        </el-radio-group>
        <div slot="footer" class="dialog-footer">
          <el-button @click="cancel()">取 消</el-button>
          <el-button type="primary" @click="sure()">确 定</el-button>
        </div>
      </el-dialog>
    </div>
    <div class="dialog-distribution">
      <el-dialog title="退回设备" :visible.sync="dialogDistribution">
        <el-radio-group v-model="userRadio">
          <el-radio
            :label="item.label"
            :key="index"
            v-for="(item,index) in userNameData"
          >{{item.label}}</el-radio>
        </el-radio-group>
        <div slot="footer" class="dialog-footer">
          <el-button @click="cancelDistribution()">取 消</el-button>
          <el-button type="primary" @click="sureDistribution()">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  name: "EquipmentManagement",
  data() {
    return {
      userName:"",
      radio: "",
      userRadio:"",
      //点选数组
      radioData: [],
      userNameData: [
      
      ],
      dialogTableVisible: false,
      dialogDistribution: false,
      searchInput: "",
      tableData: [],
      selectId:""
    };
  },
  methods: {
    search() {
      if (this.searchInput == "") {
        this.getList();
      } else {
        this.$axios
          .get("/equip/customerSearchEquip", {
            params: {
              equipId: this.searchInput,
              id:this.userName
            }
          })
          .then(res => {
            var arr = [];
            arr.push(res.data);
            this.tableData = arr;
          });
      }
    },
    //回收
    recovery(index, rows){
      this.dialogDistribution=true,
      this.selectId = rows[index].equipid
      this.$axios
        .get("/equip/getAdminList")
        .then(res => {
         this.userNameData = []
        for (var i = 0; i < res.data.length; i++) {
          var data = {
            label:res.data[i]
          }
          this.userNameData.push(data)
        }
        });
    },
    addManagement() {
      this.dialogTableVisible = true;
      this.radio = "";
      this.$axios.get("/equip/getOffEquip").then(res => {
        this.radioData = [];
        for (var i = 0; i < res.data.length; i++) {
          var data = {
            label:res.data[i]
          }
          this.radioData.push(data);
        }
      });
    },
    openDetails(row) {
      this.$router.push({path: '/new', query: {id:row.equipid}})
    },
    deleteRow(index, rows) {
      this.$axios
        .get("equip/delete", {
          params: {
            id: rows[index].equipid
          }
        })
        .then(res => {
          rows.splice(index, 1);
          this.getList();
        });
    },
    cancel() {
      this.dialogTableVisible = false;
    },
    sure() {
      this.dialogTableVisible = false;
      this.$axios.get("/equip/adminaddequip",{
        params: {
          id: this.userName,
          equipid:this.radio
        }
      }).then(res => {
        this.getList();
      });
    },
    // //分配机器
    // distribution(index, rows) {
    //   this.dialogDistribution = true;
    //   this.selectId = rows[index].equipid
    //   this.userRadio = "";
    //   this.$axios.get("/equip/getUserList").then(res => {
    //     this.userNameData = []
    //     for (var i = 0; i < res.data.length; i++) {
    //       var data = {
    //         label:res.data[i]
    //       }
    //       this.userNameData.push(data)
    //     }
    //   });
    // },
    cancelDistribution() {
      this.dialogDistribution = false;
    },
    sureDistribution(){
      this.dialogDistribution = false;
       this.$axios.get("/equip/equipCustomerReback",{
         params: {
          id: this.userRadio,
          equipid:this.selectId
        }
       }).then(res => {
        this.getList();
      });
    },
    getList() {
      this.$axios.get("/equip/equipCustomerList",{
        params: {
          id: this.userName
        }
      }).then(res => {
        this.tableData = res.data;
      });
    }
  },
  mounted() {
    this.userName = JSON.parse(localStorage.getItem("username"))
    this.getList();
  }
};
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
.el-radio {
  margin-bottom: 15px;
}
</style>