/**
 *
 * @Author: ozygod
 * @Date: 2018/9/25
 */

import * as SpreadApi from '@/api/spread'

const spread = {
  actions: {
    AddSpreadUser({ commit }, data) {
      return new Promise((resolve, reject) => {
        SpreadApi.addSpreadUser(data).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    ListSpreadUserByQry({ commit }, query) {
      return new Promise((resolve, reject) => {
        SpreadApi.listSpreadUserByQry(query).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    ReduceSpreadUserDiamond({ commit, rootState }, data) {
      data.managerId = rootState.user.managerId
      return new Promise((resolve, reject) => {
        SpreadApi.reduceSpreadUserDiamond(data).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    ResetSpreadUserPassword({ commit }, data) {
      return new Promise((resolve, reject) => {
        SpreadApi.resetSpreadUserPassword(data).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    CancelSpreadUserById({ commit }, spreadUserId) {
      return new Promise((resolve, reject) => {
        SpreadApi.cancelSpreadUserById(spreadUserId).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    ResetSpreadUserRatio({ commit }, data) {
      return new Promise((resolve, reject) => {
        SpreadApi.resetSpreadUserRatio(data).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    UpdateSpreadUser({ commit }, data) {
      return new Promise((resolve, reject) => {
        SpreadApi.updateSpreadUser(data).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    ListDailyCountSpreadGoldRecordByQry({ commit }, query) {
      return new Promise((resolve, reject) => {
        SpreadApi.listDailyCountSpreadGoldRecordByQry(query).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    ListDailyCountSpreadDiamondRecordByQry({ commit }, query) {
      return new Promise((resolve, reject) => {
        SpreadApi.listDailyCountSpreadDiamondRecordByQry(query).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    ListRecordSpreadGiveGoldByQry({ commit }, query) {
      return new Promise((resolve, reject) => {
        SpreadApi.listRecordSpreadGiveGoldByQry(query).then(resp => {
          resolve(resp)
        }).catch(err => {
          reject(err)
        })
      })
    }
  }
}

export default spread
