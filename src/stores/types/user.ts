import { acceptHMRUpdate, defineStore } from 'pinia'

interface BasicUserInfo {
  /**
   * 头像
   */
  avatar: string
  /**
   * 用户昵称
   */
  realName: string
  /**
   * 用户角色
   */
  roles?: string[]
  /**
   * 用户id
   */
  id: number
  /**
   * 用户名
   */
  username: string
}

interface UserState {
  /**
   * 用户信息
   */
  userInfo: BasicUserInfo
  /**
   * 用户token
   */
  token: string
}

export const useUserStore = defineStore('user-store', {
  state: (): UserState => ({

  }),
})

// 解决热更新问题
const hot = import.meta.hot
if (hot) {
  hot.accept(acceptHMRUpdate(useUserStore, hot))
}

export type { BasicUserInfo }
