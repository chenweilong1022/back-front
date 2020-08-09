<template>
  <div class="app-container" style="background-color: #f0f2f5;padding: 20px;">
    <el-card id="panelGroup" class="box-card-component" style="margin-left:8px;">
      <div slot="header" class="clearfix">
        玩家基本信息
      </div>
      <div class="filter-container">
        <el-form ref="filterForm" :model="playerInfo" label-width="200px" size="mini">
          <el-form-item label="玩家ID">
            <label>{{ playerInfo.userid }}</label>
          </el-form-item>
          <el-form-item label="玩家帐号">
            <label>{{ playerInfo.account }}</label>
          </el-form-item>
          <el-form-item label="玩家昵称">
            <label>{{ playerInfo.nickName }}</label>
          </el-form-item>
          <el-form-item label="上级代理">
            <label>{{ playerInfo.saler }}</label>
          </el-form-item>
          <el-form-item label="手机号">
            <label>{{ playerInfo.phoneNum }}</label>
          </el-form-item>
          <el-form-item label="真实姓名">
            <label>{{ playerInfo.realName }}</label>
          </el-form-item>
          <el-form-item label="身份证号">
            <label>{{ playerInfo.idCode }}</label>
          </el-form-item>
          <el-form-item label="帐号状态">
            <el-tag :type="playerInfo.lock | statusFilter">{{ playerInfo.lock | userStateFilter }}</el-tag>
          </el-form-item>
          <el-form-item label="是否开通代理">
            <label>{{ playerInfo.spreadUserId > 0 ? '已开通' : '未开通' }}</label>
          </el-form-item>
          <template v-if="playerInfo.spreadUserId > 0">
            <el-form-item label="代理提成比率">
              <label>{{ playerInfo.spreadRatio }} %</label>
            </el-form-item>
            <el-form-item label="今日返佣">
              <label>{{ playerInfo.todayRebate | moneyFilter }}</label>
            </el-form-item>
            <el-form-item label="本周返佣">
              <label>{{ playerInfo.thisWeekRebate | moneyFilter }}</label>
            </el-form-item>
            <el-form-item label="本月返佣">
              <label>{{ playerInfo.thisMonthRebate | moneyFilter }}</label>
            </el-form-item>
          </template>
          <el-form-item label="注册时间">
            <label>{{ playerInfo.createTime }}</label>
          </el-form-item>
          <el-form-item label="注册终端">
            <label>{{ playerInfo.platform }}</label>
          </el-form-item>
          <el-form-item label="最近登录时间">
            <label>{{ playerInfo.loginTime }}</label>
          </el-form-item>
          <el-form-item label="最近登录时间">
            <label>{{ playerInfo.loginTime }}</label>
          </el-form-item>
          <el-form-item label="最近登录IP">
            <label>{{ playerInfo.ip }}</label>
          </el-form-item>
          <el-form-item label="最近登录IP归属地">
            <label>{{ playerInfo.ipAttr }}</label>
          </el-form-item>
          <el-form-item label="携带金币">
            <label>{{ playerInfo.gold | moneyFilter }}</label>
          </el-form-item>
          <el-form-item label="银行金币">
            <label>{{ playerInfo.bankGold | moneyFilter }}</label>
          </el-form-item>
          <el-form-item label="总金币">
            <label>{{ playerInfo.totalGold | moneyFilter }}</label>
          </el-form-item>
          <el-form-item label="历史充值">
            <label>{{ playerInfo.totalPay | moneyFilter }}</label>
          </el-form-item>
          <el-form-item label="历史提现">
            <label>{{ playerInfo.totalWithdraw | moneyFilter }}</label>
          </el-form-item>
          <el-form-item v-if="resetPwdBtn || resetBankPwdBtn || lockBtn" label="管理操作">
            <el-button v-if="resetPwdBtn" type="default" @click="resetPassword">重置登录密码</el-button>
            <el-button v-if="resetBankPwdBtn" type="default" @click="resetBankPassword">重置银行密码</el-button>
            <el-button v-if="lockBtn" type="danger" @click="showLockPage">{{ lockState?'冻结玩家':'解冻玩家' }}</el-button>
            <el-button v-if="!isSpread && setSpreadBtn" type="default" @click="transferToSpread">开通代理</el-button>
            <el-button v-if="isSpread && setSpreadBtn" type="default" @click="showSpreadPage">设置代理参数</el-button>
          </el-form-item>
          <el-form-item v-if="gameDiamondLogBtn || goldChangeBtn || gameScoreBtn || sameAddressPlayerBtn || isSpread" label="玩家日志查看">
            <el-button v-if="gameDiamondLogBtn" type="text" @click="queryGameLog">游戏记录查询</el-button>
            <el-button v-if="goldChangeBtn" type="text">金币变更日志</el-button>
            <el-button v-if="gameScoreBtn" type="text" @click="queryGameStatistics">游戏输赢查询</el-button>
            <el-button v-if="sameAddressPlayerBtn" type="text" @click="querySameAddressPlayers">相同地址登录帐号</el-button>
            <el-button type="text" @click="queryAgentTree">查看下级代理</el-button>
            <el-button type="text" @click="queryAgentTable">查看下级团队表</el-button>
          </el-form-item>
        </el-form>

        <el-dialog :visible.sync="dialogLockPlayerVisible" :title="lockState?'冻结玩家':'解冻玩家'" width="40%">
          <el-form ref="playerForm" :model="playerInfo" label-position="left" style="margin-left:30px;">
            <el-form-item label="玩家ID">
              <label>{{ playerInfo.userid }}</label>
            </el-form-item>
            <el-form-item label="玩家昵称">
              <label>{{ playerInfo.nickName }}</label>
            </el-form-item>
            <el-form-item label="帐号状态">
              <el-tag :type="playerInfo.lock | statusFilter">{{ playerInfo.lock | userStateFilter }}</el-tag>
            </el-form-item>
            <el-form-item label="操作原因">
              <el-input v-model="playerInfo.reason" :rows="2" type="textarea" placeholder="请输入操作原因"/>
            </el-form-item>
          </el-form>
          <label>该帐号冻结/解冻历史记录</label>
          <el-table
            v-loading="listLoading"
            :data="list"
            size="mini"
            border
            fit
            max-height="200"
            highlight-current-row>
            <el-table-column align="center" label="操作时间">
              <template slot-scope="scope">
                {{ scope.row.recordTime }}
              </template>
            </el-table-column>
            <el-table-column align="center" label="操作管理员">
              <template slot-scope="scope">
                {{ scope.row.managerId }}
              </template>
            </el-table-column>
            <el-table-column align="center" label="操作类别">
              <template slot-scope="scope">
                <el-tag :type="scope.row.operate | operateFilter">{{ scope.row.operate | operateTitleFilter }}</el-tag>
              </template>
            </el-table-column>
            <el-table-column align="center" label="操作原因">
              <template slot-scope="scope">
                {{ scope.row.reason }}
              </template>
            </el-table-column>
          </el-table>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogLockPlayerVisible = false">取消</el-button>
            <el-button :loading="lockBtnLoading" type="primary" @click="lockPlayer">{{ lockState?'冻结玩家':'解冻玩家' }}</el-button>
          </div>
        </el-dialog>

        <el-dialog :visible.sync="dialogSpreadVisible" title="设置推广参数" width="30%">
          <el-form ref="spreadForm" :model="spreadInfo" label-position="left" label-width="80px" style="margin-left:30px;">
            <el-form-item label="玩家ID">
              <label>{{ spreadInfo.userid }}</label>
            </el-form-item>
            <el-form-item label="提成比率">
              <el-input v-model="spreadInfo.spreadRatio" />
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogSpreadVisible = false">取消</el-button>
            <el-button :loading="saveBtnLoading" type="primary" @click="saveSpread">保存</el-button>
          </div>
        </el-dialog>

        <el-dialog :visible.sync="dialogGameLogVisible" title="玩家游戏记录" width="80%">
          <GameLog ref="gameLog" :player-id="playerInfo.userid" />
        </el-dialog>

        <el-dialog :visible.sync="dialogAgentTreeVisible" title="代理树状图" width="40%">
          <agent-tree ref="agentTree" :userid="playerInfo.userid"></agent-tree>
        </el-dialog>

        <el-dialog :visible.sync="dialogAgentTableVisible" title="代理团队表" width="60%">
          <agent-table ref="agentTable" :userid="playerInfo.userid"></agent-table>
        </el-dialog>

        <el-dialog :visible.sync="dialogGameStatisticsVisible" title="玩家游戏输赢统计" width="40%">
          <GameStatistics ref="gameStatistics" :player-id="playerInfo.userid" />
        </el-dialog>

        <el-dialog :visible.sync="dialogSameAddressVisible" title="相同IP地址玩家列表" width="40%">
          <SameAddressPlayer ref="sameAddress" :player-id="playerInfo.userid" />
        </el-dialog>

        <el-dialog :visible.sync="dialogUnderSpreadUsersVisible" title="下线玩家列表" width="40%">
          <UnderSpreadUsers ref="underSpreadUsers" :player-id="playerInfo.userid" />
        </el-dialog>


      </div>
    </el-card>

  </div>
</template>

<script>
import GameLog from './components/GameLog'
import GameStatistics from './components/GameStatistics'
import SameAddressPlayer from './components/SameAddressPlayer'
import UnderSpreadUsers from './components/UnderSpreadUsers'
import AgentTree from '../agentTree/index'
import AgentTable from '../agentTable/index'
export default {
  name: 'PlayerInfoPage',
  components: {
    GameLog,
    GameStatistics,
    SameAddressPlayer,
    UnderSpreadUsers,
    AgentTree,
    AgentTable
  },
  filters: {
    statusFilter(lock) {
      if (lock === '1970-01-01 00:00:00') {
        return 'success'
      } else {
        return 'danger'
      }
    },
    userStateFilter(lock) {
      if (lock === '1970-01-01 00:00:00') {
        return '正常'
      } else {
        return '冻结'
      }
    },
    operateFilter(opreate) {
      if (opreate === 'freeze') {
        return 'danger'
      } else {
        return 'success'
      }
    },
    operateTitleFilter(opreate) {
      if (opreate === 'freeze') {
        return '冻结帐号'
      } else {
        return '解冻帐号'
      }
    },
    moneyFilter(money) {
      if (money) {
        return (money / 100).toFixed(2)
      }
      return (0).toFixed(2)
    }
  },
  data() {
    return {
      playerInfo: {},
      lockState: false,
      lockBtnLoading: false,
      resetPwdBtn: true,
      resetBankPwdBtn: true,
      lockBtn: true,
      isSpread: true,
      setSpreadBtn: false,
      gameDiamondLogBtn: true,
      goldChangeBtn: false,
      gameScoreBtn: true,
      sameAddressPlayerBtn: true,
      dialogLockPlayerVisible: false,
      spreadInfo: {},
      dialogSpreadVisible: false,
      saveBtnLoading: false,
      list: null,
      listLoading: false,
      dialogGameLogVisible: false,
      dialogGameStatisticsVisible: false,
      dialogAgentTreeVisible: false,
      dialogAgentTableVisible: false,
      dialogSameAddressVisible: false,
      dialogUnderSpreadUsersVisible: false
    }
  },
  created() {
    this.validateRole()
    this.query()
  },
  methods: {
    query() {
      const loading = this.$loading({
        target: '#panelGroup',
        lock: true,
        text: '拼命加载中...',
        spinner: 'el-icon-loading',
        background: 'rgba(255, 255, 255, 0.5)'
      })
      this.$store.dispatch('GetPlayerAccountById', this.$route.query.playerId).then(resp => {
        this.playerInfo = resp.data
        if (this.playerInfo) {
          this.lockState = this.playerInfo.lock === '1970-01-01 00:00:00'
          this.isSpread = this.playerInfo.spreadUserId > 0
        }
        loading.close()
      }).catch(() => {
        loading.close()
        setTimeout(() => {
          this.$router.go(-1)
        }, 3 * 1000)
      })
    },
    resetPassword() {
      this.$confirm('此操作将重置玩家密码，是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(() => {
        this.$store.dispatch('ResetPlayerPassword', this.playerInfo.userid).then(resp => {
          this.$message({
            message: resp.msg,
            type: 'success'
          })
        })
      })
    },
    resetBankPassword() {
      this.$confirm('此操作将重置玩家银行密码，是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(() => {
        this.$store.dispatch('ResetPlayerBankPassword', this.playerInfo.userid).then(resp => {
          this.$message({
            message: resp.msg,
            type: 'success'
          })
        })
      })
    },
    showLockPage() {
      this.dialogLockPlayerVisible = true
      this.listLoading = true
      this.$store.dispatch('ListFreezeUserRecordById', this.playerInfo.userid).then(resp => {
        this.list = resp.data
        this.listLoading = false
      }).catch(() => {
        this.listLoading = false
      })
    },
    lockPlayer() {
      if (!this.playerInfo.reason) {
        this.$message({
          message: '操作原因不能为空',
          type: 'error'
        })
        return false
      }
      this.lockBtnLoading = true
      this.$store.dispatch(this.lockState ? 'FreezePlayer' : 'UnfreezePlayer', this.playerInfo).then(resp => {
        this.dialogLockPlayerVisible = false
        this.$message({
          message: resp.msg,
          type: 'success'
        })
        this.lockBtnLoading = false
      }).catch(() => {
        this.lockBtnLoading = false
      })
    },
    transferToSpread() {
      this.$confirm('此操作将为玩家开通代理，是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(() => {
        const loading = this.$loading({
          target: '#panelGroup',
          lock: true,
          text: '拼命加载中...',
          spinner: 'el-icon-loading',
          background: 'rgba(255, 255, 255, 0.5)'
        })
        this.$store.dispatch('TransferToSpread', { playerId: this.playerInfo.userid }).then(resp => {
          this.$message({
            message: resp.msg,
            type: 'success'
          })
          loading.close()
          this.query()
        }).catch(() => {
          loading.close()
        })
      })
    },
    showSpreadPage() {
      this.dialogSpreadVisible = true
      this.saveBtnLoading = false
      this.spreadInfo = Object.assign({}, this.playerInfo)
    },
    saveSpread() {
      this.saveBtnLoading = true
      this.$store.dispatch('UpdateSpreadUser', {
        id: this.spreadInfo.spreadUserId,
        ratio: this.spreadInfo.spreadRatio }).then(resp => {
          this.$message({
            message: resp.msg,
            type: 'success'
          })
        this.saveBtnLoading = false
        this.dialogSpreadVisible = false
        this.query()
      })
    },
    queryGameLog() {
      this.dialogGameLogVisible = true
      if (this.$refs.gameLog) {
        this.$refs.gameLog.query()
      }
    },
    queryGameStatistics() {
      this.dialogGameStatisticsVisible = true
      if (this.$refs.gameStatistics) {
        this.$refs.gameStatistics.query()
      }
    },
    querySameAddressPlayers() {
      this.dialogSameAddressVisible = true
      if (this.$refs.sameAddress) {
        this.$refs.sameAddress.query()
      }
    },
    queryAgentTree() {
      this.dialogAgentTreeVisible = true
      if (this.$refs.agentTree) {
        this.$refs.agentTree.init()
      }
    },
    queryAgentTable() {
      this.dialogAgentTableVisible = true
      if (this.$refs.agentTable) {
        this.$refs.agentTable.init()
      }
    },
    validateRole() {
      const roleId = this.$store.state.user.roleId
      const menus = this.$store.state.user.menus
      if (roleId !== 1) {
        if (!this.hasPermission(menus, 20102)) {
          this.resetPwdBtn = false
        }
        if (!this.hasPermission(menus, 20103)) {
          this.resetBankPwdBtn = false
        }
        if (!this.hasPermission(menus, 20104)) {
          this.setSpreadBtn = false
        }
        if (!this.hasPermission(menus, 20105)) {
          this.lockBtn = false
        }
        if (!this.hasPermission(menus, 20107)) {
          this.gameDiamondLogBtn = false
        }
        if (!this.hasPermission(menus, 20108)) {
          this.goldChangeBtn = false
        }
        if (!this.hasPermission(menus, 20109)) {
          this.gameScoreBtn = false
        }
        if (!this.hasPermission(menus, 20110)) {
          this.sameAddressPlayerBtn = false
        }
      }
    },
    hasPermission(menus, menuId) {
      if (menus) {
        return menus.some(menu => menu.menuId === menuId)
      } else {
        return false
      }
    }
  }
}
</script>

<style scoped>

</style>
