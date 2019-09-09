<template>
  <div class="app-container">
    <div class="filter-container">
      <el-form ref="filterForm" :inline="true" :model="filterForm" size="small">
        <el-form-item>
          <el-button type="primary" icon="el-icon-refresh" class="btn-form" @click="query">刷新</el-button>
        </el-form-item>
      </el-form>
    </div>

    <el-table
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row>
      <el-table-column align="center" label="玩家信息">
        <template slot-scope="scope">
          {{ scope.row.nickname }}({{ scope.row.showId }})
        </template>
      </el-table-column>
      <el-table-column align="center" label="游戏名称">
        <template slot-scope="scope">
          {{ scope.row.gameName }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="流水量" prop="flowVolume">
        <template slot-scope="scope">
          {{ scope.row.flowVolume | moneyFilter }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="税收总和" prop="totalTax">
        <template slot-scope="scope">
          {{ scope.row.totalTax | moneyFilter }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="游戏输赢" prop="winningMoney">
        <template slot-scope="scope">
          <label :style="scope.row.winningMoney > 0 ? 'color: red;' : 'color: green;'">{{ scope.row.winningMoney | moneyFilter }}</label>
        </template>
      </el-table-column>
    </el-table>

    <div class="pagination-container">
      <el-pagination :current-page.sync="filterForm.pageNo" :page-sizes="[10,20,30, 50]" :page-size="filterForm.pageSize" :total="listTotal" background layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange" @current-change="handleCurrentChange"/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'WinningDetail',
  filters: {
    moneyFilter(money) {
      if (money) {
        return (money / 100).toFixed(2)
      }
      return (0).toFixed(2)
    }
  },
  data() {
    return {
      filterForm: {
        showId: null,
        startTime: null,
        endTime: null,
        pageNo: 1,
        pageSize: 10
      },
      list: null,
      listLoading: false,
      listTotal: 10
    }
  },
  mounted() {
    this.loadPageData()
  },
  methods: {
    loadPageData() {
      this.filterForm = Object.assign({}, this.filterForm, {
        showId: this.$route.query.showId,
        roomId: this.$route.query.roomId,
        startTime: this.$route.query.startTime,
        endTime: this.$route.query.endTime
      })
      this.listLoading = true
      this.$store.dispatch('ListUserGameDetailByQry', this.filterForm).then(resp => {
        this.list = resp.data
        this.listTotal = resp.totalCount
        this.listLoading = false
      }).catch(() => {
        this.listLoading = false
      })
    },
    query() {
      this.$refs['filterForm'].validate(valid => {
        if (valid) {
          this.loadPageData()
        }
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
