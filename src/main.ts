/* eslint-disable no-console */
// register vue composition api globally
import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { setupLayouts } from 'virtual:generated-layouts'
import App from './App.vue'
import router from './router'
import type { AppContext, UserModule } from '~/types'
// import createRouteGuard from './guard'
import generatedRoutes from '~pages'

// normalize.css
// import '@unocss/reset/normalize.css'
// reset.css by Eric Meyer https://meyerweb.com/eric/tools/css/reset/index.html
// import '@unocss/reset/eric-meyer.css'
// preflights from tailwind
// import '@unocss/reset/tailwind.css'
import 'uno.css'

(async () => {
// 创建应用
  const app = createApp(App)

  // const routes = setupLayouts(generatedRoutes)

  // const router = createRouter({
  // history: createWebHistory(import.meta.env.BASE_URL),
  // routes,
  // })
  // 插件
  const context: AppContext = { app, router }
  Object.values(import.meta.glob<{ install: UserModule }>('./plugins/*.ts', { eager: true })).map(i => i.install?.(context))

  console.log('mount1')
  app.mount('#app', true)
  await router.isReady()
  console.log('mount2')
})()
