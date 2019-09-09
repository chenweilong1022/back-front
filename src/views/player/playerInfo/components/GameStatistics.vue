<template>
  <div class="app-container">
    <el-table
      v-loading="listLoading"
      :data="list"
      size="mini"
      border
      fit
      highlight-current-row>
      <el-table-column align="center" label="玩家ID">
        <template slot-scope="scope">
          {{ scope.row.userid }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="游戏名称">
        <template slot-scope="scope">
          {{ scope.row.gameName }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="总输赢">
        <template slot-scope="scope">
          <el-tag :type="scope.row.totalGold>0?'danger':'success'">{{ scope.row.totalGold | moneyFilter }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" label="游戏次数">
        <template slot-scope="scope">
          {{ scope.row.playCnt }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="赢局次数">
        <template slot-scope="scope">
          {{ scope.row.winCnt }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="输局次数">
        <template slot-scope="scope">
          {{ scope.row.loseCnt }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="逃跑次数">
        <template slot-scope="scope">
          {{ scope.row.fleeCnt }}
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'GameStatistics',
  filters: {
    moneyFilter(money) {
      if (money) {
        return money
      }
      return 0
    }
  },
  props: {
    playerId: {
      type: Number,
      default: 0,
      required: true
    }
  },
  data() {
    return {
      list: null,
      listLoading: false
    }
  },
  mounted() {
    this.query()
  },
  methods: {
    query() {
      this.listLoading = true
      this.$store.dispatch('ListPlayerGameRecordByQry', this.playerId).then(resp => {
        this.list = resp.data
        this.listLoading = false
      }).catch(() => {
        this.listLoading = false
      })
    }
  }
}
</script>

<style scoped>

</style>
