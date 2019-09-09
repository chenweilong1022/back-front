/**
 *
 * @Author: ozygod
 * @Date: 2018/10/1
 */
import request from '@/utils/request'

export function listRole() {
  return request({
    url: '/roles',
    method: 'get',
    headers: {
      'api-version': 'v1'
    }
  })
}

export function listRoleByQry(data) {
  return request({
    url: '/roles/query',
    method: 'post',
    headers: {
      'api-version': 'v1'
    },
    data: data
  })
}

export function getRoleByQry(roleId) {
  return request({
    url: '/roles/' + roleId,
    method: 'get',
    headers: {
      'api-version': 'v1'
    }
  })
}

export function transformRoleByQry(data) {
  return request({
    url: '/roles/' + data.roleid + '/transform',
    method: 'patch',
    headers: {
      'api-version': 'v1'
    },
    data: data
  })
}

export function addRole(data) {
  return request({
    url: '/roles',
    method: 'post',
    headers: {
      'api-version': 'v1'
    },
    data: data
  })
}

export function updateRole(data) {
  return request({
    url: '/roles/' + data.roleid,
    method: 'put',
    headers: {
      'api-version': 'v1'
    },
    data: data
  })
}

export function saveAppRoleChannel(data) {
  return request({
    url: '/roles/roleChannel',
    method: 'post',
    headers: {
      'api-version': 'v1'
    },
    data: data
  })
}
