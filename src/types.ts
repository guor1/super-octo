import type { App } from 'vue'
import type { Router } from 'vue-router'

export interface AppContext<HasRouter extends boolean = true> {
  app: App<Element>
  router: HasRouter extends true ? Router : undefined
}

export type UserModule = (ctx: AppContext) => void

/**
 * 菜单
 */
export interface MenuItem {
  name: String
  path: String
  meta: {
    title: String
    type?: String
    icon?: String
    hidden?: Boolean
    role?: Array<String>
  }
  component?: String
  children?: Array<MenuItem>
}
