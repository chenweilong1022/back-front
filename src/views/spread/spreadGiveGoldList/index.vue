<template>
  <div class="app-container">
    <div class="filter-container">
      <el-form ref="filterForm" :inline="true" :model="filterForm" size="mini">
        <el-form-item label="起始时间">
          <el-date-picker v-model="filterForm.startDate" type="date" />
        </el-form-item>
        <el-form-item label="结束时间">
          <el-date-picker v-model="filterForm.endDate" type="date" />
        </el-form-item>
        <el-form-item label="推广员ID">
          <el-input v-model="filterForm.spreadUserId" />
        </el-form-item>
        <el-form-item label="被赠送玩家ID">
          <el-input v-model="filterForm.playerId" />
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
      <el-table-column align="center" label="推广员ID">
        <template slot-scope="scope">
          {{ scope.row.spreadId }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="赠送前金币">
        <template slot-scope="scope">
          {{ scope.row.oldGold | moneyFilter }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="赠送金币">
        <template slot-scope="scope">
          {{ scope.row.giveGold | moneyFilter }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="被赠送玩家ID">
        <template slot-scope="scope">
          {{ scope.row.userId }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="被赠送玩家昵称">
        <template slot-scope="scope">
          {{ scope.row.nickName }}
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
  name: 'SpreadGiveGoldListPage',
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
        startDate: startDate(),
        endDate: new Date(),
        playerId: null,
        spreadUserId: null,
        pageNo: 1,
        pageSize: 10
      },
      list: null,
      listLoading: false,
      listTotal: 0
    }
  },
  created() {
    this.query()
  },
  methods: {
    query() {
      this.listLoading = true
      this.$store.dispatch('ListRecordSpreadGiveGoldByQry', this.filterForm).then(resp => {
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
