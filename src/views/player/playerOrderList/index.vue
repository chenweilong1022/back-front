<template>
  <div class="app-container">
    <div class="filter-container">
      <el-form ref="filterForm" :inline="true" :model="filterForm" size="mini">
        <el-form-item label="玩家昵称">
          <el-input v-model="filterForm.nickName"/>
        </el-form-item>
        <el-form-item label="玩家ID">
          <el-input v-model="filterForm.showId"/>
        </el-form-item>
        <el-form-item label="订单编号">
          <el-input v-model="filterForm.orderNo"/>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="filterForm.state">
            <el-option
              key="0"
              :value="1"
              label="未支付"/>
            <el-option
              key="1"
              :value="2"
              label="支付成功"/>
            <el-option
              key="2"
              :value="3"
              label="订单成功"/>
            <el-option
              key="3"
              :value="4"
              label="失败"/>
          </el-select>
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
      <el-table-column align="center" label="订单编号">
        <template slot-scope="scope">
          {{ scope.row.orderId }}
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
      <el-table-column align="center" label="订单名称">
        <template slot-scope="scope">
          {{ scope.row.goodsName }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="订单金额">
        <template slot-scope="scope">
          {{ scope.row.money | moneyFilter }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="商品类型">
        <template slot-scope="scope">
          {{ scope.row.goodsType === 'gold'? '金币' : '其他' }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="商品价值">
        <template slot-scope="scope">
          {{ scope.row.goodsVal }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="支付类别">
        <template slot-scope="scope">
          {{ scope.row.channel | channelFilter }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="订单状态">
        <template slot-scope="scope">
          <el-tag :type="scope.row.state | payStateColor">{{ scope.row.state | payStateTitle }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="下单时间" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.createTime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="支付时间" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.payTime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button v-if="scope.row.channel === 'bank' && scope.row.state === 1" icon="el-icon-check" type="text" size="mini" @click="modify(scope.row, 'success')">支付成功</el-button><br>
          <el-button v-if="scope.row.channel === 'bank' && scope.row.state === 1" style="color:red;" icon="el-icon-close" type="text" size="mini" @click="modify(scope.row, 'failure')">验证失败</el-button>
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
  name: 'PlayerOrderListPage',
  filters: {
    moneyFilter(money) {
      if (money) {
        return money / 100
      }
      return 0
    },
    channelFilter(channel) {
      if (channel === 'fengyun') {
        return '风云支付'
      } else if (channel === 'alipay') {
        return '支付宝'
      } else if (channel === 'weixin') {
        return '微信'
      } else if (channel === 'apple') {
        return '苹果支付'
      } else if (channel === 'wantong') {
        return '万通支付'
      } else if (channel === 'bank') {
        return '转银行'
      }
      return ' '
    },
    payStateColor(state) {
      if (state === 2 || state === 3) {
        return 'success'
      } else {
        return 'danger'
      }
    },
    payStateTitle(state) {
      if (state === 1) {
        return '未支付'
      } else if (state === 2) {
        return '支付成功'
      } else if (state === 3) {
        return '订单成功'
      } else {
        return '订单失效'
      }
    }
  },
  data() {
    return {
      filterForm: {
        showId: null,
        state: 3,
        nickName: null,
        orderNo: null,
        pageNo: 1,
        pageSize: 10
      },
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
      if (this.$route.query.orderNo) {
        this.filterForm.orderNo = this.$route.query.orderNo
        this.filterForm.state = Number(this.$route.query.state)
      }
      this.listLoading = true
      this.$store.dispatch('ListPlayerOrderByQry', this.filterForm).then(resp => {
        this.list = resp.data
        this.listTotal = resp.totalCount
        this.listLoading = false
      }).catch(() => {
        this.listLoading = false
      })
    },
    modify(data, result) {
      this.$confirm(result === 'success' ? '确定支付成功？' : '确定验证失败？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(() => {
        this.$store.dispatch('UpdateOrder', {
          orderId: data.orderId,
          result
        }).then(resp => {
          this.$message({
            type: 'success',
            message: resp.msg
          })

          this.query()
        })
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
