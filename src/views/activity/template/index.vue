<template>
  <div class="app-container">
    <div class="filter-container">
      <el-form ref="filterForm" :inline="true" size="mini">
        <el-form-item>
          <!--<el-form-item label="条件">-->
            <!--<el-input v-model="filterForm.searchKey"/>-->
          <!--</el-form-item>-->
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
      <el-table-column align="center" label="领取日期">
        <template slot-scope="scope">
          {{ scope.row.recordTimeCurrentTime || '合计' }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="用户id">
        <template slot-scope="scope">
          {{ scope.row.userid || '-' }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="类型">
        <template slot-scope="scope">
          {{ scope.row.reason || '-' }}
        </template>
      </el-table-column>
      <!--<el-table-column align="center" label="">-->
        <!--<template slot-scope="scope">-->
          <!--{{ scope.row.roomid }}-->
        <!--</template>-->
      <!--</el-table-column>-->
      <!--<el-table-column align="center" label="">-->
        <!--<template slot-scope="scope">-->
          <!--{{ scope.row.tableid }}-->
        <!--</template>-->
      <!--</el-table-column>-->
      <!--<el-table-column align="center" label="">-->
        <!--<template slot-scope="scope">-->
          <!--{{ scope.row.seatid }}-->
        <!--</template>-->
      <!--</el-table-column>-->
      <el-table-column align="center" label="金币">
        <template slot-scope="scope">
          {{ scope.row.changeGold || '-' }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="之前金币">
        <template slot-scope="scope">
          {{ scope.row.beginGold || '-' }}
        </template>
      </el-table-column>
      <!--<el-table-column align="center" label="">-->
        <!--<template slot-scope="scope">-->
          <!--{{ scope.row.taxGold }}-->
        <!--</template>-->
      <!--</el-table-column>-->
      <el-table-column align="center" label="之后金币">
        <template slot-scope="scope">
          {{ scope.row.endGold || '-' }}
        </template>
      </el-table-column>
      <!--<el-table-column align="center" label="备注">-->
        <!--<template slot-scope="scope">-->
          <!--{{ scope.row.note }}-->
        <!--</template>-->
      <!--</el-table-column>-->
      <el-table-column align="center" label="变动时间">
        <template slot-scope="scope">
          {{ scope.row.recordTime || '-' }}
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
        <el-form-item label="0.game; 1.flee?" prop="reason">
          <el-input v-model="data.reason" placeholder="0.game; 1.flee?"/>
        </el-form-item>
        <el-form-item label="" prop="roomid">
          <el-input v-model="data.roomid" placeholder=""/>
        </el-form-item>
        <el-form-item label="" prop="tableid">
          <el-input v-model="data.tableid" placeholder=""/>
        </el-form-item>
        <el-form-item label="" prop="seatid">
          <el-input v-model="data.seatid" placeholder=""/>
        </el-form-item>
        <el-form-item label="金币变化前的值" prop="beginGold">
          <el-input v-model="data.beginGold" placeholder="金币变化前的值"/>
        </el-form-item>
        <el-form-item label="金币变化值" prop="changeGold">
          <el-input v-model="data.changeGold" placeholder="金币变化值"/>
        </el-form-item>
        <el-form-item label="" prop="taxGold">
          <el-input v-model="data.taxGold" placeholder=""/>
        </el-form-item>
        <el-form-item label="end = begin + change - tax" prop="endGold">
          <el-input v-model="data.endGold" placeholder="end = begin + change - tax"/>
        </el-form-item>
        <el-form-item label="备注" prop="note">
          <el-input v-model="data.note" placeholder="备注"/>
        </el-form-item>
        <el-form-item label="" prop="recordTime">
          <el-input v-model="data.recordTime" placeholder=""/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button icon="el-icon-close" @click="dialogNewOrEditVisible = false">取消</el-button>
        <el-button :loading="saveBtnLoading" type="primary" @click="savetblgamegold"><svg-icon icon-class="save" style="margin-right: 5px;"/>保存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'template',
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
        gameGoldReason: '',
        currentDates: new Date()
      },
      list: null,
      listLoading: false,
      listTotal: 0,
      data: {
        userid: 0,
        reason: '',
        roomid: '',
        tableid: '',
        seatid: '',
        beginGold: '',
        changeGold: '',
        taxGold: '',
        endGold: '',
        note: '',
        recordTime: ''
      },
      dataRule: {
        reason: [
          { required: true, message: '0.game; 1.flee?不能为空', trigger: 'blur' }
        ],
        roomid: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        tableid: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        seatid: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        beginGold: [
          { required: true, message: '金币变化前的值不能为空', trigger: 'blur' }
        ],
        changeGold: [
          { required: true, message: '金币变化值不能为空', trigger: 'blur' }
        ],
        taxGold: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        endGold: [
          { required: true, message: 'end = begin + change - tax不能为空', trigger: 'blur' }
        ],
        note: [
          { required: true, message: '备注不能为空', trigger: 'blur' }
        ],
        recordTime: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ]
      },
      dialogNewOrEditVisible: false,
      newFlag: true,
      saveBtnLoading: false
    }
  },
  // mounted() {
  //   this.query()
  // },
  methods: {
    query() {
      this.listLoading = true
      this.$store.dispatch('Listtblgamegold', this.filterForm ).then(resp => {
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
    savetblgamegold() {
      this.$refs['dataForm'].validate(valid => {
        if (valid) {
          this.$confirm('是否确定保存?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消'
          }).then(() => {
            this.saveBtnLoading = true
            this.$store.dispatch(this.newFlag ? 'Savetblgamegold' : 'Updatetblgamegold', this.data).then(resp => {
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
        this.$store.dispatch('Deletetblgamegold', data.id).then(resp => {
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
