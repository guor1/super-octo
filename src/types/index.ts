import type { App } from 'vue'
import type { Router } from 'vue-router'

// 上下文
export interface AppContext {
  app: App<Element>
  router: Router
}

export type UserModule = (ctx: AppContext) => void
