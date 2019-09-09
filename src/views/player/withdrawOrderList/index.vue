<template>
  <div class="app-container">
    <div class="filter-container">
      <el-form ref="filterForm" :inline="true" :model="filterForm" size="mini">
        <el-form-item label="提现方式">
          <el-radio-group v-model="filterForm.withdrawType">
            <el-radio-button v-for="item in payTypes" :key="'type_' + item.code" :label="item.code" :value="item.code">{{ item.title }}</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="玩家ID">
          <el-input v-model="filterForm.showId"/>
        </el-form-item>
        <el-form-item label="原始ID">
          <el-input v-model="filterForm.playerId"/>
        </el-form-item>
        <el-form-item label="玩家帐号">
          <el-input v-model="filterForm.account"/>
        </el-form-item>
        <el-form-item label="订单编号">
          <el-input v-model="filterForm.orderId"/>
        </el-form-item>
        <el-form-item label="状态">
          <el-radio-group v-model="filterForm.state">
            <el-radio-button v-for="item in states" :key="'state_'+item.state" :label="item.state" :value="item.state">{{ item.title }}</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="起始时间">
          <el-date-picker v-model="filterForm.startTime" type="datetime" format="yyyy-MM-dd HH:mm:ss" />
        </el-form-item>
        <el-form-item label="结束时间">
          <el-date-picker v-model="filterForm.endTime" type="datetime" format="yyyy-MM-dd HH:mm:ss" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="btn-form" @click="query">查询</el-button>
        </el-form-item>
      </el-form>
    </div>

    <el-table
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row>
      <el-table-column align="center" label="订单信息">
        <template slot-scope="scope">
          订单编号：{{ scope.row.id }}<br>
          创建于 {{ scope.row.createTime }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="玩家信息">
        <template slot-scope="scope">
          原始ID：{{ scope.row.userid }}<br>
          玩家ID：<label>{{ scope.row.showId }}</label><br>
          玩家昵称：{{ scope.row.nickname }}
        </template>
      </el-table-column>
      <el-table-column align="right" label="提现信息">
        <template slot-scope="scope">
          <el-row>
            <el-col :span="12">提现金额：</el-col>
            <el-col :span="12">{{ scope.row.amount | moneyFilter }}</el-col>
          </el-row>
          <el-row>
            <el-col :span="12">手续费：</el-col>
            <el-col :span="12">{{ scope.row.tax | moneyFilter }}</el-col>
          </el-row>
          <el-row>
            <el-col :span="12">实际提现：</el-col>
            <el-col :span="12"><el-button
              v-clipboard:copy="(scope.row.amount- scope.row.tax) / 100"
              v-clipboard:success="onCopy"
              type="text"
              size="mini" ><svg-icon icon-class="copy" style="width: 16px; height: 16px;" /></el-button><span style="font-weight: bold; color:red; font-size: 16px;">{{ scope.row.amount- scope.row.tax | moneyFilter }}</span></el-col>
          </el-row>
        </template>
      </el-table-column>
      <el-table-column align="left" label="提现信息" min-width="150px">
        <template slot-scope="scope">
          提现类型：{{ scope.row.type | withdrawTypeTitle }}<br>
          <template v-if="scope.row.type === 2">提现银行：<span style="color: red; font-weight: bold; font-size: 16px;">{{ scope.row.bank }}</span><el-button
            v-clipboard:copy="scope.row.bank"
            v-clipboard:success="onCopy"
            type="text"
            size="mini" ><svg-icon icon-class="copy" style="width: 16px;height: 16px;" /></el-button><br></template>
          提现账户：<span style="color: red; font-weight: bold; font-size: 16px;">{{ scope.row.account }}</span>
          <el-button
            v-clipboard:copy="scope.row.account"
            v-clipboard:success="onCopy"
            type="text"
            size="mini" ><svg-icon icon-class="copy" style="width: 16px;height: 16px;" /></el-button><br>
          提现名称：<span style="font-weight: bold; font-size: 16px;">{{ scope.row.realname }}</span>
          <el-button
            v-clipboard:copy="scope.row.realName"
            v-clipboard:success="onCopy"
            type="text"
            size="mini" ><svg-icon icon-class="copy" style="width: 16px;height: 16px;" /></el-button><br>
          <span v-if="scope.row.completetime">完成时间：{{ scope.row.completetime }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="订单状态" width="100px">
        <template slot-scope="scope">
          <el-tag :type="scope.row.state | withdrawStateColor">{{ scope.row.state | withdrawStateTitle }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="备注" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.note }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button v-if="scope.row.state === 0" icon="el-icon-check" type="text" size="mini" @click="modify(scope.row, 1)">受理</el-button>
          <el-button v-if="scope.row.state === 1" icon="el-icon-check" type="text" size="mini" @click="modify(scope.row, 2)">发放</el-button>
          <el-button v-if="scope.row.state === 0 || scope.row.state === 1" icon="el-icon-close" style="color: red" type="text" size="mini" @click="modify(scope.row, 3)">取消</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="pagination-container">
      <el-pagination :current-page.sync="filterForm.pageNo" :page-sizes="[10,20,30, 50]" :page-size="filterForm.pageSize" :total="listTotal" background layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange" @current-change="handleCurrentChange"/>
    </div>
  </div>
</template>

<script>
import { startTime, endTime } from '@/utils'
export default {
  name: 'WithdrawOrderList',
  filters: {
    moneyFilter(money) {
      if (money) {
        return (money / 100).toFixed(2)
      }
      return 0
    },
    withdrawTypeTitle(type) {
      switch (type) {
        case 0:
          return '支付宝'
        case 1:
          return '人工提现'
        case 2:
          return '银行卡'
      }
    },
    withdrawStateColor(state) {
      if (state === 1) {
        return 'info'
      } else if (state === 2) {
        return 'success'
      } else {
        return 'danger'
      }
    },
    withdrawStateTitle(state) {
      if (state === 0) {
        return '待处理'
      } else if (state === 1) {
        return '已受理'
      } else if (state === 2) {
        return '已打款'
      } else if (state === 3) {
        return '已取消'
      } else {
        return '已退还'
      }
    }
  },
  data() {
    return {
      filterForm: {
        showId: null,
        playerId: null,
        account: null,
        orderId: null,
        state: null,
        startTime: startTime(0),
        endTime: endTime(0),
        pageNo: 1,
        pageSize: 10
      },
      payTypes: [
        { code: 0, title: '支付宝' },
        { code: 1, title: '手工提现' },
        { code: 2, title: '银行卡' }
      ],
      states: [
        { state: 0, title: '待处理' },
        { state: 1, title: '已受理' },
        { state: 2, title: '已打款' },
        { state: 3, title: '已取消' }
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
      this.$store.dispatch('ListWithdrawOrderByQry', this.filterForm).then(resp => {
        this.list = resp.data
        this.listTotal = resp.totalCount
        this.listLoading = false
      }).catch(() => {
        this.listLoading = false
      })
    },
    onCopy: function(e) {
      this.$message({
        message: '已复制',
        type: 'success'
      })
    },
    modify(data, state) {
      if (state === 1) {
        this.$confirm('此操作将受理订单，是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }).then(() => {
          this.modifyAction(data, state)
        })
      } else if (state === 2) {
        this.$confirm('此操作将发放款项，是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }).then(() => {
          this.modifyAction(data, state)
        })
      } else {
        this.$prompt('此操作将取消订单, 请输入原因', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }).then(({ value }) => {
          if (!value) {
            this.$message({
              message: '请输入原因',
              type: 'error'
            })
            return false
          }
          data.note = value
          this.modifyAction(data, state)
        })
      }
    },
    modifyAction(data, state) {
      this.$store.dispatch('UpdateWithdrawOrder', { ...data, state }).then(resp => {
        this.$message({
          type: 'success',
          message: resp.msg
        })
        this.query()
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
