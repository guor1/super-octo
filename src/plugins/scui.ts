import http from '~/utils/request'
import { permission, rolePermission } from '~/utils/permission'
import config from '~/config'
import api from '~/api'
import type { UserModule } from '~/types'

export const install: UserModule = ({ app }) => {
  // 挂载全局对象
  app.config.globalProperties.$CONFIG = config
  app.config.globalProperties.$HTTP = http
  app.config.globalProperties.$API = api
  app.config.globalProperties.$AUTH = permission
  app.config.globalProperties.$ROLE = rolePermission
  // 全局代码错误捕捉
  // app.config.errorHandler = errorHandler
}
