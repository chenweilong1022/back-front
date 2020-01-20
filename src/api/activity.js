/**
 * 活动
 * @Author: 陈伟龙
 * @Date: 2018-12-28
 */
import request from '@/utils/request'

export function listtblgamegold(data) {
  return request({
    url: '/zdlog/tblgamegold/list',
    method: 'post',
    headers: {
      'api-version': 'v1'
    },
    data: data
  })
}

export function savetblgamegold(data) {
  return request({
    url: '/zdlog/tblgamegold/save',
    method: 'post',
    headers: {
      'api-version': 'v2'
    },
    data: data
  })
}

export function updatetblgamegold(data) {
  return request({
    url: '/zdlog/tblgamegold/update',
    method: 'put',
    headers: {
      'api-version': 'v2'
    },
    data: data
  })
}

export function deletetblgamegold(id) {
  return request({
    url: '/zdlog/tblgamegold/delete/' + id,
    method: 'delete',
    headers: {
      'api-version': 'v2'
    }
  })
}
