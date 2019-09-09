/**
 *
 * @Author: ozygod
 * @Date: 2018/9/18
 */
import request from '@/utils/request'

export function listMenuByRoleId(roleId) {
  return request({
    url: '/menus/' + roleId,
    method: 'get',
    headers: {
      'api-version': 'v1'
    }
  })
}

export function listAllMenus() {
  return request({
    url: '/menus',
    method: 'get',
    headers: {
      'api-version': 'v1'
    }
  })
}

export function saveRoleMenu(data) {
  return request({
    url: '/menus/roleMenu',
    method: 'post',
    headers: {
      'api-version': 'v1'
    },
    data: data
  })
}

export function saveMenu(data) {
  return request({
    url: '/menus/' + data.menuid,
    method: 'post',
    headers: {
      'api-version': 'v1'
    },
    data: data
  })
}
