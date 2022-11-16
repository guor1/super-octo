import { defineStore } from 'pinia'
import type { AppMenuRecordRaw } from '~/types'

export const useAppStore = defineStore('appStore', () => {
  // 导航菜单
  const navMenuRef = ref<AppMenuRecordRaw[]>([])
  // 子菜单
  const subMenuRef = ref<AppMenuRecordRaw[]>()
  // 激活的导航
  const activeNavMenuRef = ref()
  const activeSubMenuRef = ref()
  const activeMenuListRef = ref<AppMenuRecordRaw[]>()

  const isActiveNavMenu = (menuItem: AppMenuRecordRaw) => {
    return unref(activeNavMenuRef) === menuItem.path
  }

  const router = useRouter()
  // 切换导航事件
  function handleNavClick(menuItem: AppMenuRecordRaw) {
    activeNavMenuRef.value = menuItem.path

    if (menuItem.children) {
      subMenuRef.value = menuItem.children
    }
    else {
      subMenuRef.value = []
      router.push(menuItem.path)
    }
  }

  async function checkRouteAccess(path: string) {
    for (const item of navMenuRef.value) {
      if (!item.children && item.path === path) {
        handleNavClick(item)
        activeSubMenuRef.value = null
        activeMenuListRef.value = [item]
        break
      }
      const accessItem = item.children?.find(subItem => subItem.path === path)
      if (accessItem) {
        handleNavClick(item)
        activeSubMenuRef.value = accessItem.path
        activeMenuListRef.value = [item, accessItem]
        break
      }
    }
  }

  function setNavMenu(data: AppMenuRecordRaw[]) {
    navMenuRef.value = data
  }

  return {
    navMenuRef, subMenuRef, activeSubMenuRef, activeMenuListRef, isActiveNavMenu, handleNavClick, checkRouteAccess, setNavMenu,
  }
})
