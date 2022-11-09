import userMenu from './menu'

export default function useMenu() {
  const menus = ref(userMenu)
  // eslint-disable-next-line no-console
  console.log(menus.value)

  return {
    menus,
  }
}
