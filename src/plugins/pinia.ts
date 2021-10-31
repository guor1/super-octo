import { createPinia } from 'pinia'
import { UserModule } from '~/types'

// 挂载状态管理
// https://pinia.esm.dev/
export const install: UserModule = ({ app }) => {
  const pinia = createPinia()
  app.use(pinia)
}
