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
        <el-form-item label="期次">
          <el-input v-model="filterForm.period" />
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
      <el-table-column align="center" label="期次">
        <template slot-scope="scope">
          {{ scope.row.period }}
        </template>
      </el-table-column>
      <el-table-column align="right" label="用户信息">
        <template slot-scope="scope">
          <el-row>
            <el-col :span="12">用户ID：</el-col>
            <el-col :span="12">{{ scope.row.showId }}</el-col>
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
            <el-col :span="6">一代业绩：</el-col>
            <el-col :span="6">{{ scope.row.firstBonus | moneyFilter }}</el-col>
            <el-col :span="6">一代流水：</el-col>
            <el-col :span="6">{{ scope.row.firstPerformance | moneyFilter }}</el-col>
          </el-row>

          <el-row>
            <el-col :span="6">二代业绩：</el-col>
            <el-col :span="6">{{ scope.row.secondBonus | moneyFilter }}</el-col>
            <el-col :span="6">二代流水：</el-col>
            <el-col :span="6">{{ scope.row.secondPerformance | moneyFilter }}</el-col>
          </el-row>

          <el-row>
            <el-col :span="6">三代业绩：</el-col>
            <el-col :span="6">{{ scope.row.thirdBonus | moneyFilter }}</el-col>
            <el-col :span="6">三代流水：</el-col>
            <el-col :span="6">{{ scope.row.thirdPerformance | moneyFilter }}</el-col>
          </el-row>

          <el-row>
            <el-col :span="6">无限代业绩：</el-col>
            <el-col :span="6">{{ scope.row.unlimitBonus | moneyFilter }}</el-col>
            <el-col :span="6">无限代流水：</el-col>
            <el-col :span="6">{{ scope.row.unlimitPerformance | moneyFilter }}</el-col>
          </el-row>

          <el-row>
            <el-col :span="6">团队业绩：</el-col>
            <el-col :span="6">{{ scope.row.totalBonus | moneyFilter }}</el-col>
            <el-col :span="6">团队流水：</el-col>
            <el-col :span="6">{{ scope.row.totalPerformance | moneyFilter }}</el-col>
          </el-row>
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

      <!--<el-table-column align="center" label="总业绩">-->
        <!--<template slot-scope="scope">-->
          <!--{{ scope.row.totalAllPerformance | moneyFilter }}-->
        <!--</template>-->
      <!--</el-table-column>-->
      <!--<el-table-column align="center" label="总返佣">-->
        <!--<template slot-scope="scope">-->
          <!--{{ scope.row.totalRebate | moneyFilter }}-->
        <!--</template>-->
      <!--</el-table-column>-->
      <!--<el-table-column align="center" label="总自营业绩">-->
        <!--<template slot-scope="scope">-->
          <!--{{ scope.row.totalPerformance | moneyFilter }}-->
        <!--</template>-->
      <!--</el-table-column>-->
      <!--<el-table-column align="center" label="总直营业绩">-->
        <!--<template slot-scope="scope">-->
          <!--{{ scope.row.totalDirectPerformance | moneyFilter }}-->
        <!--</template>-->
      <!--</el-table-column>-->
      <!--<el-table-column align="center" label="总团队业绩">-->
        <!--<template slot-scope="scope">-->
          <!--{{ scope.row.totalTeamPerformance | moneyFilter }}-->
        <!--</template>-->
      <!--</el-table-column>-->
      <!--<el-table-column align="center" label="总代理人数">-->
        <!--<template slot-scope="scope">-->
          <!--{{ scope.row.totalAgentCount }}-->
        <!--</template>-->
      <!--</el-table-column>-->
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'AgentRecord',
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
        period: null,
        pageNo: 1,
        pageSize: 10
      },
      list: null,
      listLoading: false,
      listTotal: 10,
      tableTotal: [
        { type: '小计' },
        { type: '总计' }
      ]
    }
  },
  created() {
    this.query()
  },
  methods: {
    query() {
      this.listLoading = true
      this.$store.dispatch('ListAgentRecordByQry', { ...this.filterForm, superId: this.$route.query.superId }).then(resp => {
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
        console.log(this.list)
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
        data.totalBonus = totalBonus
        data.totalPerformance = totalPerformance
        data.totalAgentCount = persons.length
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
        this.tableTotal[1] = data;
        this.listLoading = false
      }).catch(() => {
        this.listLoading = false
      })
    },
    handleClick(data) {
      this.$router.push({ path: '/spread/underAgentRecord', query: { superId: data.showId, period: data.period }})
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
