import http from '~/utils/request'
import config from '~/config'
import type { UserModule } from '~/types'

export const install: UserModule = ({ app }) => {
  // 挂载全局对象
  app.config.globalProperties.$CONFIG = config
  app.config.globalProperties.$HTTP = http
  // app.config.globalProperties.$API = api
  // 全局代码错误捕捉
  // app.config.errorHandler = errorHandler
}
