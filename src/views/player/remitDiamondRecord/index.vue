<template>
  <div class="app-container">
    <div class="filter-container">
      <el-form ref="filterForm" :inline="true" :model="filterForm" size="mini">
        <el-form-item label="操作员ID" prop="managerId">
          <el-input v-model="filterForm.managerId"/>
        </el-form-item>
        <el-form-item label="玩家ID" prop="playerId">
          <el-input v-model="filterForm.playerId"/>
        </el-form-item>
        <el-form-item label="起始时间" prop="startDate">
          <el-date-picker v-model="filterForm.startDate" type="date" />
        </el-form-item>
        <el-form-item label="结束时间" prop="endDate">
          <el-date-picker v-model="filterForm.endDate" type="date" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="btn-form" @click="query">查询</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div class="filter-container">
      <el-form size="mini">
        <el-form-item label="当前汇总">
          <label>{{ remitDiamondTotal | moneyFilter }}</label>
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
      <el-table-column align="center" label="操作员ID">
        <template slot-scope="scope">
          {{ scope.row.managerId }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="玩家ID">
        <template slot-scope="scope">
          {{ scope.row.userId }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="原有钻石">
        <template slot-scope="scope">
          {{ scope.row.beginDiamond }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="划账钻石">
        <template slot-scope="scope">
          {{ scope.row.changeDiamond }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="现有钻石">
        <template slot-scope="scope">
          {{ scope.row.beginDiamond + scope.row.changeDiamond }}
        </template>
      </el-table-column>
    </el-table>

    <div class="pagination-container">
      <el-pagination :current-page="filterForm.pageNo" :page-sizes="[10,20,30, 50]" :page-size="filterForm.pageSize" :total="listTotal" background layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange" @current-change="handleCurrentChange"/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RemitDiamondRecordPage',
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
        playerId: null,
        managerId: null,
        startDate: null,
        endDate: null,
        pageNo: 1,
        pageSize: 10
      },
      list: null,
      listLoading: false,
      listTotal: 0,
      remitDiamondTotal: null
    }
  },
  created() {
    this.loadPageData()
  },
  methods: {
    loadPageData() {
      this.listLoading = true
      this.$store.dispatch('ListRemitDiamondRecordByQry', this.filterForm).then(resp => {
        this.list = resp.data
        this.listTotal = resp.totalCount
        this.listLoading = false
      }).catch(() => {
        this.listLoading = false
      })
      this.$store.dispatch('GetTotalRemitDiamondByQry', this.filterForm).then(resp => {
        this.remitDiamondTotal = resp.data
      })
    },
    query() {
      this.loadPageData()
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
