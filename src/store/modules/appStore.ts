import { defineStore } from 'pinia'
import { getMenuList } from '~/api/ums/menu'
import type { AppMenuRecordRaw } from '~/types'

export const useAppStore = defineStore('appStore', () => {
  // 导航菜单
  const menuRef = ref<AppMenuRecordRaw[]>([])
  getMenuList().then(({ data }) => {
    menuRef.value = data
  })
  // 子菜单
  const subMenuRef = ref<AppMenuRecordRaw[]>()
  // 激活的导航
  const activeNavMenu = ref()
  const activeMenuRef = ref()
  const matchedMenuItems = ref<AppMenuRecordRaw[]>()

  const isActiveNavMenu = (menuItem: AppMenuRecordRaw) => {
    return unref(activeNavMenu) === menuItem.path
  }

  const router = useRouter()
  // 切换导航事件
  function handleNavClick(menuItem: AppMenuRecordRaw) {
    activeNavMenu.value = menuItem.path

    if (menuItem.children) {
      subMenuRef.value = menuItem.children
    }
    else {
      subMenuRef.value = []
      router.push(menuItem.path)
    }
  }

  async function checkRouteAccess(path: string) {
    for (const item of menuRef.value) {
      if (!item.children && item.path === path) {
        handleNavClick(item)
        activeMenuRef.value = null
        matchedMenuItems.value = [item]
        break
      }
      const accessItem = item.children?.find(subItem => subItem.path === path)
      if (accessItem) {
        handleNavClick(item)
        activeMenuRef.value = accessItem.path
        matchedMenuItems.value = [item, accessItem]
        break
      }
    }
  }

  return {
    menuRef, subMenuRef, activeMenuRef, matchedMenuItems, isActiveNavMenu, handleNavClick, checkRouteAccess,
  }
})
