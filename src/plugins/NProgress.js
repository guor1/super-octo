import NProgress from 'nprogress'
import config from '~/config'
import tool from '~/utils/tool'

// 设置标题
document.title = config.APP_NAME
// no redirect whitelist
const whiteList = ['/login']
const dev = true

export const install = ({ router }) => {
  router.beforeEach(async(to, from, next) => {
    NProgress.start()
    if (dev) {
      next()
    }
    else {
    // 动态标题
      document.title = to.meta.title ? `${to.meta.title} - ${config.APP_NAME}` : `${config.APP_NAME}`
      const token = tool.data.get('TOKEN')
      if (token) {
        if (to.path === '/login') {
        // if is logged in, redirect to the home page
          next({ path: '/' })
          NProgress.done()
        }
      }
      else {
      /* has no token */
        if (whiteList.includes(to.path)) {
        // in the free login whitelist, go directly
          next()
        }
        else {
        // other pages that do not have permission to access are redirected to the login page.
          next(`/login?redirect=${to.path}`)
          NProgress.done()
        }
      }
    }
  })
  router.afterEach(() => { NProgress.done() })
}
