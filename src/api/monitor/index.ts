import type { operations } from '#/openapi'
import { client } from '@/utils'

export type LoginLogSearchParams = operations['LoginLogController_findAll']['parameters']['query']
export type OperationLogSearchParams =
  operations['OperationLogController_findAll']['parameters']['query']

// 获取登录日志列表
export function getLoginLogList(query?: LoginLogSearchParams) {
  return client.GET('/api/monitor/login-log', { params: { query } })
}
// 获取操作日志列表
export function getOperationLogList(query?: OperationLogSearchParams) {
  return client.GET('/api/monitor/operation-log', { params: { query } })
}
