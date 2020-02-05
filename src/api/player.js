/**
 *
 * @Author: ozygod
 * @Date: 2018/9/14
 */
import request from '@/utils/request'

export function listBlackWhiteList(data) {
  return request({
    url: '/players/blackWhiteList/list',
    method: 'post',
    headers: {
      'api-version': 'v1'
    },
    data: data
  })
}

export function addBlackWhiteList(data) {
  return request({
    url: '/players/blackWhiteList',
    method: 'post',
    headers: {
      'api-version': 'v1'
    },
    data: data
  })
}

export function transformBlackWhiteList(data) {
  return request({
    url: '/players/blackWhiteList/transform',
    method: 'patch',
    headers: {
      'api-version': 'v1'
    },
    data: data
  })
}

export function deleteBlackWhiteList(listId) {
  return request({
    url: '/players/blackWhiteList/' + listId,
    method: 'delete',
    headers: {
      'api-version': 'v1'
    }
  })
}

export function listPlayerAccountByQry(query) {
  return request({
    url: '/players/query',
    method: 'post',
    headers: {
      'api-version': 'v1'
    },
    data: query
  })
}

export function giftMoney(data) {
  return request({
    url: '/players/giftMoney',
    method: 'post',
    headers: {
      'api-version': 'v1'
    },
    data: data
  })
}

export function setSaleRate(data) {
  return request({
    url: '/players/setSaleRate',
    method: 'post',
    headers: {
      'api-version': 'v1'
    },
    data: data
  })
}

export function setUpSpread(data) {
  return request({
    url: '/players/setUpSpread',
    method: 'post',
    headers: {
      'api-version': 'v1'
    },
    data: data
  })
}

export function updateOrder(data) {
  return request({
    url: '/players/order/modify',
    method: 'post',
    headers: {
      'api-version': 'v1'
    },
    data: data
  })
}

export function sendEmail(data) {
  return request({
    url: '/players/sendEmail',
    method: 'post',
    headers: {
      'api-version': 'v1'
    },
    data: data
  })
}

export function listOnlinePlayerQry(query) {
  return request({
    url: '/players/online/query',
    method: 'post',
    headers: {
      'api-version': 'v1'
    },
    data: query
  })
}

export function updatePlayerLuckyRatio(data) {
  return request({
    url: '/players/online/luckyRatio',
    method: 'put',
    headers: {
      'api-version': 'v1'
    },
    data: data
  })
}

export function listDebtPlayerQry(query) {
  return request({
    url: '/players/debt/query',
    method: 'post',
    headers: {
      'api-version': 'v1'
    },
    data: query
  })
}

export function listPlayerBankLogByQry(query) {
  return request({
    url: '/players/bank/query',
    method: 'post',
    headers: {
      'api-version': 'v1'
    },
    data: query
  })
}
export function listPlayerOrderByQry(query) {
  return request({
    url: '/players/order/query',
    method: 'post',
    headers: {
      'api-version': 'v1'
    },
    data: query
  })
}
export function listPlayerOnlineOrderByQry(query) {
  return request({
    url: '/players/order/online/query',
    method: 'post',
    headers: {
      'api-version': 'v1'
    },
    data: query
  })
}
export function listWithdrawOrderByQry(query) {
  return request({
    url: '/players/withdraw/query',
    method: 'post',
    headers: {
      'api-version': 'v1'
    },
    data: query
  })
}
export function updateWithdrawOrder(data) {
  return request({
    url: '/players/withdraw/modify',
    method: 'put',
    headers: {
      'api-version': 'v1'
    },
    data: data
  })
}
export function listPlayerGameLogByQry(query) {
  return request({
    url: '/players/gameLog/query',
    method: 'post',
    headers: {
      'api-version': 'v1'
    },
    data: query
  })
}

export function listPlayerDiamondLogByQry(query) {
  return request({
    url: '/players/diamondGameLog/query',
    method: 'post',
    headers: {
      'api-version': 'v1'
    },
    data: query
  })
}

export function getPlayerAccountById(playerId) {
  return request({
    url: '/players/' + playerId,
    method: 'get',
    headers: {
      'api-version': 'v1'
    }
  })
}

export function getPlayerAccountByShowId(showId) {
  return request({
    url: '/players/show/' + showId,
    method: 'get',
    headers: {
      'api-version': 'v1'
    }
  })
}

export function resetPlayerPassword(playerId, managerId) {
  return request({
    url: '/players/' + playerId + '/resetPassword',
    method: 'patch',
    headers: {
      'api-version': 'v1'
    },
    data: {
      managerId
    }
  })
}

export function resetPlayerBankPassword(playerId, managerId) {
  return request({
    url: '/players/' + playerId + '/bank/resetPassword',
    method: 'patch',
    headers: {
      'api-version': 'v1'
    },
    data: {
      managerId
    }
  })
}

export function listFreezeUserRecordById(playerId) {
  return request({
    url: '/players/' + playerId + '/freezeLog',
    method: 'get',
    headers: {
      'api-version': 'v1'
    }
  })
}

export function freezePlayer(playerId, data) {
  return request({
    url: '/players/' + playerId + '/freeze',
    method: 'patch',
    headers: {
      'api-version': 'v1'
    },
    data: data
  })
}

export function batchFreezePlayer(data) {
  return request({
    url: '/players/batchFreeze',
    method: 'patch',
    headers: {
      'api-version': 'v1'
    },
    data: data
  })
}

export function unfreezePlayer(playerId, data) {
  return request({
    url: '/players/' + playerId + '/unfreeze',
    method: 'patch',
    headers: {
      'api-version': 'v1'
    },
    data: data
  })
}

export function transferToSpread(data) {
  return request({
    url: '/players/' + data.playerId + '/transferToSpread',
    method: 'post',
    headers: {
      'api-version': 'v1'
    },
    data: data
  })
}

export function listPlayerGameRecordByQry(playerId) {
  return request({
    url: '/players/' + playerId + '/gameStatistics',
    method: 'get',
    headers: {
      'api-version': 'v1'
    }
  })
}

export function listPrivateGameStatisticsByQry(query) {
  return request({
    url: '/players/statistics/privateGame',
    method: 'post',
    headers: {
      'api-version': 'v1'
    },
    data: query
  })
}

export function listPlayerPrivateGameByQry(query) {
  return request({
    url: '/players/record/privateGame',
    method: 'post',
    headers: {
      'api-version': 'v1'
    },
    data: query
  })
}

export function listSameAddressPlayerById(playerId) {
  return request({
    url: '/players/' + playerId + '/sameAddress',
    method: 'get',
    headers: {
      'api-version': 'v1'
    }
  })
}

export function listPlayerWithdrawRecordByQry(query) {
  return request({
    url: '/players/withdraw',
    method: 'post',
    headers: {
      'api-version': 'v1'
    },
    data: query
  })
}

export function getTotalPlayerWithdrawRecordByQry(query) {
  return request({
    url: '/players/withdraw/total',
    method: 'post',
    headers: {
      'api-version': 'v1'
    },
    data: query
  })
}

export function listPlayerWealthRankByQry(query) {
  return request({
    url: '/players/wealthRank',
    method: 'post',
    headers: {
      'api-version': 'v1'
    },
    data: query
  })
}

export function remitGold(data) {
  return request({
    url: '/players/remitGold',
    method: 'post',
    headers: {
      'api-version': 'v1'
    },
    data: data
  })
}

export function listRemitGoldRecordByQry(query) {
  return request({
    url: '/players/remitGold/record',
    method: 'post',
    headers: {
      'api-version': 'v1'
    },
    data: query
  })
}

export function listRemitGoldRecordOnlineByQry(query) {
  return request({
    url: '/players/remitGold/online/record',
    method: 'post',
    headers: {
      'api-version': 'v1'
    },
    data: query
  })
}

export function getTotalRemitGoldByQry(query) {
  return request({
    url: '/players/remitGold/record/total',
    method: 'post',
    headers: {
      'api-version': 'v1'
    },
    data: query
  })
}

export function remitDiamond(data) {
  return request({
    url: '/players/remitDiamond',
    method: 'post',
    headers: {
      'api-version': 'v1'
    },
    data: data
  })
}

export function listRemitDiamondRecordByQry(query) {
  return request({
    url: '/players/remitDiamond/record',
    method: 'post',
    headers: {
      'api-version': 'v1'
    },
    data: query
  })
}

export function getTotalRemitDiamondByQry(query) {
  return request({
    url: '/players/remitDiamond/record/total',
    method: 'post',
    headers: {
      'api-version': 'v1'
    },
    data: query
  })
}

export function listUserGameDetailByQry(query) {
  return request({
    url: '/players/winningDetail',
    method: 'post',
    headers: {
      'api-version': 'v1'
    },
    data: query
  })
}
