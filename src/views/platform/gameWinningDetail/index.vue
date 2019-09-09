<template>
  <div class="app-container">
    <div class="filter-container">
      <el-form ref="filterForm" :inline="true" :model="filterForm" :rules="filterRules" size="mini">
        <el-form-item label="玩家ID" prop="showId">
          <el-input v-model="filterForm.showId"/>
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
        <el-form-item label="筛选游戏">
          <el-checkbox-group v-model="filterForm.gameIds">
            <el-checkbox v-for="item in games" :key="item.gameid" :label="item.gameid" style="margin-left: 5px;">{{ item.gameName }}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" class="btn-form" @click="query">查询</el-button>
        </el-form-item>
      </el-form>
    </div>

    <el-table
      v-loading="listLoading"
      :data="list"
      :summary-method="getSummaries"
      show-summary
      size="mini"
      border
      fit
      highlight-current-row>
      <el-table-column align="center" label="游戏名称">
        <template slot-scope="scope">
          {{ scope.row.gameName }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="游戏人数" prop="gamePersonCount">
        <template slot-scope="scope">
          <i style="text-decoration: underline; font-style: normal; font-weight: bold;">{{ scope.row.gamePersonCount }}</i>
          <el-button v-if="scope.row.gamePersonCount !== 0" type="text" icon="el-icon-sort-down" @click="handleClick(scope.row)" />
        </template>
      </el-table-column>
      <el-table-column align="center" label="流水量" prop="flowVolume">
        <template slot-scope="scope">
          {{ scope.row.flowVolume | moneyFilter }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="税收总和" prop="totalTax">
        <template slot-scope="scope">
          {{ scope.row.totalTax | moneyFilter }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="游戏输赢" prop="winningMoney">
        <template slot-scope="scope">
          <label :style="scope.row.winningMoney > 0 ? 'color:red;' : 'color:green;'">{{ scope.row.winningMoney | moneyFilter }}</label>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { startTime, endTime } from '@/utils'
export default {
  name: 'GameWinningDetail',
  filters: {
    moneyFilter(money) {
      if (money) {
        return (money / 100).toFixed(2)
      }
      return 0
    }
  },
  data() {
    const validateRobot = (rule, value, callback) => {
      const re = /^\d{1,}$/
      if (value && value.length !== 0 && !re.test(value)) {
        callback(new Error('必须为纯数字'))
      } else {
        callback()
      }
    }
    return {
      filterForm: {
        showId: null,
        gameIds: [],
        startTime: startTime(0),
        endTime: endTime(0)
      },
      games: [],
      filterRules: {
        playerId: [{ required: true, trigger: 'blur', validator: validateRobot }],
        startTime: [{ required: true, trigger: 'blur', message: '必填项' }],
        endTime: [{ required: true, trigger: 'blur', message: '必填项' }]
      },
      list: null,
      listLoading: false,
      listTotal: 10
    }
  },
  mounted() {
    this.queryGames()
    this.loadPageData()
  },
  methods: {
    queryGames() {
      this.$store.dispatch('ListAllGame').then(resp => {
        this.games = resp.data
      })
    },
    loadPageData() {
      this.listLoading = true
      this.$store.dispatch('ListGameWinningDetailByQry', this.filterForm).then(resp => {
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
    handleClick(data) {
      const queryParam = {
        roomId: data.roomId,
        showId: this.filterForm.showId,
        startTime: this.filterForm.startTime,
        endTime: this.filterForm.endTime
      }
      this.$router.push({ path: '/player/winningDetail', query: queryParam})
    },
    getSummaries(param) {
      const { columns, data } = param
      const sums = []
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = '总计'
          return
        }
        if (index === 1) {
          const values = data.map(item => Number(item[column.property]))
          if (!values.every(value => isNaN(value))) {
            sums[index] = values.reduce((prev, curr) => {
              const value = Number(curr)
              if (!isNaN(value)) {
                return prev + curr
              } else {
                return prev
              }
            }, 0)
          } else {
            sums[index] = 'NaN'
          }
        }
        if (index > 1) {
          const values = data.map(item => Number(item[column.property]))
          if (!values.every(value => isNaN(value))) {
            sums[index] = values.reduce((prev, curr) => {
              const value = Number(curr)
              if (!isNaN(value)) {
                return prev + value
              } else {
                return prev
              }
            }, 0)
            sums[index] = (sums[index] / 100).toFixed(2) + ' 元'
          } else {
            sums[index] = 'NaN'
          }
        }
      })

      return sums
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
