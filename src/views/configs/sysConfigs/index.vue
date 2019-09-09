<template>
  <div class="app-container">
    <div class="filter-container">
      <el-form ref="filterForm" :inline="true" size="mini">
        <el-form-item>
          <el-button type="primary" icon="el-icon-refresh" class="btn-form" @click="query">刷新</el-button>
          <el-button type="primary" icon="el-icon-plus" class="btn-form" @click="showNewPage">新加配置项</el-button>
          <label style="margin-left: 10px;">注：需要修改参数时请联系技术人员协助！</label>
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
      <el-table-column align="center" label="配置项ID" width="100px">
        <template slot-scope="scope">
          {{ scope.row.id }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="配置项代码" width="180px">
        <template slot-scope="scope">
          {{ scope.row.code }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="配置项名称" width="250px">
        <template slot-scope="scope">
          {{ scope.row.title }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="配置项说明">
        <template slot-scope="scope">
          {{ scope.row.note }}
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
      <el-form ref="configsForm" :model="configs" :rules="configsRules" label-width="100px">
        <el-form-item label="配置项代码" prop="code">
          <el-tag v-if="!newFlag">{{ configs.code }}</el-tag>
          <el-input v-if="newFlag" v-model="configs.code" />
        </el-form-item>
        <el-form-item label="配置项名称" prop="title">
          <el-input v-model="configs.title" />
        </el-form-item>
        <el-form-item label="配置项说明" prop="note">
          <el-input v-model="configs.note" :row="4" type="textarea" />
        </el-form-item>
      </el-form>
      <h2>配置项设置</h2>
      <json-editor ref="jsonEditor" v-model="configs.content"/>
      <el-button type="primary" size="mini" style="margin-top: 10px;" @click="formatJson"><svg-icon icon-class="jsonFormat" style="margin-right: 5px;"/>格式化</el-button>
      <div slot="footer" class="dialog-footer">
        <el-button icon="el-icon-close" @click="dialogNewOrEditVisible = false">取消</el-button>
        <el-button :loading="saveBtnLoading" type="primary" @click="saveConfigs"><svg-icon icon-class="save" style="margin-right: 5px;"/>保存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import JsonEditor from '@/components/JsonEditor'
export default {
  name: 'SysConfigs',
  components: {
    JsonEditor
  },
  filters: {
    dialogTitle(newFlag) {
      if (newFlag) {
        return '创建配置项'
      } else {
        return '编辑配置项'
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
      configs: {
        code: null,
        title: null,
        note: null,
        content: {}
      },
      configsRules: {
        code: [{ required: true, trigger: 'blur', message: '必填项' }],
        title: [{ required: true, trigger: 'blur', message: '必填项' }]
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
      this.$store.dispatch('ListSysConfigsByQry', this.filterForm).then(resp => {
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
      this.configs.content = {}
      this.dialogNewOrEditVisible = true
    },
    showEditPage(data) {
      this.newFlag = false
      this.configs = Object.assign({}, data, {
        content: JSON.parse(data.content)
      })
      this.dialogNewOrEditVisible = true
    },
    saveConfigs() {
      this.$refs['configsForm'].validate(valid => {
        if (valid) {
          this.$confirm('是否确定保存?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消'
          }).then(() => {
            this.saveBtnLoading = true
            this.$store.dispatch(this.newFlag ? 'SaveSysConfigs' : 'UpdateSysConfig', this.configs).then(resp => {
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
        this.listLoading = true
        this.$store.dispatch('UpdateSysConfig', { ...data, isDel: 1 }).then(resp => {
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
    formatJson() {
      this.configs.content = JSON.parse(this.configs.content)
    },
    resetForm() {
      this.$refs['configsForm'] && this.$refs['configsForm'].resetFields()
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
