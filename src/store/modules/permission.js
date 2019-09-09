/**
 *
 * @Author: ozygod
 * @Date: 2018/9/13
 */

import { constantRouterMap, asyncRouterMap } from '@/router'

/**
 * 通过route的path与menus的menuUrl匹配
 * @param menus
 * @param route
 * @returns {*}
 */
function hasPermission(menus, route) {
  if (route.meta && route.meta.auth) {
    return menus.some(menu => route.meta.path === menu.menuUrl)
  } else {
    return true
  }
}

/**
 * 将显示的菜单title改为后台定义的名称
 * @param asyncRouterMap
 * @param menus
 * @returns {*}
 */
function transformMenuTitle(asyncRouterMap, menus) {
  asyncRouterMap.forEach(route => {
    menus.forEach(menu => {
      if (route.meta && route.meta.auth) {
        if (route.meta.path === menu.menuUrl) {
          route.meta.title = menu.menuName
        }
      }
    })
  })
  return asyncRouterMap
}

/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param asyncRouterMap
 * @param menus
 */
function filterAsyncRouter(asyncRouterMap, menus) {
  const accessedRouters = asyncRouterMap.filter(route => {
    if (hasPermission(menus, route)) {
      if (route.children && route.children.length) {
        route.children = filterAsyncRouter(route.children, menus)
      }
      return true
    }
    return false
  })
  return accessedRouters
}

const permission = {
  state: {
    routers: constantRouterMap,
    addRouters: []
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers
      state.routers = constantRouterMap.concat(routers)
    }
  },
  actions: {
    GenerateRoutes({ commit, rootState }, data) {
      return new Promise(resolve => {
        const menus = data
        let accessedRouters
        // 超级管理员不需要拦截
        if (rootState.user.roleId === 1) {
          accessedRouters = asyncRouterMap
        } else {
          accessedRouters = filterAsyncRouter(asyncRouterMap, menus)
        }
        accessedRouters = transformMenuTitle(accessedRouters, menus)
        commit('SET_ROUTERS', accessedRouters)
        resolve()
      })
    }
  }
}

export default permission
