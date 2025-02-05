import type { components, operations } from '#/openapi'
import { client } from '@/utils'

export type ValveInfo = components['schemas']['ValveEntity']
export type ValveRunInfo = components['schemas']['ValveRunInfoEntity']
export type SearchParams = operations['ValveController_findAll']['parameters']['query']
export type SearchValveHistoryParams =
  operations['ValveController_findAllHistoryDataList']['parameters']['query']

// 获取阀门列表
export function getValveList(query?: SearchParams) {
  return client.GET('/api/project/valve', { params: { query } })
}
// 创建阀门
export function createValve(body: components['schemas']['CreateValveDto']) {
  return client.POST('/api/project/valve', { body })
}
// 获取单个阀门信息
export function getValveDetail(id: number) {
  return client.GET('/api/project/valve/{id}', { params: { path: { id } } })
}
// 更新阀门
export function updateValve(body: components['schemas']['UpdateValveDto']) {
  return client.PATCH('/api/project/valve/{id}', { body, params: { path: { id: body.id } } })
}
// 删除阀门
export function deleteValve(id: number) {
  return client.DELETE('/api/project/valve/{id}', { params: { path: { id } } })
}

// 获取阀门运行数据
export function getValveRunInfo(id: number) {
  return client.GET('/api/project/valve/run-info/{id}', { params: { path: { id } } })
}
// 获取阀门历史数据
export function getValveHistoryList(query: SearchValveHistoryParams) {
  return client.GET('/api/project/valve/history', { params: { query } })
}
// 获取单个阀门历史数据
export function getValveHistoryDetail(id: number) {
  return client.GET('/api/project/valve/history/{id}', { params: { path: { id } } })
}
// 获取阀门健康评分
export function getValveScore(id: number) {
  return client.GET('/api/project/valve/score/{id}', { params: { path: { id } } })
}
