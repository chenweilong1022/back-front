<template>
  <div class="app-container">
    <div class="filter-container">
      <el-form ref="filterForm" :inline="true" size="mini">
        <el-form-item>
          <el-form-item label="状态">
            <el-select v-model="filterForm.enabled" clearable>
              <el-option
                key="0"
                :value="1"
                label="启用"/>
              <el-option
                key="1"
                :value="0"
                label="禁用"/>
            </el-select>
          </el-form-item>
          <el-button type="primary" icon="el-icon-search" class="btn-form" @click="query">查询</el-button>
          <el-button type="primary" icon="el-icon-plus" class="btn-form" @click="showNewPage">新加域名</el-button>
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
      <el-table-column align="center" label="域名ID" width="100px">
        <template slot-scope="scope">
          {{ scope.row.id }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="域名" min-width="280px">
        <template slot-scope="scope">
          {{ scope.row.domain }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="备注">
        <template slot-scope="scope">
          {{ scope.row.note }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="禁用|启用">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.enabled"
            :active-value="1"
            :inactive-value="0"
            @change="disabledAction(scope.row)"/>
        </template>
      </el-table-column>
      <el-table-column align="center" label="创建时间">
        <template slot-scope="scope">
          {{ scope.row.createTime }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="管理操作" width="200px">
        <template slot-scope="scope">
          <el-button icon="el-icon-edit" type="text" size="mini" @click="showEditPage(scope.row)">编辑</el-button>
          <el-button icon="el-icon-delete" type="text" style="color: red;" size="mini" @click="removeData(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="pagination-container">
      <el-pagination :current-page.sync="filterForm.pageNo" :page-sizes="[10,20,30, 50]" :page-size="filterForm.pageSize" :total="listTotal" background layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange" @current-change="handleCurrentChange"/>
    </div>

    <el-dialog :visible.sync="dialogNewOrEditVisible" :title="newFlag | dialogTitle" width="600px">
      <el-form ref="sysDomainForm" :model="sysDomain" :rules="sysDomainRules" label-width="100px">
        <el-form-item label="域名" prop="domain">
          <el-input v-model="sysDomain.domain" />
        </el-form-item>
        <el-form-item label="启用状态" prop="enabled">
          <el-radio-group v-model="sysDomain.enabled">
            <el-radio :label="0">未启用</el-radio>
            <el-radio :label="1">启用</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="说明" prop="note">
          <el-input v-model="sysDomain.note" :row="4" type="textarea" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button icon="el-icon-close" @click="dialogNewOrEditVisible = false">取消</el-button>
        <el-button :loading="saveBtnLoading" type="primary" @click="saveSysDomain"><svg-icon icon-class="save" style="margin-right: 5px;"/>保存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'SysDomain',
  filters: {
    dialogTitle(newFlag) {
      if (newFlag) {
        return '添加域名'
      } else {
        return '编辑域名'
      }
    }
  },
  data() {
    return {
      filterForm: {
        enabled: 1,
        pageNo: 1,
        pageSize: 10
      },
      list: null,
      listLoading: false,
      listTotal: 0,
      sysDomain: {
        domain: null,
        enabled: 1,
        note: null
      },
      sysDomainRules: {
        domain: [{ required: true, trigger: 'blur', message: '必填项' }]
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
      this.$store.dispatch('ListSysDomainByQry', this.filterForm).then(resp => {
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
      this.sysDomain = {
        domain: null,
        enabled: 1,
        note: null
      }
      this.dialogNewOrEditVisible = true
    },
    showEditPage(data) {
      this.newFlag = false
      this.sysDomain = Object.assign({}, data)
      this.dialogNewOrEditVisible = true
    },
    saveSysDomain() {
      this.$refs['sysDomainForm'].validate(valid => {
        if (valid) {
          this.$confirm('是否确定保存?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消'
          }).then(() => {
            this.saveBtnLoading = true
            this.$store.dispatch(this.newFlag ? 'SaveSysDomain' : 'UpdateSysDomain', this.sysDomain).then(resp => {
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
    disabledAction(data) {
      if (data.enabled === 0) {
        this.$confirm('此操作将禁用该域名，是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }).then(() => {
          this.updateAction(data)
        }).catch(() => {
          data.enabled = 1
        })
      } else {
        this.updateAction(data)
      }
    },
    removeData(data) {
      this.$confirm('是否确定删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(() => {
        this.updateAction({ ...data, isDel: 1 })
      })
    },
    updateAction(data) {
      this.listLoading = true
      this.$store.dispatch('UpdateSysDomain', data).then(resp => {
        this.$message({
          message: resp.msg,
          type: 'success'
        })
        this.listLoading = false
        this.query()
      }).catch(() => {
        this.listLoading = false
      })
    },
    resetForm() {
      this.$refs['sysDomainForm'] && this.$refs['sysDomainForm'].clearValidate()
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
