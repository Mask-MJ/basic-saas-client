import type { components, operations } from '#/openapi'
import { client } from '@/utils'

export type FactoryInfo = components['schemas']['FactoryEntity']
export type SearchParams = operations['FactoryController_findAll']['parameters']['query']

// 获取工厂列表
export function getFactoryList(query?: SearchParams) {
  return client.GET('/api/project/factory', { params: { query } })
}
// 创建工厂
export function createFactory(body: components['schemas']['CreateFactoryDto']) {
  return client.POST('/api/project/factory', { body })
}
// 获取单个工厂信息
export function getFactoryDetail(id: number) {
  return client.GET('/api/project/factory/{id}', { params: { path: { id } } })
}
// 更新工厂
export function updateFactory(body: components['schemas']['UpdateFactoryDto']) {
  return client.PATCH('/api/project/factory/{id}', { body, params: { path: { id: body.id } } })
}
// 删除工厂
export function deleteFactory(id: number) {
  return client.DELETE('/api/project/factory/{id}', { params: { path: { id } } })
}
