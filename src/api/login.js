import request from '@/utils/request'

export function login(userInfo) {
  return request({
    url: '/managers/login',
    method: 'post',
    headers: {
      'api-version': 'v1'
    },
    data: userInfo
  })
}

export function getInfo(managerId) {
  return request({
    url: '/managers/' + managerId,
    method: 'get',
    headers: {
      'api-version': 'v1'
    }
  })
}

export function changePassword(managerId, newPassword, oldPassword) {
  return request({
    url: '/managers/' + managerId + '/changePassword',
    method: 'patch',
    headers: {
      'api-version': 'v1'
    },
    data: {
      newPassword,
      oldPassword
    }
  })
}

export function logout(managerId) {
  return request({
    url: '/managers/' + managerId + '/logout',
    method: 'delete',
    headers: {
      'api-version': 'v1'
    }
  })
}
