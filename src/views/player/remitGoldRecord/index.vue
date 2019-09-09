<template>
  <div class="app-container">
    <div class="filter-container">
      <el-form ref="filterForm" :inline="true" :model="filterForm" :rules="filterRules" size="mini">
        <el-form-item label="操作员账号" prop="managerAccount">
          <el-input v-model="filterForm.managerAccount"/>
        </el-form-item>
        <el-form-item label="玩家ID" prop="showId">
          <el-input v-model="filterForm.showId"/>
        </el-form-item>
        <el-form-item label="起始时间" prop="startTime">
          <el-date-picker v-model="filterForm.startTime" type="datetime" />
        </el-form-item>
        <el-form-item label="结束时间" prop="endTime">
          <el-date-picker v-model="filterForm.endTime" type="datetime" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="btn-form" @click="query">查询</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div class="filter-container">
      <el-form size="mini">
        <el-form-item label="当前汇总">
          <label>{{ remitGoldTotal | moneyFilter }}</label>
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
          {{ scope.row.recordTime }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作员账号">
        <template slot-scope="scope">
          {{ scope.row.managerAccount }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="玩家信息">
        <template slot-scope="scope">
          {{ scope.row.nickname }}({{ scope.row.showId }})
        </template>
      </el-table-column>
      <el-table-column align="center" label="原有金币">
        <template slot-scope="scope">
          {{ scope.row.beginGold | moneyFilter }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="划账金币">
        <template slot-scope="scope">
          {{ scope.row.gold | moneyFilter }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="现有金币">
        <template slot-scope="scope">
          {{ scope.row.endGold | moneyFilter }}
        </template>
      </el-table-column>
    </el-table>

    <div class="pagination-container">
      <el-pagination :current-page="filterForm.pageNo" :page-sizes="[10,20,30, 50]" :page-size="filterForm.pageSize" :total="listTotal" background layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange" @current-change="handleCurrentChange"/>
    </div>
  </div>
</template>

<script>
import { startTime, endTime } from '@/utils'
export default {
  name: 'RemitGoldRecordPage',
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
        showId: null,
        managerAccount: null,
        startTime: startTime(0),
        endTime: endTime(0),
        pageNo: 1,
        pageSize: 10
      },
      filterRules: {
        startTime: [{ required: true, trigger: 'blur', message: '必填项' }],
        endTime: [{ required: true, trigger: 'blur', message: '必填项' }]
      },
      list: null,
      listLoading: false,
      listTotal: 0,
      remitGoldTotal: null
    }
  },
  mounted() {
    this.loadPageData()
  },
  methods: {
    loadPageData() {
      this.listLoading = true
      this.$store.dispatch('ListRemitGoldRecordByQry', this.filterForm).then(resp => {
        this.list = resp.data
        this.listTotal = resp.totalCount
        this.listLoading = false
      }).catch(() => {
        this.listLoading = false
      })
      this.$store.dispatch('GetTotalRemitGoldByQry', this.filterForm).then(resp => {
        this.remitGoldTotal = resp.data
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
