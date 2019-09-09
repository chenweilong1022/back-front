<template>
  <div class="app-container">
    <el-row>
      <el-card class="box-card-component" style="margin-left:8px;">
        <el-form ref="filterForm" :model="filterForm" :rules="filterRules" :inline="true" size="small" style="margin-left: 10px;">
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
          <el-form-item>
            <el-button type="primary" icon="el-icon-search" class="btn-form" @click="query">查询</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </el-row>
    <el-row id="content" style="margin-top: 20px;">
      <el-col :span="12">
        <el-card class="box-card-component" style="margin-left:8px;">
          <div slot="header" class="box-card-header">
            <h2>充值详情</h2>
          </div>
          <el-table
            :data="rechargeDatas"
            :summary-method="getSummaries"
            size="mini"
            border
            fit
            show-summary
            highlight-current-row>
            <el-table-column align="center" label="充值渠道名称">
              <template slot-scope="scope">
                {{ scope.row.typeName }}
              </template>
            </el-table-column>
            <el-table-column align="center" prop="amount" label="金额">
              <template slot-scope="scope">
                {{ scope.row.amount | moneyFilter }}
              </template>
            </el-table-column>
            <el-table-column align="center" prop="tax" label="手续费">
              <template slot-scope="scope">
                {{ scope.row.tax | moneyFilter }}
              </template>
            </el-table-column>
            <el-table-column align="center" prop="actualAmount" label="实际充值">
              <template slot-scope="scope">
                {{ scope.row.actualAmount | moneyFilter }}
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card class="box-card-component" style="margin-left:8px;">
          <div slot="header" class="box-card-header">
            <h2>提现详情</h2>
          </div>
          <el-table
            :data="withdrawDatas"
            :summary-method="getSummaries"
            size="mini"
            border
            fit
            show-summary
            highlight-current-row>
            <el-table-column align="center" label="发放渠道名称">
              <template slot-scope="scope">
                {{ scope.row.typeName }}
              </template>
            </el-table-column>
            <el-table-column align="center" prop="amount" label="金额">
              <template slot-scope="scope">
                {{ scope.row.amount | moneyFilter }}
              </template>
            </el-table-column>
            <el-table-column align="center" prop="tax" label="手续费">
              <template slot-scope="scope">
                {{ scope.row.tax | moneyFilter }}
              </template>
            </el-table-column>
            <el-table-column align="center" prop="actualAmount" label="实际提现">
              <template slot-scope="scope">
                {{ scope.row.actualAmount | moneyFilter }}
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { startTime, endTime } from '@/utils'
export default {
  name: 'Statement',
  filters: {
    moneyFilter(money) {
      if (money) {
        return (money / 100).toFixed(2)
      }
      return (0).toFixed(2)
    }
  },
  data() {
    return {
      filterForm: {
        startTime: startTime(0),
        endTime: endTime(0)
      },
      filterRules: {
        startTime: [{ required: true, trigger: 'blur', message: '必填项' }],
        endTime: [{ required: true, trigger: 'blur', message: '必填项' }]
      },
      rechargeDatas: [],
      withdrawDatas: []
    }
  },
  mounted() {
    this.query()
  },
  methods: {
    query() {
      this.$refs['filterForm'].validate(valid => {
        if (valid) {
          const loading = this.$loading({
            target: '#content',
            lock: true,
            text: '拼命加载中...',
            spinner: 'el-icon-loading',
            background: 'rgba(255, 255, 255, 0.5)'
          })
          this.$store.dispatch('ListRechargeStatementByQry', this.filterForm).then(resp => {
            this.rechargeDatas = resp.data

            this.queryWithdraw(loading)
          }).catch(() => loading.close())
        }
      })
    },
    queryWithdraw(loading) {
      this.$store.dispatch('ListWithdrawStatementByQry', this.filterForm).then(resp => {
        this.withdrawDatas = resp.data
        loading.close()
      }).catch(() => loading.close())
    },
    getSummaries(param) {
      const { columns, data } = param
      const sums = []
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = '总计'
          return
        }
        if (index > 0) {
          const values = data.map(item => Number(item[column.property]))
          console.log('data:' + data)
          console.log('values:' + values)
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
    }
  }
}
</script>

<style scoped>

</style>
