/**
 *
 * @Author: ozygod
 * @Date: 2018/9/25
 */
import request from '@/utils/request'

export function addSpreadUser(data) {
  return request({
    url: '/spread/users',
    method: 'post',
    headers: {
      'api-version': 'v1'
    },
    data: data
  })
}

export function listSpreadUserByQry(query) {
  return request({
    url: '/spread/users/query',
    method: 'post',
    headers: {
      'api-version': 'v1'
    },
    data: query
  })
}

export function reduceSpreadUserDiamond(data) {
  return request({
    url: '/spread/users/reduceDiamond',
    method: 'post',
    headers: {
      'api-version': 'v1'
    },
    data: data
  })
}

export function resetSpreadUserPassword(data) {
  return request({
    url: '/spread/users/resetPassword',
    method: 'patch',
    headers: {
      'api-version': 'v1'
    },
    data: {
      id: data.id
    }
  })
}

export function cancelSpreadUserById(spreadUserId) {
  return request({
    url: '/spread/users/cancel/' + spreadUserId,
    method: 'patch',
    headers: {
      'api-version': 'v1'
    }
  })
}

export function resetSpreadUserRatio(data) {
  return request({
    url: '/spread/users/resetRatio',
    method: 'patch',
    headers: {
      'api-version': 'v1'
    },
    data: {
      id: data.id
    }
  })
}

export function updateSpreadUser(data) {
  return request({
    url: '/spread/users/modify',
    method: 'patch',
    headers: {
      'api-version': 'v1'
    },
    data: data
  })
}

export function listDailyCountSpreadGoldRecordByQry(query) {
  return request({
    url: '/spreads/gold/daily/query',
    method: 'post',
    headers: {
      'api-version': 'v1'
    },
    data: query
  })
}

export function listDailyCountSpreadDiamondRecordByQry(query) {
  return request({
    url: '/spreads/diamond/daily/query',
    method: 'post',
    headers: {
      'api-version': 'v1'
    },
    data: query
  })
}

export function listRecordSpreadGiveGoldByQry(query) {
  return request({
    url: '/spreads/record/giveGold/query',
    method: 'post',
    headers: {
      'api-version': 'v1'
    },
    data: query
  })
}
