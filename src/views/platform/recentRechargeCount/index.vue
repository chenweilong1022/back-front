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
      <el-table-column align="center" label="充值日期">
        <template slot-scope="scope">
          {{ scope.row.recordDate }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="充值渠道名称1" prop="channelName1">
        <template slot-scope="scope">
          {{ scope.row.channelName1 }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="充值渠道统计1" prop="channelCount1">
        <template slot-scope="scope">
          {{ scope.row.channelCount1 | moneyFilter }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="充值渠道名称2" prop="channelName2">
        <template slot-scope="scope">
          {{ scope.row.channelName2 }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="充值渠道统计2" prop="channelCount2">
        <template slot-scope="scope">
          {{ scope.row.channelCount2 | moneyFilter }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="充值渠道名称3" prop="channelName3">
        <template slot-scope="scope">
          {{ scope.row.channelName3 }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="充值渠道统计3" prop="channelCount3">
        <template slot-scope="scope">
          {{ scope.row.channelCount3 | moneyFilter }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="自动充值统计" prop="recharge">
        <template slot-scope="scope">
          {{ scope.row.recharge | moneyFilter }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="提现统计" prop="withdraw">
        <template slot-scope="scope">
          {{ scope.row.withdraw | moneyFilter }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="一键赠送" prop="gift">
        <template slot-scope="scope">
          {{ scope.row.gift | moneyFilter }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="分享赠送" prop="share">
        <template slot-scope="scope">
          {{ scope.row.share | moneyFilter }}
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
  name: 'RecentRechargeCount',
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
      this.$store.dispatch('ListRecentDaysRechargeCountByQry', this.filterForm).then(resp => {
        this.listLoading = false
        this.list = resp.data
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
        const values = data.map(item => Number(item[column.property]))
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
