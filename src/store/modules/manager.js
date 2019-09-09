/**
 *
 * @Author: ozygod
 * @Date: 2018/10/1
 */
import * as ManagerApi from '@/api/manager'

const manager = {
  actions: {
    ResetPassword({ commit,rootState }, data) {
      data.whoId = rootState.user.managerId
      return new Promise((resolve, reject) => {
        ManagerApi.resetPassword(data.manageid, data).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    ListManagerByQry({ commit }) {
      return new Promise((resolve, reject) => {
        ManagerApi.listManagerByQry().then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    TransformManagerStateByQry({ commit, rootState }, data) {
      data.whoId = rootState.user.managerId
      return new Promise((resolve, reject) => {
        ManagerApi.transformManagerStateByQry(data.manageid, data).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    AddManager({ commit, rootState }, data) {
      data.whoId = rootState.user.managerId
      return new Promise((resolve, reject) => {
        ManagerApi.addManager(data).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    UpdateManager({ commit, rootState }, data) {
      data.whoId = rootState.user.managerId
      return new Promise((resolve, reject) => {
        ManagerApi.updateManager(data.manageid, data).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    ListManageLogType({ commit }) {
      return new Promise((resolve, reject) => {
        ManagerApi.listManageLogType().then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    ListManageLogByQry({ commit }, data) {
      return new Promise((resolve, reject) => {
        ManagerApi.listManageLogByQry(data).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}

export default manager
