import config from '~/config'
import http from '~/utils/request'

export default {
  menu: {
    myMenus: {
      url: `${config.API_URL}/system/menu/my/1.4.1`,
      name: '获取我的菜单',
      async get () {
        return await http.get(this.url)
      },
    },
    list: {
      url: `${config.API_URL}/system/menu/list`,
      name: '获取菜单',
      async get () {
        return await http.get(this.url)
      },
    },
  },
  dic: {
    tree: {
      url: `${config.API_URL}/system/dic/tree`,
      name: '获取字典树',
      async get () {
        return await http.get(this.url)
      },
    },
    list: {
      url: `${config.API_URL}/system/dic/list`,
      name: '字典明细',
      async get (params) {
        return await http.get(this.url, params)
      },
    },
    get: {
      url: `${config.API_URL}/system/dic/get`,
      name: '获取字典数据',
      async get (params) {
        return await http.get(this.url, params)
      },
    },
  },
  role: {
    list: {
      url: `${config.API_URL}/system/role/list`,
      name: '获取角色列表',
      async get (params) {
        return await http.get(this.url, params)
      },
    },
  },
  user: {
    list: {
      url: `${config.API_URL}/system/user/list`,
      name: '获取用户列表',
      async get (params) {
        return await http.get(this.url, params)
      },
    },
  },
  app: {
    list: {
      url: `${config.API_URL}/system/app/list`,
      name: '应用列表',
      async get () {
        return await http.get(this.url)
      },
    },
  },
  log: {
    list: {
      url: `${config.API_URL}/system/log/list`,
      name: '日志列表',
      async get (params) {
        return await http.get(this.url, params)
      },
    },
  },
  table: {
    list: {
      url: `${config.API_URL}/system/table/list`,
      name: '表格列管理列表',
      async get (params) {
        return await http.get(this.url, params)
      },
    },
    info: {
      url: `${config.API_URL}/system/table/info`,
      name: '表格列管理详情',
      async get (params) {
        return await http.get(this.url, params)
      },
    },
  },
}
