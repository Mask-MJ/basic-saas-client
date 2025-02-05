import type { components, operations } from '#/openapi'
import { client } from '@/utils'

export type UnitInfo = components['schemas']['UnitEntity']
export type SearchParams = operations['UnitController_findAll']['parameters']['query']

// 获取单位列表
export function getUnitList(query?: SearchParams) {
  return client.GET('/api/system/unit', { params: { query } })
}
// 创建单位
export function createUnit(body: components['schemas']['CreateUnitDto']) {
  return client.POST('/api/system/unit', { body })
}
// 获取单个单位详情
export function getUnitDetail(id: number) {
  return client.GET('/api/system/unit/{id}', { params: { path: { id } } })
}
// 更新单位
export function updateUnit(body: components['schemas']['UpdateUnitDto']) {
  return client.PATCH('/api/system/unit/{id}', { body, params: { path: { id: body.id } } })
}
// 删除单位
export function deleteUnit(id: number) {
  return client.DELETE('/api/system/unit/{id}', { params: { path: { id } } })
}
