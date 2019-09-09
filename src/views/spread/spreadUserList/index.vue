<template>
  <div class="app-container">
    <div class="filter-container">
      <el-form ref="filterForm" :inline="true" :model="filterForm" size="mini">
        <el-form-item label="推广员ID">
          <el-input v-model="filterForm.spreadUserId"/>
        </el-form-item>
        <el-form-item label="父推广员ID">
          <el-input v-model="filterForm.superId"/>
        </el-form-item>
        <el-form-item label="推广员状态">
          <el-select v-model="filterForm.ratio" class="filter-item" placeholder="请选择" value="">
            <el-option v-for="item in ratios" :key="item.key" :label="item.title" :value="item.key"/>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="btn-form" @click="query">查询</el-button>
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
      <el-table-column align="center" label="推广员ID">
        <template slot-scope="scope">
          {{ scope.row.id }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="登录名">
        <template slot-scope="scope">
          {{ scope.row.loginName }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="推广员名称">
        <template slot-scope="scope">
          {{ scope.row.showName }}
        </template>
      </el-table-column>
      <!--<el-table-column align="center" label="帐号钻石">-->
        <!--<template slot-scope="scope">-->
          <!--{{ scope.row.diamond | moneyFilter }}-->
        <!--</template>-->
      <!--</el-table-column>-->
      <el-table-column align="center" label="帐号金币">
        <template slot-scope="scope">
          {{ scope.row.gold | moneyFilter }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="推广比例">
        <template slot-scope="scope">
          {{ scope.row.ratio + '%' }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="父级推广员">
        <template slot-scope="scope">
          {{ scope.row.parentId }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="直属下线推广员">
        <template slot-scope="scope">
          {{ scope.row.underSpreadCount == null ? '0' : scope.row.underSpreadCount }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="推荐玩家个数">
        <template slot-scope="scope">
          {{ scope.row.playerCount == null ? '0' : scope.row.playerCount }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" min-width="100">
        <template slot-scope="scope">
          <!--<el-button type="danger" size="mini" @click="showResetDiamondPage(scope.row)">削减钻石</el-button>-->
          <el-button v-if="scope.row.ratio === 0" type="text" size="mini" @click="showResetRatioPage(scope.row)">重置比率</el-button>
          <el-button v-if="scope.row.ratio !== 0" type="text" size="mini" @click="cancelSpreadUser(scope.row.id)">取消资格</el-button>
          <el-button type="text" size="mini" @click="resetPassword(scope.row.id)">重置密码</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="pagination-container">
      <el-pagination :current-page="filterForm.pageNo" :page-sizes="[10,20,30, 50]" :page-size="filterForm.pageSize" :total="listTotal" background layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange" @current-change="handleCurrentChange"/>
    </div>

    <el-dialog :visible.sync="dialogSetRatioVisible" title="设置比率" width="400px">
      <el-form ref="spreadForm" :model="spreadUser" label-position="left" style="margin-left:30px;">
        <el-form-item label="推广员ID">
          <label>{{ spreadUser.id }}</label>
        </el-form-item>
        <el-form-item label="推广员昵称">
          <label>{{ spreadUser.showName }}</label>
        </el-form-item>
        <el-form-item label="原有比率">
          <label>{{ spreadUser.ratio }}</label>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogSetRatioVisible = false">取消</el-button>
        <el-button :loading="resetBtnLoading" type="primary" @click="resetRatio">重置比率</el-button>
      </div>
    </el-dialog>

    <el-dialog :visible.sync="dialogSetDiamondVisible" title="削减钻石" width="400px">
      <el-form ref="reduceSpreadForm" :model="reduceSpreadUser" label-position="left" style="margin-left:30px;">
        <el-form-item label="推广员ID">
          <label>{{ reduceSpreadUser.id }}</label>
        </el-form-item>
        <el-form-item label="推广员昵称">
          <label>{{ reduceSpreadUser.showName }}</label>
        </el-form-item>
        <el-form-item label="原有钻石">
          <label>{{ reduceSpreadUser.diamond }}</label>
        </el-form-item>
        <el-form-item label="削减钻石">
          <el-input v-model="reduceSpreadUser.reduceDiamond"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogSetDiamondVisible = false">取消</el-button>
        <el-button :loading="reduceBtnLoading" type="primary" @click="reduceDiamond">削减钻石</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'SpreadUserListPage',
  filters: {
    moneyFilter(money) {
      if (money) {
        return money
      }
      return 0
    }
  },
  data() {
    return {
      filterForm: {
        spreadUserId: null,
        superId: null,
        ratio: 1,
        pageNo: 1,
        pageSize: 10
      },
      ratios: [
        { key: 1, title: '全部' },
        { key: 0, title: '撤销资格' }
      ],
      list: null,
      listLoading: false,
      listTotal: 0,
      dialogSetRatioVisible: false,
      spreadUser: {},
      resetBtnLoading: false,
      dialogSetDiamondVisible: false,
      reduceSpreadUser: {},
      reduceBtnLoading: false
    }
  },
  created() {
    this.query()
  },
  methods: {
    query() {
      this.listLoading = true
      this.$store.dispatch('ListSpreadUserByQry', this.filterForm).then(resp => {
        this.list = resp.data
        this.listTotal = resp.totalCount
        this.listLoading = false
      }).catch(() => {
        this.listLoading = false
      })
    },
    showResetRatioPage(data) {
      this.dialogSetRatioVisible = true
      this.spreadUser = data
    },
    resetRatio() {
      this.resetBtnLoading = true
      this.$store.dispatch('ResetSpreadUserRatio', this.spreadUser).then(resp => {
        this.resetBtnLoading = false
        this.dialogSetRatioVisible = false
        this.$message({
          message: resp.msg,
          type: 'success'
        })
        this.query()
      }).catch(() => {
        this.resetBtnLoading = false
      })
    },
    showResetDiamondPage(data) {
      this.dialogSetDiamondVisible = true
      this.reduceSpreadUser = data
    },
    reduceDiamond() {
      this.reduceBtnLoading = true
      this.$store.dispatch('ReduceSpreadUserDiamond', {
        id: this.reduceSpreadUser.id,
        diamond: this.reduceSpreadUser.diamond - this.reduceSpreadUser.reduceDiamond,
        reduceDiamond: this.reduceSpreadUser.reduceDiamond
      }).then(resp => {
        this.reduceBtnLoading = false
        this.dialogSetDiamondVisible = false
        this.$message({
          message: resp.msg,
          type: 'success'
        })
        this.query()
      }).catch(() => {
        this.reduceBtnLoading = false
      })
    },
    cancelSpreadUser(id) {
      this.$store.dispatch('CancelSpreadUserById', id).then(resp => {
        this.$message({
          message: resp.msg,
          type: 'success'
        })
        this.query()
      })
    },
    resetPassword(id) {
      this.$store.dispatch('ResetSpreadUserPassword', { id }).then(resp => {
        this.$message({
          message: resp.msg,
          type: 'success'
        })
        this.query()
      })
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
