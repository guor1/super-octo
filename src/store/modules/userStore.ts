import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'
import { doLogin } from '~/api/ums/user'
import type { LoginReq } from '~/types/model/user'

export const useUserStore = defineStore('userStore', () => {
  const storageToken = useStorage('x-token', '')

  const userState = reactive({
    userInfo: null,
    token: storageToken,
    roleList: [],
    userInit: false,
  })

  const handleLogin = async (params: LoginReq) => {
    return doLogin(params).then(({ data }) => {
      userState.token = data.tokenValue
      storageToken.value = data.tokenValue
    })
  }

  function isLogin() {
    return userState.token !== ''
  }

  function needFetchUserInfo() {
    return userState.userInfo === null
  }

  function fetchUserInfo() {

  }

  return {
    userState, handleLogin, isLogin, needFetchUserInfo, fetchUserInfo,
  }
})
