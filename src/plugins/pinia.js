import { createPinia } from 'pinia'

// 挂载状态管理
// https://pinia.esm.dev/
export const install = ({ app }) => {
  const pinia = createPinia()
  app.use(pinia)
}
