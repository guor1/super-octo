import type { AxiosRequestConfig } from 'axios'
import { useRouter } from 'vue-router'
import axios from 'axios'
import { ElMessageBox, ElNotification } from 'element-plus'
import sysConfig from '~/config'
import { getToken } from '~/utils/auth'

axios.defaults.baseURL = ''
axios.defaults.timeout = sysConfig.TIMEOUT

// HTTP request 拦截器
axios.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    const token = getToken()
    if (token) {
      config.headers = {
        Authorization: sysConfig.TOKEN_PREFIX + token,
      }
    }

    if (!sysConfig.REQUEST_CACHE && config.method === 'get') {
      config.params = config.params || {}
      config.params._ = new Date().getTime()
    }
    Object.assign(config.headers, sysConfig.HEADERS)
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

// HTTP response 拦截器
axios.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    if (error.response) {
      if (error.response.status === 404) {
        ElNotification.error({
          title: '请求错误',
          message: 'Status:404，正在请求不存在的服务器记录！',
        })
      }
      else if (error.response.status === 500) {
        ElNotification.error({
          title: '请求错误',
          message: error.response.data.message || 'Status:500，服务器发生错误！',
        })
      }
      else if (error.response.status === 401) {
        ElMessageBox.confirm('当前用户已被登出或无权限访问当前资源，请尝试重新登录后再操作。', '无权限访问', {
          type: 'error',
          closeOnClickModal: false,
          center: true,
          confirmButtonText: '重新登录',
        }).then(() => {
          const router = useRouter()
          router.replace({ path: '/login' })
        }).catch(() => {})
      }
      else {
        ElNotification.error({
          title: '请求错误',
          message: error.response.data.message || `Status:${error.response.status}，未知错误！`,
        })
      }
    }
    else {
      ElNotification.error({
        title: '请求错误',
        message: '请求服务器无响应！',
      })
    }

    return Promise.reject(error.response)
  },
)

const http = {

  /**
   * get 请求
   */
  get(url: string, params = {}, config = {}) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'get',
        url,
        params,
        ...config,
      }).then((response) => {
        resolve(response.data)
      }).catch((error) => {
        reject(error)
      })
    })
  },

  /**
   * post 请求
   */
  post(url: string, data = {}, config = {}) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'post',
        url,
        data,
        ...config,
      }).then((response) => {
        resolve(response.data)
      }).catch((error) => {
        reject(error)
      })
    })
  },

  /**
   * put 请求
   */
  put(url: string, data = {}, config = {}) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'put',
        url,
        data,
        ...config,
      }).then((response) => {
        resolve(response.data)
      }).catch((error) => {
        reject(error)
      })
    })
  },

  /**
   * patch 请求
   */
  patch(url: string, data = {}, config = {}) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'patch',
        url,
        data,
        ...config,
      }).then((response) => {
        resolve(response.data)
      }).catch((error) => {
        reject(error)
      })
    })
  },

  /**
   * delete 请求
   */
  delete(url: string, data = {}, config = {}) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'delete',
        url,
        data,
        ...config,
      }).then((response) => {
        resolve(response.data)
      }).catch((error) => {
        reject(error)
      })
    })
  },

  /** jsonp 请求
   */
  // jsonp(url: string, name = 'jsonp') {
  //   return new Promise((resolve) => {
  //     const script = document.createElement('script')
  //     const _id = `jsonp${Math.ceil(Math.random() * 1000000)}`
  //     script.id = _id
  //     script.type = 'text/javascript'
  //     script.src = url
  //     window[name] = (response) => {
  //       resolve(response)
  //       document.getElementsByTagName('head')[0].removeChild(script)
  //       try {
  //         delete window[name]
  //       }
  //       catch (e) {
  //         window[name] = undefined
  //       }
  //     }
  //     document.getElementsByTagName('head')[0].appendChild(script)
  //   })
  // },
}

export default http
