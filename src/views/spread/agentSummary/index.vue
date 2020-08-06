<template>
  <div class="app-container">
    <div class="filter-container">
      <el-form ref="filterForm" :inline="true" :model="filterForm" size="mini">
        <el-form-item label="用户ID">
          <el-input v-model="filterForm.showId"/>
        </el-form-item>
        <el-form-item label="用户帐号">
          <el-input v-model="filterForm.account" />
        </el-form-item>
        <el-form-item label="查询类型">
          <el-radio-group v-model="filterForm.queryType">
            <el-radio-button label="seven">近7天</el-radio-button>
            <el-radio-button label="fifteen">近15天</el-radio-button>
            <el-radio-button label="thirty">近30天</el-radio-button>
            <el-radio-button label="currentMonth">当月</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" class="btn-form" @click="query">查询</el-button>
        </el-form-item>
      </el-form>
    </div>

    <el-table
      v-loading="listLoading"
      :data="list"
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

      <el-table-column align="center" label="一代业绩">
        <template slot-scope="scope">
          {{ scope.row.firstBonus | moneyFilter }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="一代流水">
        <template slot-scope="scope">
          {{ scope.row.firstPerformance | moneyFilter }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="二代业绩">
        <template slot-scope="scope">
          {{ scope.row.secondBonus | moneyFilter }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="二代流水">
        <template slot-scope="scope">
          {{ scope.row.secondPerformance | moneyFilter }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="三代业绩">
        <template slot-scope="scope">
          {{ scope.row.thirdBonus | moneyFilter }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="三代流水">
        <template slot-scope="scope">
          {{ scope.row.thirdPerformance | moneyFilter }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="无限代业绩">
        <template slot-scope="scope">
          {{ scope.row.unlimitBonus | moneyFilter }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="无限代流水">
        <template slot-scope="scope">
          {{ scope.row.unlimitPerformance | moneyFilter }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="团队业绩">
        <template slot-scope="scope">
          {{ scope.row.totalBonus | moneyFilter }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="团队流水">
        <template slot-scope="scope">
          {{ scope.row.totalPerformance | moneyFilter }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="直属下线">
        <template slot-scope="scope">
          <i style="text-decoration: underline; font-style: normal; font-weight: bold;">{{ scope.row.underCount }}</i>人
          <el-button v-if="scope.row.underCount !== 0" type="text" icon="el-icon-sort-down" @click="handleClick(scope.row)" />
        </template>
      </el-table-column>
    </el-table>

    <div class="pagination-container">
      <el-pagination :current-page.sync="filterForm.pageNo" :page-sizes="[10,20,30, 50]" :page-size="filterForm.pageSize" :total="listTotal" background layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange" @current-change="handleCurrentChange"/>
    </div>

    <el-table
      v-loading="listLoading"
      :data="tableTotal"
      style="margin-top: 30px;"
      size="mini"
      border
      fit
      :key="Math.random()"
      highlight-current-row>
      <el-table-column align="center" label="合计类型">
        <template slot-scope="scope">
          {{ scope.row.type }}
        </template>
      </el-table-column>


      <el-table-column align="center" label="一代业绩">
        <template slot-scope="scope">
          {{ scope.row.firstBonus | moneyFilter }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="一代流水">
        <template slot-scope="scope">
          {{ scope.row.firstPerformance | moneyFilter }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="二代业绩">
        <template slot-scope="scope">
          {{ scope.row.secondBonus | moneyFilter }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="二代流水">
        <template slot-scope="scope">
          {{ scope.row.secondPerformance | moneyFilter }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="三代业绩">
        <template slot-scope="scope">
          {{ scope.row.thirdBonus | moneyFilter }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="三代流水">
        <template slot-scope="scope">
          {{ scope.row.thirdPerformance | moneyFilter }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="无限代业绩">
        <template slot-scope="scope">
          {{ scope.row.unlimitBonus | moneyFilter }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="无限代流水">
        <template slot-scope="scope">
          {{ scope.row.unlimitPerformance | moneyFilter }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="团队业绩">
        <template slot-scope="scope">
          {{ scope.row.totalBonus | moneyFilter }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="团队流水">
        <template slot-scope="scope">
          {{ scope.row.totalPerformance | moneyFilter }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="总代理人数">
        <template slot-scope="scope">
          {{ scope.row.totalAgentCount }}
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'AgentSummary',
  filters: {
    moneyFilter(money) {
      if (money) {
        return (money / 100).toFixed(2)
      }
      return 0
    },
    logTypeFilter(logType) {
      if (logType === 0) {
        return '下线增加'
      } else if (logType === 1) {
        return '推广佣金'
      } else if (logType === 2) {
        return '下线分红'
      } else if (logType === 3) {
        return '佣金结算'
      }
    }
  },
  data() {
    return {
      filterForm: {
        showId: null,
        account: null,
        queryType: 'seven',
        pageNo: 1,
        pageSize: 10
      },
      list: null,
      listLoading: false,
      listTotal: 10,
      tableTotal: [
        { type: '小计', totalAllPerformance: 0, totalRebate: 0, totalPerformance: 0, totalDirectPerformance: 0, totalTeamPerformance: 0, totalAgentCount: 0 },
        { type: '总计', totalAllPerformance: 0, totalRebate: 0, totalPerformance: 0, totalDirectPerformance: 0, totalTeamPerformance: 0, totalAgentCount: 0 }
      ]
    }
  },
  created() {
    this.query()
  },
  methods: {
    query() {
      this.listLoading = true
      this.$store.dispatch('ListAgentRecordSummaryByQry', { ...this.filterForm, superId: this.$route.query.superId }).then(resp => {
        this.list = resp.data
        this.listTotal = resp.totalCount
        this.getSummaries()
      }).catch(() => {
        this.listLoading = false
      })
    },
    getSummaries() {
      // 小计
      if (this.list) {
        const data = this.tableTotal[0]
        let firstPerformance = 0
        let secondPerformance = 0
        let thirdPerformance = 0
        let unlimitPerformance = 0
        let firstBonus = 0
        let secondBonus = 0
        let thirdBonus = 0
        let unlimitBonus = 0
        let totalBonus = 0
        let totalPerformance = 0

        let persons = []
        this.list.forEach(item => {
          if (persons.indexOf(item.userId) < 0) {
            persons = persons.concat(item.userId)
          }
          firstPerformance += item.firstPerformance
          secondPerformance += item.secondPerformance
          thirdPerformance += item.thirdPerformance
          unlimitPerformance += item.unlimitPerformance
          firstBonus += item.firstBonus
          secondBonus += item.secondBonus
          thirdBonus += item.thirdBonus
          unlimitBonus += item.unlimitBonus
          totalBonus += item.totalBonus
          totalPerformance += item.totalPerformance
        })
        data.firstPerformance = firstPerformance
        data.secondPerformance = secondPerformance
        data.thirdPerformance = thirdPerformance
        data.unlimitPerformance = unlimitPerformance
        data.firstBonus = firstBonus
        data.secondBonus = secondBonus
        data.thirdBonus = thirdBonus
        data.unlimitBonus = unlimitBonus
        data.totalAgentCount = persons.length
        data.totalBonus = totalBonus
        data.totalPerformance = totalPerformance
      }

      // 总计
      this.$store.dispatch('GetAgentRecordSummary', {}).then(resp => {
        const summary = resp.data
        const data = this.tableTotal[1]

        data.firstPerformance = summary.firstPerformance
        data.secondPerformance = summary.secondPerformance
        data.thirdPerformance = summary.thirdPerformance
        data.unlimitPerformance = summary.unlimitPerformance
        data.firstBonus = summary.firstBonus
        data.secondBonus = summary.secondBonus
        data.thirdBonus = summary.thirdBonus
        data.unlimitBonus = summary.unlimitBonus
        data.totalBonus = summary.totalBonus
        data.totalPerformance = summary.totalPerformance
        this.listLoading = false
      }).catch(() => {
        this.listLoading = false
      })
    },
    handleClick(data) {
      this.$router.push({ path: '/spread/underAgentSummary', query: { superId: data.showId }})
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
