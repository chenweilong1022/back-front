<template>
  <div class="mod-demo-echarts">
    <div class="echartsTitle">
    <div>游戏玩家在线趋势</div>
    <div>时间: {{startTime}}-{{endTime}}</div>
  </div>
    <div class="echartsChoose">
      <el-button-group>
        <el-button v-for="button in buttons" @click="playerOnlineStatisticsQuery(button)">{{button.value}}</el-button>
      </el-button-group>
    </div>
    <div class="echarts">
    <el-row :gutter="20">
      <el-col :span="24">
        <el-card>
          <div id="J_chartLineBox" class="chart-box"></div>
        </el-card>
      </el-col>
    </el-row>
    </div>
  </div>
</template>

<script>
  import echarts from 'echarts'
  export default {
    data () {
      return {
        chartLine: null,
        list: [],
        legendDatas: [],
        xAxis:[],
        series: [],
        buttons: [],
        startTime: '',
        endTime: '',
      }
    },
    mounted () {
      this.initData()
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
        this.legendDatas = []
        this.xAxis = []
        this.series = []
        console.log('开始')
        this.$store.dispatch('PlayerOnlineStatistics', { key: key }).then(resp => {

          this.startTime = resp.data.startTime
          this.endTime = resp.data.endTime

          for (let value of resp.data.dateTimes) {
            this.legendDatas.push(value)
          }

          for (let value of resp.data.playerOnlineStatisticsVos) {
            this.xAxis.push(value.date)
            const serie = {};
            serie.name = value.date
            serie.type = 'line'
            serie.stack = '总量'
            serie.data = value.list
            this.series.push(serie)
          }

          console.log(this.legendDatas)
          console.log(this.series)
          console.log(this.xAxis)
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
            'data': this.xAxis
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
            'data': this.legendDatas
          },
          'yAxis': {
            'type': 'value'
          },
          'series': this.series
        }
        this.chartLine = echarts.init(document.getElementById('J_chartLineBox'))
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
</style>
