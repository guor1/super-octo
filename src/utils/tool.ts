/*
 * @Descripttion: 工具集
 * @version: 1.1
 * @LastEditors: sakuya
 * @LastEditTime: 2021年7月20日10:58:41
 */
import CryptoJS from 'crypto-js'

const tool = {
  /* localStorage */
  data: {
    set(key: string, value: any) {
      const _set = JSON.stringify(value)
      return localStorage.setItem(key, _set)
    },
    get(key: string) {
      let data = localStorage.getItem(key) as string
      try {
        data = JSON.parse(data)
      }
      catch (err) {
        return null
      }
      return data
    },
    remove(key: string) {
      return localStorage.removeItem(key)
    },
    clear() {
      return localStorage.clear()
    },
  },

  /* sessionStorage */
  session: {
    set(key: string, value: any) {
      const _set = JSON.stringify(value)
      return sessionStorage.setItem(key, _set)
    },
    get(key: string) {
      let data = sessionStorage.getItem(key)
      try {
        data = JSON.parse(key)
      }
      catch (err) {
        return null
      }
      return data
    },
    remove(key: string) {
      return sessionStorage.removeItem(key)
    },
    clear() {
      return sessionStorage.clear()
    },
  },

  /* 复制对象 */
  objCopy(obj: any) {
    return JSON.parse(JSON.stringify(obj))
  },

  /* 日期格式化 */
  dateFormat(date: number | string | Date, fmt = 'yyyy-MM-dd hh:mm:ss') {
    date = new Date(date)
    const o = {
      'M+': date.getMonth() + 1, // 月份
      'd+': date.getDate(), // 日
      'h+': date.getHours(), // 小时
      'm+': date.getMinutes(), // 分
      's+': date.getSeconds(), // 秒
      'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
      'S': date.getMilliseconds(), // 毫秒
    }
    if (/(y+)/.test(fmt))
      fmt = fmt.replace(RegExp.$1, (`${date.getFullYear()}`).substr(4 - RegExp.$1.length))

    for (const k in o) {
      if (new RegExp(`(${k})`).test(fmt))
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : ((`00${o[k]}`).substr((`${o[k]}`).length)))
    }
    return fmt
  },

  /* 千分符 */
  groupSeparator(num: string|number) {
    num = `${num}`
    if (!num.includes('.'))
      num += '.'

    return num.replace(/(\d)(?=(\d{3})+\.)/g, ($0, $1) => {
      return `${$1},`
    }).replace(/\.$/, '')
  },

  /* 常用加解密 */
  crypto: {
    // MD5加密
    MD5(data: string) {
      return CryptoJS.MD5(data).toString()
    },
    // BASE64加解密
    BASE64: {
      encrypt(data: string) {
        return CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(data))
      },
      decrypt(cipher: string) {
        return CryptoJS.enc.Base64.parse(cipher).toString(CryptoJS.enc.Utf8)
      },
    },
    // AES加解密
    AES: {
      encrypt(data: string, secretKey: string) {
        const result = CryptoJS.AES.encrypt(data, CryptoJS.enc.Utf8.parse(secretKey), {
          mode: CryptoJS.mode.ECB,
          padding: CryptoJS.pad.Pkcs7,
        })
        return result.toString()
      },
      decrypt(cipher: string, secretKey: string) {
        const result = CryptoJS.AES.decrypt(cipher, CryptoJS.enc.Utf8.parse(secretKey), {
          mode: CryptoJS.mode.ECB,
          padding: CryptoJS.pad.Pkcs7,
        })
        return CryptoJS.enc.Utf8.stringify(result)
      },
    },
  },

  /* Fullscreen */
  screen(element: HTMLElement) {
    const isFull = !!document.fullscreenElement
    if (isFull) {
      if (document.exitFullscreen)
        document.exitFullscreen()
    }
    else {
      if (element.requestFullscreen)
        element.requestFullscreen()
    }
  },
}

export default tool
