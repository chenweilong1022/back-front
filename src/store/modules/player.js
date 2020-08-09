/**
 *
 * @Author: ozygod
 * @Date: 2018/9/18
 */
import * as PlayerApi from '@/api/player'

const player = {
  actions: {
    ListPlayerAccountByQry({ commit }, query) {
      return new Promise((resolve, reject) => {
        PlayerApi.listPlayerAccountByQry(query).then(resp => {
          resolve(resp)
        }).catch(err => {
          reject(err)
        })
      })
    },
    GiftMoney({ commit, rootState }, data) {
      data.managerId = rootState.user.managerId
      return new Promise((resolve, reject) => {
        PlayerApi.giftMoney(data).then(resp => {
          resolve(resp)
        }).catch(err => {
          reject(err)
        })
      })
    },
    SetSaleRate({ commit, rootState }, data) {
      data.managerId = rootState.user.managerId
      return new Promise((resolve, reject) => {
        PlayerApi.setSaleRate(data).then(resp => {
          resolve(resp)
        }).catch(err => {
          reject(err)
        })
      })
    },
    SetUpSpread({ commit, rootState }, data) {
      data.managerId = rootState.user.managerId
      return new Promise((resolve, reject) => {
        PlayerApi.setUpSpread(data).then(resp => {
          resolve(resp)
        }).catch(err => {
          reject(err)
        })
      })
    },
    UpdateOrder({ commit, rootState }, data) {
      data.managerId = rootState.user.managerId
      return new Promise((resolve, reject) => {
        PlayerApi.updateOrder(data).then(resp => {
          resolve(resp)
        }).catch(err => {
          reject(err)
        })
      })
    },
    SendEmail({ commit, rootState }, data) {
      data.managerId = rootState.user.managerId
      return new Promise((resolve, reject) => {
        PlayerApi.sendEmail(data).then(resp => {
          resolve(resp)
        }).catch(err => {
          reject(err)
        })
      })
    },
    ListOnlinePlayerQry({ commit }, query) {
      return new Promise((resolve, reject) => {
        PlayerApi.listOnlinePlayerQry(query).then(resp => {
          resolve(resp)
        }).catch(err => {
          reject(err)
        })
      })
    },
    ListOnlineTotalGold({ commit }, query) {
      return new Promise((resolve, reject) => {
        PlayerApi.listOnlineTotalGold(query).then(resp => {
          resolve(resp)
        }).catch(err => {
          reject(err)
        })
      })
    },
    UpdatePlayerLuckyRatio({ commit }, data) {
      return new Promise((resolve, reject) => {
        PlayerApi.updatePlayerLuckyRatio(data).then(resp => {
          resolve(resp)
        }).catch(err => {
          reject(err)
        })
      })
    },
    ListDebtPlayerQry({ commit }, query) {
      return new Promise((resolve, reject) => {
        PlayerApi.listDebtPlayerQry(query).then(resp => {
          resolve(resp)
        }).catch(err => {
          reject(err)
        })
      })
    },
    ListPlayerBankLogByQry({ commit }, query) {
      return new Promise((resolve, reject) => {
        PlayerApi.listPlayerBankLogByQry(query).then(resp => {
          resolve(resp)
        }).catch(err => {
          reject(err)
        })
      })
    },
    ListPlayerOrderByQry({ commit }, query) {
      return new Promise((resolve, reject) => {
        PlayerApi.listPlayerOrderByQry(query).then(resp => {
          resolve(resp)
        }).catch(err => {
          reject(err)
        })
      })
    },
    ListPlayerOnlineOrderByQry({ commit }, query) {
      return new Promise((resolve, reject) => {
        PlayerApi.listPlayerOnlineOrderByQry(query).then(resp => {
          resolve(resp)
        }).catch(err => {
          reject(err)
        })
      })
    },
    ListWithdrawOrderByQry({ commit }, query) {
      return new Promise((resolve, reject) => {
        PlayerApi.listWithdrawOrderByQry(query).then(resp => {
          resolve(resp)
        }).catch(err => {
          reject(err)
        })
      })
    },
    UpdateWithdrawOrder({ commit, rootState }, data) {
      data.approvalId = rootState.user.managerId
      return new Promise((resolve, reject) => {
        PlayerApi.updateWithdrawOrder(data).then(resp => {
          resolve(resp)
        }).catch(err => {
          reject(err)
        })
      })
    },
    ListPlayerGameLogByQry({ commit }, query) {
      return new Promise((resolve, reject) => {
        PlayerApi.listPlayerGameLogByQry(query).then(resp => {
          resolve(resp)
        }).catch(err => {
          reject(err)
        })
      })
    },
    ListPlayerDiamondLogByQry({ commit }, query) {
      return new Promise((resolve, reject) => {
        PlayerApi.listPlayerDiamondLogByQry(query).then(resp => {
          resolve(resp)
        }).catch(err => {
          reject(err)
        })
      })
    },
    ListPrivateGameStatisticsByQry({ commit }, query) {
      return new Promise((resolve, reject) => {
        PlayerApi.listPrivateGameStatisticsByQry(query).then(resp => {
          resolve(resp)
        }).catch(err => {
          reject(err)
        })
      })
    },
    ListPlayerPrivateGameByQry({ commit }, query) {
      return new Promise((resolve, reject) => {
        PlayerApi.listPlayerPrivateGameByQry(query).then(resp => {
          resolve(resp)
        }).catch(err => {
          reject(err)
        })
      })
    },
    GetPlayerAccountById({ commit }, playerId) {
      return new Promise((resolve, reject) => {
        PlayerApi.getPlayerAccountById(playerId).then(resp => {
          resolve(resp)
        }).catch(err => {
          reject(err)
        })
      })
    },
    AgentTree({ commit }, data) {
      return new Promise((resolve, reject) => {
        PlayerApi.agentTree(data).then(resp => {
          resolve(resp)
        }).catch(err => {
          reject(err)
        })
      })
    },
    GetPlayerAccountByShowId({ commit }, showId) {
      return new Promise((resolve, reject) => {
        PlayerApi.getPlayerAccountByShowId(showId).then(resp => {
          resolve(resp)
        }).catch(err => {
          reject(err)
        })
      })
    },
    ResetPlayerPassword({ commit, rootState }, playerId) {
      return new Promise((resolve, reject) => {
        PlayerApi.resetPlayerPassword(playerId, rootState.user.managerId).then(resp => {
          resolve(resp)
        }).catch(err => {
          reject(err)
        })
      })
    },
    ResetPlayerBankPassword({ commit, rootState }, playerId) {
      return new Promise((resolve, reject) => {
        PlayerApi.resetPlayerBankPassword(playerId, rootState.user.managerId).then(resp => {
          resolve(resp)
        }).catch(err => {
          reject(err)
        })
      })
    },
    ListFreezeUserRecordById({ commit }, playerId) {
      return new Promise((resolve, reject) => {
        PlayerApi.listFreezeUserRecordById(playerId).then(resp => {
          resolve(resp)
        }).catch(err => {
          reject(err)
        })
      })
    },
    FreezePlayer({ commit, rootState }, data) {
      data.managerId = rootState.user.managerId
      return new Promise((resolve, reject) => {
        PlayerApi.freezePlayer(data.userid, data).then(resp => {
          resolve(resp)
        }).catch(err => {
          reject(err)
        })
      })
    },
    BatchFreezePlayer({ commit, rootState }, data) {
      data.managerId = rootState.user.managerId
      return new Promise((resolve, reject) => {
        PlayerApi.batchFreezePlayer(data).then(resp => {
          resolve(resp)
        }).catch(err => {
          reject(err)
        })
      })
    },
    UnfreezePlayer({ commit, rootState }, data) {
      data.managerId = rootState.user.managerId
      return new Promise((resolve, reject) => {
        PlayerApi.unfreezePlayer(data.userid, data).then(resp => {
          resolve(resp)
        }).catch(err => {
          reject(err)
        })
      })
    },
    TransferToSpread({ commit, rootState }, data) {
      data.managerId = rootState.user.managerId
      return new Promise((resolve, reject) => {
        PlayerApi.transferToSpread(data).then(resp => {
          resolve(resp)
        }).catch(err => {
          reject(err)
        })
      })
    },
    ListPlayerGameRecordByQry({ commit }, playerId) {
      return new Promise((resolve, reject) => {
        PlayerApi.listPlayerGameRecordByQry(playerId).then(resp => {
          resolve(resp)
        }).catch(err => {
          reject(err)
        })
      })
    },
    ListSameAddressPlayerById({ commit }, playerId) {
      return new Promise((resolve, reject) => {
        PlayerApi.listSameAddressPlayerById(playerId).then(resp => {
          resolve(resp)
        }).catch(err => {
          reject(err)
        })
      })
    },
    ListPlayerWithdrawRecordByQry({ commit }, query) {
      return new Promise((resolve, reject) => {
        PlayerApi.listPlayerWithdrawRecordByQry(query).then(resp => {
          resolve(resp)
        }).catch(err => {
          reject(err)
        })
      })
    },
    GetTotalPlayerWithdrawRecordByQry({ commit }, query) {
      return new Promise((resolve, reject) => {
        PlayerApi.getTotalPlayerWithdrawRecordByQry(query).then(resp => {
          resolve(resp)
        }).catch(err => {
          reject(err)
        })
      })
    },
    ListPlayerWealthRankByQry({ commit }, query) {
      return new Promise((resolve, reject) => {
        PlayerApi.listPlayerWealthRankByQry(query).then(resp => {
          resolve(resp)
        }).catch(err => {
          reject(err)
        })
      })
    },
    RemitGold({ commit, rootState }, data) {
      data.managerId = rootState.user.managerId
      return new Promise((resolve, reject) => {
        PlayerApi.remitGold(data).then(resp => {
          resolve(resp)
        }).catch(err => {
          reject(err)
        })
      })
    },
    ListRemitGoldRecordByQry({ commit }, query) {
      return new Promise((resolve, reject) => {
        PlayerApi.listRemitGoldRecordByQry(query).then(resp => {
          resolve(resp)
        }).catch(err => {
          reject(err)
        })
      })
    },
    ListRemitGoldRecordOnlineByQry({ commit }, query) {
      return new Promise((resolve, reject) => {
        PlayerApi.listRemitGoldRecordOnlineByQry(query).then(resp => {
          resolve(resp)
        }).catch(err => {
          reject(err)
        })
      })
    },
    GetTotalRemitGoldByQry({ commit }, query) {
      return new Promise((resolve, reject) => {
        PlayerApi.getTotalRemitGoldByQry(query).then(resp => {
          resolve(resp)
        }).catch(err => {
          reject(err)
        })
      })
    },
    RemitDiamond({ commit, rootState }, data) {
      data.managerId = rootState.user.managerId
      return new Promise((resolve, reject) => {
        PlayerApi.remitDiamond(data).then(resp => {
          resolve(resp)
        }).catch(err => {
          reject(err)
        })
      })
    },
    ListRemitDiamondRecordByQry({ commit }, query) {
      return new Promise((resolve, reject) => {
        PlayerApi.listRemitDiamondRecordByQry(query).then(resp => {
          resolve(resp)
        }).catch(err => {
          reject(err)
        })
      })
    },
    GetTotalRemitDiamondByQry({ commit }, query) {
      return new Promise((resolve, reject) => {
        PlayerApi.getTotalRemitDiamondByQry(query).then(resp => {
          resolve(resp)
        }).catch(err => {
          reject(err)
        })
      })
    },
    ListUserGameDetailByQry({ commit }, query) {
      return new Promise((resolve, reject) => {
        PlayerApi.listUserGameDetailByQry(query).then(resp => {
          resolve(resp)
        }).catch(err => {
          reject(err)
        })
      })
    }
  }
}

export default player
