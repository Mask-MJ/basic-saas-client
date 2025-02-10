import type { components } from '#/openapi'

import type { RouteRecordRaw } from 'vue-router'

import type { MenuRecordRaw } from '../types/menu'
import type { UserInfo } from './user'
import { getUserInfoApi, login } from '@/api/system/user'
import { DEFAULT_HOME_PATH } from '@/config/constants'
import { $t } from '@/locales'
import { acceptHMRUpdate, defineStore } from 'pinia'

type AccessToken = null | string

interface AccessState {
  /**
   * 权限码
   */
  accessCodes: string[]
  /**
   * 可访问的菜单列表
   */
  accessMenus: MenuRecordRaw[]
  /**
   * 可访问的路由列表
   */
  accessRoutes: RouteRecordRaw[]
  /**
   * 登录 accessToken
   */
  accessToken: AccessToken
  /**
   * 是否已经检查过权限
   */
  isAccessChecked: boolean
  /**
   * 登录是否过期
   */
  loginExpired: boolean
  /**
   * 登录 accessToken
   */
  refreshToken: AccessToken
  /**
   * 登录中
   */
  loginLoading: boolean
}

/**
 * @zh_CN 访问权限相关
 */
export const useAccessStore = defineStore('core-access', {
  state: (): AccessState => ({
    accessCodes: [],
    accessMenus: [],
    accessRoutes: [],
    accessToken: null,
    isAccessChecked: false,
    loginExpired: false,
    refreshToken: null,
    loginLoading: false,
  }),
  actions: {
    getMenuByPath(path: string) {
      function findMenu(
        menus: MenuRecordRaw[],
        path: string,
      ): MenuRecordRaw | undefined {
        for (const menu of menus) {
          if (menu.path === path) {
            return menu
          }
          if (menu.children) {
            const matched = findMenu(menu.children, path)
            if (matched) {
              return matched
            }
          }
        }
      }
      return findMenu(this.accessMenus, path)
    },
    setAccessCodes(codes: string[]) {
      this.accessCodes = codes
    },
    setAccessMenus(menus: MenuRecordRaw[]) {
      this.accessMenus = menus
    },
    setAccessRoutes(routes: RouteRecordRaw[]) {
      this.accessRoutes = routes
    },
    setAccessToken(token: AccessToken) {
      this.accessToken = token
    },
    setIsAccessChecked(isAccessChecked: boolean) {
      this.isAccessChecked = isAccessChecked
    },
    setLoginExpired(loginExpired: boolean) {
      this.loginExpired = loginExpired
    },
    setRefreshToken(token: AccessToken) {
      this.refreshToken = token
    },
    /**
     * 异步处理登录操作
     * Asynchronously handle the login process
     * @param params 登录表单数据
     */
    async authLogin(params: components['schemas']['SignInDto'], onSuccess?: () => Promise<void> | void) {
      const userStore = useUserStore()
      const router = useRouter()
      // 异步处理用户登录操作并获取 accessToken
      let userInfo: null | UserInfo = null
      try {
        this.loginLoading = true
        const { data } = await login(params)
        // 如果成功获取到 accessToken
        if (data && data.accessToken) {
          // 将 accessToken 存储到 accessStore 中
          this.setAccessToken(data.accessToken)

          // 获取用户信息并存储到 accessStore 中
          const [fetchUserInfoResult, accessCodes] = await Promise.all([
            this.fetchUserInfo(),
            getAccessCodesApi(),
          ])

          userInfo = fetchUserInfoResult

          userStore.setUserInfo(userInfo)
          this.setAccessCodes(accessCodes)

          if (this.loginExpired) {
            this.setLoginExpired(false)
          }
          else {
            onSuccess
              ? await onSuccess?.()
              : await router.push(userInfo?.homePath || DEFAULT_HOME_PATH)
          }

          if (userInfo?.nickname) {
            window.$notification.success({
              content: $t('authentication.loginSuccess'),
              description: `${$t('authentication.loginSuccessDesc')}:${userInfo?.nickname}`,
              duration: 3000,
            })
          }
        }
      }
      finally {
        this.loginLoading = false
      }

      return {
        userInfo,
      }
    },
    async  fetchUserInfo() {
      const userStore = useUserStore()
      // let userInfo: null | UserInfo = null
      const { data } = await getUserInfoApi()
      if (!data) {
        return null
      }
      userStore.setUserInfo(data)
      return data
    },
  },
  persist: {
    // 持久化
    pick: ['accessToken', 'refreshToken', 'accessCodes'],
  },
})

// 解决热更新问题
const hot = import.meta.hot
if (hot) {
  hot.accept(acceptHMRUpdate(useAccessStore, hot))
}
