import { defineStore } from 'pinia'

export const useSettingStore = defineStore('setting', () => {
  const collapsed = ref(false) // 菜单是否折叠
  const navMode = ref('vertical') // 导航模式
  const showFooter = ref(true) // 页脚
  const isPageAnimate = ref(true) // 是否开启路由动画
  const pageAnimateType = ref('zoom-fade') // 路由动画类型

  function toggleCollapsed () {
    collapsed.value = !collapsed.value
  }

  return { collapsed, navMode, showFooter, isPageAnimate, pageAnimateType, toggleCollapsed }
})
