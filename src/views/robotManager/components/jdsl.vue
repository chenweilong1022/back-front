<template>
  <div class="app-container">
    <h2>机器人管理</h2>
    <hr>
    <el-form v-loading="robotFormLoading" ref="robotForm" :model="robotForm" :rules="robotRules" label-width="180px" size="mini">
      <el-form-item label="连续多少秒无人抢" prop="lxdsmwrq">
        <el-input v-model="robotForm.lxdsmwrq"/>
      </el-form-item>
      <el-form-item label="多少秒退出房间" prop="dsmtcfj">
        <el-input v-model="robotForm.dsmtcfj"/>
      </el-form-item>
      <el-form-item label="少于几个机器人发红包" prop="syjgjqrfhb">
        <el-input v-model="robotForm.syjgjqrfhb"/>
      </el-form-item>
      <el-form-item label="发红包数额" prop="fhbse">
        <el-input v-model="robotForm.fhbse"/>
      </el-form-item>
      <el-form-item label="红包划分个数" prop="hbhfgs">
        <el-input v-model="robotForm.hbhfgs"/>
      </el-form-item>
      <el-form-item label="进入携带金币">
        <el-col :xs="24" :lg="12">
          <el-form-item label="最小值" label-width="90px" prop="xdjbmin" style="margin-bottom: 0px;">
            <el-input v-model="robotForm.xdjbmin" placeholder="最小值"/>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :lg="12">
          <el-form-item label="最大值" label-width="90px" prop="xdjbmax" style="margin-bottom: 0px;">
            <el-input v-model="robotForm.xdjbmax" placeholder="最大值"/>
          </el-form-item>
        </el-col>
      </el-form-item>
      <el-form-item label="赢到多少退出房间" prop="yddstcfj">
        <el-input v-model="robotForm.yddstcfj"/>
      </el-form-item>
      <el-form-item label="输到多少退出房间" prop="sddstcfj">
        <el-input v-model="robotForm.sddstcfj"/>
      </el-form-item>
      <el-form-item label="房间机器人数量" prop="fjjqrsl">
        <el-input v-model="robotForm.fjjqrsl"/>
      </el-form-item>
      <el-form-item label="房间金币库存">
        <el-col :span="15">
          <el-input v-model="robotForm.fjjbkc" disabled/>
        </el-col>
        <el-col :span="9" class="btn-clearStorage">
          <el-button :loading="clearBtnLoading" @click="clearInventory">清空库存</el-button>
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="updateRobot">更新配置</el-button>
        <el-button :loading="restartBtnLoading" type="primary" @click="restartRobot">重启机器人</el-button>
        <el-button :loading="startBtnLoading" type="primary" @click="startRobot">启动机器人</el-button>
        <el-button :loading="stopBtnLoading" type="primary" @click="closeRobot">关闭机器人</el-button>
      </el-form-item>
    </el-form>

    <h2>黑白名单管理</h2>
    <hr>

    <div class="filter-container">
      <el-form ref="filterForm" :model="filterForm" label-width="140px" size="mini">
        <el-form-item label="名单类别">
          <el-col :xs="24" :lg="6">
            <el-select v-model="filterForm.listType" class="filter-item" placeholder="请选择" value="">
              <el-option v-for="item in listTypes" :key="item.key" :label="item.title" :value="item.key"/>
            </el-select>
          </el-col>
          <el-col :span="1">&nbsp;</el-col>
          <el-col :xs="24" :lg="16">
            <el-button class="btn-form" type="primary" @click="queryList">查询名单列表</el-button>
          </el-col>
        </el-form-item>
        <el-form-item label="输入玩家ID" prop="playerId">
          <el-col :xs="24" :lg="6">
            <el-input v-model="filterForm.playerId"/>
          </el-col>
          <el-col :span="1">&nbsp;</el-col>
          <el-col :xs="24" :lg="16">
            <el-button :loading="whiteBtnLoading" class="btn-form" @click="addWhiteList">加入白名单</el-button>
            <el-button :loading="blackBtnLoading" class="btn-form" @click="addBlackList">加入黑名单</el-button>
          </el-col>
        </el-form-item>
      </el-form>
    </div>

    <el-table
      v-loading="listLoading"
      :data="list"
      border
      fit
      size="mini"
      highlight-current-row>
      <el-table-column align="center" label="玩家ID">
        <template slot-scope="scope">
          {{ scope.row.playerId }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="昵称">
        <template slot-scope="scope">
          {{ scope.row.playerNickname }}
        </template>
      </el-table-column>
      <el-table-column label="加入时间" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.addTime | parseTime() }}</span>
        </template>
      </el-table-column>
      <el-table-column label="名单类型" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.listType === 1 ? '黑名单' : '白名单' }}</span>
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="从名单删除" align="center">
        <template slot-scope="scope">
          <el-button type="danger" size="mini" @click="removeFromList(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
      <el-table-column align="center" label="其他操作">
        <template slot-scope="scope">
          <el-button v-if="scope.row.listType === 1" type="primary" size="mini" @click="transform(scope.row)">加入白名单</el-button>
          <el-button v-else type="primary" size="mini" @click="transform(scope.row)">加入黑名单</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="pagination-container">
      <el-pagination :current-page="filterForm.pageNo" :page-sizes="[10,20,30, 50]" :page-size="filterForm.pageSize" :total="listTotal" background layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange" @current-change="handleCurrentChange"/>
    </div>
  </div>
</template>

<script>
import waves from '@/directive/waves' // 水波纹指令
import { parseTime } from '@/utils'

export default {
  name: 'Jdsl',
  directives: {
    waves
  },
  filters: {
    parseTime(time) {
      return parseTime(time)
    }
  },
  data() {
    const validateRobot = (rule, value, callback) => {
      const re = /^\d{1,}$/
      if (value.length === 0) {
        callback(new Error('必填项'))
      } else if (!re.test(value)) {
        callback(new Error('必须为纯数字'))
      } else {
        callback()
      }
    }
    const validatePlayerId = (rule, value, callback) => {
      const re = /^\d{1,}$/
      if ((value != null && value.length > 0) && !re.test(value)) {
        callback(new Error('必须为纯数字'))
      } else {
        callback()
      }
    }
    return {
      roomId: '',
      gameId: '',
      robotForm: {
        lxdsmwrq: '',
        dsmtcfj: '',
        syjgjqrfhb: '',
        fhbse: '',
        hbhfgs: '',
        xdjbmin: '',
        xdjbmax: '',
        yddstcfj: '',
        sddstcfj: '',
        fjjqrsl: '',
        fjjbkc: ''
      },
      robotFormLoading: false,
      robotRules: {
        lxdsmwrq: [{ required: true, trigger: 'blur', validator: validateRobot }],
        dsmtcfj: [{ required: true, trigger: 'blur', validator: validateRobot }],
        syjgjqrfhb: [{ required: true, trigger: 'blur', validator: validateRobot }],
        fhbse: [{ required: true, trigger: 'blur', validator: validateRobot }],
        hbhfgs: [{ required: true, trigger: 'blur', validator: validateRobot }],
        xdjbmin: [{ required: true, trigger: 'blur', validator: validateRobot }],
        xdjbmax: [{ required: true, trigger: 'blur', validator: validateRobot }],
        yddstcfj: [{ required: true, trigger: 'blur', validator: validateRobot }],
        sddstcfj: [{ required: true, trigger: 'blur', validator: validateRobot }],
        fjjqrsl: [{ required: true, trigger: 'blur', validator: validateRobot }]
      },
      list: null,
      listLoading: false,
      blackBtnLoading: false,
      whiteBtnLoading: false,
      clearBtnLoading: false,
      startBtnLoading: false,
      restartBtnLoading: false,
      stopBtnLoading: false,
      filterForm: {
        listType: 0,
        playerId: null,
        pageNo: 1,
        pageSize: 10
      },
      filterRules: {
        playerId: [{ required: false, trigger: 'blur', validator: validatePlayerId }]
      },
      listTotal: null,
      listTypes: [
        {
          key: 0,
          title: '全部'
        },
        {
          key: 1,
          title: '黑名单'
        },
        {
          key: 2,
          title: '白名单'
        }
      ]
    }
  },
  created() {
    this.loadCurrentRoomId()
  },
  methods: {
    loadCurrentRoomId() {
      this.robotFormLoading = true
      // 根据路径获取游戏code和房间code
      const currentPath = this.$route.path
      const gamesPath = currentPath.slice(currentPath.indexOf('games/'))
      const gamesPathArray = gamesPath.split('/')
      const game = gamesPathArray[1]
      const room = gamesPathArray[2]

      // 根据游戏code和房间code获取
      this.$store.dispatch('GetRobotMenus').then(response => {
        const robotMenus = response.data

        if (robotMenus instanceof Array) {
          robotMenus.forEach(robotMenu => {
            if (robotMenu.menuCode === game) {
              this.gameId = robotMenu.menuNum
              const children = robotMenu.children
              if (children instanceof Array) {
                children.forEach(children => {
                  if (children.menuCode === room) {
                    this.roomId = robotMenu.menuNum + '' + children.menuNum
                    this.loadRobotByRoomId(this.roomId)
                    this.loadBlackWhiteList()
                  }
                })
              }
            }
          })
        }
      }).catch(() => {
        // 接收到异常时，取消掉加载
        this.robotFormLoading = false
      })
    },
    loadRobotByRoomId(roomId) {
      this.$store.dispatch('GetRobotByRoomId', roomId).then(resp => {
        const robot = resp.data
        this.robotForm = {
          lxdsmwrq: robot.maxWaitTime,
          dsmtcfj: robot.maxStayTime,
          syjgjqrfhb: robot.minHongbaoCount,
          fhbse: robot.hongbaoMoney,
          hbhfgs: robot.hongbaoSize,
          xdjbmin: robot.initMoney.min,
          xdjbmax: robot.initMoney.max,
          yddstcfj: robot.maxMoney,
          sddstcfj: robot.minMoney,
          fjjqrsl: robot.robotCount,
          fjjbkc: robot.roomMoney
        }

        this.robotFormLoading = false
      }).catch(() => {
        this.robotFormLoading = false
      })
    },
    clearInventory() {
      this.clearBtnLoading = true
      this.$store.dispatch('ClearRoomMoney', {
        roomId: this.roomId,
        gameId: this.gameId,
        money: -this.robotForm.fjjbkc,
        tableId: 1
      }).then(resp => {
        this.$message({
          message: resp.msg,
          type: 'success'
        })
        this.clearBtnLoading = false
        this.robotForm.fjjbkc = 0
      }).catch(() => {
        this.clearBtnLoading = false
      })
    },
    updateRobot() {
      this.$refs['robotForm'].validate((valid) => {
        if (valid) {
          const robotForm = this.robotForm
          const robot = {
            roomId: this.roomId,
            maxWaitTime: robotForm.lxdsmwrq,
            maxStayTime: robotForm.dsmtcfj,
            minHongbaoCount: robotForm.syjgjqrfhb,
            hongbaoMoney: robotForm.fhbse,
            hongbaoSize: robotForm.hbhfgs,
            initMoney: {
              min: robotForm.xdjbmin,
              max: robotForm.xdjbmax
            },
            maxMoney: robotForm.yddstcfj,
            minMoney: robotForm.sddstcfj,
            robotCount: robotForm.fjjqrsl
          }

          this.robotFormLoading = true
          this.$refs['robotForm'].clearValidate()

          this.$store.dispatch('UpdateRobot', robot).then(resp => {
            this.$message({
              message: resp.msg,
              type: 'success'
            })
            this.robotFormLoading = false
          }).catch(() => {
            // 接收到异常时，取消掉加载
            this.robotFormLoading = false
          })
        }
      })
    },
    startRobot() {
      this.startBtnLoading = true
      this.$store.dispatch('StartRobot', this.roomId).then(resp => {
        this.$message({
          message: resp.msg,
          type: 'success'
        })
        this.startBtnLoading = false
      }).catch(() => {
        this.startBtnLoading = false
      })
    },
    restartRobot() {
      this.restartBtnLoading = true
      this.$store.dispatch('RestartRobot', this.roomId).then(resp => {
        this.$message({
          message: resp.msg,
          type: 'success'
        })
        this.restartBtnLoading = false
      }).catch(() => {
        this.restartBtnLoading = false
      })
    },
    closeRobot() {
      this.stopBtnLoading = true
      this.$store.dispatch('StopRobot', this.roomId).then(resp => {
        this.$message({
          message: resp.msg,
          type: 'success'
        })
        this.stopBtnLoading = false
      }).catch(() => {
        this.stopBtnLoading = false
      })
    },
    loadBlackWhiteList() {
      const query = {}
      Object.assign(query, this.filterForm)
      query.partyId = this.roomId
      console.log(this.roomId)
      this.listLoading = true
      this.$store.dispatch('ListBlackWhiteList', query).then(resp => {
        this.list = resp.data
        this.listTotal = resp.totalCount
        this.filterForm.pageNo = resp.pageNo
        this.filterForm.pageSize = resp.pageSize

        this.listLoading = false
      }).catch(() => {
        this.listLoading = false
      })
    },
    queryList() {
      this.$refs['filterForm'].validate((valid) => {
        if (valid) {
          this.loadBlackWhiteList()
        }
      })
    },
    addWhiteList() {
      this.$refs['filterForm'].validate((valid) => {
        if (valid) {
          const playerId = this.filterForm.playerId
          if (playerId == null || playerId === undefined || playerId.length === 0) {
            this.$message({
              message: '玩家id必填',
              type: 'error'
            })

            return false
          }

          this.whiteBtnLoading = true
          this.$store.dispatch('AddBlackWhiteList', {
            listType: 2,
            playerId: playerId,
            partyId: this.roomId
          }).then(resp => {
            this.$message({
              message: resp.msg,
              type: 'success'
            })

            this.filterForm.playerId = null
            this.whiteBtnLoading = false

            // 重新加载列表
            this.loadBlackWhiteList()
          }).catch(() => {
            this.whiteBtnLoading = false
          })
        }
      })
    },
    addBlackList() {
      this.$refs['filterForm'].validate((valid) => {
        if (valid) {
          const playerId = this.filterForm.playerId
          if (playerId == null || playerId === undefined || playerId.length === 0) {
            this.$message({
              message: '玩家id必填',
              type: 'error'
            })

            return false
          }

          this.blackBtnLoading = true
          this.$store.dispatch('AddBlackWhiteList', {
            listType: 1,
            playerId: playerId,
            partyId: this.roomId
          }).then(resp => {
            this.$message({
              message: resp.msg,
              type: 'success'
            })

            this.filterForm.playerId = null
            this.blackBtnLoading = false

            // 重新加载列表
            this.loadBlackWhiteList()
          }).catch(() => {
            this.blackBtnLoading = false
          })
        }
      })
    },
    removeFromList(id) {
      this.$store.dispatch('DeleteBlackWhiteList', id).then(resp => {
        this.$message({
          message: resp.msg,
          type: 'success'
        })

        // 重新加载列表
        this.loadBlackWhiteList()
      })
    },
    transform(data) {
      this.$store.dispatch('TransformBlackWhiteList', {
        listType: data.listType === 1 ? 2 : 1,
        id: data.id,
        addTime: new Date()
      }).then(resp => {
        this.$message({
          message: resp.msg,
          type: 'success'
        })

        // 重新加载列表
        this.loadBlackWhiteList()
      })
    },
    handleSizeChange(val) {
      this.filterForm.pageSize = val
      this.loadBlackWhiteList()
    },
    handleCurrentChange(val) {
      this.filterForm.pageNo = val
      this.loadBlackWhiteList()
    }
  }
}
</script>

<style scoped>
  .line{
    text-align: center;
  }

  .btn-clearStorage {
    text-align: right;
  }
</style>
