/**
 *
 * @Author: ozygod
 * @Date: 2018/9/16
 */
import * as GameApi from '@/api/game'

const game = {
  state: {

  },
  mutations: {

  },
  actions: {
    GetGameRuleByQry({ commit }, query) {
      return new Promise((resolve, reject) => {
        GameApi.getGameRuleByQry(query).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    SaveGameRule({ commit }, data) {
      return new Promise((resolve, reject) => {
        GameApi.saveGameRule(data).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    ListAllGame({ commit }) {
      return new Promise((resolve, reject) => {
        GameApi.listAllGame().then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    ListGamesAndOnlineCount({ commit }) {
      return new Promise((resolve, reject) => {
        GameApi.listGamesAndOnlineCount().then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    ListGameRoomByQry({ commit }, query) {
      return new Promise((resolve, reject) => {
        GameApi.listGameRoomByQry(query).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}

export default game
