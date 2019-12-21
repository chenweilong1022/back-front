<template>
  <div class="mod-demo-echarts">
    <!--<el-alert-->
      <!--title="提示："-->
      <!--type="warning"-->
      <!--:closable="false">-->
      <!--<div slot-scope="description">-->
        <!--<p class="el-alert__description">1. 此Demo只提供ECharts官方使用文档，入门部署和体验功能。具体使用请参考：http://echarts.baidu.com/index.html</p>-->
      <!--</div>-->
    <!--</el-alert>-->

    <el-row :gutter="20">
      <el-col :span="24">
        <el-card>
          <div id="J_chartLineBox3" class="chart-box"></div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import echarts from 'echarts'
  export default {
    data () {
      return {
        chartLine: null,
        list: [],
        dateList: [],
        onlineList: [],
        playingList: [],
      }
    },
    mounted () {
      this.initData()
      // this.initChartLine()
    },
    activated () {
      // 由于给echart添加了resize事件, 在组件激活时需要重新resize绘画一次, 否则出现空白bug
      if (this.chartLine) {
        this.chartLine.resize()
      }
    },
    methods: {
      initData() {
        this.$store.dispatch('ListAllRecordAccountOnlinePlaying', {}).then(resp => {
          this.list = resp.data
          var onlineLists = []
          var playingLists = []
          var dateLists = []
          this.initChartLine()

          for (let value of this.list) {
            onlineLists.push(value.onlineNumber)
            playingLists.push(value.playingNumber)
            dateLists.push(value.currentMinutes)
          }

          this.dateList = dateLists
          this.playingList = playingLists
          this.onlineList = onlineLists

          this.initChartLine()
        }).catch(() => {

        })
      },
      // 折线图
      initChartLine () {
        var option = {
          'title': {
            'text': '在线在玩玩家统计'
          },
          'tooltip': {
            'trigger': 'axis'
          },
          'legend': {
            'data': [ '在线', '在玩' ]
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
            'data': this.dateList
          },
          'yAxis': {
            'type': 'value'
          },
          'series': [
            {
              'name': '在线',
              'type': 'line',
              'data': this.onlineList
            },
            {
              'name': '在玩',
              'type': 'line',
              'data': this.playingList
            }
          ]
        }
        this.chartLine = echarts.init(document.getElementById('J_chartLineBox3'))
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
</style>
