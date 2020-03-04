<template>
  <div class="app-container">
    <div class="filter-container">
      <el-form ref="filterForm" :inline="true" size="mini">
        <el-form-item>
          <el-form-item label="条件">
            <el-input v-model="filterForm.searchKey"/>
          </el-form-item>
          <el-form-item label="路由">
            <el-input v-model="filterForm.operation"/>
          </el-form-item>
          <el-button type="primary" icon="el-icon-search" class="btn-form" @click="query">查询</el-button>
          <el-button type="primary" icon="el-icon-plus" class="btn-form" @click="showNewPage">新增</el-button>
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
      <el-table-column align="center" label="">
        <template slot-scope="scope">
          {{ scope.row.id }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="用户id">
        <template slot-scope="scope">
          {{ scope.row.userId }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="用户名">
        <template slot-scope="scope">
          {{ scope.row.username }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="请求url">
        <template slot-scope="scope">
          {{ scope.row.hostUrl }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="路由">
        <template slot-scope="scope">
          {{ scope.row.operation }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="请求参数">
        <template slot-scope="scope">
          {{ scope.row.params }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="http请求方法">
        <template slot-scope="scope">
          {{ scope.row.httpMethod }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="class请求方法">
        <template slot-scope="scope">
          {{ scope.row.classMethod }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="执行时长(毫秒)">
        <template slot-scope="scope">
          {{ scope.row.time }}
        </template>
      </el-table-column>
      <!--<el-table-column align="center" label="返回参数">-->
        <!--<template slot-scope="scope">-->
          <!--{{ scope.row.result }}-->
        <!--</template>-->
      <!--</el-table-column>-->
      <el-table-column align="center" label="IP地址">
        <template slot-scope="scope">
          {{ scope.row.ip }}
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
          <el-button icon="el-icon-edit" type="text" size="mini" @click="showEditPage(scope.row)">编辑</el-button>
          <el-button icon="el-icon-delete" type="text" style="color: red;" size="mini" @click="removeData(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="pagination-container">
      <el-pagination :current-page.sync="filterForm.pageNo" :page-sizes="[10,20,30, 50]" :page-size="filterForm.pageSize" :total="listTotal" background layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange" @current-change="handleCurrentChange"/>
    </div>

    <el-dialog :visible.sync="dialogNewOrEditVisible" :title="newFlag | dialogTitle" width="600px">
      <el-form ref="dataForm" :model="data" :rules="dataRule" label-width="100px">
        <el-form-item label="用户id" prop="userId">
          <el-input v-model="data.userId" placeholder="用户id"/>
        </el-form-item>
        <el-form-item label="用户名" prop="username">
          <el-input v-model="data.username" placeholder="用户名"/>
        </el-form-item>
        <el-form-item label="请求url" prop="hostUrl">
          <el-input v-model="data.hostUrl" placeholder="请求url"/>
        </el-form-item>
        <el-form-item label="用户操作" prop="operation">
          <el-input v-model="data.operation" placeholder="用户操作"/>
        </el-form-item>
        <el-form-item label="请求参数" prop="params">
          <el-input v-model="data.params" placeholder="请求参数"/>
        </el-form-item>
        <el-form-item label="http请求方法" prop="httpMethod">
          <el-input v-model="data.httpMethod" placeholder="http请求方法"/>
        </el-form-item>
        <el-form-item label="class请求方法" prop="classMethod">
          <el-input v-model="data.classMethod" placeholder="class请求方法"/>
        </el-form-item>
        <el-form-item label="执行时长(毫秒)" prop="time">
          <el-input v-model="data.time" placeholder="执行时长(毫秒)"/>
        </el-form-item>
        <el-form-item label="返回参数" prop="result">
          <el-input v-model="data.result" placeholder="返回参数"/>
        </el-form-item>
        <el-form-item label="IP地址" prop="ip">
          <el-input v-model="data.ip" placeholder="IP地址"/>
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
        <el-button :loading="saveBtnLoading" type="primary" @click="savetblsyslog"><svg-icon icon-class="save" style="margin-right: 5px;"/>保存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'tblsyslog',
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
        operation: ''
      },
      list: null,
      listLoading: false,
      listTotal: 0,
      data: {
        id: 0,
        userId: '',
        username: '',
        hostUrl: '',
        operation: '',
        params: '',
        httpMethod: '',
        classMethod: '',
        time: '',
        result: '',
        ip: '',
        createTime: '',
        isDel: ''
      },
      dataRule: {
        userId: [
          { required: true, message: '用户id不能为空', trigger: 'blur' }
        ],
        username: [
          { required: true, message: '用户名不能为空', trigger: 'blur' }
        ],
        hostUrl: [
          { required: true, message: '请求url不能为空', trigger: 'blur' }
        ],
        operation: [
          { required: true, message: '用户操作不能为空', trigger: 'blur' }
        ],
        params: [
          { required: true, message: '请求参数不能为空', trigger: 'blur' }
        ],
        httpMethod: [
          { required: true, message: 'http请求方法不能为空', trigger: 'blur' }
        ],
        classMethod: [
          { required: true, message: 'class请求方法不能为空', trigger: 'blur' }
        ],
        time: [
          { required: true, message: '执行时长(毫秒)不能为空', trigger: 'blur' }
        ],
        result: [
          { required: true, message: '返回参数不能为空', trigger: 'blur' }
        ],
        ip: [
          { required: true, message: 'IP地址不能为空', trigger: 'blur' }
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
      this.$store.dispatch('Listtblsyslog', this.filterForm ).then(resp => {
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
    savetblsyslog() {
      this.$refs['dataForm'].validate(valid => {
        if (valid) {
          this.$confirm('是否确定保存?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消'
          }).then(() => {
            this.saveBtnLoading = true
            this.$store.dispatch(this.newFlag ? 'Savetblsyslog' : 'Updatetblsyslog', this.data).then(resp => {
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
        this.$store.dispatch('Deletetblsyslog', data.id).then(resp => {
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
