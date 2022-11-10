import { menus } from '~/config/menus'
import type { AppMenuRecordRaw } from '~/types'

export function useMenu() {
  // 导航菜单
  const menuRef = ref<AppMenuRecordRaw[]>(menus)
  // 子菜单
  const subMenuRef = ref<AppMenuRecordRaw[]>()
  // 活动的导航
  const activeNavMenu = ref('')

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

  return {
    menuRef, subMenuRef, activeNavMenu, isActiveNavMenu, handleNavClick,
  }
}
