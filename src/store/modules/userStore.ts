import { defineStore } from 'pinia'
import type { LoginReq } from '~/types/model/user'
import { doLogin } from '~/api/ums/user'

export const useUserStore = defineStore('userStore', () => {
  const userState = reactive({
    userInfo: null,
    token: '',
    roleList: [],
  })

  const handleLogin = async (params: LoginReq) => {
    const { data } = await doLogin(params)

    userState.token = data.token
  }

  return {
    handleLogin,
  }
})
