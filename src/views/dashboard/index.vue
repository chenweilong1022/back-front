<template>
  <div class="dashboard-container">
    <!--<component :is="currentRole"/>-->
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
// import adminDashboard from './admin'
import adminMonitor from './monitor'

export default {
  name: 'Dashboard',
  components: {
    adminMonitor
  },
  data() {
    return {
      currentRole: 'adminMonitor'
    }
  },
  computed: {
    ...mapGetters([
      'name',
      'roles'
    ])
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
