import type { UserInfo } from './user'
import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, describe, expect, it } from 'vitest'

import { useUserStore } from './user'

describe('useUserStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('returns correct user info', () => {
    const store = useUserStore()
    const userInfo: UserInfo = {
      name: 'test',
      isAdmin: true,
      account: 'admin',
      email: '',
      phoneNumber: '',
      roles: [{ id: 1, name: 'admin', value: 'admin', sort: 1 }],
      id: 1,
      avatar: 'test',
      username: 'test',
      nickname: 'test',
      sex: 1,
      status: true,
      remark: '',
    }
    store.setUserInfo(userInfo)
    expect(store.userInfo).toEqual(userInfo)
  })

  // 测试重置用户信息时的行为
  it('reset user info', () => {
    const store = useUserStore()
    const userInfo = { name: 'test', roles: ['admin'], id: 1, avatar: 'test', username: 'test', nickname: 'test' }
    store.setUserInfo(userInfo)
    expect(store.userInfo).toBeNull()
    expect(store.userRoles.length).toBeGreaterThan(0)
  })

  // 测试在没有用户角色时返回空数组
  it('returns an empty array for userRoles if not set', () => {
    const store = useUserStore()
    expect(store.userRoles).toEqual([])
  })
})
