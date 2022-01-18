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
  name: string
  path: string
  meta: {
    title: string
    type?: string
    icon?: string
    hidden?: boolean
    role?: Array<string>
  }
  component?: string
  children?: Array<MenuItem>
}
