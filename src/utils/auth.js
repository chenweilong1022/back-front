import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

const ManagerIdKey = 'ManagerId'

export function getManagerId() {
  return Cookies.get(ManagerIdKey)
}

export function setManagerId(managerId) {
  return Cookies.set(ManagerIdKey, managerId)
}

export function removeManagerId() {
  return Cookies.remove(ManagerIdKey)
}
