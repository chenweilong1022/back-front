/**
 *
 * @Author: ozygod
 * @Date: 2018-12-28
 */
import * as ActivityApi from '@/api/activity'

const activity = {
  actions: {
    Listtblgamegold({ commit }, data) {
      return new Promise((resolve, reject) => {
        ActivityApi.listtblgamegold(data).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    Savetblgamegold({ commit }, data) {
      return new Promise((resolve, reject) => {
        ActivityApi.savetblgamegold(data).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    Updatetblgamegold({ commit }, data) {
      return new Promise((resolve, reject) => {
        ActivityApi.updatetblgamegold(data).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    Deletetblgamegold({ commit }, id) {
      return new Promise((resolve, reject) => {
        ActivityApi.deletetblgamegold(id).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}

export default activity
