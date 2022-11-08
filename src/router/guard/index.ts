import type { Router } from 'vue-router'
import setupUserLoginInfoGuard from './userLoginInfo'

// function setupPageGuard(router: Router) {
//   router.beforeEach(async(to) => {
//   })
// }

export default function createRouteGuard(router: Router) {
  // setupPageGuard(router)
  setupUserLoginInfoGuard(router)
}
