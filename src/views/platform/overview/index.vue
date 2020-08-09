<template>
  <div class="app-container" style="background-color: #f0f2f5;padding: 20px;">
    <el-card class="box-card-component" style="margin-left:8px;">
      <div slot="header" class="clearfix">
        平台系统概况
      </div>
      <div class="filter-container">
        <el-form ref="filterForm" :model="overview" label-width="200px" size="mini">
          <el-form-item label="平台玩家总数">
            <label>{{ overview.totalUser }}</label>
          </el-form-item>
          <el-form-item label="平台冻结玩家数">
            <label>{{ overview.lockUser }}</label>
          </el-form-item>
          <el-form-item label="当前在线玩家数">
            <label>{{ overview.nowOnline }}</label>
          </el-form-item>
          <el-form-item label="今日最高在线玩家数">
            <label>{{ overview.todayMaxOnline }}</label>
          </el-form-item>
          <el-form-item label="今日活跃玩家数">
            <label>{{ overview.todayLogin }}</label>
          </el-form-item>
          <el-form-item label="今日注册玩家数">
            <label>{{ overview.todayRegNum }}</label>
          </el-form-item>
          <el-form-item label="平台财富总和">
            <label>{{ overview.totalGold | moneyFilter }}</label>
          </el-form-item>
          <el-form-item label="在线玩家平台财富总和">
            <label>{{ overview.onlineTotalGold | moneyFilter }}</label>
          </el-form-item>
          <el-form-item label="冻结玩家财富总额">
            <label>{{ overview.lockUserGold | moneyFilter }}</label>
          </el-form-item>
          <el-form-item label="平台充值总额">
            <label>{{ overview.totalOrderPay | moneyFilter }}</label>
          </el-form-item>
          <el-form-item label="平台税收总额">
            <label>{{ overview.totalTax | moneyFilter }}</label>
          </el-form-item>
        </el-form>
      </div>
    </el-card>

  </div>
</template>

<script>
export default {
  name: 'OverviewPage',
  filters: {
    moneyFilter(money) {
      if (money) {
        return money / 100
      }
      return 0
    }
  },
  data() {
    return {
      overview: {}
    }
  },
  mounted() {
    this.queryPlatformOverview()
  },
  methods: {
    queryPlatformOverview() {
      this.$store.dispatch('GetPlatformOverview').then(resp => {
        this.overview = resp.data
      })
    }
  }
}
</script>

<style scoped>

</style>
