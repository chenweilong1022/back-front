/**
 *
 * @Author: ozygod
 * @Date: 2018-12-28
 */
import request from '@/utils/request'

export function listAgentRealtimeByQry(query) {
  return request({
    url: '/agent/realtime/query',
    method: 'post',
    headers: {
      'api-version': 'v1'
    },
    data: query
  })
}

export function listAgentRecordByQry(query) {
  return request({
    url: '/agent/record/query',
    method: 'post',
    headers: {
      'api-version': 'v1'
    },
    data: query
  })
}

export function listAgentRecordSummaryByQry(query) {
  return request({
    url: '/agent/record/list/summary',
    method: 'post',
    headers: {
      'api-version': 'v1'
    },
    data: query
  })
}

export function getAgentRecordSummary(query) {
  return request({
    url: '/agent/record/summary/query',
    method: 'post',
    headers: {
      'api-version': 'v1'
    },
    data: query
  })
}
