<template>
  <div class="mod-demo-echarts">
    <div class="echartsTitle">
    <div>平台-注册充值金额</div>
    <div>时间: {{startTime}}-{{endTime}}</div>
  </div>
    <div class="echartsChoose">
      <el-button-group>
        <el-button :type="key == button.key ? 'primary' : ''" v-for="button in buttons" @click="playerOnlineStatisticsQuery(button)">{{button.value}}</el-button>
      </el-button-group>

      <!--<el-button-group class="group2">-->
        <!--<el-button :type="type == 1 ? 'primary' : ''" @click="accountLoginType(1)" >天</el-button>-->
        <!--<el-button :type="type == 2 ? 'primary' : ''" @click="accountLoginType(2)" >周</el-button>-->
        <!--<el-button :type="type == 3 ? 'primary' : ''" @click="accountLoginType(3)" >月</el-button>-->
      <!--</el-button-group>-->
    <div class="group2">
      充值来源:
      <el-select clearable @change="appPayChannelsChange" v-model="payChannel" placeholder="请选择">
        <el-option
          v-for="item in appPayChannels"
          :key="item.value"
          :label="item.value"
          :value="item.value">
        </el-option>
      </el-select>
    </div>

    </div>
    <div class="echarts">
    <el-row :gutter="20">
      <el-col :span="24">
        <el-card>
          <div id="J_chartBarBox2" class="chart-box"></div>
        </el-card>
      </el-col>
    </el-row>
    </div>


    <div class="moneyShow">

      <el-row class="money">
        <span>{{totalweixin}}</span>
        <span>{{totalapple}}</span>
        <span>{{totalali}}</span>
        <span>{{totalPrice}}</span>

      </el-row>
      <el-row class="title">
        <span>微信总金额(单位:元)</span>
        <span>apple总金额(单位:元)</span>
        <span>支付宝总金额(单位:元)</span>
        <span>总金额(单位:元)</span>
      </el-row>
    </div>


  </div>
</template>

<script>
  import echarts from 'echarts'
  export default {
    data () {
      return {
        autofocus: true,
        chartBar: null,
        list: [],
        legendDatas: [],
        xAxis:[],
        series: [],
        buttons: [],
        appPayChannels: [],
        payChannel: '',
        startTime: '',
        endTime: '',
        key: '',
        type: '',
        totalweixin: '',
        totalali: '',
        totalapple: '',
        totalPrice: ''
      }
    },
    mounted () {
      this.initData('1', 3)
      this.initButton()
      this.initAppPayChannel()
    },
    activated () {
      // 由于给echart添加了resize事件, 在组件激活时需要重新resize绘画一次, 否则出现空白bug
      if (this.chartBar) {
        this.chartBar.resize()
      }
    },
    methods: {
      initButton() {
        this.$store.dispatch('PlayerOnlineStatisticsButtons', {}).then(resp => {
          this.buttons = resp.data
        }).catch(() => {
        })
      },
      initAppPayChannel() {
        this.$store.dispatch('AppPayChannel', {}).then(resp => {
          this.appPayChannels = resp.data
        }).catch(() => {
        })
      },
      initData(key, type, payChannel) {
        this.key = key
        this.type = type
        this.payChannel = payChannel
        this.legendDatas = []
        this.series = []
        console.log(this.series)
        this.$store.dispatch('RechargeAmountStatistics', { key: key, type: type, payChannel: payChannel }).then(resp => {
          console.log(resp)

          this.totalweixin = resp.data.totalweixin
          this.totalali = resp.data.totalali
          this.totalapple = resp.data.totalapple
          this.totalPrice = resp.data.totalPrice

          this.xAxis = resp.data.xAxis
          this.startTime = resp.data.startTime
          this.endTime = resp.data.endTime
          for (const value of resp.data.rechargeAmountStatisticsVos) {
            this.legendDatas.push(value.rechargeSource)
            const serie = {}
            serie.name = value.rechargeSource
            serie.type = 'bar'
            serie.stack = '总量'
            serie.data = value.moneys
            this.series.push(serie)
          }

          console.log(this.series)
          this.initChartBar()
          this.chartBar.resize()
        }).catch(() => {
        })
      },
      accountLoginType(type) {
        this.initData(this.key, type)
      },
      playerOnlineStatisticsQuery(button, obj) {
        this.initData(button.key, this.type, this.payChannel)
      },
      appPayChannelsChange() {

        this.initData(this.key,this.type,this.payChannel)
      },
      // 折线图
      initChartBar() {
        var option = {
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            }
          },
          legend: {
            data: this.legendDatas
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: [
            {
              type: 'category',
              data: this.xAxis
            }
          ],
          yAxis: [
            {
              type: 'value'
            }
          ],
          series: this.series
        }
        this.chartBar = echarts.init(document.getElementById('J_chartBarBox2'))
        this.chartBar.setOption(option)
        window.addEventListener('resize', () => {
          this.chartBar.resize()
        })
      },
    }
  }
</script>

<style lang="scss">
  .mod-demo-echarts {
      width: 100%;
      height: 100%;
      float: left;
      margin: 8px;
      box-shadow: 0px 0px 3px 2px rgba(0, 0, 0, 0.4);

    > .el-alert {
      margin-bottom: 10px;
    }
    > .el-row {
      margin-top: -10px;
      margin-bottom: -10px;
      .el-col {
        padding-top: 10px;
        padding-bottom: 10px;
      }
    }
    .chart-box {
      min-height: 400px;
    }
  }

  .echarts {
    width: 100%;
    height: 80%;
  }
  .echartsTitle {
    width: 100%;
    height: 10%;
    font-size: 14px;
    font-weight: 700;
    padding-top: 10px;
    padding-left: 10px;
    padding-right: 30px;
    padding-bottom: 10px;
    border-bottom: 3px rgba(0, 0, 0, 0.1) solid;
  }

  .echartsChoose {
    width: 100%;
    height: 10%;
    padding-top: 10px;
    padding-left: 10px;
    padding-bottom: 10px;
  }

  .group2 {
    float: right;
    margin-right: 30px;
    font-size: 14px;
  }


  .echartsTitle div {
    display: inline-block;
  }

  .echartsTitle div:nth-child(2) {
    float: right;
  }

  .moneyShow {
    margin-top: 30px;
    border: 1px solid #d9e0ee;
  }

  .title,.money {
    width: 100%;
    height: 40px;
    font-size: 25px;
    line-height: 40px;
  }

  .title span,.money span {
    display: inline-block;
    width: 24.5%;
    text-align: center;
    border-right: 1px solid #d9e0ee;
    border-collapse: collapse;
  }

  .money span{
    font-weight: 700;
  }

</style>
