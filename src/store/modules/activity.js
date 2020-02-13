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
    },

    Listtbldailyadventureawardgetrecord({ commit }, data) {
      return new Promise((resolve, reject) => {
        ActivityApi.listtbldailyadventureawardgetrecord(data).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    Savetbldailyadventureawardgetrecord({ commit }, data) {
      return new Promise((resolve, reject) => {
        ActivityApi.savetbldailyadventureawardgetrecord(data).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    Updatetbldailyadventureawardgetrecord({ commit }, data) {
      return new Promise((resolve, reject) => {
        ActivityApi.updatetbldailyadventureawardgetrecord(data).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    Deletetbldailyadventureawardgetrecord({ commit }, id) {
      return new Promise((resolve, reject) => {
        ActivityApi.deletetbldailyadventureawardgetrecord(id).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    Listtblactiveconfig({ commit }, data) {
      return new Promise((resolve, reject) => {
        ActivityApi.listtblactiveconfig(data).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    Savetblactiveconfig({ commit }, data) {
      return new Promise((resolve, reject) => {
        ActivityApi.savetblactiveconfig(data).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    Updatetblactiveconfig({ commit }, data) {
      return new Promise((resolve, reject) => {
        ActivityApi.updatetblactiveconfig(data).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    Deletetblactiveconfig({ commit }, id) {
      return new Promise((resolve, reject) => {
        ActivityApi.deletetblactiveconfig(id).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}

export default activity
