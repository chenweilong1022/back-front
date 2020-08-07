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
            <el-col :span="12"><label>{{ scope.row.rebate | moneyFilter }}</label></el-col>
          </el-row>
        </template>
      </el-table-column>
      <el-table-column align="right" label="业绩信息">
        <template slot-scope="scope">

          <!--//CREATE TABLE `tbl_agent_realtime` (
//  `user_id` bigint(20) NOT NULL COMMENT '用户id',
//  `super_id` bigint(20) NOT NULL DEFAULT '0' COMMENT '上级id',
//  `under_count` int(11) NOT NULL DEFAULT '0' COMMENT '直属下线人数',
//  `first_performance` bigint(20) NOT NULL DEFAULT '0' COMMENT '一代流水',
//  `first_bonus` bigint(20) NOT NULL DEFAULT '0' COMMENT '一代业绩',
//  `second_performance` bigint(20) NOT NULL DEFAULT '0' COMMENT '二代流水',
//  `second_bonus` bigint(20) NOT NULL DEFAULT '0' COMMENT '二代业绩',
//  `third_performance` bigint(20) NOT NULL DEFAULT '0' COMMENT '三代流水',
//  `third_bonus` bigint(20) NOT NULL DEFAULT '0' COMMENT '三代业绩',
//  `unlimit_performance` bigint(20) NOT NULL DEFAULT '0' COMMENT '无限代流水',
//  `unlimit_bonus` bigint(20) NOT NULL DEFAULT '0' COMMENT '无限代业绩',
//  PRIMARY KEY (`user_id`)
//) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='实时代理记录表';-->

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

          <!--<el-row>-->
            <!--<el-col :span="6">一代业绩：</el-col>-->
            <!--<el-col :span="6">{{ scope.row.first_bonus | moneyFilter }}</el-col>-->
            <!--<el-col :span="6">一代流水：</el-col>-->
            <!--<el-col :span="6">{{ scope.row.first_performance | moneyFilter }}</el-col>-->
          <!--</el-row>-->
        </template>
      </el-table-column>
      <el-table-column align="center" label="直属下线">
        <template slot-scope="scope">
          <i style="text-decoration: underline; font-style: normal; font-weight: bold;">{{ scope.row.underCount ? scope.row.underCount : 0 }}</i>人
          <el-button v-if="scope.row.underCount && scope.row.underCount !== 0" type="text" icon="el-icon-sort-down" @click="handleClick(scope.row.showId)" />
        </template>
      </el-table-column>
    </el-table>

    <div class="pagination-container">
      <el-pagination :current-page.sync="filterForm.pageNo" :page-sizes="[10,20,30, 50]" :page-size="filterForm.pageSize" :total="listTotal" background layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange" @current-change="handleCurrentChange"/>
    </div>


    <el-table
      v-loading="listLoading"
      :data="listAll"
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
    </el-table>


  </div>
</template>

<script>
export default {
  name: 'AgentRealtime',
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
        pageNo: 1,
        pageSize: 10
      },
      list: null,
      listAll: null,
      listLoading: false,
      listTotal: 10
    }
  },
  created() {
    this.query()
    this.queryTotal()
  },
  methods: {
    query() {
      this.listLoading = true
      this.$store.dispatch('ListAgentRealtimeByQry', { ...this.filterForm, superId: this.$route.query.superId }).then(resp => {
        this.list = resp.data
        this.listTotal = resp.totalCount
        this.listLoading = false

        this.queryTotal()
      }).catch(() => {
        this.listLoading = false
      })
    },
    queryTotal() {
      this.listLoading = true
      this.$store.dispatch('ListTotalAgentRealtimeByQry', { ...this.filterForm, superId: this.$route.query.superId }).then(resp => {
        this.listAll = resp.data
        this.listLoading = false
      }).catch(() => {
        this.listLoading = false
      })
    },
    handleClick(superId) {
      this.$router.push({ path: '/spread/underAgentRealtime', query: { superId }})
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
