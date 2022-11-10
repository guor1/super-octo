import { menus } from '~/config/menus'
import type { AppMenuRecordRaw } from '~/types'

export function useMenu() {
  // 导航菜单
  const menuRef = ref<AppMenuRecordRaw[]>(menus)
  // 子菜单
  const subMenuRef = ref<AppMenuRecordRaw[]>()
  // 激活的导航
  const activeNavMenu = ref()
  const activeMenuRef = ref()

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

  function checkRouteAccess(path: string) {
    for (const item of menus) {
      if (!item.children && item.path === path) {
        handleNavClick(item)
        break
      }
      const accessItem = item.children?.find(subItem => subItem.path === path)
      if (accessItem) {
        handleNavClick(item)
        activeMenuRef.value = accessItem.path
        break
      }
    }
  }

  return {
    menuRef, subMenuRef, activeMenuRef, isActiveNavMenu, handleNavClick, checkRouteAccess,
  }
}
