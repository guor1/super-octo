// register vue composition api globally
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/display.css'

import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import generatedRoutes from 'virtual:generated-pages'
import { setupLayouts } from 'virtual:generated-layouts'
import i18n from './locales'
import App from './App.vue'

// windicss layers
import 'virtual:windi-base.css'
import 'virtual:windi-components.css'
import 'virtual:windi-utilities.css'

(async () => {
  // 创建应用
  const app = createApp(App)

  // 创建路由
  const routes = setupLayouts(generatedRoutes)
  const router = createRouter({
    history: createWebHistory(),
    routes,
  })

  const context = {
    app,
    router,
  }
  // 安装插件
  Object.values(import.meta.globEager('./plugins/*.js')).map(i => i.install?.(context))

  app.use(router)
  app.use(ElementPlus)
  app.use(i18n)

  await router.isReady()
  app.mount('#app', true)
})()
