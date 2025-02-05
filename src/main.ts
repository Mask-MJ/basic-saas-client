import { createApp } from 'vue'
import App from './App.vue'
import { initRouter } from './router'
import { initStores } from './stores'
import '@unocss/reset/normalize.css'

const app = createApp(App)

// 初始化全局状态管理
initStores(app)
// 初始化路由
initRouter(app)

app.mount('#app')
