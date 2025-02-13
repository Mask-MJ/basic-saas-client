import type { App } from 'vue'

import { setupLayouts } from 'virtual:generated-layouts'
import { createRouter, createWebHistory } from 'vue-router'
import { routes } from 'vue-router/auto-routes'
import { setupCommonGuard } from './permissionGuard'

export const router = createRouter({
  history: createWebHistory(),
  routes: setupLayouts(routes),
  strict: true,
  scrollBehavior: () => ({ left: 0, top: 0 }),
})

export function initRouter(app: App) {
  app.use(router)
  setupCommonGuard(router)
}
