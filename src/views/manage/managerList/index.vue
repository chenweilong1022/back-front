<template>
  <div class="app-container">
    <div class="filter-container">
      <el-form ref="filterForm" :inline="true" size="mini">
        <el-form-item>
          <el-button v-if="createManagerBtn" type="primary" class="btn-form" @click="showManagerEditPage">创建管理账户</el-button>
        </el-form-item>
      </el-form>
    </div>

    <el-table
      v-loading="listLoading"
      :data="list"
      size="mini"
      border
      fit
      highlight-current-row>
      <el-table-column align="center" label="登录帐号">
        <template slot-scope="scope">
          {{ scope.row.loginName }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="显示名称">
        <template slot-scope="scope">
          {{ scope.row.nickName }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="后台角色">
        <template slot-scope="scope">
          {{ scope.row.roleName }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="用户状态">
        <template slot-scope="scope">
          <el-tag :type="scope.row.isdel ? 'danger':'success'">{{ scope.row.isdel ? '禁用' : '启用' }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" label="管理操作">
        <template slot-scope="scope">
          <el-button v-if="!scope.row.isdel && scope.row.manageid !== 1 && disableManagerBtn" type="text" size="mini" @click="disableManager(scope.row.manageid)">禁用帐号</el-button>
          <el-button v-if="scope.row.isdel && scope.row.manageid !== 1 && disableManagerBtn" type="text" size="mini" @click="enableManager(scope.row.manageid)">启用帐号</el-button>
          <el-button v-if="scope.row.manageid !== 1 && editManagerBtn" type="text" size="mini" @click="editManager(scope.row)">编辑帐号</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :visible.sync="dialogNewOrEditManagerVisible" :title="newFlag | dialogTitle" width="600px">
      <el-form ref="managerForm" :model="manager" :rules="managerRules">
        <el-form-item label="登录帐号" prop="loginName">
          <el-input v-model="manager.loginName" :disabled="!newFlag" type="text"/>
        </el-form-item>
        <el-form-item label="用户名称" prop="nickName">
          <el-input v-model="manager.nickName" type="text"/>
        </el-form-item>
        <el-form-item label="角色" prop="roleid">
          <el-select v-model="manager.roleid" class="filter-item" placeholder="请选择" value="">
            <el-option v-for="item in roles" :key="item.roleid" :label="item.roleName" :value="item.roleid"/>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogNewOrEditManagerVisible = false">取消</el-button>
        <el-button v-if="newFlag" :loading="createBtnLoading" type="primary" @click="createManager">创建</el-button>
        <el-button v-if="!newFlag" :loading="resetBtnLoading" type="primary" @click="resetPassword">重置密码</el-button>
        <el-button v-if="!newFlag" :loading="updateBtnLoading" type="primary" @click="updateManager">修改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'ManagerListPage',
  filters: {
    dialogTitle(newFlag) {
      if (newFlag) {
        return '创建管理账户'
      } else {
        return '编辑管理账户'
      }
    }
  },
  data() {
    return {
      roles: null,
      list: null,
      listLoading: false,
      listTotal: 0,
      manager: {
        manageid: null,
        loginName: null,
        roleid: null,
        nickName: null,
        loginPwd: null
      },
      managerRules: {
        loginName: [{ required: true, trigger: 'blur', message: '必填项' }],
        roleid: [{ required: true, trigger: 'blur', message: '必填项' }],
        nickName: [{ required: true, trigger: 'blur', message: '必填项' }]
      },
      dialogNewOrEditManagerVisible: false,
      newFlag: false,
      createBtnLoading: false,
      updateBtnLoading: false,
      resetBtnLoading: false,
      createManagerBtn: true,
      disableManagerBtn: true,
      editManagerBtn: true
    }
  },
  created() {
    this.query()
    this.validateRole()
  },
  mounted() {
    this.queryRoles()
  },
  methods: {
    queryRoles() {
      this.$store.dispatch('ListRole').then(resp => {
        this.roles = resp.data
      })
    },
    query() {
      this.listLoading = true
      this.$store.dispatch('ListManagerByQry').then(resp => {
        this.list = resp.data
        this.listLoading = false
      }).catch(() => {
        this.listLoading = false
      })
    },
    showManagerEditPage() {
      this.newFlag = true
      this.resetForm()
      this.dialogNewOrEditManagerVisible = true
    },
    createManager() {
      this.$refs['managerForm'].validate(valid => {
        if (valid) {
          this.$confirm('是否确定创建管理账户?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消'
          }).then(() => {
            this.createBtnLoading = true
            this.$store.dispatch('AddManager', this.manager).then(resp => {
              this.createBtnLoading = false
              this.dialogNewOrEditManagerVisible = false
              this.$message({
                message: resp.msg,
                type: 'success'
              })
              this.query()
            }).catch(() => {
              this.createBtnLoading = false
            })
          })
        }
      })
    },
    updateManager() {
      this.$refs['managerForm'].validate(valid => {
        if (valid) {
          this.$confirm('是否确定修改管理账户?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消'
          }).then(() => {
            this.updateBtnLoading = true
            const manager = {
              manageid: this.manager.manageid,
              roleid: this.manager.roleid,
              nickName: this.manager.nickName,
              loginPwd: this.manager.loginPwd
            }
            this.$store.dispatch('UpdateManager', manager).then(resp => {
              this.updateBtnLoading = false
              this.dialogNewOrEditManagerVisible = false
              this.$message({
                message: resp.msg,
                type: 'success'
              })
              this.query()
            }).catch(() => {
              this.updateBtnLoading = false
            })
          })
        }
      })
    },
    resetPassword() {
      this.$confirm('是否确定重置该账户密码?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(() => {
        this.resetBtnLoading = true
        const manager = {
          manageid: this.manager.manageid,
          roleid: this.manager.roleid,
          nickName: this.manager.nickName
        }
        this.$store.dispatch('ResetPassword', manager).then(resp => {
          this.resetBtnLoading = false
          this.dialogNewOrEditManagerVisible = false
          this.$message({
            message: resp.msg,
            type: 'success'
          })
          this.query()
        }).catch(() => {
          this.resetBtnLoading = false
        })
      })
    },
    enableManager(manageid) {
      this.$confirm('是否确定启用该管理账号?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(() => {
        this.$store.dispatch('TransformManagerStateByQry', { manageid }).then(resp => {
          this.$message({
            message: resp.msg,
            type: 'success'
          })
          this.query()
        })
      })
    },
    disableManager(manageid) {
      this.$confirm('是否确定禁用该管理帐号?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(() => {
        this.$store.dispatch('TransformManagerStateByQry', { manageid }).then(resp => {
          this.$message({
            message: resp.msg,
            type: 'success'
          })
          this.query()
        })
      })
    },
    editManager(data) {
      this.newFlag = false
      this.manager = {
        manageid: data.manageid,
        loginName: data.loginName,
        roleid: data.roleid,
        nickName: data.nickName,
        loginPwd: data.loginPwd
      }
      this.dialogNewOrEditManagerVisible = true
    },
    resetForm() {
      this.$refs['roleForm'] && this.$refs['roleForm'].clearValidate()
      this.manager = {
        manageid: null,
        loginName: null,
        roleid: null,
        nickName: null,
        loginPwd: null
      }
    },
    validateRole() {
      const roleId = this.$store.state.user.roleId
      const menus = this.$store.state.user.menus
      if (roleId !== 1) {
        if (!this.hasPermission(menus, 10101)) {
          this.createManagerBtn = false
        }
        if (!this.hasPermission(menus, 10102)) {
          this.disableManagerBtn = false
        }
        if (!this.hasPermission(menus, 10103)) {
          this.editManagerBtn = false
        }
      }
    },
    hasPermission(menus, menuId) {
      if (menus) {
        return menus.some(menu => menu.menuId === menuId)
      } else {
        return false
      }
    }
  }
}
</script>

<style scoped>

</style>
