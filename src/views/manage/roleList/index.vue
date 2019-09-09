<template>
  <div class="app-container">
    <div class="filter-container">
      <el-form ref="filterForm" :inline="true" size="mini">
        <el-form-item>
          <el-button type="primary" class="btn-form" @click="showRoleEditPage">创建角色</el-button>
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
      <el-table-column align="center" label="角色名称">
        <template slot-scope="scope">
          {{ scope.row.roleName }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="角色状态">
        <template slot-scope="scope">
          <el-tag :type="scope.row.isdel ? 'danger':'success'">{{ scope.row.isdel ? '禁用' : '启用' }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" label="管理操作">
        <template slot-scope="scope">
          <el-button v-if="!scope.row.isdel && scope.row.roleid !== 1" type="text" size="mini" @click="disableRole(scope.row.roleid)">禁用角色</el-button>
          <el-button v-if="scope.row.isdel && scope.row.roleid !== 1" type="text" size="mini" @click="enableRole(scope.row.roleid)">启用角色</el-button>
          <el-button v-if="scope.row.roleid !== 1" type="text" size="mini" @click="editRole(scope.row)">编辑角色</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :visible.sync="dialogNewOrEditRoleVisible" :title="newFlag | dialogTitle" width="600px">
      <el-form ref="roleForm" :model="role" :rules="roleRules">
        <el-form-item label="角色名称" prop="roleName">
          <el-input v-model="role.roleName" type="text"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogNewOrEditRoleVisible = false">取消</el-button>
        <el-button v-if="newFlag" :loading="createBtnLoading" type="primary" @click="createRole">创建</el-button>
        <el-button v-if="!newFlag" :loading="updateBtnLoading" type="primary" @click="updateRole">修改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'RoleListPage',
  filters: {
    dialogTitle(newFlag) {
      if (newFlag) {
        return '创建角色'
      } else {
        return '编辑角色'
      }
    }
  },
  data() {
    return {
      list: null,
      listLoading: false,
      listTotal: 0,
      role: {
        roleid: null,
        roleName: null
      },
      roleRules: {
        roleName: [{ required: true, trigger: 'blur', message: '必填项' }]
      },
      dialogNewOrEditRoleVisible: false,
      newFlag: false,
      createBtnLoading: false,
      updateBtnLoading: false
    }
  },
  created() {
    this.query()
  },
  methods: {
    query() {
      this.listLoading = true
      this.$store.dispatch('ListRole').then(resp => {
        this.list = resp.data
        this.listLoading = false
      }).catch(() => {
        this.listLoading = false
      })
    },
    showRoleEditPage() {
      this.newFlag = true
      this.resetForm()
      this.dialogNewOrEditRoleVisible = true
    },
    createRole() {
      this.$refs['roleForm'].validate(valid => {
        if (valid) {
          this.$confirm('是否确定创建角色?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消'
          }).then(() => {
            this.createBtnLoading = true
            this.$store.dispatch('AddRole', this.role).then(resp => {
              this.createBtnLoading = false
              this.dialogNewOrEditRoleVisible = false
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
    updateRole() {
      this.$refs['roleForm'].validate(valid => {
        if (valid) {
          this.$confirm('是否确定修改管理账户?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消'
          }).then(() => {
            this.updateBtnLoading = true
            const role = {
              roleid: this.role.roleid,
              roleName: this.role.roleName
            }
            this.$store.dispatch('UpdateRole', role).then(resp => {
              this.updateBtnLoading = false
              this.dialogNewOrEditRoleVisible = false
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
    enableRole(roleid) {
      this.$confirm('是否确定启用该管理账号?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(() => {
        this.$store.dispatch('TransformRoleByQry', { roleid }).then(resp => {
          this.$message({
            message: resp.msg,
            type: 'success'
          })
          this.query()
        })
      })
    },
    disableRole(roleid) {
      this.$confirm('是否确定禁用该管理角色?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(() => {
        this.$store.dispatch('TransformRoleByQry', { roleid }).then(resp => {
          this.$message({
            message: resp.msg,
            type: 'success'
          })
          this.query()
        })
      })
    },
    editRole(data) {
      this.newFlag = false
      this.role = {
        roleid: data.roleid,
        roleName: data.roleName
      }
      this.dialogNewOrEditRoleVisible = true
    },
    resetForm() {
      this.$refs['roleForm'].resetFields()
      this.role = {
        roleid: null,
        roleName: null
      }
    }
  }

}
</script>

<style scoped>

</style>
