import type { LocationQueryRaw, Router } from 'vue-router'
import { useUserStore } from '~/store/modules/userStore'

export default function setupUserLoginInfoGuard(router: Router) {
  router.beforeEach(async (to, from, next) => {
    const userStore = useUserStore()
    const { isLogin, needFetchUserInfo, fetchUserInfo } = userStore

    const toLoginPage = () => {
      next({
        path: '/login',
        query: {
          redirect: to.name,
          ...to.query,
        } as LocationQueryRaw,
      })
    }
    if (!isLogin()) { // 未登录则登录
      if (to.path === '/login') {
        next()
        return
      }
      toLoginPage()
      return
    }
    if (!needFetchUserInfo())
      next()

    try {
      await fetchUserInfo()
      next()
    }
    catch (error) {
      toLoginPage()
    }
  })
}
