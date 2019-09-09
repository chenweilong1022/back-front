<template >
  <div class="app-container">
    <div class="filter-container">
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-edit" @click="openGameDialog">新增游戏</el-button>
      <el-button v-waves class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="openRoomDialog">新增房间</el-button>
    </div>

    <tree-table v-loading="loading" :data="robotMenus" :columns="columns" :expand-all="expandAll" border>
      <el-table-column label="操作" width="200">
        <template slot-scope="scope">
          <el-button type="text" @click="editRobotMenu(scope.row)">编辑</el-button>
          <el-button v-if="scope.row.children === undefined || scope.row.children.length === 0" type="text" @click="deleteRobotMenu(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </tree-table>

    <el-dialog :visible.sync="dialogGameVisible" :title="gameTextMap[dialogGameStatus]">
      <el-form ref="gameForm" :model="game" :rules="gameRules" label-position="left" label-width="90px" style="width: 400px; margin-left:50px;">
        <el-form-item label="游戏名称" prop="gameCode">
          <el-select v-model="game.gameCode" :disabled="dialogGameStatus === 'update'" class="filter-item" placeholder="请选择" value="" @change="gameSelect">
            <el-option v-for="item in games" :key="item.gameCode" :label="item.gameName" :value="item.gameCode"/>
          </el-select>
        </el-form-item>
        <el-form-item label="游戏号" prop="gameNum">
          <el-input v-model="game.gameNum"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogGameVisible = false">取消</el-button>
        <el-button v-if="dialogGameStatus === 'create'" type="primary" @click="createGame">确定</el-button>
        <el-button v-else type="primary" @click="updateGame">确定</el-button>
      </div>
    </el-dialog>

    <el-dialog :visible.sync="dialogRoomVisible" :title="roomTextMap[dialogRoomStatus]">
      <el-form ref="roomForm" :model="room" :rules="roomRules" label-position="left" label-width="90px" style="width: 400px; margin-left:50px;">
        <el-form-item label="游戏名称" prop="superId">
          <el-select v-model="room.superId" class="filter-item" placeholder="请选择" value="">
            <el-option v-for="item in gameTypes" :key="item.id" :label="item.menuName" :value="item.id"/>
          </el-select>
        </el-form-item>
        <el-form-item label="房间名称" prop="roomCode">
          <el-select v-model="room.roomCode" :disabled="dialogRoomStatus === 'update'" class="filter-item" placeholder="请选择" value="" @change="roomSelect">
            <el-option v-for="item in rooms" :key="item.roomCode" :label="item.roomName" :value="item.roomCode"/>
          </el-select>
        </el-form-item>
        <el-form-item label="房间号" prop="roomNum">
          <el-input v-model="room.roomNum"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogRoomVisible = false">取消</el-button>
        <el-button v-if="dialogRoomStatus === 'create'" type="primary" @click="createRoom">确定</el-button>
        <el-button v-else type="primary" @click="updateRoom">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import treeTable from '@/components/TreeTable'
import waves from '@/directive/waves' // 水波纹指令

export default {
  name: 'RobotMenuSetting',
  directives: {
    waves
  },
  components: {
    treeTable
  },
  data() {
    return {
      columns: [
        {
          text: '菜单名称',
          value: 'menuName',
          width: 200
        },
        {
          text: '菜单代码',
          value: 'menuCode'
        },
        {
          text: '菜单号码',
          value: 'menuNum'
        }
      ],
      robotMenus: [],
      expandAll: true,
      loading: false,
      gameTextMap: {
        create: '新建游戏',
        update: '编辑游戏'
      },
      dialogGameVisible: false,
      dialogGameStatus: 'create',
      games: [
        {
          gameName: '经典接龙',
          gameCode: 'jdjl'
        },
        {
          gameName: '经典扫雷',
          gameCode: 'jdsl'
        },
        {
          gameName: '经典牛牛',
          gameCode: 'jdnn'
        }
      ],
      rooms: [
        {
          roomName: '体验房',
          roomCode: 'experience'
        },
        {
          roomName: '初级房',
          roomCode: 'low'
        },
        {
          roomName: '中级房',
          roomCode: 'mid'
        },
        {
          roomName: '高级房',
          roomCode: 'high'
        }
      ],
      game: {
        id: undefined,
        gameName: '',
        gameCode: '',
        gameNum: ''
      },
      gameRules: {
        gameCode: [{ required: true, message: '游戏名称必选', trigger: 'change' }],
        gameNum: [{ required: true, message: '游戏号必填', trigger: 'blur' }]
      },
      roomTextMap: {
        create: '新建房间',
        update: '编辑房间'
      },
      dialogRoomVisible: false,
      dialogRoomStatus: 'create',
      gameTypes: [],
      room: {
        id: undefined,
        superId: '',
        roomName: '',
        roomCode: '',
        roomNum: ''
      },
      roomRules: {
        superId: [{ required: true, message: '游戏名称必选', trigger: 'change' }],
        roomCode: [{ required: true, message: '房间名称必选', trigger: 'change' }],
        roomNum: [{ required: true, message: '房间号必填', trigger: 'blur' }]
      }
    }
  },
  created() {
    this.initLoadPage()
  },
  methods: {
    getRobotMenus() {
      this.loading = true
      this.$store.dispatch('GetRobotMenus').then(response => {
        this.robotMenus = response.data
        this.loading = false
      })
    },
    getRobotMenusBySuperId(superId) {
      this.$store.dispatch('GetRobotMenusBySuperId', superId).then(resp => {
        this.gameTypes = resp.data
      })
    },
    initLoadPage() {
      this.getRobotMenus()
      this.getRobotMenusBySuperId(0)
    },
    gameSelect(val) {
      const games = this.games
      games.forEach(game => {
        if (game.gameCode === val) {
          this.game.gameName = game.gameName
        }
      })
    },
    roomSelect(val) {
      const rooms = this.rooms
      rooms.forEach(room => {
        if (room.roomCode === val) {
          this.room.roomName = room.roomName
        }
      })
    },
    editRobotMenu(robotMenu) {
      if (robotMenu.superId === 0) {
        this.game = {
          id: robotMenu.id,
          gameName: robotMenu.menuName,
          gameCode: robotMenu.menuCode,
          gameNum: robotMenu.menuNum
        }

        this.dialogGameStatus = 'update'
        this.dialogGameVisible = true
        this.$nextTick(() => {
          this.$refs['gameForm'].clearValidate()
        })
      } else {
        this.room = {
          id: robotMenu.id,
          superId: robotMenu.superId,
          roomName: robotMenu.menuName,
          roomCode: robotMenu.menuCode,
          roomNum: robotMenu.menuNum
        }

        this.dialogRoomStatus = 'update'
        this.dialogRoomVisible = true
        this.$nextTick(() => {
          this.$refs['roomForm'].clearValidate()
        })
      }
    },
    deleteRobotMenu(robotMenu) {

    },
    resetGame() {
      this.game = {
        id: undefined,
        gameName: '',
        gameCode: '',
        gameNum: ''
      }
    },
    openGameDialog() {
      this.resetGame()
      this.dialogGameStatus = 'create'
      this.dialogGameVisible = true
      this.$nextTick(() => {
        this.$refs['gameForm'].clearValidate()
      })
    },
    createGame() {
      this.$refs['gameForm'].validate((valid) => {
        if (valid) {
          const robotMenu = {
            menuCode: this.game.gameCode,
            menuName: this.game.gameName,
            menuNum: this.game.gameNum,
            superId: 0
          }

          this.$store.dispatch('SaveRobotMenu', robotMenu).then(resp => {
            this.dialogGameVisible = false

            // 重新加载列表
            this.initLoadPage()

            this.$notify({
              title: '成功',
              message: '创建成功',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    updateGame() {
      this.$refs['gameForm'].validate((valid) => {
        if (valid) {
          const robotMenu = {
            menuCode: this.game.gameCode,
            menuName: this.game.gameName,
            menuNum: this.game.gameNum,
            id: this.game.id
          }

          this.$store.dispatch('UpdateRobotMenu', robotMenu).then(resp => {
            this.dialogGameVisible = false

            // 重新加载列表
            this.initLoadPage()

            this.$notify({
              title: '成功',
              message: '编辑成功',
              type: 'success',
              duration: 1500
            })
          })
        }
      })
    },
    resetRoom() {
      this.room = {
        id: undefined,
        superId: '',
        roomName: '',
        roomCode: '',
        roomNum: ''
      }
    },
    openRoomDialog() {
      this.resetRoom()
      this.dialogRoomStatus = 'create'
      this.dialogRoomVisible = true
      this.$nextTick(() => {
        this.$refs['roomForm'].clearValidate()
      })
    },
    createRoom() {
      this.$refs['roomForm'].validate((valid) => {
        if (valid) {
          const robotMenu = {
            menuCode: this.room.roomCode,
            menuName: this.room.roomName,
            menuNum: this.room.roomNum,
            superId: this.room.superId
          }
          this.$store.dispatch('SaveRobotMenu', robotMenu).then(resp => {
            this.dialogRoomVisible = false

            // 重新加载列表
            this.initLoadPage()

            this.$notify({
              title: '成功',
              message: '创建成功',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    updateRoom() {
      this.$refs['roomForm'].validate((valid) => {
        if (valid) {
          const robotMenu = {
            menuCode: this.room.roomCode,
            menuName: this.room.roomName,
            menuNum: this.room.roomNum,
            id: this.room.id
          }
          this.$store.dispatch('UpdateRobotMenu', robotMenu).then(resp => {
            this.dialogRoomVisible = false

            // 重新加载列表
            this.initLoadPage()

            this.$notify({
              title: '成功',
              message: '更新成功',
              type: 'success',
              duration: 1500
            })
          })
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
