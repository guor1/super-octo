import NProgress from 'nprogress'
import type { Router } from 'vue-router'

/**
 * 切换页面进度条
 */
export function setupProgressGuard(router: Router) {
  router.beforeEach(() => { NProgress.start() })
  router.afterEach(() => { NProgress.done() })
}
