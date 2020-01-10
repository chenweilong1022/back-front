/**
 *
 * @Author: ozygod
 * @Date: 2018/10/1
 */
import request from '@/utils/request'

export function resetPassword(managerId, data) {
  return request({
    url: '/managers/' + managerId + '/resetPassword',
    method: 'patch',
    headers: {
      'api-version': 'v1'
    },
    data: data
  })
}

export function listManagerByQry() {
  return request({
    url: '/managers',
    method: 'get',
    headers: {
      'api-version': 'v1'
    }
  })
}

export function transformManagerStateByQry(managerId, data) {
  return request({
    url: '/managers/' + managerId + '/transform',
    method: 'patch',
    headers: {
      'api-version': 'v1'
    },
    data: data
  })
}

export function addManager(data) {
  return request({
    url: '/managers',
    method: 'post',
    headers: {
      'api-version': 'v1'
    },
    data: data
  })
}

export function updateManager(managerId, data) {
  return request({
    url: '/managers/' + managerId,
    method: 'put',
    headers: {
      'api-version': 'v1'
    },
    data: data
  })
}

export function listManageLogType() {
  return request({
    url: '/managers/logType',
    method: 'get',
    headers: {
      'api-version': 'v1'
    }
  })
}

export function listManageLogByQry(data) {
  return request({
    url: '/managers/logs',
    method: 'post',
    headers: {
      'api-version': 'v1'
    },
    data: data
  })
}

export function authenticate(data) {
  return request({
    url: '/zdconfig/tblipwhitelist/authenticate',
    method: 'post',
    headers: {
      'api-version': 'v1'
    },
    data: data
  })
}

export function indexCard1() {
  return request({
    url: '/index/indexCard',
    method: 'post',
    headers: {
      'api-version': 'v1'
    }
  })
}

export function playerOnlineStatistics1(data) {
  return request({
    url: '/index/playerOnlineStatistics',
    method: 'post',
    headers: {
      'api-version': 'v1'
    },
    data: data
  })
}

export function playerOnlineStatisticsButtons(data) {
  return request({
    url: '/index/playerOnlineStatisticsButtons',
    method: 'post',
    headers: {
      'api-version': 'v1'
    },
    data: data
  })
}

export function accountLoginRegistrEverydayStatistics(data) {
  return request({
    url: '/index/accountLoginRegistrEverydayStatistics',
    method: 'post',
    headers: {
      'api-version': 'v1'
    },
    data: data
  })
}

export function rechargeAmountStatistics(data) {
  return request({
    url: '/index/rechargeAmountStatistics',
    method: 'post',
    headers: {
      'api-version': 'v1'
    },
    data: data
  })
}

export function appPayChannel(data) {
  return request({
    url: '/index/appPayChannel',
    method: 'post',
    headers: {
      'api-version': 'v1'
    },
    data: data
  })
}

export function totalGoldEverydayStatistics(data) {
  return request({
    url: '/index/totalGoldEverydayStatistics',
    method: 'post',
    headers: {
      'api-version': 'v1'
    },
    data: data
  })
}

export function listtblmonitor(data) {
  return request({
    url: '/zdmanage/tblmonitor/list',
    method: 'post',
    headers: {
      'api-version': 'v1'
    },
    data: data
  })
}

export function savetblmonitor(data) {
  return request({
    url: '/zdmanage/tblmonitor/save',
    method: 'post',
    headers: {
      'api-version': 'v2'
    },
    data: data
  })
}

export function updatetblmonitor(data) {
  return request({
    url: '/zdmanage/tblmonitor/update',
    method: 'put',
    headers: {
      'api-version': 'v2'
    },
    data: data
  })
}

export function deletetblmonitor(id) {
  return request({
    url: '/zdmanage/tblmonitor/delete/' + id,
    method: 'delete',
    headers: {
      'api-version': 'v2'
    }
  })
}

export function listtblmainframemonitorlog(data) {
  return request({
    url: '/zdmanage/tblmainframemonitorlog/list',
    method: 'post',
    headers: {
      'api-version': 'v1'
    },
    data: data
  })
}

export function savetblmainframemonitorlog(data) {
  return request({
    url: '/zdmanage/tblmainframemonitorlog/save',
    method: 'post',
    headers: {
      'api-version': 'v2'
    },
    data: data
  })
}

export function updatetblmainframemonitorlog(data) {
  return request({
    url: '/zdmanage/tblmainframemonitorlog/update',
    method: 'put',
    headers: {
      'api-version': 'v2'
    },
    data: data
  })
}

export function deletetblmainframemonitorlog(id) {
  return request({
    url: '/zdmanage/tblmainframemonitorlog/delete/' + id,
    method: 'delete',
    headers: {
      'api-version': 'v2'
    }
  })
}
