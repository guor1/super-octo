// register vue composition api globally
import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import generatedRoutes from 'virtual:generated-pages'
import { setupLayouts } from 'virtual:generated-layouts'
import type { AppContext } from './types'
import App from './App.vue'

// windicss layers
import 'virtual:windi-base.css'
import 'virtual:windi-components.css'
import './styles/main.css'
import 'virtual:windi-utilities.css'
import 'makeit-captcha/dist/captcha.min.css'

(async () => {
  // 创建应用
  const app = createApp(App)

  // 创建路由
  const routes = setupLayouts(generatedRoutes)
  const router = createRouter({
    history: createWebHistory(),
    routes,
  })

  const context: AppContext<true> = {
    app,
    router,
  }
  // 安装插件
  Object.values(import.meta.globEager('./plugins/*.ts')).map(i => i.install?.(context))

  app.use(router)

  await router.isReady()
  app.mount('#app', true)
})()
