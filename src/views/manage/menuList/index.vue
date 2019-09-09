<template>
  <div class="app-main">
    <el-tabs v-model="defaultPane" class="tab" type="border-card" @tab-click="tabClick">
      <el-tab-pane v-for="item in roles" :key="item.roleid" :label="item.roleName" :name="item.roleid+''">
        <tab-pane :menus="menus" :role-id="item.roleid"/>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import tabPane from './components/tabPane'
export default {
  name: 'MenuListPage',
  components: { tabPane },
  data() {
    return {
      defaultPane: '1',
      roles: null,
      menus: []
    }
  },
  created() {
    this.queryRoles()
    this.queryAllMenus()
  },
  methods: {
    queryRoles() {
      this.$store.dispatch('ListRole').then(resp => {
        this.roles = resp.data
      })
    },
    queryAllMenus() {
      this.$store.dispatch('ListAllMenus').then(resp => {
        const menus = resp.data
        let filterMenus = []
        filterMenus = this.filterMenus(menus, filterMenus)
        if (filterMenus.length > 0) {
          this.menus = filterMenus
        }
      })
    },
    tabClick(tab) {
      tab.$children[0].queryMenusByRoleId()
    },
    filterMenus(menus, filterMenus) {
      if (menus && menus.length > 0) {
        menus = menus.filter(menu => {
          if (menu.parentid === 0) {
            filterMenus = filterMenus.concat({
              id: menu.menuid,
              label: menu.menuName,
              menuUrl: menu.menuUrl,
              parentId: menu.parentid,
              children: []
            })
            return false
          } else if (filterMenus && filterMenus.length > 0) {
            let children = []
            filterMenus.forEach(tmp => {
              if (tmp.id === menu.parentid) {
                const child = {
                  id: menu.menuid,
                  label: menu.menuName,
                  parentId: menu.parentid,
                  menuUrl: menu.menuUrl
                }
                children = children.concat(child)
                tmp.children = tmp.children ? tmp.children.concat(child) : [].concat(child)
              }
            })
            // 只要当前menu属于children，则本次循环后剔除掉它
            if (children && children.length > 0) {
              return false
            }
          }
          return true
        })
        if (menus && menus.length > 0) {
          filterMenus.forEach(tmp => {
            if (tmp.children && tmp.children.length > 0) {
              menus = this.filterChildren(menus, tmp.children)
            }
          })
        }
      }
      return filterMenus
    },
    filterChildren(menus, children) {
      menus.filter(menu => {
        let result = []
        children.forEach(child => {
          if (menu.parentid === child.id) {
            const tmpChild = {
              id: menu.menuid,
              label: menu.menuName,
              parentId: menu.parentid,
              menuUrl: menu.menuUrl
            }
            child.children = child.children ? child.children.concat(tmpChild) : [].concat(tmpChild)
            result = result.concat(child)
          }
        })
        return result.length === 0
      })

      return menus
    }
  }
}
</script>

<style type="text/css" lang="scss" scoped>
.tab {
  margin-top: 15px;
}
</style>
