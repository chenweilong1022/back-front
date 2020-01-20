<template>
  <div class="app-container">
    <tmp ref="tmp"></tmp>
  </div>
</template>

<script>
  import tmp from '@/views/activity/template'
export default {
  name: 'tblgamegold',
  components: {
    tmp
  },
  data() {
    return {
    }
  },
  mounted() {
    this.$refs.tmp.filterForm.gameGoldReason = 3
    this.$refs.tmp.query()
  }
}
</script>

<style scoped>

</style>
