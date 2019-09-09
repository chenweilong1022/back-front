/**
 *
 * @Author: ozygod
 * @Date: 2018/10/1
 */
import * as RoleApi from '@/api/role'

const role = {
  actions: {
    ListRole({ commit }) {
      return new Promise((resolve, reject) => {
        RoleApi.listRole().then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    ListRoleByQry({ commit }, data) {
      return new Promise((resolve, reject) => {
        RoleApi.listRoleByQry(data).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    GetRoleByQry({ commit }, roleId) {
      return new Promise((resolve, reject) => {
        RoleApi.getRoleByQry(roleId).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    TransformRoleByQry({ commit, rootState }, data) {
      data.whoId = rootState.user.managerId
      return new Promise((resolve, reject) => {
        RoleApi.transformRoleByQry(data).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    AddRole({ commit, rootState }, data) {
      data.managerId = rootState.user.managerId
      return new Promise((resolve, reject) => {
        RoleApi.addRole(data).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    UpdateRole({ commit, rootState }, data) {
      data.managerId = rootState.user.managerId
      return new Promise((resolve, reject) => {
        RoleApi.updateRole(data.roleid, data).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    SaveAppRoleChannel({ commit, rootState }, data) {
      data.managerId = rootState.user.managerId
      return new Promise((resolve, reject) => {
        RoleApi.saveAppRoleChannel(data).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}

export default role
