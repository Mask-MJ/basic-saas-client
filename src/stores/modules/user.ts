import type { MenuRecordRaw } from '@/config/types/menu'
import { getAccessCodesApi, getUserInfoApi, login, type SignInParams, type UserInfo } from '@/api/system/user'
import { DEFAULT_HOME_PATH } from '@/config/constants'
import { $t } from '@/locales'
import { acceptHMRUpdate, defineStore } from 'pinia'

interface UserState {
  /**
   * 用户信息
   */
  userInfo: UserInfo | null
  /**
   * 登录中
   */
  loginLoading: boolean
  /**
   * 用户角色
   */
  userRoles: string[]
  /**
   * 权限码
   */
  accessCodes: string[]
  /**
   * 可访问的菜单列表
   */
  accessMenus: MenuRecordRaw[]
  /**
   * 登录 accessToken
   */
  accessToken: string | null
  /**
   * 登录 refreshToken
   */
  refreshToken: string | null
}

export const useUserStore = defineStore('user-store', {
  state: (): UserState => ({
    userInfo: null,
    userRoles: [],
    loginLoading: false,
    accessCodes: [],
    accessMenus: [],
    accessToken: null,
    refreshToken: null,
  }),
  actions: {
    setUserInfo(userInfo: UserInfo) {
      // 设置用户信息
      this.userInfo = userInfo
      // 设置角色信息
      const roles = userInfo?.roles.map(role => role.name) ?? []
      this.setUserRoles(roles)
    },
    setUserRoles(roles: string[]) {
      this.userRoles = roles
    },
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
    setAccessToken(token: string) {
      this.accessToken = token
    },
    setRefreshToken(token: string) {
      this.refreshToken = token
    },
    /**
     * 异步处理登录操作
     * Asynchronously handle the login process
     * @param params 登录表单数据
     */
    async authLogin(params: SignInParams, onSuccess?: () => Promise<void> | void) {
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

          const { data: accessCodes = [] } = await getAccessCodesApi()

          userInfo = await this.fetchUserInfo()

          this.setAccessCodes(accessCodes)

          onSuccess
            ? await onSuccess?.()
            : await router.push(DEFAULT_HOME_PATH)

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
    async fetchUserInfo() {
      const userStore = useUserStore()
      const { data } = await getUserInfoApi()
      data && userStore.setUserInfo(data)
      return data || null
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
  hot.accept(acceptHMRUpdate(useUserStore, hot))
}
