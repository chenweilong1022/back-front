<template>
  <div class="dashboard-container">
    <el-row class="panel-group" :gutter="40">
      <el-col :xs="12" :sm="12" :lg="6" v-for="(item, index) of indexCards" class="card-panel-col">
        <div class='card-panel'>
          <div class="card-panel-icon-wrapper icon-people">
            <svg-icon :icon-class="item.icon" class-name="card-panel-icon" />
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">{{item.title}}</div>
            <count-to class="card-panel-num">{{item.value}}</count-to>
          </div>
        </div>
      </el-col>
    </el-row>

    <!--<record-account-online-playing ref="recordAccountOnlinePlaying"></record-account-online-playing>-->

    <record-account-online-playing ref="recordAccountOnlinePlaying"></record-account-online-playing>
    <player-online-statistics ref="playerOnlineStatistics"></player-online-statistics>


    <account-login-everyday-statistics ref="accountLoginEverydayStatistics"></account-login-everyday-statistics>

    <account-register-everyday-statistics ref="accountRegisterEverydayStatistics"></account-register-everyday-statistics>
    <recharge-amount-statistics ref="rechargeAmountStatistics"></recharge-amount-statistics>
    <total-gold-everyday-statistics ref="totalGoldEverydayStatistics"></total-gold-everyday-statistics>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
// import adminDashboard from './admin'
import adminMonitor from './monitor'
import playerOnlineStatistics from '@/views/index/playerOnlineStatistics'
import accountLoginEverydayStatistics from '@/views/index/accountLoginEverydayStatistics'
import accountRegisterEverydayStatistics from '@/views/index/accountRegisterEverydayStatistics'
import rechargeAmountStatistics from '@/views/index/rechargeAmountStatistics'
import totalGoldEverydayStatistics from '@/views/index/totalGoldEverydayStatistics'
import recordAccountOnlinePlaying from '@/views/platform/recordAccountOnlinePlaying'

export default {
  name: 'Dashboard',
  components: {
    adminMonitor,
    playerOnlineStatistics,
    accountLoginEverydayStatistics,
    accountRegisterEverydayStatistics,
    rechargeAmountStatistics,
    totalGoldEverydayStatistics,
    recordAccountOnlinePlaying
  },
  data() {
    return {
      currentRole: 'adminMonitor',
      indexCards: []
    }
  },
  computed: {
    ...mapGetters([
      'name',
      'roles'
    ])
  },
  mounted() {
    this.indexCardQuery()
  },
  methods: {
    indexCardQuery() {
      console.log('开始查询')
      this.$store.dispatch('IndexCard', {}).then(resp => {
        console.log(resp)
        this.indexCards = resp.data
      }).catch(() => {

      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .dashboard {
    &-container {
      margin: 30px;
    }
    &-text {
      font-size: 30px;
      line-height: 46px;
    }
  }
  .panel-group {
    margin-top: 18px;
    .card-panel-col{
      margin-bottom: 32px;
    }
    .card-panel {
      height: 108px;
      cursor: pointer;
      font-size: 12px;
      position: relative;
      overflow: hidden;
      color: #666;
      background: #fff;
      box-shadow: 4px 4px 40px rgba(0, 0, 0, .05);
      border-color: rgba(0, 0, 0, .05);
      &:hover {
        .card-panel-icon-wrapper {
          color: #fff;
        }
        .icon-people {
          background: #40c9c6;
        }
        .icon-message {
          background: #36a3f7;
        }
        .icon-money {
          background: #f4516c;
        }
        .icon-shoppingCard {
          background: #34bfa3
        }
      }
      .icon-people {
        color: #40c9c6;
      }
      .icon-message {
        color: #36a3f7;
      }
      .icon-money {
        color: #f4516c;
      }
      .icon-shoppingCard {
        color: #34bfa3
      }
      .card-panel-icon-wrapper {
        float: left;
        margin: 14px 0 0 14px;
        padding: 16px;
        transition: all 0.38s ease-out;
        border-radius: 6px;
      }
      .card-panel-icon {
        float: left;
        font-size: 48px;
      }
      .card-panel-description {
        float: right;
        font-weight: bold;
        margin: 26px;
        margin-left: 0px;
        .card-panel-text {
          line-height: 18px;
          color: rgba(0, 0, 0, 0.45);
          font-size: 16px;
          margin-bottom: 12px;
        }
        .card-panel-num {
          font-size: 20px;
        }
      }
    }
  }
</style>
