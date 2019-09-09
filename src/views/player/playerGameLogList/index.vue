<template>
  <div class="app-container">
    <div class="filter-container">
      <el-form ref="filterForm" :inline="true" :model="filterForm" :rules="filterRules" size="mini">
        <el-form-item label="玩家ID" prop="showId">
          <el-input v-model="filterForm.showId"/>
        </el-form-item>
        <el-form-item>
          <el-col :xs="24" :md="24" :lg="12">
            <el-form-item label="起始时间" prop="startTime" style="margin-bottom: 0px;">
              <el-date-picker v-model="filterForm.startTime" type="datetime" format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss" />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :md="24" :lg="12">
            <el-form-item label="结束时间" prop="endTime" style="margin-bottom: 0px;">
              <el-date-picker v-model="filterForm.endTime" type="datetime" format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss" />
            </el-form-item>
          </el-col>
        </el-form-item>
        <br>
        <el-form-item label="筛选游戏">
          <el-checkbox-group v-model="filterForm.gameIds">
            <el-checkbox v-for="item in games" :key="item.gameid" :label="item.gameid" style="margin-left: 5px;">{{ item.gameName }}</el-checkbox>
          </el-checkbox-group>
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
          {{ scope.row.showId }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="玩家昵称">
        <template slot-scope="scope">
          {{ scope.row.nickName }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="游戏名称">
        <template slot-scope="scope">
          {{ scope.row.gameName }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="房间号">
        <template slot-scope="scope">
          {{ scope.row.roomid }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="变更前金币">
        <template slot-scope="scope">
          {{ scope.row.beginGold | moneyFilter }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="金币变更">
        <template slot-scope="scope">
          {{ scope.row.changeGold | moneyFilter }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="变更后金币">
        <template slot-scope="scope">
          {{ scope.row.endGold | moneyFilter }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="税金">
        <template slot-scope="scope">
          {{ scope.row.taxGold | moneyFilter }}
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
import { startTime, endTime } from '@/utils'
export default {
  name: 'PlayerGameLogListPage',
  filters: {
    moneyFilter(money) {
      if (money) {
        return money / 100
      }
      return 0
    },
    reasonFilter(reason) {
      switch (reason) {
        case 0:
          return '游戏结算'
        case 1:
          return '银行存取款'
        case 3:
          return '赠送礼金'
        case 5:
          return '提现退还'
        case 6:
          return '活动赠送'
        case 10:
          return '代理返佣'
        case 99:
          return '充值/兑换'
        default:
          return '未知'
      }
    }
  },
  data() {
    return {
      filterForm: {
        showId: null,
        gameIds: [],
        startTime: startTime(0),
        endTime: endTime(0),
        pageNo: 1,
        pageSize: 10
      },
      games: [],
      filterRules: {
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
      this.$store.dispatch('ListPlayerGameLogByQry', this.filterForm).then(resp => {
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
