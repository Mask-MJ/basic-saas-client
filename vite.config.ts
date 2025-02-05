import path from 'node:path'
import process from 'node:process'
import { fileURLToPath, URL } from 'node:url'

import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite'
import { unheadVueComposablesImports } from '@unhead/vue'
import Vue from '@vitejs/plugin-vue'
import VueJsx from '@vitejs/plugin-vue-jsx'
import Unocss from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'
import { VueRouterAutoImports } from 'unplugin-vue-router'
import VueRouter from 'unplugin-vue-router/vite'
import { type ConfigEnv, defineConfig, loadEnv } from 'vite'
import Mkcert from 'vite-plugin-mkcert'
import VueDevTools from 'vite-plugin-vue-devtools'
import Layouts from 'vite-plugin-vue-layouts'

// https://vite.dev/config/
export default defineConfig((config: ConfigEnv) => {
  const { command, mode } = config
  const { VITE_BASE, VITE_PORT, VITE_PROXY } = loadEnv(mode, process.cwd())

  return {
    base: VITE_BASE,
    build: {
      chunkSizeWarningLimit: 2000,
      reportCompressedSize: false,
      sourcemap: false,
    },
    esbuild: {
      drop: command === 'build' ? ['console', 'debugger'] : [],
      legalComments: 'none',
    },
    server: {
      port: Number(VITE_PORT) || 3100,
      host: true,
      proxy: {
        '/api': {
          target: VITE_PROXY,
          changeOrigin: true,
          rewrite: path => path.replace(/^\/api/, ''),
        },
      },
    },
    plugins: [
      VueRouter({
        dts: './types/typed-router.d.ts',
        routesFolder: [{ src: 'src/views', path: '' }],
        // extensions: ['.page.vue'],
      }),
      Vue(),
      VueJsx(),
      VueDevTools(),
      Mkcert(),
      Unocss(),
      VueI18nPlugin({
        runtimeOnly: true,
        include: [path.resolve(process.cwd(), 'src/locales/lang/**')],
      }),
      Layouts(),
      AutoImport({
        imports: [
          'vue',
          'vue-i18n',
          VueRouterAutoImports,
          unheadVueComposablesImports,
          '@vueuse/core',
          { 'vue-router/auto': ['useLink'] },
          { 'naive-ui': ['useDialog', 'useMessage', 'useNotification', 'useLoadingBar'] },
        ],
        vueTemplate: true,
        dirs: ['src/stores', 'src/components/Common'],
        dts: 'types/auto-imports.d.ts',
      }),
      Components({ dts: 'types/components.d.ts', resolvers: [NaiveUiResolver()] }),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
        '#': fileURLToPath(new URL('./types', import.meta.url)),
      },
    },
  }
})
