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

export function listtbldailyadventureawardgetrecord(data) {
  return request({
    url: '/zdlog/tbldailyadventureawardgetrecord/list',
    method: 'post',
    headers: {
      'api-version': 'v1'
    },
    data: data
  })
}

export function savetbldailyadventureawardgetrecord(data) {
  return request({
    url: '/zdlog/tbldailyadventureawardgetrecord/save',
    method: 'post',
    headers: {
      'api-version': 'v2'
    },
    data: data
  })
}

export function updatetbldailyadventureawardgetrecord(data) {
  return request({
    url: '/zdlog/tbldailyadventureawardgetrecord/update',
    method: 'put',
    headers: {
      'api-version': 'v2'
    },
    data: data
  })
}

export function deletetbldailyadventureawardgetrecord(id) {
  return request({
    url: '/zdlog/tbldailyadventureawardgetrecord/delete/' + id,
    method: 'delete',
    headers: {
      'api-version': 'v2'
    }
  })
}

export function listtblactiveconfig(data) {
  return request({
    url: '/zdconfig/tblactiveconfig/list',
    method: 'post',
    headers: {
      'api-version': 'v1'
    },
    data: data
  })
}

export function savetblactiveconfig(data) {
  return request({
    url: '/zdconfig/tblactiveconfig/save',
    method: 'post',
    headers: {
      'api-version': 'v2'
    },
    data: data
  })
}

export function updatetblactiveconfig(data) {
  return request({
    url: '/zdconfig/tblactiveconfig/update',
    method: 'put',
    headers: {
      'api-version': 'v2'
    },
    data: data
  })
}

export function deletetblactiveconfig(id) {
  return request({
    url: '/zdconfig/tblactiveconfig/delete/' + id,
    method: 'delete',
    headers: {
      'api-version': 'v2'
    }
  })
}
