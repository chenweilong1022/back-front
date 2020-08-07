/**
 *
 * @Author: ozygod
 * @Date: 2018-12-28
 */
import * as AgentApi from '@/api/agent'

const agent = {
  actions: {
    ListAgentRealtimeByQry({ commit }, query) {
      return new Promise((resolve, reject) => {
        AgentApi.listAgentRealtimeByQry(query).then(resp => {
          resolve(resp)
        }).catch(err => {
          reject(err)
        })
      })
    },
    ListTotalAgentRealtimeByQry({ commit }, query) {
      return new Promise((resolve, reject) => {
        AgentApi.listTotalAgentRealtimeByQry(query).then(resp => {
          resolve(resp)
        }).catch(err => {
          reject(err)
        })
      })
    },
    ListAgentRecordByQry({ commit }, query) {
      return new Promise((resolve, reject) => {
        AgentApi.listAgentRecordByQry(query).then(resp => {
          resolve(resp)
        }).catch(err => {
          reject(err)
        })
      })
    },
    ListAgentRecordSummaryByQry({ commit }, query) {
      return new Promise((resolve, reject) => {
        AgentApi.listAgentRecordSummaryByQry(query).then(resp => {
          resolve(resp)
        }).catch(err => {
          reject(err)
        })
      })
    },
    GetAgentRecordSummary({ commit }, query) {
      return new Promise((resolve, reject) => {
        AgentApi.getAgentRecordSummary(query).then(resp => {
          resolve(resp)
        }).catch(err => {
          reject(err)
        })
      })
    }
  }
}

export default agent
