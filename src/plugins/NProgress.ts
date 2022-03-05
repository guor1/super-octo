import type { LocationQueryRaw } from 'vue-router'
import NProgress from 'nprogress'
import type { UserModule } from '~/types'
import { isLogin } from '~/utils/auth'
import { useUserStore } from '~/stores'
import usePermission from '~/hooks/permission'

export const install: UserModule = ({ router }) => {
  router.beforeEach(async(to, from, next) => {
    NProgress.start()
    const userStore = useUserStore()
    async function crossroads() {
      const Permission = usePermission()
      if (Permission.accessRouter(to)) await next()
      else
        await next({ name: 'notFound' })

      NProgress.done()
    }
    if (isLogin()) {
      if (userStore.role) {
        crossroads()
      }
      else {
        try {
          await userStore.info()
          crossroads()
        }
        catch (error) {
          next({
            name: 'login',
            query: {
              redirect: to.name,
              ...to.query,
            } as LocationQueryRaw,
          })
          NProgress.done()
        }
      }
    }
    else {
      if (to.name === 'login') {
        next()
        NProgress.done()
        return
      }
      next({
        name: 'login',
        query: {
          redirect: to.name,
          ...to.query,
        } as LocationQueryRaw,
      })
      NProgress.done()
    }
  })
  router.afterEach(() => { NProgress.done() })
}
