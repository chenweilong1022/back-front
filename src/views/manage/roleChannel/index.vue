<template>
  <div class="app-container">
    <el-form v-loading="inputFormLoading" ref="inputForm" :model="inputForm" label-width="140px" size="mini">
      <el-form-item label="后台角色">
        <el-col :span="6">
          <el-select v-model="inputForm.roleid" class="filter-item" placeholder="请选择" value="">
            <el-option v-for="item in roles" :key="item.roleid" :label="item.roleName" :value="item.roleid"/>
          </el-select>
        </el-col>
      </el-form-item>
      <el-form-item label="对应渠道">
        <el-col :span="6">
          <el-select v-model="inputForm.channelId" class="filter-item" placeholder="请选择" value="">
            <el-option v-for="item in channelTypes" :key="item.channelId" :label="item.channelName" :value="item.channelId"/>
          </el-select>
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="commit">提交信息</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'RoleChannelPage',
  data() {
    return {
      inputForm: {
        roleid: 2,
        channelId: '2021'
      },
      inputFormLoading: false,
      roles: [],
      channelTypes: []
    }
  },
  created() {
    this.queryRoles()
    this.queryChannelType()
  },
  methods: {
    queryRoles() {
      this.$store.dispatch('ListRoleByQry', {
        isDel: 0,
        queryType: 1
      }).then(resp => {
        this.roles = resp.data
      })
    },
    queryChannelType() {
      this.$store.dispatch('ListAppChannelType').then(resp => {
        this.channelTypes = resp.data
      })
    },
    commit() {
      this.$store.dispatch('SaveAppRoleChannel', this.inputForm).then(resp => {
        this.$message({
          message: resp.msg,
          type: 'success'
        })
      })
    }
  }
}
</script>

<style scoped>

</style>
