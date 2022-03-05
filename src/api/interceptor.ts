import type { AxiosRequestConfig, AxiosResponse } from 'axios'
import axios from 'axios'
import { ElMessage, ElMessageBox } from 'element-plus'
import { useUserStore } from '~/stores'

export interface HttpResponse<T = unknown> {
  status: number
  msg: string
  code: number
  data: T
}

axios.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    return config
  },
  (error) => {
    // do something
    return Promise.reject(error)
  },
)
// add response interceptors
axios.interceptors.response.use(
  (response: AxiosResponse<HttpResponse>) => {
    const res = response.data
    // if the custom code is not 20000, it is judged as an error.
    if (res.code !== 20000) {
      ElMessage({
        type: 'error',
        message: res.msg || 'Error',
        duration: 5 * 1000,
      })
      // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
      if (
        [50008, 50012, 50014].includes(res.code)
        && response.config.url !== '/api/user/info'
      ) {
        ElMessageBox.confirm(
          'You have been logged out, you can cancel to stay on this page, or log in again',
          'Confirm logout',
          {
            confirmButtonText: 'Re-Login',
            cancelButtonText: 'Cancel',
            type: 'error',
          },
        ).then(() => {
          const userStore = useUserStore()
          userStore.logout()
          window.location.reload()
        })
      }
      return Promise.reject(new Error(res.msg || 'Error'))
    }
    return res
  },
  (error) => {
    ElMessage({
      type: 'error',
      message: error.msg,
      duration: 5 * 1000,
    })
    return Promise.reject(error)
  },
)
