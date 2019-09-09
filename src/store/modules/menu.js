/**
 *
 * @Author: ozygod
 * @Date: 2018/9/18
 */
import * as MenuApi from '@/api/menu'

const menu = {
  actions: {
    ListMenuByRoleId({ commit }, roleId) {
      return new Promise((resolve, reject) => {
        MenuApi.listMenuByRoleId(roleId).then(resp => {
          resolve(resp)
        }).catch(err => {
          reject(err)
        })
      })
    },
    ListAllMenus({ commit }) {
      return new Promise((resolve, reject) => {
        MenuApi.listAllMenus().then(resp => {
          resolve(resp)
        }).catch(err => {
          reject(err)
        })
      })
    },
    SaveRoleMenu({ commit, rootState }, data) {
      data.whoId = rootState.user.managerId
      return new Promise((resolve, reject) => {
        MenuApi.saveRoleMenu(data).then(resp => {
          resolve(resp)
        }).catch(err => {
          reject(err)
        })
      })
    },
    SaveMenu({ commit, rootState }, data) {
      data.whoId = rootState.user.managerId
      return new Promise((resolve, reject) => {
        MenuApi.saveMenu(data).then(resp => {
          resolve(resp)
        }).catch(err => {
          reject(err)
        })
      })
    }
  }
}

export default menu
