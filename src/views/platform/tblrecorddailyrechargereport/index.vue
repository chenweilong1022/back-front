<template>
  <div class="app-container">
    <!--<div class="filter-container">-->
      <!--<el-form ref="filterForm" :inline="true" size="mini">-->
        <!--<el-form-item>-->
          <!--<el-form-item label="条件">-->
            <!--<el-input v-model="filterForm.searchKey"/>-->
          <!--</el-form-item>-->
          <!--<el-button type="primary" icon="el-icon-search" class="btn-form" @click="query">查询</el-button>-->
          <!--<el-button type="primary" icon="el-icon-plus" class="btn-form" @click="showNewPage">新增</el-button>-->
        <!--</el-form-item>-->
      <!--</el-form>-->
    <!--</div>-->

    <el-table
      v-loading="listLoading"
      :data="list"
      size="mini"
      border
      fit="true"
      style="width: 100%;"
      highlight-current-row>
      <el-table-column align="center" label="id">
        <template slot-scope="scope">
          {{ scope.row.id }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="日期">
        <template slot-scope="scope">
          {{ scope.row.currentDate }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="新用户">
        <template slot-scope="scope">
          {{ scope.row.newUser }}
        </template>
      </el-table-column>
      <!--<el-table-column align="center" label="新机器">-->
        <!--<template slot-scope="scope">-->
          <!--{{ scope.row.newMachine }}-->
        <!--</template>-->
      <!--</el-table-column>-->
      <!--<el-table-column align="center" label="新绑定">-->
        <!--<template slot-scope="scope">-->
          <!--{{ scope.row.newBinding }}-->
        <!--</template>-->
      <!--</el-table-column>-->
      <el-table-column align="center" label="总注册">
        <template slot-scope="scope">
          {{ scope.row.totalRegistered }}
        </template>
      </el-table-column>
      <!--<el-table-column align="center" label="总机器">-->
        <!--<template slot-scope="scope">-->
          <!--{{ scope.row.totalMachine }}-->
        <!--</template>-->
      <!--</el-table-column>-->
      <el-table-column align="center" label="登录用户">
        <el-table-column align="center" label="老用户">
          <template slot-scope="scope">
            {{ scope.row.loginUser }}<br/>
            <template>
              {{ scope.row.oldUser }}
            </template>
          </template>
        </el-table-column>
      </el-table-column>
      <!--<el-table-column align="center" label="登录机器">-->
        <!--<template slot-scope="scope">-->
          <!--{{ scope.row.loginMachine }}-->
        <!--</template>-->
      <!--</el-table-column>-->
      <!--<el-table-column align="center" label="老登录机器">-->
        <!--<template slot-scope="scope">-->
          <!--{{ scope.row.oldLoginMachine }}-->
        <!--</template>-->
      <!--</el-table-column>-->
      <el-table-column width="180" align="center" label="总订单(有效订单--比例)">
        <template slot-scope="scope">
          {{ scope.row.totalOrder }}({{ scope.row.effectiveOrder }}--{{ scope.row.proportion }})
        </template>
      </el-table-column>
      <!--<el-table-column align="center" label="有效订单">-->
        <!--<template slot-scope="scope">-->
          <!--{{ scope.row.effectiveOrder }}-->
        <!--</template>-->
      <!--</el-table-column>-->
      <!--<el-table-column align="center" label="比例">-->
        <!--<template slot-scope="scope">-->
          <!--{{ scope.row.proportion }}-->
        <!--</template>-->
      <!--</el-table-column>-->
      <el-table-column align="center" label="新用户充值(人)">
        <template slot-scope="scope">
          {{ scope.row.newUserRecharge }}({{ scope.row.newUsersRechargeNumber }})
        </template>
      </el-table-column>
      <!--<el-table-column align="center" label="新用户充值人数">-->
        <!--<template slot-scope="scope">-->
          <!--{{ scope.row.newUsersRechargeNumber }}-->
        <!--</template>-->
      <!--</el-table-column>-->
      <el-table-column align="center" label="老用户充值(人)">
        <template slot-scope="scope">
          {{ scope.row.oldUsersRecharge }}({{ scope.row.oldUsersRechargeNumber }})
        </template>
      </el-table-column>
      <!--<el-table-column align="center" label="老用户充值人数">-->
        <!--<template slot-scope="scope">-->
          <!--{{ scope.row.oldUsersRechargeNumber }}-->
        <!--</template>-->
      <!--</el-table-column>-->
      <el-table-column align="center" label="总充值(人)">
        <template slot-scope="scope">
          {{ scope.row.totalRecharge }}({{ scope.row.totalRechargeNumber }})
        </template>
      </el-table-column>
      <!--<el-table-column align="center" label="总充值人数">-->
        <!--<template slot-scope="scope">-->
          <!--{{ scope.row.totalRechargeNumber }}-->
        <!--</template>-->
      <!--</el-table-column>-->
      <el-table-column align="center" label="总返现(人)">
        <template slot-scope="scope">
          {{ scope.row.totalBack }}({{ scope.row.totalBackNumber }})
        </template>
      </el-table-column>
      <!--<el-table-column align="center" label="总返现人数">-->
        <!--<template slot-scope="scope">-->
          <!--{{ scope.row.totalBackNumber }}-->
        <!--</template>-->
      <!--</el-table-column>-->
      <el-table-column align="center" label="次留">
        <template slot-scope="scope">
          {{ scope.row.morrowRetained }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="充值留存">
        <template slot-scope="scope">
          {{ scope.row.rechargeRetained }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="周留存">
        <template slot-scope="scope">
          {{ scope.row.weeksRetained }}
        </template>
      </el-table-column>
      <!--<el-table-column align="center" label="arpo">-->
        <!--<template slot-scope="scope">-->
          <!--{{ scope.row.arpo }}-->
        <!--</template>-->
      <!--</el-table-column>-->
      <!--<el-table-column align="center" label="arpu">-->
        <!--<template slot-scope="scope">-->
          <!--{{ scope.row.arpu }}-->
        <!--</template>-->
      <!--</el-table-column>-->
      <!--<el-table-column align="center" label="arppu">-->
        <!--<template slot-scope="scope">-->
          <!--{{ scope.row.arppu }}-->
        <!--</template>-->
      <!--</el-table-column>-->
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
      <!--<el-table-column align="center" label="昨日新用户">-->
        <!--<template slot-scope="scope">-->
          <!--{{ scope.row.newUserYesterday }}-->
        <!--</template>-->
      <!--</el-table-column>-->
      <!--<el-table-column align="center" label="今日留存用户">-->
        <!--<template slot-scope="scope">-->
          <!--{{ scope.row.todayUserRetained }}-->
        <!--</template>-->
      <!--</el-table-column>-->
      <!--<el-table-column align="center" label="昨日充值用户">-->
        <!--<template slot-scope="scope">-->
          <!--{{ scope.row.newUserYesterdayRecharge }}-->
        <!--</template>-->
      <!--</el-table-column>-->
      <!--<el-table-column align="center" label="今日充值留存用户">-->
        <!--<template slot-scope="scope">-->
          <!--{{ scope.row.todayUserRechargeRetained }}-->
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
        <el-form-item label="日期" prop="currentDate">
          <el-input v-model="data.currentDate" placeholder="日期"/>
        </el-form-item>
        <el-form-item label="新用户" prop="newUser">
          <el-input v-model="data.newUser" placeholder="新用户"/>
        </el-form-item>
        <el-form-item label="新机器" prop="newMachine">
          <el-input v-model="data.newMachine" placeholder="新机器"/>
        </el-form-item>
        <el-form-item label="新绑定" prop="newBinding">
          <el-input v-model="data.newBinding" placeholder="新绑定"/>
        </el-form-item>
        <el-form-item label="总注册" prop="totalRegistered">
          <el-input v-model="data.totalRegistered" placeholder="总注册"/>
        </el-form-item>
        <el-form-item label="总机器" prop="totalMachine">
          <el-input v-model="data.totalMachine" placeholder="总机器"/>
        </el-form-item>
        <el-form-item label="登录用户" prop="loginUser">
          <el-input v-model="data.loginUser" placeholder="登录用户"/>
        </el-form-item>
        <el-form-item label="老用户" prop="oldUser">
          <el-input v-model="data.oldUser" placeholder="老用户"/>
        </el-form-item>
        <el-form-item label="登录机器" prop="loginMachine">
          <el-input v-model="data.loginMachine" placeholder="登录机器"/>
        </el-form-item>
        <el-form-item label="老登录机器" prop="oldLoginMachine">
          <el-input v-model="data.oldLoginMachine" placeholder="老登录机器"/>
        </el-form-item>
        <el-form-item label="总订单" prop="totalOrder">
          <el-input v-model="data.totalOrder" placeholder="总订单"/>
        </el-form-item>
        <el-form-item label="有效订单" prop="effectiveOrder">
          <el-input v-model="data.effectiveOrder" placeholder="有效订单"/>
        </el-form-item>
        <el-form-item label="比例" prop="proportion">
          <el-input v-model="data.proportion" placeholder="比例"/>
        </el-form-item>
        <el-form-item label="新用户充值" prop="newUserRecharge">
          <el-input v-model="data.newUserRecharge" placeholder="新用户充值"/>
        </el-form-item>
        <el-form-item label="新用户充值人数" prop="newUsersRechargeNumber">
          <el-input v-model="data.newUsersRechargeNumber" placeholder="新用户充值人数"/>
        </el-form-item>
        <el-form-item label="老用户充值" prop="oldUsersRecharge">
          <el-input v-model="data.oldUsersRecharge" placeholder="老用户充值"/>
        </el-form-item>
        <el-form-item label="老用户充值人数" prop="oldUsersRechargeNumber">
          <el-input v-model="data.oldUsersRechargeNumber" placeholder="老用户充值人数"/>
        </el-form-item>
        <el-form-item label="总充值" prop="totalRecharge">
          <el-input v-model="data.totalRecharge" placeholder="总充值"/>
        </el-form-item>
        <el-form-item label="总充值人数" prop="totalRechargeNumber">
          <el-input v-model="data.totalRechargeNumber" placeholder="总充值人数"/>
        </el-form-item>
        <el-form-item label="总返现" prop="totalBack">
          <el-input v-model="data.totalBack" placeholder="总返现"/>
        </el-form-item>
        <el-form-item label="总返现人数" prop="totalBackNumber">
          <el-input v-model="data.totalBackNumber" placeholder="总返现人数"/>
        </el-form-item>
        <el-form-item label="次留" prop="morrowRetained">
          <el-input v-model="data.morrowRetained" placeholder="次留"/>
        </el-form-item>
        <el-form-item label="充值留存" prop="rechargeRetained">
          <el-input v-model="data.rechargeRetained" placeholder="充值留存"/>
        </el-form-item>
        <el-form-item label="周留存" prop="weeksRetained">
          <el-input v-model="data.weeksRetained" placeholder="周留存"/>
        </el-form-item>
        <el-form-item label="arpo" prop="arpo">
          <el-input v-model="data.arpo" placeholder="arpo"/>
        </el-form-item>
        <el-form-item label="arpu" prop="arpu">
          <el-input v-model="data.arpu" placeholder="arpu"/>
        </el-form-item>
        <el-form-item label="arppu" prop="arppu">
          <el-input v-model="data.arppu" placeholder="arppu"/>
        </el-form-item>
        <el-form-item label="创建时间" prop="createTime">
          <el-input v-model="data.createTime" placeholder="创建时间"/>
        </el-form-item>
        <el-form-item label="删除标志" prop="isDel">
          <el-input v-model="data.isDel" placeholder="删除标志"/>
        </el-form-item>
        <el-form-item label="昨日新用户" prop="newUserYesterday">
          <el-input v-model="data.newUserYesterday" placeholder="昨日新用户"/>
        </el-form-item>
        <el-form-item label="今日留存用户" prop="todayUserRetained">
          <el-input v-model="data.todayUserRetained" placeholder="今日留存用户"/>
        </el-form-item>
        <el-form-item label="昨日充值用户" prop="newUserYesterdayRecharge">
          <el-input v-model="data.newUserYesterdayRecharge" placeholder="昨日充值用户"/>
        </el-form-item>
        <el-form-item label="今日充值留存用户" prop="todayUserRechargeRetained">
          <el-input v-model="data.todayUserRechargeRetained" placeholder="今日充值留存用户"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button icon="el-icon-close" @click="dialogNewOrEditVisible = false">取消</el-button>
        <el-button :loading="saveBtnLoading" type="primary" @click="savetblrecorddailyrechargereport"><svg-icon icon-class="save" style="margin-right: 5px;"/>保存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'tblrecorddailyrechargereport',
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
      filterForm: {
        enabled: 1,
        pageNo: 1,
        pageSize: 10,
        searchKey: ''
      },
      list: null,
      listLoading: false,
      listTotal: 0,
      data: {
        id: 0,
        currentDate: '',
        newUser: '',
        newMachine: '',
        newBinding: '',
        totalRegistered: '',
        totalMachine: '',
        loginUser: '',
        oldUser: '',
        loginMachine: '',
        oldLoginMachine: '',
        totalOrder: '',
        effectiveOrder: '',
        proportion: '',
        newUserRecharge: '',
        newUsersRechargeNumber: '',
        oldUsersRecharge: '',
        oldUsersRechargeNumber: '',
        totalRecharge: '',
        totalRechargeNumber: '',
        totalBack: '',
        totalBackNumber: '',
        morrowRetained: '',
        rechargeRetained: '',
        weeksRetained: '',
        arpo: '',
        arpu: '',
        arppu: '',
        createTime: '',
        isDel: '',
        newUserYesterday: '',
        todayUserRetained: '',
        newUserYesterdayRecharge: '',
        todayUserRechargeRetained: ''
      },
      dataRule: {
        currentDate: [
          { required: true, message: '日期不能为空', trigger: 'blur' }
        ],
        newUser: [
          { required: true, message: '新用户不能为空', trigger: 'blur' }
        ],
        newMachine: [
          { required: true, message: '新机器不能为空', trigger: 'blur' }
        ],
        newBinding: [
          { required: true, message: '新绑定不能为空', trigger: 'blur' }
        ],
        totalRegistered: [
          { required: true, message: '总注册不能为空', trigger: 'blur' }
        ],
        totalMachine: [
          { required: true, message: '总机器不能为空', trigger: 'blur' }
        ],
        loginUser: [
          { required: true, message: '登录用户不能为空', trigger: 'blur' }
        ],
        oldUser: [
          { required: true, message: '老用户不能为空', trigger: 'blur' }
        ],
        loginMachine: [
          { required: true, message: '登录机器不能为空', trigger: 'blur' }
        ],
        oldLoginMachine: [
          { required: true, message: '老登录机器不能为空', trigger: 'blur' }
        ],
        totalOrder: [
          { required: true, message: '总订单不能为空', trigger: 'blur' }
        ],
        effectiveOrder: [
          { required: true, message: '有效订单不能为空', trigger: 'blur' }
        ],
        proportion: [
          { required: true, message: '比例不能为空', trigger: 'blur' }
        ],
        newUserRecharge: [
          { required: true, message: '新用户充值不能为空', trigger: 'blur' }
        ],
        newUsersRechargeNumber: [
          { required: true, message: '新用户充值人数不能为空', trigger: 'blur' }
        ],
        oldUsersRecharge: [
          { required: true, message: '老用户充值不能为空', trigger: 'blur' }
        ],
        oldUsersRechargeNumber: [
          { required: true, message: '老用户充值人数不能为空', trigger: 'blur' }
        ],
        totalRecharge: [
          { required: true, message: '总充值不能为空', trigger: 'blur' }
        ],
        totalRechargeNumber: [
          { required: true, message: '总充值人数不能为空', trigger: 'blur' }
        ],
        totalBack: [
          { required: true, message: '总返现不能为空', trigger: 'blur' }
        ],
        totalBackNumber: [
          { required: true, message: '总返现人数不能为空', trigger: 'blur' }
        ],
        morrowRetained: [
          { required: true, message: '次留不能为空', trigger: 'blur' }
        ],
        rechargeRetained: [
          { required: true, message: '充值留存不能为空', trigger: 'blur' }
        ],
        weeksRetained: [
          { required: true, message: '周留存不能为空', trigger: 'blur' }
        ],
        arpo: [
          { required: true, message: 'arpo不能为空', trigger: 'blur' }
        ],
        arpu: [
          { required: true, message: 'arpu不能为空', trigger: 'blur' }
        ],
        arppu: [
          { required: true, message: 'arppu不能为空', trigger: 'blur' }
        ],
        createTime: [
          { required: true, message: '创建时间不能为空', trigger: 'blur' }
        ],
        isDel: [
          { required: true, message: '删除标志不能为空', trigger: 'blur' }
        ],
        newUserYesterday: [
          { required: true, message: '昨日新用户不能为空', trigger: 'blur' }
        ],
        todayUserRetained: [
          { required: true, message: '今日留存用户不能为空', trigger: 'blur' }
        ],
        newUserYesterdayRecharge: [
          { required: true, message: '昨日充值用户不能为空', trigger: 'blur' }
        ],
        todayUserRechargeRetained: [
          { required: true, message: '今日充值留存用户不能为空', trigger: 'blur' }
        ]
      },
      dialogNewOrEditVisible: false,
      newFlag: true,
      saveBtnLoading: false
    }
  },
  mounted() {
    this.query()
  },
  methods: {
    query() {
      this.listLoading = true
      this.$store.dispatch('Listtblrecorddailyrechargereport', this.filterForm ).then(resp => {
        this.list = resp.data
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
    savetblrecorddailyrechargereport() {
      this.$refs['dataForm'].validate(valid => {
        if (valid) {
          this.$confirm('是否确定保存?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消'
          }).then(() => {
            this.saveBtnLoading = true
            this.$store.dispatch(this.newFlag ? 'Savetblrecorddailyrechargereport' : 'Updatetblrecorddailyrechargereport', this.data).then(resp => {
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
        this.$store.dispatch('Deletetblrecorddailyrechargereport', data.id).then(resp => {
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

</style>
