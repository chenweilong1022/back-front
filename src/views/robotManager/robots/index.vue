<template>
  <div class="app-container">
    <el-row id="content" style="margin-top: 20px;">
      <el-card class="box-card-component">
        <div slot="header" class="clearfix">
          <h2>机器人列表<el-button style="margin-left: 10px;" type="primary" @click="addRobot">添加机器人</el-button></h2>
        </div>
        <div class="filter-container">
          <el-table
            :data="robots"
            size="mini"
            border
            fit>
            <el-table-column align="center" label="桌号/座位号">
              <template slot-scope="scope">
                {{ scope.row.tableid }} / {{ scope.row.seat }}
              </template>
            </el-table-column>
            <el-table-column align="center" label="机器人ID">
              <template slot-scope="scope">
                {{ scope.row.uid }}
              </template>
            </el-table-column>
            <el-table-column align="center" label="机器人名称">
              <template slot-scope="scope">
                {{ scope.row.name }}
              </template>
            </el-table-column>
            <el-table-column align="center" label="身上金币">
              <template slot-scope="scope">
                {{ scope.row.gold | moneyFilter }}
              </template>
            </el-table-column>
            <el-table-column align="center" label="操作">
              <template slot-scope="scope">
                <el-button type="text" @click="resetRobot(scope.row.uid)">重置机器人</el-button>
                <el-button type="text" @click="delRobot(scope.row)">删除机器人</el-button>
              </template>
            </el-table-column>
          </el-table>
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
  watch: {
    '$route': 'watchUrl'
  },
  mounted() {
    // this.queryRoomIds()
  },
  methods: {
    watchUrl() {
      const loading = this.$loading({
        target: '#content',
        lock: true,
        text: '拼命加载中...',
        spinner: 'el-icon-loading',
        background: 'rgba(255, 255, 255, 0.5)'
      })
      this.filterForm.roomId = this.$route.name
      this.queryRobots(loading)
    },
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
