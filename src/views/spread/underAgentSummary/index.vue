<template>
  <div class="app-container">
    <div class="filter-container">
      <el-form ref="filterForm" :inline="true" :model="filterForm" size="mini">
        <el-form-item label="用户ID">
          <label>{{ superId }}</label>
        </el-form-item>
        <el-form-item label="直属下线">
          <label>{{ listTotal }} 人</label>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-refresh" class="btn-form" @click="query">刷新</el-button>
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
      <el-table-column align="center" label="用户ID">
        <template slot-scope="scope">
          {{ scope.row.showId }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="用户账号">
        <template slot-scope="scope">
          {{ scope.row.userAccount }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="昵称">
        <template slot-scope="scope">
          {{ scope.row.nickname }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="返佣总金额">
        <template slot-scope="scope">
          {{ scope.row.totalRebate | moneyFilter }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="业绩总额">
        <template slot-scope="scope">
          {{ scope.row.totalPerformance | moneyFilter }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="自营业绩">
        <template slot-scope="scope">
          {{ scope.row.performance | moneyFilter }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="直营业绩">
        <template slot-scope="scope">
          {{ scope.row.directPerformance | moneyFilter }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="团队业绩">
        <template slot-scope="scope">
          {{ scope.row.teamPerformance | moneyFilter }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="直属下线">
        <template slot-scope="scope">
          <i style="text-decoration: underline; font-style: normal; font-weight: bold;">{{ scope.row.underCount }}</i>人
          <el-button v-if="scope.row.underCount !== 0" type="text" icon="el-icon-sort-down" @click="handleClick(scope.row.showId)" />
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
  name: 'UnderAgentSummary',
  filters: {
    moneyFilter(money) {
      if (money) {
        return (money / 100).toFixed(2)
      }
      return 0
    }
  },
  data() {
    return {
      filterForm: {
        playerId: null,
        account: null,
        pageNo: 1,
        pageSize: 10
      },
      list: null,
      listLoading: false,
      listTotal: 10
    }
  },
  computed: {
    superId: function() {
      return this.$route.query.superId
    }
  },
  watch: {
    superId: function() {
      this.query()
    }
  },
  mounted() {
    this.query()
  },
  methods: {
    query() {
      this.listLoading = true
      this.$store.dispatch('ListAgentRecordSummaryByQry', { ...this.filterForm, superId: this.superId }).then(resp => {
        this.list = resp.data
        this.listTotal = resp.totalCount
        this.listLoading = false
      }).catch(() => {
        this.listLoading = false
      })
    },
    handleClick(superId) {
      this.$router.replace({ path: '/spread/underAgentSummary', query: { superId }})
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

<style type="text/css" lang="scss" scoped>
  .filter-container {
    padding-bottom: 10px;
    .filter-item {
      display: inline-block;
      vertical-align: middle;
      margin-bottom: 10px;
    }
  }
</style>
