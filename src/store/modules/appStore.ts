import { defineStore } from 'pinia'

export const useAppStore = defineStore('appStore', () => {
  const navMode = ref('vertical') // 导航模式
  const showFooter = ref(true) // 页脚
  const isPageAnimate = ref(true) // 是否开启路由动画
  const pageAnimateType = ref('zoom-fade') // 路由动画类型
  // 菜单是否折叠 toggle
  const menuIsCollapse = ref(false)

  function toggleCollapsed() {
    menuIsCollapse.value = !menuIsCollapse.value
  }

  return {
    navMode,
    showFooter,
    isPageAnimate,
    pageAnimateType,
    menuIsCollapse,
    toggleCollapsed,
  }
})
