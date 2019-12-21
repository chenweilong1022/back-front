<template>
  <div class="mod-demo-echarts">
    <div class="echartsTitle">
    <div>平台-注册用户数</div>
    <div>时间: {{startTime}}-{{endTime}}</div>
  </div>
    <div class="echartsChoose">
      <el-button-group>
        <el-button :type="key == button.key ? 'primary' : ''" v-for="button in buttons" @click="playerOnlineStatisticsQuery(button)">{{button.value}}</el-button>
      </el-button-group>

      <el-button-group class="group2">
        <el-button :type="type == 3 ? 'primary' : ''" @click="accountLoginType(3)" >渠道</el-button>
        <el-button :type="type == 4 ? 'primary' : ''" @click="accountLoginType(4)" >来源</el-button>
      </el-button-group>
    </div>
    <div class="echarts">
    <el-row :gutter="20">
      <el-col :span="24">
        <el-card>
          <div id="J_chartBarBox1" class="chart-box"></div>
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
        autofocus: true,
        chartBar: null,
        list: [],
        legendDatas: [],
        xAxis:[],
        series: [],
        buttons: [],
        startTime: '',
        endTime: '',
        key: '',
        type: ''
      }
    },
    mounted () {
      this.initData('1', 3)
      this.initButton()
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
      initData(key, type) {
        this.key = key
        this.type = type
        this.legendDatas = []
        this.series = []
        console.log(this.series)
        this.$store.dispatch('AccountLoginRegistrEverydayStatistics', { key: key, type: type }).then(resp => {

          this.xAxis = resp.data.dateTimes
          this.startTime = resp.data.startTime
          this.endTime = resp.data.endTime
          for (const value of resp.data.accountLoginEverydayStatisticsVos) {
            this.legendDatas.push(value.accountLoginWay)
            const serie = {}
            serie.name = value.accountLoginWay
            serie.type = 'bar'
            serie.stack = '总量'
            serie.data = value.counts
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
        this.initData(button.key, this.type)
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
        this.chartBar = echarts.init(document.getElementById('J_chartBarBox1'))
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
  }

  .echartsTitle div {
    display: inline-block;
  }

  .echartsTitle div:nth-child(2) {
    float: right;
  }
</style>
