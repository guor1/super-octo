import type { DirectiveBinding } from 'vue'
import { useUserStore } from '~/store/modules/userStore'

/**
 * 权限控制，没有权限则从页面删除元素
 */
function checkPermission(el: HTMLElement, binding: DirectiveBinding) {
  const { value } = binding
  const userStore = useUserStore()
  const { userState } = userStore

  if (Array.isArray(value)) {
    if (value.length > 0) {
      const permissionValues = value

      const hasPermission = permissionValues.includes(userState.roleList)
      if (!hasPermission && el.parentNode)
        el.parentNode.removeChild(el)
    }
  }
  else {
    throw new TypeError('need roles! Like v-permission="[\'admin\',\'user\']"')
  }
}

export default {
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    checkPermission(el, binding)
  },
  updated(el: HTMLElement, binding: DirectiveBinding) {
    checkPermission(el, binding)
  },
}
