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
      <el-table-column align="center" label="玩家昵称">
        <template slot-scope="scope">
          <span class="link-type" @click="handleClick(scope.row.userid)">{{ scope.row.nickName }}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'SameAddressPlayer',
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
      this.$store.dispatch('ListSameAddressPlayerById', this.playerId).then(resp => {
        this.list = resp.data
        this.listLoading = false
      }).catch(() => {
        this.listLoading = false
      })
    },
    handleClick(playerId) {
      this.$router.push({ path: '/player/playerInfo', query: { playerId }})
    }
  }
}
</script>

<style scoped>

</style>
