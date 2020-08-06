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
      <el-card class="box-card-component">
        <div slot="header" class="clearfix">
          <h2>
            {{ gameName }}机器人配置
            <el-button style="margin-left: 10px;" type="primary" @click="saveData()">保 存</el-button>
          </h2>
        </div>
        <bjlcard ref="bjlcard"></bjlcard>
        <lhcard ref="lhcard"></lhcard>
        <jdjlcard ref="jdjlcard"></jdjlcard>
        <jdslcard ref="jdslcard"></jdslcard>
        <jdnncard ref="jdnncard"></jdnncard>
        <dntgcard ref="dntgcard"></dntgcard>
        <shbycard ref="shbycard"></shbycard>
        <brnncard ref="brnncard"></brnncard>
        <qznncard ref="qznncard"></qznncard>
        <tbnncard ref="tbnncard"></tbnncard>
        <jxlwcard ref="jxlwcard"></jxlwcard>
        <sbcard ref="sbcard"></sbcard>
        <ebgcard ref="ebgcard"></ebgcard>
      </el-card>
    </el-row>
  </div>
</template>

<script>
  import { bjlcard, lhcard, jdjlcard, jdslcard, jdnncard, dntgcard, shbycard, brnncard, qznncard, tbnncard, jxlwcard, sbcard , ebgcard} from './card'
export default {
  name: 'RobotManage',
  components: {
    bjlcard,
    lhcard,
    jdjlcard,
    jdslcard,
    jdnncard,
    dntgcard,
    shbycard,
    brnncard,
    qznncard,
    tbnncard,
    jxlwcard,
    sbcard,
    ebgcard
  },
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
      gameName: '',
      card: '',
      rooms: [],
      filterForm: {
        roomId: null
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
      console.log('queryConfig')
      const loading = this.$loading({
        target: '#content',
        lock: true,
        text: '拼命加载中...',
        spinner: 'el-icon-loading',
        background: 'rgba(255, 255, 255, 0.5)'
      })
      this.$store.dispatch('GetRobotConfigByQry', this.filterForm.roomId).then(resp => {
        console.log(resp.code === 0)
        if (resp.code === 0) {
          this.gameName = resp.data.gameName
          console.log(resp + '1')
          this.refChild(resp)
          this.card.baseGameConfigVo = resp.data.baseGameConfigVo
          this.card.winRateControl = resp.data.winRateControlDTO
          this.card.show = true
        }
        loading.close()
      }).catch(() => loading.close())
    },
    refChild(resp) {
      console.log(resp + '2')
      if (this.card) {
        this.card.baseGameConfigVo = ''
        this.card.winRateControl = ''
        this.card.show = false
      }
      console.log(resp.data.cardName + '1')
      if (resp.data.cardName === 'bjlcard') {
        this.card = this.$refs.bjlcard
      } else if (resp.data.cardName === 'lhcard') {
        this.card = this.$refs.lhcard
      } else if (resp.data.cardName === 'jdjlcard') {
        this.card = this.$refs.jdjlcard
      } else if (resp.data.cardName === 'jdslcard') {
        this.card = this.$refs.jdslcard
      } else if (resp.data.cardName === 'jdnncard') {
        this.card = this.$refs.jdnncard
      } else if (resp.data.cardName === 'dntgcard') {
        this.card = this.$refs.dntgcard
      } else if (resp.data.cardName === 'shbycard') {
        this.card = this.$refs.shbycard
      } else if (resp.data.cardName === 'brnncard') {
        this.card = this.$refs.brnncard
      } else if (resp.data.cardName === 'qznncard') {
        this.card = this.$refs.qznncard
      } else if (resp.data.cardName === 'tbnncard') {
        this.card = this.$refs.tbnncard
      } else if (resp.data.cardName === 'jxlwcard') {
        this.card = this.$refs.jxlwcard
      } else if (resp.data.cardName === 'sbcard') {
        this.card = this.$refs.sbcard
      } else if (resp.data.cardName === 'ebgcard') {
        this.card = this.$refs.ebgcard
      }
    },
    saveData() {
      this.$confirm('此操作将更新机器人配置，是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(() => {
        this.saveAction(this.card.baseGameConfigVo, this.card.winRateControl)
      })
    },
    saveAction(data, winRateControl) {
      this.$store.dispatch('UpdateRobotConfig', {
        roomId: this.filterForm.roomId,
        config: JSON.stringify(data),
        winRateControlDTO: winRateControl
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
