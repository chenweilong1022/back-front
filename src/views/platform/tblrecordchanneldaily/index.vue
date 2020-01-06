<template>
  <div class="app-container">
    <div class="filter-container">
      <el-form ref="filterForm" :inline="true" size="mini">
        <el-form-item>
          <el-form-item label="日期">
            <el-date-picker
              v-model="filterForm.currentDates"
              type="date"
              placeholder="选择日期">
            </el-date-picker>

          </el-form-item>
          <el-button type="primary" icon="el-icon-search" class="btn-form" @click="query">查询</el-button>
          <!--<el-button type="primary" icon="el-icon-plus" class="btn-form" @click="showNewPage">新增</el-button>-->
        </el-form-item>
      </el-form>
    </div>

    <el-table
      v-loading="listLoading"
      :data="list"
      size="mini"
      border
      fit
      highlight-current-row>
      <el-table-column align="center" label="id">
        <template slot-scope="scope">
          {{ scope.row.id || '合计' }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="日期">
        <template slot-scope="scope">
          {{ scope.row.currentDates }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="渠道">
        <template slot-scope="scope">
          {{ scope.row.platform }}{{ scope.row.appChannel }}
        </template>
      </el-table-column>
      <!--<el-table-column align="center" label="app渠道">-->
        <!--<template slot-scope="scope">-->

        <!--</template>-->
      <!--</el-table-column>-->
      <!--<el-table-column align="center" label="玩家身上金币">-->
        <!--<template slot-scope="scope">-->
          <!--{{ scope.row.gold }}-->
        <!--</template>-->
      <!--</el-table-column>-->
      <!--<el-table-column align="center" label="玩家银行金币">-->
        <!--<template slot-scope="scope">-->
          <!--{{ scope.row.bankGold }}-->
        <!--</template>-->
      <!--</el-table-column>-->
      <el-table-column align="center" label="玩家总金币">
        <template slot-scope="scope">
          {{ scope.row.totalGold }}
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
      <el-table-column align="center" label="营收">
        <template slot-scope="scope">
          {{ scope.row.profit }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="充值">
        <template slot-scope="scope">
          {{ scope.row.recharge }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="兑换">
        <template slot-scope="scope">
          {{ scope.row.conversion }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="注册用户数">
        <template slot-scope="scope">
          {{ scope.row.registerUsers }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="登录用户数">
        <template slot-scope="scope">
          {{ scope.row.loginUsers }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="总税收">
        <template slot-scope="scope">
          {{ scope.row.totalRevenue }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="游戏记录">
        <template slot-scope="scope">
          {{ scope.row.gameRecord }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="最后更新时间">
        <template slot-scope="scope">
          {{ scope.row.lastUpdateTime }}
        </template>
      </el-table-column>

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
        <el-form-item label="日期" prop="currentDates">
          <el-input v-model="data.currentDates" placeholder="日期"/>
        </el-form-item>
        <el-form-item label="玩家身上金币" prop="gold">
          <el-input v-model="data.gold" placeholder="玩家身上金币"/>
        </el-form-item>
        <el-form-item label="玩家银行金币" prop="bankGold">
          <el-input v-model="data.bankGold" placeholder="玩家银行金币"/>
        </el-form-item>
        <el-form-item label="玩家总金币" prop="totalGold">
          <el-input v-model="data.totalGold" placeholder="玩家总金币"/>
        </el-form-item>
        <el-form-item label="终端" prop="platform">
          <el-input v-model="data.platform" placeholder="终端"/>
        </el-form-item>
        <el-form-item label="app渠道" prop="appChannel">
          <el-input v-model="data.appChannel" placeholder="app渠道"/>
        </el-form-item>
        <el-form-item label="创建时间" prop="createTime">
          <el-input v-model="data.createTime" placeholder="创建时间"/>
        </el-form-item>
        <el-form-item label="删除标志" prop="isDel">
          <el-input v-model="data.isDel" placeholder="删除标志"/>
        </el-form-item>
        <el-form-item label="营收" prop="profit">
          <el-input v-model="data.profit" placeholder="营收"/>
        </el-form-item>
        <el-form-item label="充值" prop="recharge">
          <el-input v-model="data.recharge" placeholder="充值"/>
        </el-form-item>
        <el-form-item label="兑换" prop="conversion">
          <el-input v-model="data.conversion" placeholder="兑换"/>
        </el-form-item>
        <el-form-item label="注册用户数" prop="registerUsers">
          <el-input v-model="data.registerUsers" placeholder="注册用户数"/>
        </el-form-item>
        <el-form-item label="登录用户数" prop="loginUsers">
          <el-input v-model="data.loginUsers" placeholder="登录用户数"/>
        </el-form-item>
        <el-form-item label="总税收" prop="totalRevenue">
          <el-input v-model="data.totalRevenue" placeholder="总税收"/>
        </el-form-item>
        <el-form-item label="游戏记录" prop="gameRecord">
          <el-input v-model="data.gameRecord" placeholder="游戏记录"/>
        </el-form-item>
        <el-form-item label="最后更新时间" prop="lastUpdateTime">
          <el-input v-model="data.lastUpdateTime" placeholder="最后更新时间"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button icon="el-icon-close" @click="dialogNewOrEditVisible = false">取消</el-button>
        <el-button :loading="saveBtnLoading" type="primary" @click="savetblrecordchanneldaily"><svg-icon icon-class="save" style="margin-right: 5px;"/>保存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'tblrecordchanneldaily',
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
        searchKey: '',
        currentDates: ''
      },
      list: null,
      listLoading: false,
      listTotal: 0,
      data: {
        id: 0,
        currentDates: '',
        gold: '',
        bankGold: '',
        totalGold: '',
        platform: '',
        appChannel: '',
        createTime: '',
        isDel: '',
        profit: '',
        recharge: '',
        conversion: '',
        registerUsers: '',
        loginUsers: '',
        totalRevenue: '',
        gameRecord: '',
        lastUpdateTime: ''
      },
      dataRule: {
        currentDates: [
          { required: true, message: '日期不能为空', trigger: 'blur' }
        ],
        gold: [
          { required: true, message: '玩家身上金币不能为空', trigger: 'blur' }
        ],
        bankGold: [
          { required: true, message: '玩家银行金币不能为空', trigger: 'blur' }
        ],
        totalGold: [
          { required: true, message: '玩家总金币不能为空', trigger: 'blur' }
        ],
        platform: [
          { required: true, message: '终端不能为空', trigger: 'blur' }
        ],
        appChannel: [
          { required: true, message: 'app渠道不能为空', trigger: 'blur' }
        ],
        createTime: [
          { required: true, message: '创建时间不能为空', trigger: 'blur' }
        ],
        isDel: [
          { required: true, message: '删除标志不能为空', trigger: 'blur' }
        ],
        profit: [
          { required: true, message: '营收不能为空', trigger: 'blur' }
        ],
        recharge: [
          { required: true, message: '充值不能为空', trigger: 'blur' }
        ],
        conversion: [
          { required: true, message: '兑换不能为空', trigger: 'blur' }
        ],
        registerUsers: [
          { required: true, message: '注册用户数不能为空', trigger: 'blur' }
        ],
        loginUsers: [
          { required: true, message: '登录用户数不能为空', trigger: 'blur' }
        ],
        totalRevenue: [
          { required: true, message: '总税收不能为空', trigger: 'blur' }
        ],
        gameRecord: [
          { required: true, message: '游戏记录不能为空', trigger: 'blur' }
        ],
        lastUpdateTime: [
          { required: true, message: '最后更新时间不能为空', trigger: 'blur' }
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
      this.$store.dispatch('Listtblrecordchanneldaily', this.filterForm ).then(resp => {
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
    savetblrecordchanneldaily() {
      this.$refs['dataForm'].validate(valid => {
        if (valid) {
          this.$confirm('是否确定保存?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消'
          }).then(() => {
            this.saveBtnLoading = true
            this.$store.dispatch(this.newFlag ? 'Savetblrecordchanneldaily' : 'Updatetblrecordchanneldaily', this.data).then(resp => {
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
        this.$store.dispatch('Deletetblrecordchanneldaily', data.id).then(resp => {
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
