import type { components, operations } from '#/openapi'
import { client } from '@/utils'

export type DeviceInfo = components['schemas']['CreateDeviceDto']
export type SearchParams = operations['DeviceController_findAll']['parameters']['query']

// 获取装置列表
export function getDeviceList(query?: SearchParams) {
  return client.GET('/api/project/device', { params: { query } })
}
// 创建装置
export function createDevice(body: components['schemas']['CreateDeviceDto']) {
  return client.POST('/api/project/device', { body })
}
// 获取单个装置信息
export function getDeviceDetail(id: number) {
  return client.GET('/api/project/device/{id}', { params: { path: { id } } })
}
// 更新装置
export function updateDevice(body: components['schemas']['UpdateDeviceDto']) {
  return client.PATCH('/api/project/device/{id}', { body, params: { path: { id: body.id } } })
}
// 删除装置
export function deleteDevice(id: number) {
  return client.DELETE('/api/project/device/{id}', { params: { path: { id } } })
}
