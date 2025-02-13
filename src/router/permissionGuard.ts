import type { Router } from 'vue-router'
import { preferences } from '@/config/preferences'
import { useNProgress } from '@vueuse/integrations/useNProgress'
/**
 * 通用守卫配置
 * @param router
 */
function setupCommonGuard(router: Router) {
  // 记录已经加载的页面
  const loadedPaths = new Set<string>()
  const { isLoading } = useNProgress()
  router.beforeEach(async (to) => {
    to.meta.loaded = loadedPaths.has(to.path)

    // 页面加载进度条
    if (!to.meta.loaded && preferences.transition.progress) {
      isLoading.value = true
    }
    return true
  })

  router.afterEach((to) => {
    // 记录页面是否加载,如果已经加载，后续的页面切换动画等效果不在重复执行

    loadedPaths.add(to.path)

    // 关闭页面加载进度条
    if (preferences.transition.progress) {
      isLoading.value = false
    }
  })
}

export { setupCommonGuard }
