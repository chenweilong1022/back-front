<template>
  <div class="app-container">
    <div class="filter-container">
      <el-form ref="filterForm" :inline="true" :model="filterForm" size="mini">
        <el-form-item label="玩家类型">
          <el-checkbox-group v-model="filterForm.playerTypes">
            <el-checkbox label="0">普通玩家</el-checkbox>
            <el-checkbox label="1">代理玩家</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="原始ID">
          <el-input v-model="filterForm.playerId"/>
        </el-form-item>
        <el-form-item label="玩家ID">
          <el-input v-model="filterForm.showId"/>
        </el-form-item>
        <el-form-item label="玩家帐号">
          <el-input v-model="filterForm.account"/>
        </el-form-item>
        <el-form-item label="玩家昵称">
          <el-input v-model="filterForm.nickName"/>
        </el-form-item>
        <el-form-item label="最后登录IP地址">
          <el-input v-model="filterForm.lastLoginIp"/>
        </el-form-item>
        <el-form-item label="用户状态">
          <el-select v-model="filterForm.state" class="filter-item" placeholder="请选择" value="">
            <el-option v-for="item in userStates" :key="item.key" :label="item.title" :value="item.key"/>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-form-item label="注册开始日期" style="margin-bottom: 0px;">
            <el-date-picker v-model="filterForm.registBeginTime" type="date" />
          </el-form-item>
          <el-form-item label="注册结束日期" style="margin-bottom: 0px;">
            <el-date-picker v-model="filterForm.registEndTime" type="date" />
          </el-form-item>
        </el-form-item>
        <el-form-item>
          <el-form-item label="登录开始日期" style="margin-bottom: 0px;">
            <el-date-picker v-model="filterForm.loginBeginTime" type="date" />
          </el-form-item>
          <el-form-item label="登录结束日期" style="margin-bottom: 0px;">
            <el-date-picker v-model="filterForm.loginEndTime" type="date" />
          </el-form-item>
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
      <el-table-column align="center" label="玩家原始ID">
        <template slot-scope="scope">
          {{ scope.row.userid }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="玩家昵称(玩家ID)">
        <template slot-scope="scope">
          <span class="link-type" @click="handleClick(scope.row.userid)">{{ scope.row.nickName }}({{ scope.row.showId }})</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="玩家帐号">
        <el-table-column align="center" label="上级代理">
          <template slot-scope="scope">
            {{ scope.row.account.length === 11 ? scope.row.account : '游客账号' }}<br>
            <template v-if="scope.row.saler">
              {{ scope.row.agentNickname }}({{ scope.row.saler }})
            </template>
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column align="center" label="身上金币">
        <el-table-column align="center" label="银行金币">
          <template slot-scope="scope">
            {{ scope.row.gold | moneyFilter }}<br>
            {{ scope.row.bankGold | moneyFilter }}
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column align="center" label="金币总数">
        <template slot-scope="scope">
          {{ scope.row.totalGold | moneyFilter }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="用户状态">
        <template slot-scope="scope">
          <el-tag :type="scope.row.lock | statusFilter">{{ scope.row.lock | userStateFilter }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" label="是否设置保底">
        <template slot-scope="scope">
          {{ scope.row.saleRate > 0 ? '每万'+ scope.row.saleRate * 10000 : '未设置' }}
        </template>
      </el-table-column>
      <el-table-column label="注册时间" align="center">
        <el-table-column label="上次登录时间" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.createTime | parseTime }}</span><br>
            <span>{{ scope.row.loginTime | parseTime }}</span>
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column label="上次登录IP" align="center">
        <el-table-column label="归属地" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.ip }}</span><br>
            <span>{{ scope.row.ipAttr }}</span>
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button v-if="scope.row.sendGift === 0" size="mini" @click="giftMoney(scope.row)">赠送礼金</el-button>
          <el-button size="mini" @click="setSaleRate(scope.row)">设置保底</el-button>
          <el-button size="mini" @click="setUpSpread(scope.row)">设置上级代理</el-button>
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
  name: 'PlayerListPage',
  filters: {
    parseTime(time) {
      return parseTime(time)
    },
    moneyFilter(money) {
      if (money) {
        return (money / 100).toFixed(2)
      }
      return (0).toFixed(2)
    },
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
    }
  },
  data() {
    return {
      filterForm: {
        playerTypes: ['0', '1'],
        playerId: null,
        showId: null,
        account: null,
        nickName: null,
        state: 0,
        registBeginTime: null,
        registEndTime: null,
        loginBeginTime: null,
        loginEndTime: null,
        pageNo: 1,
        pageSize: 10
      },
      userStates: [
        {
          key: 0,
          title: '全部'
        },
        {
          key: 1,
          title: '正常'
        },
        {
          key: 2,
          title: '冻结'
        }
      ],
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
      this.$store.dispatch('ListPlayerAccountByQry', this.filterForm).then(resp => {
        this.list = resp.data
        this.listTotal = resp.totalCount
        this.listLoading = false
      }).catch(() => {
        this.listLoading = false
      })
    },
    giftMoney(data) {
      this.$confirm('是否确定赠送?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(() => {
        this.$store.dispatch('GiftMoney', { userid: data.userid }).then(resp => {
          this.$message({
            message: resp.msg,
            type: 'success'
          })
          this.query()
        })
      })
    },
    setSaleRate(data) {
      this.$prompt('请设定保底每万(0～200)', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(({ value }) => {
        if (value !== 0 && (!value || value < 0 || value > 200)) {
          this.$message({
            message: '请输入合法的保底',
            type: 'warning'
          })
          return false
        }
        this.$store.dispatch('SetSaleRate', { userid: data.userid, saleRate: value / 10000 }).then(resp => {
          this.$message({
            message: resp.msg,
            type: 'success'
          })
          this.query()
        })
      })
    },
    setUpSpread(data) {
      this.$prompt('请输入上级代理ID(⚠️注意：原始ID)', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(({ value }) => {
        if (!value || isNaN(Number(value)) || Number(value) < 0) {
          this.$message({
            message: '请输入合法的上级代理ID',
            type: 'warning'
          })
          return false
        }
        this.$store.dispatch('SetUpSpread', { userid: data.userid, spreadUserId: value }).then(resp => {
          this.$message({
            message: resp.msg,
            type: 'success'
          })
          this.query()
        })
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
    },
    hasPermission(menus, menuId) {
      if (menus) {
        return menus.some(menu => menu.menuid === menuId)
      } else {
        return false
      }
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
