import NProgress from 'nprogress'
import type { UserModule } from '~/types'

export const install: UserModule = ({ router }) => {
  router.beforeEach(() => {
    NProgress.start()
    // 1.没登录总是跳转登录页
    // 2.登录了但是没有加载用户信息，则加载用户信息
  })
  router.afterEach(() => { NProgress.done() })
}
