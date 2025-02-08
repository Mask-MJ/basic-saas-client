import type { components } from '#/openapi'
import { acceptHMRUpdate, defineStore } from 'pinia'

export type BasicUserInfo = components['schemas']['UserEntity']

/** 用户信息 */
export interface UserInfo extends BasicUserInfo {
  /**
   * 用户描述
   */
  desc: string
  /**
   * 首页地址
   */
  homePath: string

  /**
   * accessToken
   */
  token: string
}

interface UserState {
  /**
   * 用户信息
   */
  userInfo: BasicUserInfo | null
  /**
   * 用户token
   */
  token: string
  /**
   * 用户角色
   */
  userRoles: string[]
}

export const useUserStore = defineStore('user-store', {
  state: (): UserState => ({
    userInfo: null,
    token: '',
    userRoles: [],
  }),
  actions: {
    setUserInfo(userInfo: UserState['userInfo']) {
      // 设置用户信息
      this.userInfo = userInfo
      // 设置角色信息
      const roles = userInfo?.roles.map(role => role.name) ?? []
      this.setUserRoles(roles)
    },
    setUserRoles(roles: string[]) {
      this.userRoles = roles
    },
  },
})

// 解决热更新问题
const hot = import.meta.hot
if (hot) {
  hot.accept(acceptHMRUpdate(useUserStore, hot))
}
