import type { AxiosRequestConfig, AxiosResponse } from 'axios'
import axios from 'axios'
import { ElNotification } from 'element-plus'
import sysConfig from '~/config'
import { useUserStore } from '~/store/modules/userStore'

// 创建实例
const instance = axios.create({
  baseURL: import.meta.env.BASE_URL,
  timeout: sysConfig.TIMEOUT,
  headers: { 'Content-Type': 'application/json' },
})

// HTTP request 拦截器
instance.interceptors.request.use((config: AxiosRequestConfig) => {
  const { userState } = useUserStore()
  const token = userState.token
  if (token)
    config.headers!.Authorization = sysConfig.TOKEN_PREFIX + token

  return config
}, (error) => {
  return Promise.reject(error)
})

// HTTP response 拦截器
instance.interceptors.response.use((response: AxiosResponse) => {
  const res = response.data
  if (res.code === -1) {
    ElNotification.error({
      title: '请求错误',
      message: res.msg || '错误',
    })
    return Promise.reject(new Error(res.msg || 'Error'))
  }
  return res
}, (error) => {
  return Promise.reject(error.response)
})

export default instance
