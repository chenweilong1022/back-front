<template>
  <div class="app-container">
    <div class="filter-container">
      <el-form ref="filterForm" :inline="true" :model="filterForm" size="mini">
        <el-form-item label="日志类型">
          <el-select v-model="filterForm.logTypeId" class="filter-item" placeholder="请选择" value="">
            <el-option v-for="item in logTypes" :key="item.typeid" :label="item.typeName" :value="item.typeid"/>
          </el-select>
        </el-form-item>
        <el-form-item label="管理员ID">
          <el-input v-model="filterForm.managerId"/>
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
      <el-table-column align="center" label="管理员ID">
        <template slot-scope="scope">
          {{ scope.row.managerid }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="日志类型">
        <template slot-scope="scope">
          {{ scope.row.typeName }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作时间">
        <template slot-scope="scope">
          {{ scope.row.manageTime }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="日志类型">
        <template slot-scope="scope">
          {{ scope.row.manageDesc }}
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
  name: 'ManageLogPage',
  data() {
    return {
      logTypes: [{ typeid: 0, typeName: '全部' }],
      filterForm: {
        logTypeId: 0,
        managerId: null,
        pageNo: 1,
        pageSize: 10
      },
      list: null,
      listLoading: false,
      listTotal: 10
    }
  },
  mounted() {
    this.queryLogType()
  },
  created() {
    this.query()
  },
  methods: {
    queryLogType() {
      this.$store.dispatch('ListManageLogType').then(resp => {
        this.logTypes = this.logTypes.concat(resp.data)
      })
    },
    query() {
      this.listLoading = true
      this.$store.dispatch('ListManageLogByQry', this.filterForm).then(resp => {
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

<style scoped>

</style>
