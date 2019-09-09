<template>
  <div class="app-container">
    <div class="filter-container">
      <el-form ref="filterForm" :inline="true" :model="filterForm" :rules="filterRules" size="mini">
        <el-form-item label="玩家ID" prop="playerId">
          <el-input v-model="filterForm.playerId"/>
        </el-form-item>
        <el-form-item label="起始时间" prop="startDate">
          <el-date-picker v-model="filterForm.startDate" type="date" />
        </el-form-item>
        <el-form-item label="结束时间" prop="endDate">
          <el-date-picker v-model="filterForm.endDate" type="date" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="btn-form" @click="query">查询</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div class="filter-container">
      <el-form size="mini">
        <el-form-item label="时间段提现汇总">
          <label>{{ withdrawTotal | moneyFilter }}</label>
        </el-form-item>
        <el-form-item>
          <label style="color:red; font-size: 13px">注:提现汇总只计算成功打款的金额，如果查询玩家ID则提现汇总该玩家的金额，如果要查某一天的记录，起始时间和结束时间都为同一天即可.</label>
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
      <el-table-column align="center" label="订单号">
        <template slot-scope="scope">
          {{ scope.row.outtradeno }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="玩家ID">
        <template slot-scope="scope">
          {{ scope.row.userid }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="玩家昵称">
        <template slot-scope="scope">
          {{ scope.row.nickName }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="订单金额">
        <template slot-scope="scope">
          {{ scope.row.orderprice | moneyFilter }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="订单状态">
        <template slot-scope="scope">
          <el-tag :type="scope.row | state">{{ scope.row | stateTitle }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" label="下单时间">
        <template slot-scope="scope">
          {{ scope.row.orderTime }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="完成时间">
        <template slot-scope="scope">
          {{ scope.row.dealTime === '2000-01-01 00:00:00'?'':scope.row.dealTime }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="错误码">
        <template slot-scope="scope">
          {{ scope.row.error }}
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
  name: 'WithdrawRecordPage',
  filters: {
    moneyFilter(money) {
      if (money) {
        return money
      }
      return 0
    },
    state(data) {
      const error = data.error
      const complete = data.completetime
      if (!error && !complete) {
        return ''
      } else if (complete) {
        return 'success'
      } else if (error) {
        return 'danger'
      }
    },
    stateTitle(data) {
      const error = data.error
      const complete = data.completetime
      if (!error && !complete) {
        return '打款中'
      } else if (complete) {
        return '打款成功'
      } else if (error) {
        return '打款失败'
      }
    }
  },
  data() {
    return {
      filterForm: {
        playerId: null,
        startDate: startDate(),
        endDate: new Date(),
        pageNo: 1,
        pageSize: 10
      },
      filterRules: {
        startDate: [{ required: true, trigger: 'blur', message: '必填项' }],
        endDate: [{ required: true, trigger: 'blur', message: '必填项' }]
      },
      list: null,
      listLoading: false,
      listTotal: 0,
      withdrawTotal: null
    }
  },
  created() {
    this.loadPageData()
  },
  methods: {
    loadPageData() {
      this.listLoading = true
      this.$store.dispatch('ListPlayerWithdrawRecordByQry', this.filterForm).then(resp => {
        this.list = resp.data
        this.listTotal = resp.totalCount
        this.listLoading = false
      }).catch(() => {
        this.listLoading = false
      })
      this.$store.dispatch('GetTotalPlayerWithdrawRecordByQry', this.filterForm).then(resp => {
        this.withdrawTotal = resp.data
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
