<template>
  <div class="app-container">
    <div class="filter-container">
      <el-form ref="filterForm" :inline="true" :model="filterForm" :rules="filterRules" size="mini">
        <el-form-item label="玩家ID" prop="playerId">
          <el-input v-model="filterForm.playerId"/>
        </el-form-item>
        <el-form-item>
          <el-col :xs="24" :md="24" :lg="12">
            <el-form-item label="起始时间" style="margin-bottom: 0px;">
              <el-date-picker v-model="filterForm.startTime" type="datetime" format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss" />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :md="24" :lg="12">
            <el-form-item label="结束时间" style="margin-bottom: 0px;">
              <el-date-picker v-model="filterForm.endTime" type="datetime" format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss" />
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
          {{ scope.row.recordTime }}
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
      <el-table-column align="center" label="变更前钻石">
        <template slot-scope="scope">
          {{ scope.row.beginVal | moneyFilter }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="钻石变更">
        <template slot-scope="scope">
          {{ scope.row.changeVal | moneyFilter }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="变更后钻石">
        <template slot-scope="scope">
          {{ scope.row.endVal | moneyFilter }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="变更原因">
        <template slot-scope="scope">
          {{ scope.row.reason | reasonFilter }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="备注">
        <template slot-scope="scope">
          {{ scope.row.note }}
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
  name: 'PlayerDiamondLogListPage',
  filters: {
    moneyFilter(money) {
      if (money) {
        return money
      }
      return 0
    },
    reasonFilter(reason) {
      switch (reason) {
        case 0:
          return '游戏消耗'
        case 2:
          return '购买'
        case 6:
          return '分享'
        case 10:
          return '绑定'
        default:
          return '未知'
      }
    }
  },
  data() {
    const validateRobot = (rule, value, callback) => {
      const re = /^\d{1,}$/
      if (value.length === 0) {
        callback(new Error('必填项'))
      } else if (!re.test(value)) {
        callback(new Error('必须为纯数字'))
      } else {
        callback()
      }
    }
    return {
      filterForm: {
        playerId: 0,
        startTime: null,
        endTime: null,
        pageNo: 1,
        pageSize: 10
      },
      filterRules: {
        playerId: [{ required: true, trigger: 'blur', validator: validateRobot }]
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
      this.$store.dispatch('ListPlayerDiamondLogByQry', this.filterForm).then(resp => {
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
