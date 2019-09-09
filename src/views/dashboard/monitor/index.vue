<template>
  <div class="mixin-components-container">
    <h1>机器人运行状态监控</h1>
    <el-row :gutter="24" style="margin-top:50px;">
      <el-col v-for="game in games" :span="8">
        <GameRobotMonitor :game-name="game.menuName" :game-code="game.menuCode" :rooms="game.children" />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import GameRobotMonitor from './components/GameRobotMonitor'

export default {
  name: 'Monitor',
  components: {
    GameRobotMonitor
  },
  data() {
    return {
      games: []
    }
  },
  created() {
    this.ListRobotStatus()
  },
  methods: {
    ListRobotStatus() {
      const loading = this.$loading({
        lock: true,
        text: '监控加载中',
        spinner: 'el-icon-loading',
        background: 'rgba(255, 255, 255, 0.7)'
      })
      this.$store.dispatch('ListRobotStatus').then(resp => {
        this.games = resp.data
        loading.close()
      }).catch(() => {
        loading.close()
      })
    }
  }
}
</script>

<style scoped>
  .mixin-components-container {
    background-color: #f0f2f5;
    padding: 20px;
    min-height: calc(100vh - 84px);
  }
</style>
