import menus from './menu'

/**
 * 后台菜单，只支持2级菜单
 */
export default function useMenu() {
  const menuList = ref(menus)
  // eslint-disable-next-line no-console
  console.log(menuList.value)
  menus.forEach((i ,item) => { item})

  //导航菜单
  const navs = ref(0)
  const activeNav = ref('')
  //子菜单
  // const menus = ref(0)


  return {
    menus,
  }
}
