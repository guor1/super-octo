import VForm3 from 'vform3-builds' // 引入VForm3库
import 'vform3-builds/dist/designer.style.css' // 引入VForm3样式
import type { UserModule } from '~/types'

export const install: UserModule = ({ app }) => {
  app.use(VForm3) // 全局注册VForm3(同时注册了v-form-designe、v-form-render等组件)
}
