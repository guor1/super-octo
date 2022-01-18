import { defineStore } from 'pinia'
import config from '~/config'

export const useSettingStore = defineStore('setting', () => {
  const collapsed = ref(false) // 菜单是否折叠
  const navMode = ref('vertical') // 导航模式
  const showFooter = ref(true) // 页脚
  const isPageAnimate = ref(true) // 是否开启路由动画
  const pageAnimateType = ref('zoom-fade') // 路由动画类型
  // 移动端布局
  const isMobile = ref(false)
  // 布局
  const layout = ref(config.LAYOUT)
  // 菜单是否折叠 toggle
  const menuIsCollapse = ref(config.MENU_IS_COLLAPSE)
  // 多标签栏
  const layoutTags = ref(config.LAYOUT_TAGS)
  // 主题
  const theme = ref(config.THEME)

  function toggleCollapsed () {
    collapsed.value = !collapsed.value
  }

  return {
    collapsed,
    navMode,
    showFooter,
    isPageAnimate,
    pageAnimateType,
    isMobile,
    layout,
    menuIsCollapse,
    layoutTags,
    theme,
    toggleCollapsed,
  }
})
