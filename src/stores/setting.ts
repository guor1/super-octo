import { defineStore } from 'pinia'

interface SettingState {
  collapsed: boolean // 菜单是否折叠
  navMode: string // 导航模式
  showFooter: boolean // 页脚
  isPageAnimate: boolean // 是否开启路由动画
  pageAnimateType: string // 路由动画类型
}

export const useSettingStore = defineStore({
  id: 'setting',
  state: (): SettingState => ({
    collapsed: false,
    navMode: 'vertical',
    showFooter: true,
    isPageAnimate: true,
    pageAnimateType: 'zoom-fade',
  }),
  getters: {
    isCollapsed (): boolean {
      return this.collapsed
    },
    getNavMode (): string {
      return this.navMode
    },
  },
})
