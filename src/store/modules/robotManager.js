/**
 *
 * @Author: ozygod
 * @Date: 2018/9/10
 */
import * as Api from '@/api/robotManager'
import * as bwApi from '@/api/player'

const robotManager = {

  state: {
    robotMenus: []
  },

  actions: {
    GetRobotMenus({ commit }) {
      return new Promise((resolve, reject) => {
        Api.getRobotMenus().then(response => {
          commit('SET_ROBOT_MENUS', response.data)

          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    SaveRobotMenu({ commit }, robotMenu) {
      return new Promise((resolve, reject) => {
        Api.saveRobotMenu(robotMenu).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    GetRobotMenusBySuperId({ commit }, superId) {
      return new Promise((resolve, reject) => {
        Api.getRobotMenusBySuperId(superId).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    GetRobotMenusByQry({ commit }, query) {
      return new Promise((resolve, reject) => {
        Api.getRobotMenusByQry(query).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    UpdateRobotMenu({ commit }, robotMenu) {
      return new Promise((resolve, reject) => {
        Api.updateRobotMenu(robotMenu).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    ListRobotStatus({ commit }) {
      return new Promise((resolve, reject) => {
        Api.listRobotStatus().then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    GetRobotByRoomId({ commit }, roomId) {
      return new Promise((resolve, reject) => {
        Api.getRobotByRoomId(roomId).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    UpdateRobot({ commit }, robot) {
      return new Promise((resolve, reject) => {
        Api.updateRobot(robot.roomId, robot).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    StartRobot({ commit }, roomId) {
      return new Promise((resolve, reject) => {
        Api.startRobot(roomId).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    RestartRobot({ commit }, roomId) {
      return new Promise((resolve, reject) => {
        Api.restartRobot(roomId).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    StopRobot({ commit }, roomId) {
      return new Promise((resolve, reject) => {
        Api.stopRobot(roomId).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    ClearRoomMoney({ commit, rootState }, data) {
      data.who = rootState.user.loginName
      return new Promise((resolve, reject) => {
        Api.clearRoomMoney(data.roomId, data).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    ListBlackWhiteList({ commit }, data) {
      return new Promise((resolve, reject) => {
        bwApi.listBlackWhiteList(data).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    AddBlackWhiteList({ commit }, data) {
      return new Promise((resolve, reject) => {
        bwApi.addBlackWhiteList(data).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    TransformBlackWhiteList({ commit }, data) {
      return new Promise((resolve, reject) => {
        bwApi.transformBlackWhiteList(data).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    DeleteBlackWhiteList({ commit }, listId) {
      return new Promise((resolve, reject) => {
        bwApi.deleteBlackWhiteList(listId).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    GetRobotsByQry({ commit }, roomId) {
      return new Promise((resolve, reject) => {
        Api.getRobotsByQry(roomId).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    AddRobot({ commit }, robot) {
      return new Promise((resolve, reject) => {
        Api.addRobot(robot).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    ResetRobot({ commit }, robot) {
      return new Promise((resolve, reject) => {
        Api.resetRobot(robot).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    DeleteRobot({ commit }, robot) {
      return new Promise((resolve, reject) => {
        Api.deleteRobot(robot).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    GetRobotConfigByQry({ commit }, roomId) {
      return new Promise((resolve, reject) => {
        Api.getRobotConfigByQry(roomId).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    UpdateRobotConfig({ commit }, robot) {
      return new Promise((resolve, reject) => {
        Api.updateRobotConfig(robot).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    }
  },

  mutations: {
    SET_ROBOT_MENUS: (state, robotMenus) => {
      state.robotMenus = robotMenus
    }
  }
}

export default robotManager
