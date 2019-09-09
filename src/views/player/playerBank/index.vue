<template>
  <div class="app-container">
    <div class="filter-container">
      <el-form ref="filterForm" :inline="true" :model="filterForm" size="mini">
        <el-form-item label="玩家ID">
          <el-input v-model="filterForm.playerId"/>
        </el-form-item>
        <el-form-item>
          <el-col :span="12">
            <el-form-item label="起始时间" label-width="100px" style="margin-bottom: 0px;">
              <el-date-picker v-model="filterForm.startTime" type="date" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="结束时间" label-width="100px" style="margin-bottom: 0px;">
              <el-date-picker v-model="filterForm.endTime" type="date" />
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
      size="mini"
      border
      fit
      highlight-current-row>
      <el-table-column align="center" label="日志时间">
        <template slot-scope="scope">
          {{ scope.row.recordTime | parseTime }}
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
      <el-table-column align="center" label="变更原因">
        <template slot-scope="scope">
          <el-tag :type="scope.row.reason | reasonColor">{{ scope.row.reason | reasonTitle }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="原有金币" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.beginGold | moneyFilter }}</span>
        </template>
      </el-table-column>
      <el-table-column label="金币变更" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.changeGold | moneyFilter }}</span>
        </template>
      </el-table-column>
      <el-table-column label="税金" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.taxGold | moneyFilter }}</span>
        </template>
      </el-table-column>
      <el-table-column label="现有金币" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.endGold | moneyFilter }}</span>
        </template>
      </el-table-column>
      <el-table-column label="来源/去向" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.note }}</span>
        </template>
      </el-table-column>
    </el-table>

    <div class="pagination-container">
      <el-pagination :current-page="filterForm.pageNo" :page-sizes="[10,20,30, 50]" :page-size="filterForm.pageSize" :total="listTotal" background layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange" @current-change="handleCurrentChange"/>
    </div>
  </div>
</template>

<script>
import { parseTime } from '@/utils'
export default {
  name: 'PlayerBankPage',
  filters: {
    parseTime(time) {
      return parseTime(time)
    },
    moneyFilter(money) {
      if (money) {
        return money / 100
      }
      return 0
    },
    reasonColor(reason) {
      if (reason === 1) {
        return 'danger'
      } else {
        return 'success'
      }
    },
    reasonTitle(reason) {
      if (reason === 1) {
        return '转出'
      } else {
        return '转入'
      }
    }
  },
  data() {
    return {
      filterForm: {
        playerId: null,
        startTime: null,
        endTime: null,
        pageNo: 1,
        pageSize: 10
      },
      list: null,
      listLoading: false,
      listTotal: 10
    }
  },
  created() {
    this.query()
  },
  methods: {
    query() {
      this.listLoading = true
      this.$store.dispatch('ListPlayerBankLogByQry', this.filterForm).then(resp => {
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
