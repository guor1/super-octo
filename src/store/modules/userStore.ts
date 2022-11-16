import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'
import { doLogin } from '~/api/ums/user'
import { getMenuList } from '~/api/ums/menu'
import type { LoginReq } from '~/types/model/user'
import { useAppStore } from '~/store/modules/appStore'

export const useUserStore = defineStore('userStore', () => {
  const storageToken = useStorage('x-token', '')
  const userState = reactive({
    userInfo: null,
    token: storageToken,
    roleList: [],
    userInit: false,
  })
  const appStore = useAppStore()
  const { setNavMenu } = appStore

  const handleLogin = async (params: LoginReq) => {
    return doLogin(params).then(({ data }) => {
      userState.token = data.tokenValue
      storageToken.value = data.tokenValue
    })
  }

  function isLogin() {
    return userState.token !== ''
  }

  async function fetchUserInfo() {
    if (userState.userInit)
      return

    await getMenuList().then(({ data }) => {
      setNavMenu(data)
    })
    userState.userInit = true
  }

  return {
    userState, handleLogin, isLogin, fetchUserInfo,
  }
})
