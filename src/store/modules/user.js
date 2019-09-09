import { login, logout, changePassword, getInfo } from '@/api/login'
import { getToken, setToken, removeToken, getManagerId, setManagerId, removeManagerId } from '@/utils/auth'
import { getIPs } from '@/utils'

const user = {
  state: {
    token: getToken(),
    managerId: getManagerId(),
    loginName: '',
    name: '',
    avatar: '',
    roleId: null,
    menus: []
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_MANAGER_ID: (state, managerId) => {
      state.managerId = managerId
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_MENUS: (state, menus) => {
      state.menus = menus
    },
    SET_LOGIN_NAME: (state, loginName) => {
      state.loginName = loginName
    },
    SET_ROLE_ID: (state, roleId) => {
      state.roleId = roleId
    }
  },

  actions: {
    // 登录
    Login({ commit }, userInfo) {
      const username = userInfo.username.trim()

      // 获取用户真实IP
      getIPs(function(ip) {
        userInfo.userIP = ip
      })
      return new Promise((resolve, reject) => {
        login(username, userInfo.password, userInfo.userIP).then(response => {
          const data = response.data
          setToken(data.token)
          setManagerId(data.manageid)
          commit('SET_TOKEN', data.token)
          commit('SET_MANAGER_ID', data.manageid)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取用户信息
    GetInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        getInfo(state.managerId).then(response => {
          const data = response.data
          // 只有请求成功，才做处理
          if (response.code === 0) {
            if (data.menus) {
              commit('SET_MENUS', data.menus)
            } else {
              reject('当前用户没有查看系统权限')
            }
            commit('SET_ROLE_ID', data.roleid)

            commit('SET_NAME', data.nickName)
            commit('SET_LOGIN_NAME', data.loginName)
            commit('SET_AVATAR', 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif')
            resolve(response)
          }
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    ChangePassword({ commit, state }, userInfo) {
      return new Promise((resolve, reject) => {
        changePassword(state.managerId, userInfo.newPassword, userInfo.oldPassword).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout(state.managerId).then(() => {
          commit('SET_TOKEN', '')
          commit('SET_MENUS', [])
          commit('SET_MANAGERID', 0)
          removeToken()
          removeManagerId()
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        commit('SET_MANAGERID', 0)
        removeToken()
        removeManagerId()
        resolve()
      })
    }
  }
}

export default user
