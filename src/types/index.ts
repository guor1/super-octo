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
 export interface MenuRecord {
  path: string // 菜单路径
  name?: string // 菜单名，英文
  title: string // 菜单名称,中文
  icon?: string // 图标
  children?: Array<MenuRecord> // 子菜单
}