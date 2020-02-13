<template>
  <div class="app-container">
    <div class="filter-container">
      <el-form ref="filterForm" :inline="true" size="mini">
        <el-form-item>
          <!--<el-form-item label="条件">-->
            <!--<el-input v-model="filterForm.searchKey"/>-->
          <!--</el-form-item>-->

          <el-form-item label="用户id">
            <el-input v-model="filterForm.userid"/>
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
      <el-table-column align="center" label="id">
        <template slot-scope="scope">
          {{ scope.row.id }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="用户id">
        <template slot-scope="scope">
          {{ scope.row.userid }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="关卡">
        <template slot-scope="scope">
          {{ scope.row.checkpoint }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="有效投注">
        <template slot-scope="scope">
          {{ scope.row.effectiveBetting }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="奖励">
        <template slot-scope="scope">
          {{ scope.row.reward }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="当前投注">
        <template slot-scope="scope">
          {{ scope.row.currentBetting }}
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
        <el-form-item label="用户id" prop="userid">
          <el-input v-model="data.userid" placeholder="用户id"/>
        </el-form-item>
        <el-form-item label="关卡" prop="checkpoint">
          <el-input v-model="data.checkpoint" placeholder="关卡"/>
        </el-form-item>
        <el-form-item label="有效投注" prop="effectiveBetting">
          <el-input v-model="data.effectiveBetting" placeholder="有效投注"/>
        </el-form-item>
        <el-form-item label="奖励" prop="reward">
          <el-input v-model="data.reward" placeholder="奖励"/>
        </el-form-item>
        <el-form-item label="当前投注" prop="currentBetting">
          <el-input v-model="data.currentBetting" placeholder="当前投注"/>
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
        <el-button :loading="saveBtnLoading" type="primary" @click="savetbldailyadventureawardgetrecord"><svg-icon icon-class="save" style="margin-right: 5px;"/>保存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'tbldailyadventureawardgetrecord',
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
        userid: ''
      },
      list: null,
      listLoading: false,
      listTotal: 0,
      data: {
        id: 0,
        userid: '',
        checkpoint: '',
        effectiveBetting: '',
        reward: '',
        currentBetting: '',
        note: '',
        createTime: '',
        isDel: ''
      },
      dataRule: {
        userid: [
          { required: true, message: '用户id不能为空', trigger: 'blur' }
        ],
        checkpoint: [
          { required: true, message: '关卡不能为空', trigger: 'blur' }
        ],
        effectiveBetting: [
          { required: true, message: '有效投注不能为空', trigger: 'blur' }
        ],
        reward: [
          { required: true, message: '奖励不能为空', trigger: 'blur' }
        ],
        currentBetting: [
          { required: true, message: '当前投注不能为空', trigger: 'blur' }
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
      this.$store.dispatch('Listtbldailyadventureawardgetrecord', this.filterForm ).then(resp => {
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
    savetbldailyadventureawardgetrecord() {
      this.$refs['dataForm'].validate(valid => {
        if (valid) {
          this.$confirm('是否确定保存?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消'
          }).then(() => {
            this.saveBtnLoading = true
            this.$store.dispatch(this.newFlag ? 'Savetbldailyadventureawardgetrecord' : 'Updatetbldailyadventureawardgetrecord', this.data).then(resp => {
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
        this.$store.dispatch('Deletetbldailyadventureawardgetrecord', data.id).then(resp => {
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
