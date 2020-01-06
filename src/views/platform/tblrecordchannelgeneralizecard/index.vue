<template>
  <div class="app-container">
    <div class="filter-container">
      <el-form ref="filterForm" :inline="true" size="mini">
        <el-tabs type="border-card" @tab-click="handleClick">
          <el-tab-pane v-for="item in recordchannelgeneralizebuttonsOptions" :value="item.key" :label="item.value">
            <tblrecordchannelgeneralize ref="tblrecordchannelgeneralize"></tblrecordchannelgeneralize>
          </el-tab-pane>
        </el-tabs>
      </el-form>
    </div>
  </div>
</template>

<script>

  import tblrecordchannelgeneralize from '@/views/platform/tblrecordchannelgeneralize'

export default {
  name: 'tblrecordchannelgeneralizecard',
  components: {
    tblrecordchannelgeneralize
  },
  data() {
    return {
      recordchannelgeneralizebuttonsOptions: []
    }
  },
  mounted() {
    this.recordchannelgeneralizebuttonsList()
  },
  methods: {
    recordchannelgeneralizebuttonsList() {
      this.$store.dispatch('Recordchannelgeneralizebuttons', this.data).then(resp => {
        this.recordchannelgeneralizebuttonsOptions = resp.data
      }).catch(() => {
        this.saveBtnLoading = false
      })
    },
    handleClick(tab, event) {
      this.$refs.tblrecordchannelgeneralize[tab.$attrs.value - 1].filterForm.recordchannelgeneralizebuttons = tab.$attrs.value
      this.$refs.tblrecordchannelgeneralize[tab.$attrs.value - 1].query()
    }
  }
}
</script>

<style scoped>

</style>
