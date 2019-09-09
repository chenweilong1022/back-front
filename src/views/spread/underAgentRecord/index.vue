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
      <el-table-column align="right" label="用户信息">
        <template slot-scope="scope">
          <el-row>
            <el-col :span="12">用户ID：</el-col>
            <el-col :span="12">{{ scope.row.userId }}</el-col>
          </el-row>
          <el-row>
            <el-col :span="12">用户账号：</el-col>
            <el-col :span="12">{{ scope.row.userAccount }}</el-col>
          </el-row>
          <el-row>
            <el-col :span="12">昵称：</el-col>
            <el-col :span="12">{{ scope.row.nickname }}</el-col>
          </el-row>
        </template>
      </el-table-column>
      <el-table-column align="right" label="结算信息">
        <template slot-scope="scope">
          <el-row>
            <el-col :span="12">代理级别：</el-col>
            <el-col :span="12">{{ scope.row.agentLevel }}</el-col>
          </el-row>
          <el-row>
            <el-col :span="12">周期佣金：</el-col>
            <el-col :span="12">每万元 {{ scope.row.ratio ? scope.row.ratio : 0 }} 元</el-col>
          </el-row>
          <el-row>
            <el-col :span="12">返佣总金额：</el-col>
            <el-col :span="12"><label>{{ scope.row.totalRebate | moneyFilter }}</label></el-col>
          </el-row>
          <el-row>
            <el-col :span="12">结算时间：</el-col>
            <el-col :span="12">{{ scope.row.agentTime }}</el-col>
          </el-row>
        </template>
      </el-table-column>
      <el-table-column align="right" label="业绩信息">
        <template slot-scope="scope">
          <el-row>
            <el-col :span="12">业绩总额：</el-col>
            <el-col :span="12">{{ scope.row.totalPerformance | moneyFilter }}</el-col>
          </el-row>
          <el-row>
            <el-col :span="12">自营业绩：</el-col>
            <el-col :span="12">{{ scope.row.performance | moneyFilter }}</el-col>
          </el-row>
          <el-row>
            <el-col :span="12">直营业绩：</el-col>
            <el-col :span="12">{{ scope.row.directPerformance | moneyFilter }}</el-col>
          </el-row>
          <el-row>
            <el-col :span="12">团队业绩：</el-col>
            <el-col :span="12">{{ scope.row.teamPerformance | moneyFilter }}</el-col>
          </el-row>
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
  name: 'UnderAgentRecord',
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
    },
    period: function() {
      return this.$route.query.period
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
      this.$store.dispatch('ListAgentRecordByQry', { ...this.filterForm, superId: this.superId, period: this.period }).then(resp => {
        this.list = resp.data
        this.listTotal = resp.totalCount
        this.listLoading = false
      }).catch(() => {
        this.listLoading = false
      })
    },
    handleClick(superId) {
      const data = Object.assign({}, { superId, period: this.period })
      this.$router.replace({ path: '/spread/underAgentRecord', query: data })
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
