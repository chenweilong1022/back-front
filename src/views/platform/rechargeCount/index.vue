<template>
  <div class="app-container">
    <div class="filter-container">
      <el-form ref="filterForm" :inline="true" :model="filterForm" size="mini">
        <el-form-item>
          <el-col :span="12">
            <el-form-item label="起始时间" label-width="100px" style="margin-bottom: 0px;">
              <el-date-picker v-model="filterForm.startDate" type="date" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="结束时间" label-width="100px" style="margin-bottom: 0px;">
              <el-date-picker v-model="filterForm.endDate" type="date" />
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="btn-form" @click="query">查询</el-button>
        </el-form-item>
      </el-form>
    </div>

    <el-table
      v-loading="listLoading"
      :data="list"
      :summary-method="getSummaries"
      size="mini"
      border
      fit
      show-summary
      highlight-current-row>
      <el-table-column align="center" label="日期时间">
        <template slot-scope="scope">
          {{ scope.row.orderDay }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="当日充值总计">
        <template slot-scope="scope">
          {{ scope.row.totalPay | moneyFilter }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="万通支付">
        <template slot-scope="scope">
          {{ scope.row.wanTongPay | moneyFilter }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="风云支付">
        <template slot-scope="scope">
          {{ scope.row.fengYunPay | moneyFilter }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="微信支付">
        <template slot-scope="scope">
          {{ scope.row.weixin | moneyFilter }}
        </template>
      </el-table-column>
    </el-table>
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
  name: 'RechargeCountPage',
  filters: {
    moneyFilter(money) {
      if (money) {
        return money / 100
      }
      return 0
    }
  },
  data() {
    return {
      filterForm: {
        startDate: startDate(),
        endDate: new Date()
      },
      list: null,
      listLoading: false
    }
  },
  created() {
    this.query()
  },
  methods: {
    query() {
      this.listLoading = true
      this.$store.dispatch('GetComplexRechargeCountByQry', this.filterForm).then(resp => {
        this.listLoading = false
        this.list = resp.data.dailyRechargeCountList
      }).catch(() => {
        this.listLoading = false
      })
    },
    getSummaries(param) {
      const { columns, data } = param
      const sums = []
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = '总计'
          return
        }
        const label = column.label
        let key
        if (label === '当日充值总计') {
          key = 'totalPay'
        } else if (label === '风云支付') {
          key = 'fengYunPay'
        } else if (label === '万通支付') {
          key = 'wanTongPay'
        } else if (label === '微信支付') {
          key = 'weixin'
        }
        const values = data.map(item => Number(item[key]))
        if (!values.every(value => isNaN(value))) {
          sums[index] = values.reduce((prev, curr) => {
            const value = Number(curr)
            if (!isNaN(value)) {
              return prev + curr / 100
            } else {
              return prev
            }
          }, 0)
        } else {
          sums[index] = 'NaN'
        }
      })

      return sums
    }
  }
}
</script>

<style scoped>

</style>
