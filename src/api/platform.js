/**
 *
 * @Author: ozygod
 * @Date: 2018/9/19
 */
import request from '@/utils/request'

export function getPlatformOverview() {
  return request({
    url: '/platform/overview',
    method: 'get',
    headers: {
      'api-version': 'v1'
    }
  })
}

export function getComplexRechargeCountByQry(query) {
  return request({
    url: '/platform/rechargeCount',
    method: 'post',
    headers: {
      'api-version': 'v1'
    },
    data: query
  })
}

export function listRecentDaysRechargeCountByQry(query) {
  return request({
    url: '/platform/rechargeCount/recent',
    method: 'post',
    headers: {
      'api-version': 'v1'
    },
    data: query
  })
}

export function listDailyPlayersCountByQry(query) {
  return request({
    url: '/platform/playersCount',
    method: 'post',
    headers: {
      'api-version': 'v1'
    },
    data: query
  })
}

export function listDailyGoldCountByQry(query) {
  return request({
    url: '/platform/goldCount',
    method: 'post',
    headers: {
      'api-version': 'v1'
    },
    data: query
  })
}

export function getDailyGoldCountSumByQry(query) {
  return request({
    url: '/platform/goldCount/sum',
    method: 'post',
    headers: {
      'api-version': 'v1'
    },
    data: query
  })
}

export function listDailyGameTaxGoldCountByQry(query) {
  return request({
    url: '/platform/game/taxGoldCount',
    method: 'post',
    headers: {
      'api-version': 'v1'
    },
    data: query
  })
}

export function listDailyRegAliveCountByQry(query) {
  return request({
    url: '/platform/regAliveCount',
    method: 'post',
    headers: {
      'api-version': 'v1'
    },
    data: query
  })
}

export function listAppChannelType() {
  return request({
    url: '/platform/channel/types',
    method: 'get',
    headers: {
      'api-version': 'v1'
    }
  })
}

export function listNoticeByQry(query) {
  return request({
    url: '/platform/notices',
    method: 'post',
    headers: {
      'api-version': 'v1'
    },
    data: query
  })
}

export function publishNotice(noticeId, managerId) {
  return request({
    url: '/platform/notices/' + noticeId + '/publish',
    method: 'post',
    headers: {
      'api-version': 'v1'
    },
    data: {
      managerId
    }
  })
}

export function unpublishNotice(noticeId, managerId) {
  return request({
    url: '/platform/notices/' + noticeId + '/unpublish',
    method: 'post',
    headers: {
      'api-version': 'v1'
    },
    data: {
      managerId
    }
  })
}

export function deleteNotice(noticeId) {
  return request({
    url: '/platform/notices/' + noticeId,
    method: 'delete',
    headers: {
      'api-version': 'v1'
    }
  })
}

export function createNotice(data) {
  return request({
    url: '/platform/notices/create',
    method: 'post',
    headers: {
      'api-version': 'v1'
    },
    data: data
  })
}

export function listVipChannelByQry(query) {
  return request({
    url: '/platform/vipChannel/query',
    method: 'post',
    headers: {
      'api-version': 'v1'
    },
    data: query
  })
}

export function saveVipChannel(data) {
  return request({
    url: '/platform/vipChannel/new',
    method: 'post',
    headers: {
      'api-version': 'v1'
    },
    data: data
  })
}

export function updateVipChannel(data) {
  return request({
    url: '/platform/vipChannel/modify',
    method: 'patch',
    headers: {
      'api-version': 'v1'
    },
    data: data
  })
}

export function saveSysConfigs(data) {
  return request({
    url: '/platform/sysConfigs/add',
    method: 'post',
    headers: {
      'api-version': 'v1'
    },
    data: data
  })
}

export function listSysConfigsByQry(query) {
  return request({
    url: '/platform/sysConfigs/query',
    method: 'post',
    headers: {
      'api-version': 'v1'
    },
    data: query
  })
}

export function updateSysConfig(data) {
  return request({
    url: '/platform/sysConfigs/modify',
    method: 'patch',
    headers: {
      'api-version': 'v1'
    },
    data: data
  })
}

export function listGameWinningDetailByQry(query) {
  return request({
    url: '/platform/gameWinningDetail',
    method: 'post',
    headers: {
      'api-version': 'v1'
    },
    data: query
  })
}

export function listRechargeStatementByQry(query) {
  return request({
    url: '/platform/finance/statement/recharge',
    method: 'post',
    headers: {
      'api-version': 'v1'
    },
    data: query
  })
}

export function listWithdrawStatementByQry(query) {
  return request({
    url: '/platform/finance/statement/withdraw',
    method: 'post',
    headers: {
      'api-version': 'v1'
    },
    data: query
  })
}

export function saveSysDomain(data) {
  return request({
    url: '/platform/sysDomain/add',
    method: 'post',
    headers: {
      'api-version': 'v1'
    },
    data: data
  })
}

export function listSysDomainByQry(query) {
  return request({
    url: '/platform/sysDomain/query',
    method: 'post',
    headers: {
      'api-version': 'v1'
    },
    data: query
  })
}

export function updateSysDomain(data) {
  return request({
    url: '/platform/sysDomain/modify',
    method: 'patch',
    headers: {
      'api-version': 'v1'
    },
    data: data
  })
}

export function saveShareImage(data) {
  return request({
    url: '/platform/shareImage/add',
    method: 'post',
    headers: {
      'api-version': 'v1'
    },
    data: data
  })
}

export function listShareImageByQry(query) {
  return request({
    url: '/platform/shareImage/query',
    method: 'post',
    headers: {
      'api-version': 'v1'
    },
    data: query
  })
}

export function updateShareImage(data) {
  return request({
    url: '/platform/shareImage/modify',
    method: 'patch',
    headers: {
      'api-version': 'v1'
    },
    data: data
  })
}

export function uploadImage(data) {
  return request({
    url: '/api/files/upload/images',
    method: 'post',
    headers: {
      'api-version': 'v1',
      'content-type': 'multipart/form-data'
    },
    data: data
  })
}
