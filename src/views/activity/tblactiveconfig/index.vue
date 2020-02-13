<template>
  <div class="app-container">
    <div class="filter-container">
      <el-form ref="filterForm" :inline="true" size="mini">
        <el-form-item>
          <el-form-item label="条件">
            <el-input v-model="filterForm.searchKey"/>
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
          {{ scope.row.id }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="活动id">
        <template slot-scope="scope">
          {{ scope.row.activeConfigId }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="活动">
        <template slot-scope="scope">
          {{ scope.row.active }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="是否开启">
        <template slot-scope="scope">
            <el-switch
              @change="updateEnabledConfig(scope.row)"
              v-model="scope.row.enabled"
              active-color="#13ce66"
              inactive-color="#ff4949"
              active-value="1"
              inactive-value="0">
            </el-switch>
        </template>
      </el-table-column>
      <el-table-column align="center" label="备注">
        <template slot-scope="scope">
          {{ scope.row.note }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="创建时间">
        <template slot-scope="scope">
          {{ scope.row.createTime }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="删除标志">
        <template slot-scope="scope">
          {{ scope.row.isDel }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="管理">
        <template slot-scope="scope">
          <!--<el-button icon="el-icon-edit" type="text" size="mini" @click="showEditPage(scope.row)">编辑</el-button>-->
          <!--<el-button icon="el-icon-delete" type="text" style="color: red;" size="mini" @click="removeData(scope.row)">删除</el-button>-->
        </template>
      </el-table-column>
    </el-table>

    <div class="pagination-container">
      <el-pagination :current-page.sync="filterForm.pageNo" :page-sizes="[10,20,30, 50]" :page-size="filterForm.pageSize" :total="listTotal" background layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange" @current-change="handleCurrentChange"/>
    </div>

    <el-dialog :visible.sync="dialogNewOrEditVisible" :title="newFlag | dialogTitle" width="600px">
      <el-form ref="dataForm" :model="data" :rules="dataRule" label-width="100px">
        <el-form-item label="活动id" prop="activeConfigId">
          <el-input v-model="data.activeConfigId" placeholder="活动id"/>
        </el-form-item>
        <el-form-item label="活动" prop="active">
          <el-input v-model="data.active" placeholder="活动"/>
        </el-form-item>
        <el-form-item label="是否开启" prop="enabled">
          <el-input v-model="data.enabled" placeholder="是否开启"/>
        </el-form-item>
        <el-form-item label="备注" prop="note">
          <el-input v-model="data.note" placeholder="备注"/>
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
        <el-button :loading="saveBtnLoading" type="primary" @click="savetblactiveconfig"><svg-icon icon-class="save" style="margin-right: 5px;"/>保存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'tblactiveconfig',
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
        activeConfigId: '',
        active: '',
        enabled: '',
        note: '',
        createTime: '',
        isDel: ''
      },
      dataRule: {
        activeConfigId: [
          { required: true, message: '活动id不能为空', trigger: 'blur' }
        ],
        active: [
          { required: true, message: '活动不能为空', trigger: 'blur' }
        ],
        enabled: [
          { required: true, message: '是否开启不能为空', trigger: 'blur' }
        ],
        note: [
          { required: true, message: '备注不能为空', trigger: 'blur' }
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
  },
  methods: {
    query() {
      this.listLoading = true
      this.$store.dispatch('Listtblactiveconfig', this.filterForm ).then(resp => {
        console.log(resp.data)
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
    savetblactiveconfig(scope) {
      this.$refs['dataForm'].validate(valid => {
        if (valid) {
          this.$confirm('是否确定保存?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消'
          }).then(() => {
            this.saveBtnLoading = true
            this.$store.dispatch(this.newFlag ? 'Savetblactiveconfig' : 'Updatetblactiveconfig', this.data).then(resp => {
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
    updateEnabledConfig(data) {
      console.log(data)
      this.$confirm('是否确定修改状态?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(() => {
        this.$store.dispatch('Updatetblactiveconfig', data).then(resp => {
          this.$message({
            message: resp.msg,
            type: 'success'
          })
          this.listLoading = false
          this.query()
        })
      }).catch(() => {
        this.query()
      })
    },
    removeData(data) {
      this.$confirm('是否确定删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(() => {
        this.$store.dispatch('Deletetblactiveconfig', data.id).then(resp => {
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
