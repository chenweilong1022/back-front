/**
 *
 * @Author: ozygod
 * @Date: 2018/9/10
 */
import request from '@/utils/request'

export function getRobotMenus() {
  return request({
    url: '/robots/menus',
    method: 'get',
    headers: {
      'api-version': 'v1'
    }
  })
}
export function getRobotMenusByQry(query) {
  return request({
    url: '/robots/menus/query',
    method: 'post',
    headers: {
      'api-version': 'v1'
    },
    data: query
  })
}

export function saveRobotMenu(robotMenu) {
  return request({
    url: '/robots/menus',
    method: 'post',
    headers: {
      'api-version': 'v1'
    },
    data: robotMenu
  })
}

export function getRobotMenusBySuperId(superId) {
  return request({
    url: '/robots/menus/' + superId + '/children',
    method: 'get',
    headers: {
      'api-version': 'v1'
    }
  })
}

export function updateRobotMenu(robotMenu) {
  return request({
    url: '/robots/menus/' + robotMenu.id,
    method: 'put',
    headers: {
      'api-version': 'v1'
    },
    data: robotMenu
  })
}

export function listRobotStatus() {
  return request({
    url: '/robots/status',
    method: 'get',
    headers: {
      'api-version': 'v1'
    }
  })
}

export function getRobotByRoomId(roomId) {
  return request({
    url: '/robots/' + roomId,
    method: 'get',
    headers: {
      'api-version': 'v1'
    }
  })
}

export function updateRobot(roomId, robot) {
  return request({
    url: '/robots/' + roomId,
    method: 'put',
    headers: {
      'api-version': 'v1'
    },
    data: robot
  })
}

export function startRobot(roomId) {
  return request({
    url: '/robots/' + roomId + '/start',
    method: 'post',
    headers: {
      'api-version': 'v1'
    }
  })
}
export function restartRobot(roomId) {
  return request({
    url: '/robots/' + roomId + '/restart',
    method: 'post',
    headers: {
      'api-version': 'v1'
    }
  })
}

export function stopRobot(roomId) {
  return request({
    url: '/robots/' + roomId + '/stop',
    method: 'post',
    headers: {
      'api-version': 'v1'
    }
  })
}

export function clearRoomMoney(roomId, data) {
  return request({
    url: '/robots/' + roomId + '/money/clear',
    method: 'patch',
    headers: {
      'api-version': 'v1'
    },
    data: data
  })
}

export function getRobotsByQry(roomId) {
  return request({
    url: '/robots/' + roomId,
    method: 'get',
    headers: {
      'api-version': 'v2'
    }
  })
}

export function addRobot(robot) {
  return request({
    url: '/robots/add',
    method: 'post',
    headers: {
      'api-version': 'v2'
    },
    data: robot
  })
}

export function resetRobot(robot) {
  return request({
    url: '/robots/reset',
    method: 'put',
    headers: {
      'api-version': 'v2'
    },
    data: robot
  })
}

export function deleteRobot(robot) {
  return request({
    url: '/robots/delete',
    method: 'delete',
    headers: {
      'api-version': 'v2'
    },
    data: robot
  })
}

export function getRobotConfigByQry(roomId) {
  return request({
    url: '/robots/' + roomId + '/config',
    method: 'get',
    headers: {
      'api-version': 'v2'
    }
  })
}

export function updateRobotConfig(data) {
  return request({
    url: '/robots/' + data.roomId + '/config',
    method: 'put',
    headers: {
      'api-version': 'v2'
    },
    data: data
  })
}

export function listRobotControl(data) {
  return request({
    url: '/robots/listRobotControl',
    method: 'post',
    headers: {
      'api-version': 'v1'
    },
    data: data
  })
}

export function saveRobotControl(data) {
  return request({
    url: '/robots/saveRobotControl',
    method: 'post',
    headers: {
      'api-version': 'v2'
    },
    data: data
  })
}

export function updateRobotControl(data) {
  return request({
    url: '/robots/updateRobotControl',
    method: 'put',
    headers: {
      'api-version': 'v2'
    },
    data: data
  })
}

export function deleteRobotControl(id) {
  return request({
    url: '/robots/deleteRobotControl/' + id,
    method: 'delete',
    headers: {
      'api-version': 'v2'
    }
  })
}
