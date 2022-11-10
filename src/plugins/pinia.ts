import { createPinia } from 'pinia'
import type { UserModule } from '~/types'

// 挂载状态管理
export const install: UserModule = ({ app }) => {
  const pinia = createPinia()
  app.use(pinia)
}
