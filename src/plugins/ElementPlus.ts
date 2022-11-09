import ElementPlus from 'element-plus'
import type { UserModule } from '~/types'
// 开发阶段用用
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/display.css'

export const install: UserModule = ({ app }) => {
  // eslint-disable-next-line no-console
  console.log(1)
  app.use(ElementPlus)
}
