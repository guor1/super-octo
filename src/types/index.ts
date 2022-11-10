import type { App } from 'vue'
import type { Router } from 'vue-router'

// 上下文
export interface AppContext {
  app: App<Element>
  router: Router
}

export type UserModule = (ctx: AppContext) => void

/**
 * 菜单定义
 */
export interface AppMenuRecordRaw {
  path: string // 菜单路径
  title: string // 菜单名称
  icon?: string // 图标
  children?: AppMenuRecordRaw[] // 子菜单
}
