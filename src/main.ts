// register vue composition api globally
import { createApp } from 'vue'
import App from './App.vue'
import type { AppContext, UserModule } from '~/types'
import router from '~/router'

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
  // 插件
  const context: AppContext = { app, router }
  Object.values(import.meta.glob<{ install: UserModule }>('./plugins/*.ts', { eager: true })).map(i => i.install?.(context))

  await router.isReady()
  app.mount('#app', true)
})()
