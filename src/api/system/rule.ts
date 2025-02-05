import type { components, operations } from '#/openapi'
import { client } from '@/utils'

export type RuleInfo = components['schemas']['RuleEntity']
export type SearchParams = operations['RuleController_findAll']['parameters']['query']

// 获取规则列表
export function getRuleList(query?: SearchParams) {
  return client.GET('/api/system/rule', { params: { query } })
}
// 创建规则
export function createRule(body: components['schemas']['CreateRuleDto']) {
  return client.POST('/api/system/rule', { body })
}
// 获取单个规则详情
export function getRuleDetail(id: number) {
  return client.GET('/api/system/rule/{id}', { params: { path: { id } } })
}
// 更新规则
export function updateRule(body: components['schemas']['UpdateRuleDto']) {
  return client.PATCH('/api/system/rule/{id}', { body, params: { path: { id: body.id } } })
}
// 删除规则
export function deleteRule(id: number) {
  return client.DELETE('/api/system/rule/{id}', { params: { path: { id } } })
}

// 上传规则文件
export function uploadRuleFile(body: any) {
  // console.log(body);
  return client.POST('/api/system/rule/upload', { body })
}
