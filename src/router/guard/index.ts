import type { Router } from 'vue-router'
import setupUserLoginInfoGuard from './userLoginInfo'

function setupPageGuard(router: Router) {
  router.beforeEach(async (to) => {
    // 路由切换通知
  })
}

export default function createRouteGuard(router: Router) {
  setupPageGuard(router)
  setupUserLoginInfoGuard(router)
}
