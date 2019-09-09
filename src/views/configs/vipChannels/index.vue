<template>
  <div class="app-container">
    <div class="filter-container">
      <el-form ref="filterForm" :inline="true" size="mini">
        <el-form-item>
          <el-button type="primary" icon="el-icon-refresh" class="btn-form" @click="query">刷新</el-button>
          <el-button type="primary" icon="el-icon-plus" class="btn-form" @click="showEditPage">创建充值渠道</el-button>
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
      <el-table-column align="center" label="ID">
        <template slot-scope="scope">
          {{ scope.row.id }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="微信号">
        <template slot-scope="scope">
          {{ scope.row.account }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="昵称">
        <template slot-scope="scope">
          {{ scope.row.nickname }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="游戏ID">
        <template slot-scope="scope">
          {{ scope.row.userid }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="禁用|启用">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.enabled"
            :active-value="1"
            :inactive-value="0"
            @change="handleSwitch(scope.row)"
          />
        </template>
      </el-table-column>
      <el-table-column align="center" label="管理操作">
        <template slot-scope="scope">
          <el-button type="text" size="mini" @click="editData(scope.row)">编辑</el-button>
          <el-button type="text" size="mini" style="color: red;" @click="deleteData(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="pagination-container">
      <el-pagination :current-page="filterForm.pageNo" :page-sizes="[10,20,30, 50]" :page-size="filterForm.pageSize" :total="listTotal" background layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange" @current-change="handleCurrentChange"/>
    </div>

    <el-dialog :visible.sync="dialogNewOrEditVisible" :title="newFlag | dialogTitle" width="420px">
      <el-form ref="dataForm" :model="data" :rules="dataRules" label-width="90px">
        <el-form-item label="微信号" prop="account">
          <el-input v-model="data.account" type="text"/>
        </el-form-item>
        <el-form-item label="昵称" prop="nickname">
          <el-input v-model="data.nickname"/>
        </el-form-item>
        <el-form-item label="游戏ID" prop="userid">
          <el-input v-model="data.userid"/>
        </el-form-item>
        <el-form-item label="启用状态" prop="enabled">
          <el-switch
            v-model="data.enabled"
            :active-value="1"
            :inactive-value="0"
          />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogNewOrEditVisible = false">取消</el-button>
        <el-button :loading="saveBtnLoading" type="primary" @click="saveData">保存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'VipChannels',
  filters: {
    dialogTitle(newFlag) {
      if (newFlag) {
        return '创建充值渠道'
      } else {
        return '编辑充值渠道'
      }
    }
  },
  data() {
    return {
      filterForm: {
        pageNo: 1,
        pageSize: 10
      },
      list: null,
      listLoading: false,
      listTotal: 0,
      data: {},
      dataRules: {
        account: [{ required: true, trigger: 'blur', message: '必填项' }],
        nickname: [{ required: true, trigger: 'blur', message: '必填项' }],
        userid: [{ required: true, trigger: 'blur', message: '必填项' }]
      },
      dialogNewOrEditVisible: false,
      newFlag: false,
      saveBtnLoading: false
    }
  },
  mounted() {
    this.query()
  },
  methods: {
    query() {
      this.listLoading = true
      this.$store.dispatch('ListVipChannelByQry', this.filterForm).then(resp => {
        this.list = resp.data
        this.listLoading = false
        this.listTotal = resp.totalCount
      }).catch(() => {
        this.listLoading = false
      })
    },
    showEditPage() {
      this.newFlag = true
      this.resetForm()
      this.dialogNewOrEditVisible = true
    },
    editData(data) {
      this.newFlag = false
      this.data = Object.assign({}, data)
      this.dialogNewOrEditVisible = true
    },
    saveData() {
      this.$refs['dataForm'].validate(valid => {
        if (valid) {
          this.$confirm('是否确定保存数据?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消'
          }).then(() => {
            this.saveBtnLoading = true
            this.$store.dispatch(this.newFlag ? 'SaveVipChannel' : 'UpdateVipChannel', this.data).then(resp => {
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
    handleSwitch(data) {
      if (data.enabled === 0) {
        this.disableAction(data.id)
      } else {
        this.enableAction(data.id)
      }
    },
    enableAction(id) {
      this.$confirm('是否确定启用该账号?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(() => {
        this.$store.dispatch('UpdateVipChannel', { id, enabled: 1 }).then(resp => {
          this.$message({
            message: resp.msg,
            type: 'success'
          })
          this.query()
        })
      })
    },
    disableAction(id) {
      this.$confirm('是否确定禁用该帐号?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(() => {
        this.$store.dispatch('UpdateVipChannel', { id, enabled: 0 }).then(resp => {
          this.$message({
            message: resp.msg,
            type: 'success'
          })
          this.query()
        })
      })
    },
    deleteData(id) {
      this.$confirm('是否确定删除该帐号?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(() => {
        this.$store.dispatch('UpdateVipChannel', { id, isDel: 1 }).then(resp => {
          this.$message({
            message: resp.msg,
            type: 'success'
          })
          this.query()
        })
      })
    },
    resetForm() {
      this.$refs['dataForm'] && this.$refs['dataForm'].clearValidate()
      this.data = {
        account: null,
        nickname: null,
        enabled: 1
      }
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
