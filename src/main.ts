// register vue composition api globally
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import type { AppContext, UserModule } from '~/types'

import 'uno.css'

(async () => {
  // 创建应用
  const app = createApp(App)
  // 路由
  app.use(router)
  // 插件
  const context: AppContext = { app, router }
  Object.values(import.meta.glob<{ install: UserModule }>('./plugins/*.ts', { eager: true })).forEach(i => i.install?.(context))

  await router.isReady()
  app.mount('#app', true)
})()
