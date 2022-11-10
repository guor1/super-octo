export function useSetting() {
  // 菜单是否折叠 toggle
  const menuIsCollapse = ref(false)

  function toggleCollapsed() {
    menuIsCollapse.value = !menuIsCollapse.value
  }

  return { menuIsCollapse, toggleCollapsed }
}
