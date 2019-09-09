/**
 *
 * @Author: ozygod
 * @Date: 2018/9/16
 */
import request from '@/utils/request'

export function getGameRuleByQry(query) {
  return request({
    url: '/game/rules/query',
    method: 'post',
    headers: {
      'api-version': 'v1'
    },
    data: query
  })
}

export function saveGameRule(data) {
  return request({
    url: '/game/rules',
    method: 'post',
    headers: {
      'api-version': 'v1'
    },
    data: data
  })
}

export function listAllGame() {
  return request({
    url: '/games',
    method: 'get',
    headers: {
      'api-version': 'v1'
    }
  })
}

export function listGamesAndOnlineCount() {
  return request({
    url: '/games/rooms/onlineCount',
    method: 'get',
    headers: {
      'api-version': 'v1'
    }
  })
}

export function listGameRoomByQry(query) {
  return request({
    url: '/games/rooms/query',
    method: 'post',
    headers: {
      'api-version': 'v1'
    },
    data: query
  })
}
