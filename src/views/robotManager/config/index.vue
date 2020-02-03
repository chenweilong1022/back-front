<template>
  <div class="app-container">
    <el-row>
      <el-card class="box-card-component">
        <el-form ref="filterForm" :model="filterForm" :inline="true">
          <el-form-item label="选择房间">
            <el-select v-model="filterForm.roomId" @change="queryConfig()">
              <el-option v-for="item in rooms" :key="item.roomid" :label="item.roomName" :value="item.roomid" />
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" icon="el-icon-refresh" class="btn-form" @click="queryConfig">刷新</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </el-row>

    <el-row id="content" style="margin-top: 20px;">
      <el-card v-if="others.some(val => val === Math.floor(filterForm.roomId / 100))" class="box-card-component">
        <div slot="header" class="clearfix">
          <h2>
            {{ rooms && rooms.length > 0 && rooms.find(element => element.roomid === filterForm.roomId).roomName }}机器人配置
            <el-button style="margin-left: 10px;" type="primary" @click="saveData('other')">保 存</el-button>
          </h2>
        </div>
        <div class="filter-container">
          <el-form ref="otherForm" :model="otherForm" label-position="right" style="width: 1000px;" >
            <el-form-item label="下注范围" label-width="210px">
              <el-col :span="12">
                <el-form-item label="最小值" label-width="80px">
                  <el-input v-model="otherForm.bet.min" style="width: 100%;"/>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="最大值" label-width="80px">
                  <el-input v-model="otherForm.bet.max" style="width: 100%;"/>
                </el-form-item>
              </el-col>
            </el-form-item>
            <el-form-item label="每张桌子机器人数" label-width="210px">
              <el-col :span="12">
                <el-form-item label="最小值" label-width="80px">
                  <el-input v-model="otherForm.num.min" style="width: 100%;"/>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="最大值" label-width="80px">
                  <el-input v-model="otherForm.num.max" style="width: 100%;"/>
                </el-form-item>
              </el-col>
            </el-form-item>
            <el-form-item label="下注权值" label-width="210px">
              <el-col :span="8">
                <el-form-item label="押闲概率" label-width="80px">
                  <el-input v-model="otherForm.win.xianWin" style="width: 100%;">
                    <template slot="append">%</template>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="押庄概率" label-width="80px">
                  <el-input v-model="otherForm.win.zhuangWin" style="width: 100%;">
                    <template slot="append">%</template>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="押和概率" label-width="80px">
                  <el-input v-model="otherForm.win.equal" style="width: 100%;">
                    <template slot="append">%</template>
                  </el-input>
                </el-form-item>
              </el-col>
            </el-form-item>
            <el-form-item label="押庄闲平后押对的概率" label-width="210px">
              <el-col :span="12">
                <el-form-item label="庄对概率" label-width="80px">
                  <el-input v-model="otherForm.zone.zhuangDui" style="width: 100%;">
                    <template slot="append">%</template>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="闲对概率" label-width="80px">
                  <el-input v-model="otherForm.zone.xianDui" style="width: 100%;">
                    <template slot="append">%</template>
                  </el-input>
                </el-form-item>
              </el-col>
            </el-form-item>
            <el-form-item label="空闲座椅数量" label-width="210px">
              <el-col :span="12">
                <el-form-item label="最小值" label-width="80px">
                  <el-input v-model="otherForm.minIdleSeat.min" style="width: 100%;"/>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="最大值" label-width="80px">
                  <el-input v-model="otherForm.minIdleSeat.max" style="width: 100%;"/>
                </el-form-item>
              </el-col>
            </el-form-item>
            <el-form-item label="房间内的时间" label-width="210px">
              <el-col :span="12">
                <el-form-item label="最小值" label-width="80px">
                  <el-input v-model="otherForm.time.min" style="width: 100%;"/>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="最大值" label-width="80px">
                  <el-input v-model="otherForm.time.max" style="width: 100%;"/>
                </el-form-item>
              </el-col>
            </el-form-item>
            <el-form-item label="机器人携带金钱范围" label-width="210px">
              <el-row v-for="(item, index) in otherForm.gold" :key="'other_'+index">
                <el-col :span="12">
                  <el-form-item :label="index + '：最小值'" label-width="80px">
                    <el-input v-model="item.min" style="width: 100%;"/>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="最大值" label-width="80px">
                    <el-input v-model="item.max" style="width: 100%;"/>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form-item>
          </el-form>
        </div>
      </el-card>

      <el-card v-if="bys.some(val => val === Math.floor(filterForm.roomId / 100))" class="box-card-component">
        <div slot="header" class="clearfix">
          <h2>
            {{ rooms && rooms.length > 0 && rooms.find(element => element.roomid === filterForm.roomId).roomName }}机器人配置
            <el-button style="margin-left: 10px;" type="primary" @click="saveData('by')">保 存</el-button>
          </h2>
        </div>
        <div class="filter-container">
          <el-form ref="otherForm" :model="byForm" label-position="right" style="width: 1000px;" >
            <el-form-item label="加农炮等级" label-width="210px">
              <el-input v-model="byForm.cannonLevel" style="width: 100%;"/>
            </el-form-item>
            <el-form-item label="基础分数" label-width="210px">
              <el-input v-model="byForm.baseScore" style="width: 100%;"/>
            </el-form-item>
            <el-form-item label="每张桌子机器人数" label-width="210px">
              <el-col :span="12">
                <el-form-item label="最小值" label-width="80px">
                  <el-input v-model="byForm.num.min" style="width: 100%;"/>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="最大值" label-width="80px">
                  <el-input v-model="byForm.num.max" style="width: 100%;"/>
                </el-form-item>
              </el-col>
            </el-form-item>
            <el-form-item label="房间内的时间" label-width="210px">
              <el-col :span="12">
                <el-form-item label="最小值" label-width="80px">
                  <el-input v-model="byForm.time.min" style="width: 100%;"/>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="最大值" label-width="80px">
                  <el-input v-model="byForm.time.max" style="width: 100%;"/>
                </el-form-item>
              </el-col>
            </el-form-item>
            <el-form-item label="机器人携带金钱范围" label-width="210px">
              <el-row>
                <el-col :span="12">
                  <el-form-item label="最小值" label-width="80px">
                    <el-input v-model="byForm.gold.min" style="width: 100%;"/>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="最大值" label-width="80px">
                    <el-input v-model="byForm.gold.max" style="width: 100%;"/>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form-item>
          </el-form>
        </div>
      </el-card>

    </el-row>
  </div>
</template>

<script>
export default {
  name: 'RobotManage',
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
      rooms: [],
      bys: [145, 148],
      others: [127],
      filterForm: {
        roomId: null
      },
      byForm: {
        gold: {
          min: null,
          max: null
        },
        time: {
          min: null,
          max: null
        },
        logic: 'dtdw_dntg',
        num: {
          min: null,
          max: null
        },
        baseScore: null,
        cannonLevel: null
      },
      otherForm: {
        bet: {
          min: null,
          max: null
        },
        num: {
          min: null,
          max: null
        },
        win: {
          xianWin: null,
          zhuangWin: null,
          equal: null
        },
        zone: {
          zhuangDui: null,
          xianDui: null
        },
        minIdleSeat: {
          min: null,
          max: null
        },
        time: {
          min: null,
          max: null
        },
        gold: [
          {
            min: null,
            max: null
          },
          {
            min: null,
            max: null
          },
          {
            min: null,
            max: null
          }
        ],
        logic: 'bjl',
        debug: true
      },
      robots: []
    }
  },
  mounted() {
    this.queryRoomIds()
  },
  methods: {
    queryRoomIds() {
      this.$store.dispatch('ListGameRoomByQry', {}).then(resp => {
        this.rooms = resp.data
        this.filterForm.roomId = this.rooms[0].roomid
        this.queryConfig()
      })
    },
    queryConfig() {
      const loading = this.$loading({
        target: '#content',
        lock: true,
        text: '拼命加载中...',
        spinner: 'el-icon-loading',
        background: 'rgba(255, 255, 255, 0.5)'
      })
      this.$store.dispatch('GetRobotConfigByQry', this.filterForm.roomId).then(resp => {
        const data = resp.data
        if (data) {
          // 如果是捕鱼
          if (this.bys.some(val => val === Math.floor(data.roomId / 100))) {
            this.byForm = JSON.parse(data.config)
          } else if (this.others.some(val => val === Math.floor(data.roomId / 100))) {
            this.otherForm = JSON.parse(data.config)
          }
        }

        this.queryRobots(loading)
      }).catch(() => loading.close())
    },
    queryRobots(loading) {
      this.$store.dispatch('GetRobotsByQry', this.filterForm.roomId).then(resp => {
        const data = resp.data
        let robots = []
        data && data.forEach(element => {
          if (Array.isArray(element)) {
            element.forEach(item => {
              robots = robots.concat(item)
            })
          }
        })
        this.robots = robots

        loading.close()
      }).catch(() => loading.close())
    },
    saveData(type) {
      this.$confirm('此操作将更新机器人配置，是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(() => {
        switch (type) {
          case 'other':
            this.saveAction(this.otherForm)
            break
          case 'by':
            this.saveAction(this.byForm)
            break
        }
      })
    },
    addRobot() {
      this.$prompt('此操作将添加机器人，请输入桌号', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(({ value }) => {
        if (!value || isNaN(Number(value)) || Number(value) < 0) {
          this.$message({
            message: '请输入合法的桌号',
            type: 'error'
          })
          return false
        }

        this.$store.dispatch('AddRobot', { roomId: this.filterForm.roomId, tableId: value }).then(resp => {
          this.$message({
            message: resp.msg,
            type: 'success'
          })

          this.queryConfig()
        })
      })
    },
    resetRobot(uid) {
      this.$confirm('此操作将重置机器人，是否继续？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(() => {
        this.$store.dispatch('ResetRobot', { roomId: this.filterForm.roomId, uid }).then(resp => {
          this.$message({
            message: resp.msg,
            type: 'success'
          })

          this.queryConfig()
        })
      })
    },
    delRobot(data) {
      this.$confirm('此操作将删除机器人，是否继续？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(() => {
        this.$store.dispatch('DeleteRobot', { roomId: this.filterForm.roomId, tableId: data.tableid, uid: data.uid }).then(resp => {
          this.$message({
            message: resp.msg,
            type: 'success'
          })

          this.queryConfig()
        })
      })
    },
    saveAction(data) {
      this.$store.dispatch('UpdateRobotConfig', {
        roomId: this.filterForm.roomId,
        config: JSON.stringify(data)
      }).then(resp => {
        this.$message({
          message: resp.msg,
          type: 'success'
        })

        this.queryConfig()
      })
    }
  }
}
</script>

<style scoped>

</style>
