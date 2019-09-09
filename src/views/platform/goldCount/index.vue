<template>
  <div class="app-container">
    <div class="filter-container">
      <el-form ref="filterForm" :inline="true" :model="goldCountSum" size="mini">
        <el-form-item label="消耗汇总">
          <label>{{ goldCountSum.totalTax }}</label>
        </el-form-item>
        <el-form-item label="金币增加">
          <label>{{ goldCountSum.totalInGold }}</label>
        </el-form-item>
      </el-form>
    </div>
    <div class="filter-container">
      <el-form ref="filterForm" :inline="true" :model="filterForm" size="mini">
        <el-form-item label="起始时间">
          <el-date-picker v-model="filterForm.startDate" type="date" />
        </el-form-item>
        <el-form-item label="结束时间">
          <el-date-picker v-model="filterForm.endDate" type="date" />
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
      <el-table-column align="center" label="日期时间">
        <template slot-scope="scope">
          {{ scope.row.recordTime }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="日总消耗数">
        <template slot-scope="scope">
          {{ scope.row.totalTax }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="日转账税">
        <template slot-scope="scope">
          {{ scope.row.dayTransferTax }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="日游戏税">
        <template slot-scope="scope">
          {{ scope.row.dayGameTax }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="日增加金币">
        <template slot-scope="scope">
          {{ scope.row.totalInGold }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="日充值金币">
        <template slot-scope="scope">
          {{ scope.row.dayPayGold }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="日赠送金币">
        <template slot-scope="scope">
          {{ scope.row.dayFreeGold }}
        </template>
      </el-table-column>
    </el-table>

    <div class="pagination-container">
      <el-pagination :current-page="filterForm.pageNo" :page-sizes="[10,20,30, 50]" :page-size="filterForm.pageSize" :total="listTotal" background layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange" @current-change="handleCurrentChange"/>
    </div>
  </div>
</template>

<script>
function startDate() {
  const today = new Date()
  const start_milliseconds = today.getTime() - 6 * 60 * 60 * 24 * 1000

  const startDay = new Date()
  startDay.setTime(start_milliseconds)

  const strYear = startDay.getFullYear()
  const strDay = startDay.getDate()
  let strMonth = startDay.getMonth() + 1
  if (strMonth < 10) {
    strMonth = '0' + strMonth
  }
  return strYear + '-' + strMonth + '-' + strDay
}
export default {
  name: 'GoldCountPage',
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
      goldCountSum: {},
      filterForm: {
        startDate: startDate(),
        endDate: new Date(),
        pageNo: 1,
        pageSize: 10
      },
      list: null,
      listLoading: false,
      listTotal: 0
    }
  },
  created() {
    this.querySum()
    this.query()
  },
  methods: {
    querySum() {
      this.$store.dispatch('GetDailyGoldCountSumByQry', this.filterForm).then(resp => {
        const data = resp.data
        this.goldCountSum = {
          totalTax: data.totalTax === undefined ? 0 : data.totalTax,
          totalInGold: data.totalInGold === undefined ? 0 : data.totalInGold
        }
      })
    },
    query() {
      this.listLoading = true
      this.$store.dispatch('ListDailyGoldCountByQry', this.filterForm).then(resp => {
        this.list = resp.data
        this.listTotal = resp.totalCount
        this.listLoading = false
      }).catch(() => {
        this.listLoading = false
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
