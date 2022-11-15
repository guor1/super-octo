import NProgress from 'nprogress'
import type { UserModule } from '~/types'
import { useAppStore } from '~/store/modules/appStore'

export const install: UserModule = ({ router }) => {
  router.beforeEach(() => {
    NProgress.start()
    // 1.没登录总是跳转登录页
    // 2.登录了但是没有加载用户信息，则加载用户信息
  })
  router.afterEach(async (to) => {
    NProgress.done()
    const { checkRouteAccess } = useAppStore()
    checkRouteAccess(to.path)
  })
}
