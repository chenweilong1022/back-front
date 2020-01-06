<template>
  <div class="app-container">
    <div class="filter-container">
      <el-form ref="filterForm" :inline="true" size="mini" label-width="70px">
        <el-form-item>
          <el-form-item label="渠道">
            <el-select v-model="filterForm.channel" placeholder="请选择平台">
              <el-option
                v-for="item in accountregisterchannelOptions"
                :key="item.key"
                :label="item.value"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="渠道分类">
            <el-select v-model="filterForm.accounchannelClassify" placeholder="请选择渠道分类">
              <el-option
                v-for="item in accounchannelclassifyOptions"
                :key="item.key"
                :label="item.value"
                :value="item.key">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-input style="width: 100px" v-model="filterForm.agentUserId" placeholder="推广id"/>
          </el-form-item>
          <el-form-item>
            <el-date-picker
              @change="dateChange"
              v-model="value6"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              value-format="yyyy-MM-dd"
              :picker-options="pickerOptions2">
            </el-date-picker>
          </el-form-item>
          <el-button type="primary" icon="el-icon-search" class="btn-form" @click="query">查询</el-button>
          <el-button type="primary"  class="btn-form" @click="resetListForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div class="box-card-div">
      <el-card class="box-card">
        <div>
          注册数:<span>{{tblRecordChannelGeneralizeTotalVo.newUser}}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          注册充值:<span>{{tblRecordChannelGeneralizeTotalVo.newUsersRechargeNumber}}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          注册充值比: <span>{{tblRecordChannelGeneralizeTotalVo.newUserRechargeRatio}}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          注册充值金额:<span>{{tblRecordChannelGeneralizeTotalVo.newUserRecharge}}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          总充值金额: <span>{{tblRecordChannelGeneralizeTotalVo.todayRecharge}}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          总兑换金额:<span>{{tblRecordChannelGeneralizeTotalVo.todayConversion}}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          总客损金额:<span>{{tblRecordChannelGeneralizeTotalVo.rechargePoor}}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        </div>
      </el-card>
    </div>

    <el-table
      v-loading="listLoading"
      :data="list"
      size="mini"
      border
      fit

      highlight-current-row>
      <!--<el-table-column align="center" label="id">-->
        <!--<template slot-scope="scope">-->
          <!--{{ scope.row.id }}-->
        <!--</template>-->
      <!--</el-table-column>-->
      <el-table-column align="center" label="渠道">
        <template slot-scope="scope">
          {{ scope.row.channel }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="日期">
        <template slot-scope="scope">
          {{ scope.row.currentDates }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="推广id">
        <template slot-scope="scope">
          {{ scope.row.agentUserId }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="新户">
        <template slot-scope="scope">
          {{ scope.row.newUser }}
        </template>
      </el-table-column>
      <!--<el-table-column align="center" label="新设备">-->
        <!--<template slot-scope="scope">-->
          <!--{{ scope.row.newEquipment }}-->
        <!--</template>-->
      <!--</el-table-column>-->
      <el-table-column align="center" label="新户游戏">
        <template slot-scope="scope">
          {{ scope.row.newUserGame }}
        </template>
      </el-table-column>
      <!--<el-table-column align="center" label="新设备游戏">-->
        <!--<template slot-scope="scope">-->
          <!--{{ scope.row.newEquipmentGame }}-->
        <!--</template>-->
      <!--</el-table-column>-->
      <el-table-column align="center" label="新户游戏比">
        <template slot-scope="scope">
          {{ scope.row.newUserGameRatio }}
        </template>
      </el-table-column>
      <!--<el-table-column align="center" label="新设备游戏比">-->
        <!--<template slot-scope="scope">-->
          <!--{{ scope.row.newEquipmentGameRatio }}-->
        <!--</template>-->
      <!--</el-table-column>-->
      <el-table-column align="center" label="活跃用户">
        <template slot-scope="scope">
          {{ scope.row.activeUsers }}
        </template>
      </el-table-column>
      <!--<el-table-column align="center" label="活跃设备">-->
        <!--<template slot-scope="scope">-->
          <!--{{ scope.row.activeEquipment }}-->
        <!--</template>-->
      <!--</el-table-column>-->
      <el-table-column align="center" label="新充(人)">
        <template slot-scope="scope">
          {{ scope.row.newUserRecharge }}({{ scope.row.newUsersRechargeNumber }})
        </template>
      </el-table-column>
      <!--<el-table-column align="center" label="新用户充值人数">-->
        <!--<template slot-scope="scope">-->
          <!--{{ scope.row.newUsersRechargeNumber }}-->
        <!--</template>-->
      <!--</el-table-column>-->
      <el-table-column align="center" label="新充比">
        <template slot-scope="scope">
          {{ scope.row.newUserRechargeRatio }}
        </template>
      </el-table-column>
      <!--<el-table-column align="center" label="新用户机器比例">-->
        <!--<template slot-scope="scope">-->
          <!--{{ scope.row.newUserEquipmentRatio }}-->
        <!--</template>-->
      <!--</el-table-column>-->
      <el-table-column align="center" label="新兑(人)">
        <template slot-scope="scope">
          {{ scope.row.newUserConversion }}({{ scope.row.newUserConversionNumber }})
        </template>
      </el-table-column>
      <el-table-column align="center" label="新充值差">
        <template slot-scope="scope">
          {{ scope.row.newUserRechargePoor }}
        </template>
      </el-table-column>
      <!--<el-table-column align="center" label="新用户兑换人">-->
        <!--<template slot-scope="scope">-->
          <!--{{ scope.row.newUserConversionNumber }}-->
        <!--</template>-->
      <!--</el-table-column>-->
      <el-table-column align="center" label="今充(人)">
        <template slot-scope="scope">
          {{ scope.row.todayRecharge }}({{ scope.row.todayRechargeNumber }})
        </template>
      </el-table-column>
      <!--<el-table-column align="center" label="今日充值人数">-->
        <!--<template slot-scope="scope">-->
          <!--{{ scope.row.todayRechargeNumber }}-->
        <!--</template>-->
      <!--</el-table-column>-->
      <el-table-column align="center" label="今兑(人)">
        <template slot-scope="scope">
          {{ scope.row.todayConversion }}({{ scope.row.todayConversionNumber }})
        </template>
      </el-table-column>
      <!--<el-table-column align="center" label="今日兑换人数">-->
        <!--<template slot-scope="scope">-->
          <!--{{ scope.row.todayConversionNumber }}-->
        <!--</template>-->
      <!--</el-table-column>-->
      <el-table-column align="center" label="今日充兑(人)比" width="110">
        <template slot-scope="scope">
          {{ scope.row.todayRechargeConversionRatio }}({{ scope.row.todayRechargeConversionRatioNumber }})
        </template>
      </el-table-column>
      <!--<el-table-column align="center" label="今日充值兑换人数比例">-->
        <!--<template slot-scope="scope">-->
          <!--{{ scope.row.todayRechargeConversionRatioNumber }}-->
        <!--</template>-->
      <!--</el-table-column>-->
      <el-table-column align="center" label="充值差">
        <template slot-scope="scope">
          {{ scope.row.rechargePoor }}
        </template>
      </el-table-column>
      <!--<el-table-column align="center" label="创建时间">-->
        <!--<template slot-scope="scope">-->
          <!--{{ scope.row.createTime }}-->
        <!--</template>-->
      <!--</el-table-column>-->
      <!--<el-table-column align="center" label="删除标志">-->
        <!--<template slot-scope="scope">-->
          <!--{{ scope.row.isDel }}-->
        <!--</template>-->
      <!--</el-table-column>-->

      <!--<el-table-column align="center" label="管理">-->
        <!--<template slot-scope="scope">-->
          <!--<el-button icon="el-icon-edit" type="text" size="mini" @click="showEditPage(scope.row)">编辑</el-button>-->
          <!--<el-button icon="el-icon-delete" type="text" style="color: red;" size="mini" @click="removeData(scope.row)">删除</el-button>-->
        <!--</template>-->
      <!--</el-table-column>-->
    </el-table>

    <div class="pagination-container">
      <el-pagination :current-page.sync="filterForm.pageNo" :page-sizes="[10,20,30, 50]" :page-size="filterForm.pageSize" :total="listTotal" background layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange" @current-change="handleCurrentChange"/>
    </div>

    <el-dialog :visible.sync="dialogNewOrEditVisible" :title="newFlag | dialogTitle" width="600px">
      <el-form ref="dataForm" :model="data" :rules="dataRule" label-width="100px">
        <el-form-item label="渠道" prop="channel">
          <el-input v-model="data.channel" placeholder="渠道"/>
        </el-form-item>
        <el-form-item label="日期" prop="currentDates">
          <el-input v-model="data.currentDates" placeholder="日期"/>
        </el-form-item>
        <el-form-item label="推广id" prop="agentUserId">
          <el-input v-model="data.agentUserId" placeholder="推广id"/>
        </el-form-item>
        <el-form-item label="新用户" prop="newUser">
          <el-input v-model="data.newUser" placeholder="新用户"/>
        </el-form-item>
        <el-form-item label="新设备" prop="newEquipment">
          <el-input v-model="data.newEquipment" placeholder="新设备"/>
        </el-form-item>
        <el-form-item label="新用户游戏" prop="newUserGame">
          <el-input v-model="data.newUserGame" placeholder="新用户游戏"/>
        </el-form-item>
        <el-form-item label="新设备游戏" prop="newEquipmentGame">
          <el-input v-model="data.newEquipmentGame" placeholder="新设备游戏"/>
        </el-form-item>
        <el-form-item label="新用户游戏比" prop="newUserGameRatio">
          <el-input v-model="data.newUserGameRatio" placeholder="新用户游戏比"/>
        </el-form-item>
        <el-form-item label="新设备游戏比" prop="newEquipmentGameRatio">
          <el-input v-model="data.newEquipmentGameRatio" placeholder="新设备游戏比"/>
        </el-form-item>
        <el-form-item label="活跃用户" prop="activeUsers">
          <el-input v-model="data.activeUsers" placeholder="活跃用户"/>
        </el-form-item>
        <el-form-item label="活跃设备" prop="activeEquipment">
          <el-input v-model="data.activeEquipment" placeholder="活跃设备"/>
        </el-form-item>
        <el-form-item label="新用户充值" prop="newUserRecharge">
          <el-input v-model="data.newUserRecharge" placeholder="新用户充值"/>
        </el-form-item>
        <el-form-item label="新用户充值人数" prop="newUsersRechargeNumber">
          <el-input v-model="data.newUsersRechargeNumber" placeholder="新用户充值人数"/>
        </el-form-item>
        <el-form-item label="新用户充值比例" prop="newUserRechargeRatio">
          <el-input v-model="data.newUserRechargeRatio" placeholder="新用户充值比例"/>
        </el-form-item>
        <el-form-item label="新用户机器比例" prop="newUserEquipmentRatio">
          <el-input v-model="data.newUserEquipmentRatio" placeholder="新用户机器比例"/>
        </el-form-item>
        <el-form-item label="新用户兑换" prop="newUserConversion">
          <el-input v-model="data.newUserConversion" placeholder="新用户兑换"/>
        </el-form-item>
        <el-form-item label="新用户兑换人" prop="newUserConversionNumber">
          <el-input v-model="data.newUserConversionNumber" placeholder="新用户兑换人"/>
        </el-form-item>
        <el-form-item label="今日充值" prop="todayRecharge">
          <el-input v-model="data.todayRecharge" placeholder="今日充值"/>
        </el-form-item>
        <el-form-item label="今日充值人数" prop="todayRechargeNumber">
          <el-input v-model="data.todayRechargeNumber" placeholder="今日充值人数"/>
        </el-form-item>
        <el-form-item label="今日兑换" prop="todayConversion">
          <el-input v-model="data.todayConversion" placeholder="今日兑换"/>
        </el-form-item>
        <el-form-item label="今日兑换人数" prop="todayConversionNumber">
          <el-input v-model="data.todayConversionNumber" placeholder="今日兑换人数"/>
        </el-form-item>
        <el-form-item label="今日充值兑换比例" prop="todayRechargeConversionRatio">
          <el-input v-model="data.todayRechargeConversionRatio" placeholder="今日充值兑换比例"/>
        </el-form-item>
        <el-form-item label="今日充值兑换人数比例" prop="todayRechargeConversionRatioNumber">
          <el-input v-model="data.todayRechargeConversionRatioNumber" placeholder="今日充值兑换人数比例"/>
        </el-form-item>
        <el-form-item label="充值差" prop="rechargePoor">
          <el-input v-model="data.rechargePoor" placeholder="充值差"/>
        </el-form-item>
        <el-form-item label="创建时间" prop="createTime">
          <el-input v-model="data.createTime" placeholder="创建时间"/>
        </el-form-item>
        <el-form-item label="删除标志" prop="isDel">
          <el-input v-model="data.isDel" placeholder="删除标志"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button icon="el-icon-close" @click="dialogNewOrEditVisible = false">取消</el-button>
        <el-button :loading="saveBtnLoading" type="primary" @click="savetblrecordchannelgeneralize"><svg-icon icon-class="save" style="margin-right: 5px;"/>保存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'tblrecordchannelgeneralize',
  filters: {
    dialogTitle(newFlag) {
      if (newFlag) {
        return '添加'
      } else {
        return '编辑'
      }
    }
  },
  data() {
    return {
      tblRecordChannelGeneralizeTotalVo: {},
      value6: '',
      pickerOptions2: {
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近三个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
            picker.$emit('pick', [start, end]);
          }
        }]
      },
      accountregisterchannelOptions: [],
      accounchannelclassifyOptions: [],
      filterForm: {
        enabled: 1,
        pageNo: 1,
        pageSize: 10,
        searchKey: '',
        recordchannelgeneralizebuttons: null,
        channel: '',
        accounchannelClassify: null,
        agentUserId: null,
        startTime: null,
        endTime: null
      },
      list: null,
      listLoading: false,
      listTotal: 0,
      data: {
        id: 0,
        channel: '',
        currentDates: '',
        agentUserId: '',
        newUser: '',
        newEquipment: '',
        newUserGame: '',
        newEquipmentGame: '',
        newUserGameRatio: '',
        newEquipmentGameRatio: '',
        activeUsers: '',
        activeEquipment: '',
        newUserRecharge: '',
        newUsersRechargeNumber: '',
        newUserRechargeRatio: '',
        newUserEquipmentRatio: '',
        newUserConversion: '',
        newUserConversionNumber: '',
        newUserRechargePoor: '',
        todayRecharge: '',
        todayRechargeNumber: '',
        todayConversion: '',
        todayConversionNumber: '',
        todayRechargeConversionRatio: '',
        todayRechargeConversionRatioNumber: '',
        rechargePoor: '',
        createTime: '',
        isDel: ''
      },
      dataRule: {
        channel: [
          { required: true, message: '渠道不能为空', trigger: 'blur' }
        ],
        currentDates: [
          { required: true, message: '日期不能为空', trigger: 'blur' }
        ],
        agentUserId: [
          { required: true, message: '推广id不能为空', trigger: 'blur' }
        ],
        newUser: [
          { required: true, message: '新用户不能为空', trigger: 'blur' }
        ],
        newEquipment: [
          { required: true, message: '新设备不能为空', trigger: 'blur' }
        ],
        newUserGame: [
          { required: true, message: '新用户游戏不能为空', trigger: 'blur' }
        ],
        newEquipmentGame: [
          { required: true, message: '新设备游戏不能为空', trigger: 'blur' }
        ],
        newUserGameRatio: [
          { required: true, message: '新用户游戏比不能为空', trigger: 'blur' }
        ],
        newEquipmentGameRatio: [
          { required: true, message: '新设备游戏比不能为空', trigger: 'blur' }
        ],
        activeUsers: [
          { required: true, message: '活跃用户不能为空', trigger: 'blur' }
        ],
        activeEquipment: [
          { required: true, message: '活跃设备不能为空', trigger: 'blur' }
        ],
        newUserRecharge: [
          { required: true, message: '新用户充值不能为空', trigger: 'blur' }
        ],
        newUsersRechargeNumber: [
          { required: true, message: '新用户充值人数不能为空', trigger: 'blur' }
        ],
        newUserRechargeRatio: [
          { required: true, message: '新用户充值比例不能为空', trigger: 'blur' }
        ],
        newUserEquipmentRatio: [
          { required: true, message: '新用户机器比例不能为空', trigger: 'blur' }
        ],
        newUserConversion: [
          { required: true, message: '新用户兑换不能为空', trigger: 'blur' }
        ],
        newUserConversionNumber: [
          { required: true, message: '新用户兑换人不能为空', trigger: 'blur' }
        ],
        todayRecharge: [
          { required: true, message: '今日充值不能为空', trigger: 'blur' }
        ],
        todayRechargeNumber: [
          { required: true, message: '今日充值人数不能为空', trigger: 'blur' }
        ],
        todayConversion: [
          { required: true, message: '今日兑换不能为空', trigger: 'blur' }
        ],
        todayConversionNumber: [
          { required: true, message: '今日兑换人数不能为空', trigger: 'blur' }
        ],
        todayRechargeConversionRatio: [
          { required: true, message: '今日充值兑换比例不能为空', trigger: 'blur' }
        ],
        todayRechargeConversionRatioNumber: [
          { required: true, message: '今日充值兑换人数比例不能为空', trigger: 'blur' }
        ],
        rechargePoor: [
          { required: true, message: '充值差不能为空', trigger: 'blur' }
        ],
        createTime: [
          { required: true, message: '创建时间不能为空', trigger: 'blur' }
        ],
        isDel: [
          { required: true, message: '删除标志不能为空', trigger: 'blur' }
        ]
      },
      dialogNewOrEditVisible: false,
      newFlag: true,
      saveBtnLoading: false
    }
  },
  mounted() {
    this.query()
    this.accountregisterchannel()
    this.accounchannelclassify()
  },
  methods: {
    dateChange() {
      this.filterForm.startTime = this.value6[0]
      this.filterForm.endTime = this.value6[1]
    },
    accountregisterchannel() {
      this.$store.dispatch('Accountregisterchannel', this.filterForm ).then(resp => {
        this.accountregisterchannelOptions = resp.data
      }).catch(() => {
      })
    },
    accounchannelclassify() {
      this.$store.dispatch('Accounchannelclassify', this.filterForm ).then(resp => {
        this.accounchannelclassifyOptions = resp.data
      }).catch(() => {
      })
    },
    query() {
      this.listLoading = true
      this.$store.dispatch('Listtblrecordchannelgeneralize', this.filterForm ).then(resp => {
        this.list = resp.data.tblRecordChannelGeneralizeEntities
        this.tblRecordChannelGeneralizeTotalVo = resp.data.tblRecordChannelGeneralizeTotalVo
        console.log(this.tblRecordChannelGeneralizeTotalVo)
        this.listTotal = resp.totalCount
        this.listLoading = false
      }).catch(() => {
        this.listLoading = false
      })
    },
    showNewPage() {
      this.newFlag = true
      this.resetForm()
      this.data = {}
      this.dialogNewOrEditVisible = true
    },
    showEditPage(data) {
      this.newFlag = false
      this.data = Object.assign({}, data)
      this.dialogNewOrEditVisible = true
    },
    savetblrecordchannelgeneralize() {
      this.$refs['dataForm'].validate(valid => {
        if (valid) {
          this.$confirm('是否确定保存?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消'
          }).then(() => {
            this.saveBtnLoading = true
            this.$store.dispatch(this.newFlag ? 'Savetblrecordchannelgeneralize' : 'Updatetblrecordchannelgeneralize', this.data).then(resp => {
              this.saveBtnLoading = false
              this.dialogNewOrEditVisible = false
              this.$message({
                message: resp.msg,
                type: 'success'
              })
              this.query()
            }).catch(() => {
              this.saveBtnLoading = false
            })
          })
        }
      })
    },
    removeData(data) {
      this.$confirm('是否确定删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(() => {
        this.$store.dispatch('Deletetblrecordchannelgeneralize', data.id).then(resp => {
          this.$message({
            message: resp.msg,
            type: 'success'
          })
          this.listLoading = false
          this.query()
        }).catch(() => {
          this.listLoading = false
        })
      })
    },
    resetForm() {
      this.$refs['dataForm'] && this.$refs['dataForm'].clearValidate()
    },
    resetListForm() {
      this.filterForm = {
        enabled: 1,
          pageNo: 1,
          pageSize: 10,
          searchKey: '',
          recordchannelgeneralizebuttons: null,
          channel: '',
          accounchannelClassify: null,
          agentUserId: null,
          startTime: null,
          endTime: null
      }
      this.query()
    },
    handleSizeChange(val) {
      this.filterForm.pageSize = val
      this.query()
    },
    handleCurrentChange(val) {
      this.filterForm.pageNo = val
      this.query()
    }
  }
}
</script>

<style scoped>
.box-card-div {
  margin-bottom: 20px;
}

  .box-card span {
    color: #337ab7;
  }
</style>
