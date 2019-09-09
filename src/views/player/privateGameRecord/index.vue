<template>
  <div class="app-container">
    <div class="filter-container">
      <el-form ref="filterForm" :inline="true" :model="filterForm" :rules="filterRules" size="mini">
        <el-form-item label="玩家ID" prop="playerId">
          <el-input v-model="filterForm.playerId"/>
        </el-form-item>
        <el-form-item>
          <el-col :xs="24" :md="24" :lg="12">
            <el-form-item label="起始时间" prop="startDate" style="margin-bottom: 0px;">
              <el-date-picker v-model="filterForm.startDate" type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd" />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :md="24" :lg="12">
            <el-form-item label="结束时间" prop="endDate" style="margin-bottom: 0px;">
              <el-date-picker v-model="filterForm.endDate" type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd" />
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
      <el-table-column align="center" label="记录时间">
        <template slot-scope="scope">
          {{ scope.row.time }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="玩家ID">
        <template slot-scope="scope">
          {{ scope.row.userid }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="玩家昵称">
        <template slot-scope="scope">
          {{ scope.row.nickname }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="输赢分数">
        <template slot-scope="scope">
          {{ scope.row.score | moneyFilter }}
        </template>
      </el-table-column>
    </el-table>

    <div class="pagination-container">
      <el-pagination :current-page="filterForm.pageNo" :page-sizes="[10,20,30, 50]" :page-size="filterForm.pageSize" :total="listTotal" background layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange" @current-change="handleCurrentChange"/>
    </div>
  </div>
</template>

<script>
import { endDate, startDate } from '@/utils'
export default {
  name: 'PrivateGameRecord',
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
        playerId: null,
        startDate: startDate(0),
        endDate: endDate(1),
        pageNo: 1,
        pageSize: 10
      },
      filterRules: {
        startDate: [{ required: true, trigger: 'blur', message: '必填项' }],
        endDate: [{ required: true, trigger: 'blur', message: '必填项' }]
      },
      list: null,
      listLoading: false,
      listTotal: 10
    }
  },
  created() {
    this.loadPageData()
  },
  methods: {
    loadPageData() {
      this.listLoading = true
      this.$store.dispatch('ListPlayerPrivateGameByQry', this.filterForm).then(resp => {
        this.list = resp.data
        this.listTotal = resp.totalCount
        this.listLoading = false
      }).catch(() => {
        this.listLoading = false
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
