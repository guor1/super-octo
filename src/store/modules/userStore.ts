import { defineStore } from 'pinia'
import type { LoginReq } from '~/types/model/user'
import { doLogin } from '~/api/ums/user'
import { useStorage } from '@vueuse/core'

export const useUserStore = defineStore('userStore', () => {
  const storageToken = useStorage('x-token', '')

  const userState = reactive({
    userInfo: null,
    token: storageToken,
    roleList: [],
  })

  const handleLogin = async (params: LoginReq) => {
    const { data } = await doLogin(params)

    userState.token = data.tokenValue
    storageToken.value = data.tokenValue
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
    userState, handleLogin, isLogin, needFetchUserInfo, fetchUserInfo
  }
})
