import type { components, operations } from '#/openapi'
import { client } from '@/utils'

export type DeptInfo = components['schemas']['DeptEntity']
export type SearchParam = operations['DeptController_findAll']['parameters']['query']

// 获取部门列表
export function getDeptList(query?: SearchParam) {
  return client.GET('/api/system/dept', { params: { query } })
}
// 创建部门
export function createDept(body: components['schemas']['CreateDeptDto']) {
  return client.POST('/api/system/dept', { body })
}
// 获取单个部门详情
export function getDeptDetail(id: number) {
  return client.GET('/api/system/dept/{id}', { params: { path: { id } } })
}
// 更新部门
export function updateDept(body: components['schemas']['UpdateDeptDto']) {
  return client.PATCH('/api/system/dept/{id}', { body, params: { path: { id: body.id } } })
}
// 删除部门
export function deleteDept(id: number) {
  return client.DELETE('/api/system/dept/{id}', { params: { path: { id } } })
}
