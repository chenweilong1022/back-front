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
