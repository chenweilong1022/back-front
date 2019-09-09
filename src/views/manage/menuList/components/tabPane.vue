<template>
  <div>
    <div class="filter-container">
      <el-form ref="filterForm" :inline="true" size="mini">
        <el-form-item>
          <el-button :loading="saveBtnLoading" type="primary" class="btn-form" @click="saveRoleMenuChange">保存更改</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div class="pane-container">
      <el-tree
        :data="menus"
        :default-checked-keys="roleMenus"
        :props="defaultProps"
        default-expand-all
        highlight-current
        check-strictly
        class="roleForm"
        show-checkbox
        node-key="id"
        @node-click="showEditMenu"
        @check="nodeCheck"
      />

      <el-form v-loading="menuFormLoading" v-if="isShow" ref="menuForm" :model="menuForm" :rules="menuRules" class="menuForm" label-width="140px" size="mini">
        <el-form-item label="菜单名称" style="margin-top: 50px" prop="menuName">
          <el-col :span="16">
            <el-input v-model="menuForm.menuName"/>
          </el-col>
        </el-form-item>
        <el-form-item label="菜单URL" prop="menuUrl">
          <el-col :span="16">
            <el-input v-model="menuForm.menuUrl"/>
          </el-col>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="saveMenu">保存</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TabPane',
  props: {
    menus: {
      type: Array,
      default: function() {
        return []
      },
      required: true
    },
    roleId: {
      type: Number,
      default: 0,
      required: true
    }
  },
  data() {
    return {
      roleMenus: null,
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      saveBtnLoading: false,
      isShow: false,
      menuForm: {
        menuid: null,
        menuName: null,
        parentid: null,
        menuUrl: null,
        sortNum: 0
      },
      menuFormLoading: false,
      menuRules: {
        menuName: [{ required: true, trigger: 'blur', message: '必填项' }]
      },
      checkedMenus: []
    }
  },
  created() {
    this.queryMenusByRoleId()
  },
  methods: {
    queryMenusByRoleId() {
      this.$store.dispatch('ListMenuByRoleId', this.roleId).then(resp => {
        const menus = resp.data
        let menuIds = []
        menus.forEach(menu => {
          menuIds = menuIds.concat(menu.menuid)
        })
        this.roleMenus = menuIds
        this.checkedMenus = menuIds
      })
    },
    nodeCheck(data, attrs) {
      this.checkedMenus = attrs.halfCheckedKeys.concat(attrs.checkedKeys)
    },
    saveRoleMenuChange() {
      this.$confirm('此操作将保存角色菜单，是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(() => {
        this.saveBtnLoading = true
        const data = {
          roleId: this.roleId,
          menuIds: this.checkedMenus.toString()
        }
        this.$store.dispatch('SaveRoleMenu', data).then(resp => {
          this.$message({
            message: resp.msg,
            type: 'success'
          })
          this.saveBtnLoading = false
        }).catch(() => {
          this.saveBtnLoading = false
        })
      })
    },
    showEditMenu(data) {
      this.isShow = true
      this.menuForm = {
        menuid: data.id,
        menuName: data.label,
        menuUrl: data.menuUrl,
        parentid: data.parentId,
        sortNum: 0
      }
    },
    saveMenu() {
      this.$refs['menuForm'].validate(valid => {
        if (valid) {
          this.$confirm('此操作将保存菜单，是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消'
          }).then(() => {
            this.menuFormLoading = true
            this.$store.dispatch('SaveMenu', this.menuForm).then(resp => {
              this.$message({
                message: resp.msg,
                type: 'success'
              })
              this.queryMenusByRoleId()
              this.menuFormLoading = false
            }).catch(() => {
              this.menuFormLoading = false
            })
          })
        }
      })
    }
  }
}
</script>

<style type="text/css" lang="scss" scoped>
  .pane-container {
    padding: 10px;
    display: -webkit-box;
  }
  .roleForm {
    margin-left: 12px;
    min-width: 512px;
    max-height: calc(100vh - 200px);
    overflow: auto;
    border: 1px solid #dcdfe6;
  }
  .menuForm {
    margin-left: 150px;
    min-width: 500px;
    max-width: 600px;
    height: 200px;
    border: 1px solid #dcdfe6;
  }
  .btn-form {
    margin-left: 22px;
  }
</style>
