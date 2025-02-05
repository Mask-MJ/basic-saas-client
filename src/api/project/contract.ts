import type { components, operations } from '#/openapi'
import { client } from '@/utils'

export type ContractInfo = components['schemas']['ContractEntity']
export type SearchParams = operations['ContractController_findAll']['parameters']['query']

// 获取合同列表
export function getContractList(query?: SearchParams) {
  return client.GET('/api/project/contract', { params: { query } })
}
// 创建合同
export function createContract(body: components['schemas']['CreateContractDto']) {
  return client.POST('/api/project/contract', { body })
}
// 获取单个合同信息
export function getContractDetail(id: number) {
  return client.GET('/api/project/contract/{id}', { params: { path: { id } } })
}
// 更新合同
export function updateContract(body: components['schemas']['UpdateContractDto']) {
  return client.PATCH('/api/project/contract/{id}', { body, params: { path: { id: body.id } } })
}
// 删除合同
export function deleteContract(id: number) {
  return client.DELETE('/api/project/contract/{id}', { params: { path: { id } } })
}
