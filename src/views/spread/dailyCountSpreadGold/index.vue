<template>
  <div class="app-container">
    <div class="filter-container">
      <el-form ref="filterForm" :inline="true" :model="filterForm" size="mini">
        <el-form-item label="日期">
          <el-date-picker v-model="filterForm.queryDate" type="date" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="btn-form" @click="query">查询</el-button>
        </el-form-item>
      </el-form>
    </div>

    <label>只显示最近30天记录</label>
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
      <el-table-column align="center" label="日税收汇总">
        <template slot-scope="scope">
          {{ scope.row.dayTaxGold | moneyFilter }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="日提成汇总">
        <template slot-scope="scope">
          {{ scope.row.daySpreadGold | moneyFilter }}
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'DailyCountSpreadGoldPage',
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
        queryDate: new Date()
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
      this.$store.dispatch('ListDailyCountSpreadGoldRecordByQry', this.filterForm).then(resp => {
        this.list = resp.data
        this.listLoading = false
      }).catch(() => {
        this.listLoading = false
      })
    }
  }
}
</script>

<style scoped>

</style>
