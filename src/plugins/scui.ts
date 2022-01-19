import auth from '~/directives/auth'
import role from '~/directives/role'
import time from '~/directives/time'
import copy from '~/directives/copy'
import http from '~/utils/request'
import { permission, rolePermission } from '~/utils/permission'
import config from '~/config'
import tool from '~/utils/tool'
import type { UserModule } from '~/types'

export const install: UserModule = ({ app }) => {
  // 挂载全局对象
  app.config.globalProperties.$CONFIG = config
  app.config.globalProperties.$TOOL = tool
  app.config.globalProperties.$HTTP = http
  // app.config.globalProperties.$API = api
  app.config.globalProperties.$AUTH = permission
  app.config.globalProperties.$ROLE = rolePermission

  // 注册全局指令
  app.directive('auth', auth)
  app.directive('role', role)
  app.directive('time', time)
  app.directive('copy', copy)
}
