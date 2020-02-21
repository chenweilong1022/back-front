<template>
  <div class="app-container">
    <div class="filter-container">
      <el-form ref="filterForm" :inline="true" :model="filterForm" size="mini">
        <el-form-item label="玩家ID">
          <el-input v-model="filterForm.showId"/>
        </el-form-item>
        <el-form-item label="筛选游戏">
          <el-button-group>
            <el-button :type="filterForm.gameId===0?'primary':''" @click="changeBtnValue(0)">All</el-button>
            <el-button v-for="item in games" :key="item.gameid" :type="filterForm.gameId === item.gameid?'primary':''" @click="changeBtnValue(item.gameid)">
              {{ item.gameName }}({{ item.onlineCount }})
            </el-button>
          </el-button-group>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" class="btn-form" @click="query">查询</el-button>
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
      <el-table-column align="center" label="昵称(玩家ID)">
        <template slot-scope="scope">
          <span :style="scope.row.rechargeFlag > 0 ? 'color:red;':''" class="link-type" @click="handleClick(scope.row.userid)">{{ scope.row.nickName }}</span> ({{ scope.row.showId }})
        </template>
      </el-table-column>
      <el-table-column align="center" label="房间">
        <template slot-scope="scope">
          {{ scope.row.roomName }}{{ scope.row.tableId }}
        </template>
      </el-table-column>
      <el-table-column label="身上金币" align="center">
        <el-table-column label="银行金币" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.gold | moneyFilter }}</span><br>
            <span>{{ scope.row.bankGold | moneyFilter }}</span>
          </template>
        </el-table-column>
      </el-table-column>

      <el-table-column label="当日充值" align="center">
        <el-table-column label="总充值" align="center">
          <template slot-scope="scope">
            <span :style="scope.row.todayRechargeGold > 0 ? 'color:red;' : 'color:green;'">{{ scope.row.todayRechargeGold }}</span><br>
            <span :style="scope.row.totalRechargeGold > 0 ? 'color:red;' : 'color:green;'">{{ scope.row.totalRechargeGold }}</span>
          </template>
        </el-table-column>
      </el-table-column>

      <el-table-column label="当日提现" align="center">
        <el-table-column label="总提现" align="center">
          <template slot-scope="scope">
            <span :style="scope.row.todayWithdrawGold > 0 ? 'color:red;' : 'color:green;'">{{ scope.row.todayWithdrawGold }}</span><br>
            <span :style="scope.row.totalWithdrawGold > 0 ? 'color:red;' : 'color:green;'">{{ scope.row.totalWithdrawGold }}</span>
          </template>
        </el-table-column>
      </el-table-column>

      <el-table-column label="当日输赢" align="center">
        <el-table-column label="总输赢" align="center">
          <template slot-scope="scope">
            <span :style="scope.row.todayWinningGold > 0 ? 'color:red;' : 'color:green;'">{{ scope.row.todayWinningGold | moneyFilter }}</span><br>
            <span :style="scope.row.totalWinningGold > 0 ? 'color:red;' : 'color:green;'">{{ scope.row.totalWinningGold | moneyFilter }}</span>
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column align="center" label="玩家幸运值">
        <template slot-scope="scope">
          {{ scope.row.luckyRatio * 100 ? scope.row.luckyRatio * 100 : 0 }} %
        </template>
      </el-table-column>
      <el-table-column label="登录IP" align="center">
        <el-table-column label="归属地" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.ip }}</span><br>
            <span>{{ scope.row.ipAttr }}</span>
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="mini" @click="changeRatio(scope.row)">调整幸运值</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="pagination-container">
      <el-pagination :current-page.sync="filterForm.pageNo" :page-sizes="[10,20,30, 50]" :page-size="filterForm.pageSize" :total="listTotal" background layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange" @current-change="handleCurrentChange"/>
    </div>

    <el-dialog :visible.sync="dialogNewOrEditVisible" title="调整幸运值" width="400px">
      <el-form ref="dialogForm" :model="formData" :rules="dialogRules" label-position="left" label-width="80px" style="margin-left:30px;">
        <el-form-item v-if="!controlGames.some(game => Math.floor(formData.room/100) === game)" label="幸运值" prop="luckyRatio">
          <el-input v-model="formData.luckyRatio" />
        </el-form-item>
        <el-form-item v-if="controlGames.some(game => Math.floor(formData.room/100) === game)" label="幸运值" prop="luckyRatio">
          <el-radio-group v-model="formData.luckyRatio">
            <el-radio :label="1">正常模式</el-radio>
            <el-radio :label="0">必杀模式</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogNewOrEditVisible = false">取消</el-button>
        <el-button :loading="saveBtnLoading" type="primary" @click="saveData">保存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'OnlinePlayerListPage',
  filters: {
    moneyFilter(money) {
      if (money) {
        return money / 100
      }
      return 0
    }
  },
  data() {
    const validateNumber = (rule, value, callback) => {
      if (value !== 0 && (!value || value.length === 0)) {
        callback(new Error('必填项'))
      } else if (isNaN(Number(value))) {
        callback(new Error('必须为纯数字'))
      } else {
        callback()
      }
    }
    return {
      filterForm: {
        showId: null,
        gameId: 0,
        pageNo: 1,
        pageSize: 10
      },
      games: [],
      list: null,
      listLoading: false,
      listTotal: 10,
      dialogNewOrEditVisible: false,
      formData: {},
      controlGames: [127, 151, 152],
      dialogRules: {
        luckyRatio: [{ required: true, trigger: 'blur', validator: validateNumber }]
      },
      saveBtnLoading: false
    }
  },
  created() {
    this.queryGames()
    this.query()
  },
  methods: {
    queryGames() {
      this.$store.dispatch('ListGamesAndOnlineCount').then(resp => {
        this.games = resp.data
      })
    },
    query() {
      this.listLoading = true
      this.$store.dispatch('ListOnlinePlayerQry', this.filterForm).then(resp => {
        this.list = resp.data
        this.listTotal = resp.totalCount
        this.listLoading = false
      }).catch(() => {
        this.listLoading = false
      })
    },
    changeBtnValue(gameId) {
      this.filterForm.gameId = gameId
      this.query()
    },
    changeRatio(data) {
      this.dialogNewOrEditVisible = true
      this.formData = {
        userid: data.userid,
        room: data.room,
        luckyRatio: data.luckyRatio
      }
    },
    saveData() {
      this.$refs['dialogForm'].validate(valid => {
        if (valid) {
          // 数据校验，如果是必杀模式，同一个房间只能同时设置一个人
          if (Math.floor(this.formData.room / 100) !== 127 && this.controlGames.some(game => Math.floor(this.formData.room / 100) === game)) {
            this.list.forEach(item => {
              if (item.room === this.formData.room && item.luckyRatio === 0) {
                this.$message({
                  type: 'error',
                  message: '必杀只能设置一个人'
                })
                return false
              }
            })
          }

          this.saveBtnLoading = true
          this.$store.dispatch('UpdatePlayerLuckyRatio', this.formData).then(resp => {
            this.$message({
              type: 'success',
              message: resp.msg
            })
            this.saveBtnLoading = false
            this.dialogNewOrEditVisible = false
            this.query()
          }).catch(() => {
            this.saveBtnLoading = false
          })
        }
      })
    },
    handleClick(playerId) {
      const roleId = this.$store.state.user.roleId
      const menus = this.$store.state.user.menus
      if (roleId !== 1) {
        if (this.hasPermission(menus, 20101)) {
          this.$router.push({ path: '/player/playerInfo', query: { playerId }})
        }
      } else {
        this.$router.push({ path: '/player/playerInfo', query: { playerId }})
      }
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
