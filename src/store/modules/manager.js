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
    },
    Authenticate({ commit }, data) {
      return new Promise((resolve, reject) => {
        ManagerApi.authenticate(data).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    IndexCard({ commit }) {
      return new Promise((resolve, reject) => {
        ManagerApi.indexCard1().then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    PlayerOnlineStatistics({ commit }, data) {
      return new Promise((resolve, reject) => {
        ManagerApi.playerOnlineStatistics1(data).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      }, 10000)
    },
    PlayerOnlineStatisticsButtons({ commit }) {
      return new Promise((resolve, reject) => {
        ManagerApi.playerOnlineStatisticsButtons().then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    AccountLoginRegistrEverydayStatistics({ commit }, data) {
      return new Promise((resolve, reject) => {
        ManagerApi.accountLoginRegistrEverydayStatistics(data).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    RechargeAmountStatistics({ commit }, data) {
      return new Promise((resolve, reject) => {
        ManagerApi.rechargeAmountStatistics(data).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    AppPayChannel({ commit }) {
      return new Promise((resolve, reject) => {
        ManagerApi.appPayChannel().then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    TotalGoldEverydayStatistics({ commit }, data) {
      return new Promise((resolve, reject) => {
        ManagerApi.totalGoldEverydayStatistics(data).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    Listtblmainframemonitorlog({ commit }, data) {
      return new Promise((resolve, reject) => {
        ManagerApi.listtblmainframemonitorlog(data).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    Savetblmainframemonitorlog({ commit }, data) {
      return new Promise((resolve, reject) => {
        ManagerApi.savetblmainframemonitorlog(data).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    Updatetblmainframemonitorlog({ commit }, data) {
      return new Promise((resolve, reject) => {
        ManagerApi.updatetblmainframemonitorlog(data).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    Deletetblmainframemonitorlog({ commit }, id) {
      return new Promise((resolve, reject) => {
        ManagerApi.deletetblmainframemonitorlog(id).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    Listtblmonitor({ commit }, data) {
      return new Promise((resolve, reject) => {
        ManagerApi.listtblmonitor(data).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    Savetblmonitor({ commit }, data) {
      return new Promise((resolve, reject) => {
        ManagerApi.savetblmonitor(data).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    Updatetblmonitor({ commit }, data) {
      return new Promise((resolve, reject) => {
        ManagerApi.updatetblmonitor(data).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    Deletetblmonitor({ commit }, id) {
      return new Promise((resolve, reject) => {
        ManagerApi.deletetblmonitor(id).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    }

  }
}

export default manager
