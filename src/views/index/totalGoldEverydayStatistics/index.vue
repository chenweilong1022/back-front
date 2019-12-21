<template>
  <div class="mod-demo-echarts">
    <div class="echartsTitle">
    <div>平台-总金币走势</div>
    <div>时间: {{startTime}}-{{endTime}}</div>
  </div>
    <div class="echartsChoose">
      <el-button-group>
        <el-button :type="key == button.key ? 'primary' : ''" v-for="button in buttons" @click="playerOnlineStatisticsQuery(button)">{{button.value}}</el-button>
      </el-button-group>
    </div>
    <div class="echarts">
    <el-row :gutter="20">
      <el-col :span="24">
        <el-card>
          <div id="J_chartLineBox1" class="chart-box"></div>
        </el-card>
      </el-col>
    </el-row>
    </div>

    <div class="moneyShow1">

      <el-row class="money1">
        <span>{{totalGold}}</span>
        <span>{{gold}}</span>
        <span>{{bankGold}}</span>
      </el-row>
      <el-row class="title1">
        <span>玩家总金币(单位:元)</span>
        <span>玩家身上总金币(单位:元)</span>
        <span>玩家银行总金币(单位:元)</span>
      </el-row>
    </div>
  </div>
</template>

<script>
  import echarts from 'echarts'
  export default {
    data () {
      return {
        key: '',
        chartLine: null,
        list: [],
        legendDatas: [],
        xAxis:[],
        series: [],
        buttons: [],
        startTime: '',
        endTime: '',
        gold: '',
        bankGold: '',
        totalGold: ''
      }
    },
    mounted () {
      this.initData('1')
      this.initButton()
    },
    activated () {
      // 由于给echart添加了resize事件, 在组件激活时需要重新resize绘画一次, 否则出现空白bug
      if (this.chartLine) {
        this.chartLine.resize()
      }
    },
    methods: {

      initButton() {
        this.$store.dispatch('PlayerOnlineStatisticsButtons', {}).then(resp => {
          this.buttons = resp.data
          console.log(this.buttons)
        }).catch(() => {
        })
      },
      initData(key) {
        this.key = key
        this.legendDatas = []
        this.series = []
        console.log(this.series)
        this.$store.dispatch('TotalGoldEverydayStatistics', { key: key}).then(resp => {
          console.log(resp)

          this.gold = resp.data.gold
          this.bankGold = resp.data.bankGold
          this.totalGold = resp.data.totalGold

          this.xAxis = resp.data.xAxis
          this.startTime = resp.data.startTime
          this.endTime = resp.data.endTime
          for (const value of resp.data.totalGoldEverydayStatisticsVos) {
            this.legendDatas.push(value.goldSource)
            const serie = {}
            serie.name = value.goldSource
            serie.type = 'line'
            // serie.stack = '总量'
            serie.data = value.golds
            this.series.push(serie)
          }
          this.initChartLine()
        }).catch(() => {
        })
      },
      playerOnlineStatisticsQuery(button) {
        this.initData(button.key)
      },
      // 折线图
      initChartLine() {
        var option = {
          'title': {
            'text': ''
          },
          'tooltip': {
            'trigger': 'axis'
          },
          'legend': {
            'data': this.legendDatas
          },
          'grid': {
            'left': '3%',
            'right': '4%',
            'bottom': '3%',
            'containLabel': true
          },
          'toolbox': {
            'feature': {
              'saveAsImage': { }
            }
          },
          'xAxis': {
            'type': 'category',
            'boundaryGap': false,
            'data': this.xAxis
          },
          'yAxis': {
            'type': 'value'
          },
          'series': this.series
        }
        this.chartLine = echarts.init(document.getElementById('J_chartLineBox1'))
        this.chartLine.setOption(option)
        window.addEventListener('resize', () => {
          this.chartLine.resize()
        })
      }
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

  .echartsTitle div {
    display: inline-block;
  }

  .echartsTitle div:nth-child(2) {
    float: right;
  }

  .moneyShow1 {
    margin-top: 30px;
    border: 1px solid #d9e0ee;
  }

  .title1,.money1 {
    width: 100%;
    height: 40px;
    font-size: 25px;
    line-height: 40px;
  }

  .title1 span,.money1 span {
    display: inline-block;
    width: 32%;
    text-align: center;
    border-right: 1px solid #d9e0ee;
    border-collapse: collapse;
  }

  .money1 span{
    font-weight: 700;
  }
</style>
