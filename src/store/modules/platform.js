/**
 *
 * @Author: ozygod
 * @Date: 2018/9/19
 */
import * as PlatformApi from '@/api/platform'

const platform = {
  actions: {
    GetPlatformOverview() {
      return new Promise((resolve, reject) => {
        PlatformApi.getPlatformOverview().then(resp => {
          resolve(resp)
        }).catch(err => {
          reject(err)
        })
      })
    },
    GetComplexRechargeCountByQry({ commit }, query) {
      return new Promise((resolve, reject) => {
        PlatformApi.getComplexRechargeCountByQry(query).then(resp => {
          resolve(resp)
        }).catch(err => {
          reject(err)
        })
      })
    },
    ListRecentDaysRechargeCountByQry({ commit }, query) {
      return new Promise((resolve, reject) => {
        PlatformApi.listRecentDaysRechargeCountByQry(query).then(resp => {
          resolve(resp)
        }).catch(err => {
          reject(err)
        })
      })
    },
    ListDailyPlayersCountByQry({ commit }, query) {
      return new Promise((resolve, reject) => {
        PlatformApi.listDailyPlayersCountByQry(query).then(resp => {
          resolve(resp)
        }).catch(err => {
          reject(err)
        })
      })
    },
    ListDailyGoldCountByQry({ commit }, query) {
      return new Promise((resolve, reject) => {
        PlatformApi.listDailyGoldCountByQry(query).then(resp => {
          resolve(resp)
        }).catch(err => {
          reject(err)
        })
      })
    },
    GetDailyGoldCountSumByQry({ commit }, query) {
      return new Promise((resolve, reject) => {
        PlatformApi.getDailyGoldCountSumByQry(query).then(resp => {
          resolve(resp)
        }).catch(err => {
          reject(err)
        })
      })
    },
    ListDailyGameTaxGoldCountByQry({ commit }, query) {
      return new Promise((resolve, reject) => {
        PlatformApi.listDailyGameTaxGoldCountByQry(query).then(resp => {
          resolve(resp)
        }).catch(err => {
          reject(err)
        })
      })
    },
    ListDailyRegAliveCountByQry({ commit }, query) {
      return new Promise((resolve, reject) => {
        PlatformApi.listDailyRegAliveCountByQry(query).then(resp => {
          resolve(resp)
        }).catch(err => {
          reject(err)
        })
      })
    },
    ListAppChannelType({ commit }) {
      return new Promise((resolve, reject) => {
        PlatformApi.listAppChannelType().then(resp => {
          resolve(resp)
        }).catch(err => {
          reject(err)
        })
      })
    },
    ListNoticeByQry({ commit }, query) {
      return new Promise((resolve, reject) => {
        PlatformApi.listNoticeByQry(query).then(resp => {
          resolve(resp)
        }).catch(err => {
          reject(err)
        })
      })
    },
    PublishNotice({ commit, rootState }, noticeId) {
      return new Promise((resolve, reject) => {
        PlatformApi.publishNotice(noticeId, rootState.user.managerId).then(resp => {
          resolve(resp)
        }).catch(err => {
          reject(err)
        })
      })
    },
    UnpublishNotice({ commit, rootState }, noticeId) {
      return new Promise((resolve, reject) => {
        PlatformApi.unpublishNotice(noticeId, rootState.user.managerId).then(resp => {
          resolve(resp)
        }).catch(err => {
          reject(err)
        })
      })
    },
    DeleteNotice({ commit }, noticeId) {
      return new Promise((resolve, reject) => {
        PlatformApi.deleteNotice(noticeId).then(resp => {
          resolve(resp)
        }).catch(err => {
          reject(err)
        })
      })
    },
    CreateNotice({ commit, rootState }, data) {
      data.managerId = rootState.user.managerId
      return new Promise((resolve, reject) => {
        PlatformApi.createNotice(data).then(resp => {
          resolve(resp)
        }).catch(err => {
          reject(err)
        })
      })
    },
    ListVipChannelByQry({ commit }, query) {
      return new Promise((resolve, reject) => {
        PlatformApi.listVipChannelByQry(query).then(resp => {
          resolve(resp)
        }).catch(err => {
          reject(err)
        })
      })
    },
    SaveVipChannel({ commit, rootState }, data) {
      data.managerId = rootState.user.managerId
      return new Promise((resolve, reject) => {
        PlatformApi.saveVipChannel(data).then(resp => {
          resolve(resp)
        }).catch(err => {
          reject(err)
        })
      })
    },
    UpdateVipChannel({ commit, rootState }, data) {
      data.managerId = rootState.user.managerId
      return new Promise((resolve, reject) => {
        PlatformApi.updateVipChannel(data).then(resp => {
          resolve(resp)
        }).catch(err => {
          reject(err)
        })
      })
    },
    SaveSysConfigs({ commit, rootState }, data) {
      data.managerId = rootState.user.managerId
      return new Promise((resolve, reject) => {
        PlatformApi.saveSysConfigs(data).then(resp => {
          resolve(resp)
        }).catch(err => {
          reject(err)
        })
      })
    },
    ListSysConfigsByQry({ commit }, query) {
      return new Promise((resolve, reject) => {
        PlatformApi.listSysConfigsByQry(query).then(resp => {
          resolve(resp)
        }).catch(err => {
          reject(err)
        })
      })
    },
    UpdateSysConfig({ commit, rootState }, data) {
      data.managerId = rootState.user.managerId
      return new Promise((resolve, reject) => {
        PlatformApi.updateSysConfig(data).then(resp => {
          resolve(resp)
        }).catch(err => {
          reject(err)
        })
      })
    },
    ListGameWinningDetailByQry({ commit }, query) {
      return new Promise((resolve, reject) => {
        PlatformApi.listGameWinningDetailByQry(query).then(resp => {
          resolve(resp)
        }).catch(err => {
          reject(err)
        })
      })
    },
    ListRechargeStatementByQry({ commit }, query) {
      return new Promise((resolve, reject) => {
        PlatformApi.listRechargeStatementByQry(query).then(resp => {
          resolve(resp)
        }).catch(err => {
          reject(err)
        })
      })
    },
    ListWithdrawStatementByQry({ commit }, query) {
      return new Promise((resolve, reject) => {
        PlatformApi.listWithdrawStatementByQry(query).then(resp => {
          resolve(resp)
        }).catch(err => {
          reject(err)
        })
      })
    },
    SaveSysDomain({ commit, rootState }, data) {
      data.managerId = rootState.user.managerId
      return new Promise((resolve, reject) => {
        PlatformApi.saveSysDomain(data).then(resp => {
          resolve(resp)
        }).catch(err => {
          reject(err)
        })
      })
    },
    ListSysDomainByQry({ commit }, query) {
      return new Promise((resolve, reject) => {
        PlatformApi.listSysDomainByQry(query).then(resp => {
          resolve(resp)
        }).catch(err => {
          reject(err)
        })
      })
    },
    UpdateSysDomain({ commit, rootState }, data) {
      data.managerId = rootState.user.managerId
      return new Promise((resolve, reject) => {
        PlatformApi.updateSysDomain(data).then(resp => {
          resolve(resp)
        }).catch(err => {
          reject(err)
        })
      })
    },
    SaveShareImage({ commit, rootState }, data) {
      data.managerId = rootState.user.managerId
      return new Promise((resolve, reject) => {
        PlatformApi.saveShareImage(data).then(resp => {
          resolve(resp)
        }).catch(err => {
          reject(err)
        })
      })
    },
    ListShareImageByQry({ commit }, query) {
      return new Promise((resolve, reject) => {
        PlatformApi.listShareImageByQry(query).then(resp => {
          resolve(resp)
        }).catch(err => {
          reject(err)
        })
      })
    },
    UpdateShareImage({ commit, rootState }, data) {
      data.managerId = rootState.user.managerId
      return new Promise((resolve, reject) => {
        PlatformApi.updateShareImage(data).then(resp => {
          resolve(resp)
        }).catch(err => {
          reject(err)
        })
      })
    },
    UploadImage({ commit, rootState }, data) {
      data.managerId = rootState.user.managerId
      return new Promise((resolve, reject) => {
        PlatformApi.uploadImage(data).then(resp => {
          resolve(resp)
        }).catch(err => {
          reject(err)
        })
      })
    },
    ListAllRecordAccountOnlinePlaying({ commit }, query) {
      return new Promise((resolve, reject) => {
        PlatformApi.listAllRecordAccountOnlinePlaying(query).then(resp => {
          resolve(resp)
        }).catch(err => {
          reject(err)
        })
      })
    },
    Listtblrecorddailyrechargereport({ commit }, data) {
      return new Promise((resolve, reject) => {
        PlatformApi.listtblrecorddailyrechargereport(data).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    Savetblrecorddailyrechargereport({ commit }, data) {
      return new Promise((resolve, reject) => {
        PlatformApi.savetblrecorddailyrechargereport(data).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    Updatetblrecorddailyrechargereport({ commit }, data) {
      return new Promise((resolve, reject) => {
        PlatformApi.updatetblrecorddailyrechargereport(data).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    Deletetblrecorddailyrechargereport({ commit }, id) {
      return new Promise((resolve, reject) => {
        PlatformApi.deletetblrecorddailyrechargereport(id).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    Listtblrecordchanneldaily({ commit }, data) {
      return new Promise((resolve, reject) => {
        PlatformApi.listtblrecordchanneldaily(data).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    Savetblrecordchanneldaily({ commit }, data) {
      return new Promise((resolve, reject) => {
        PlatformApi.savetblrecordchanneldaily(data).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    Updatetblrecordchanneldaily({ commit }, data) {
      return new Promise((resolve, reject) => {
        PlatformApi.updatetblrecordchanneldaily(data).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    Deletetblrecordchanneldaily({ commit }, id) {
      return new Promise((resolve, reject) => {
        PlatformApi.deletetblrecordchanneldaily(id).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    Recordchannelgeneralizebuttons({ commit }, data) {
      return new Promise((resolve, reject) => {
        PlatformApi.recordchannelgeneralizebuttons(data).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    Listtblrecordchannelgeneralize({ commit }, data) {
      return new Promise((resolve, reject) => {
        PlatformApi.listtblrecordchannelgeneralize(data).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    Savetblrecordchannelgeneralize({ commit }, data) {
      return new Promise((resolve, reject) => {
        PlatformApi.savetblrecordchannelgeneralize(data).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    Updatetblrecordchannelgeneralize({ commit }, data) {
      return new Promise((resolve, reject) => {
        PlatformApi.updatetblrecordchannelgeneralize(data).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    Deletetblrecordchannelgeneralize({ commit }, id) {
      return new Promise((resolve, reject) => {
        PlatformApi.deletetblrecordchannelgeneralize(id).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    Accountregisterchannel({ commit }) {
      return new Promise((resolve, reject) => {
        PlatformApi.accountregisterchannel().then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    Accounchannelclassify({ commit }) {
      return new Promise((resolve, reject) => {
        PlatformApi.accounchannelclassify().then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
  }
}

export default platform
