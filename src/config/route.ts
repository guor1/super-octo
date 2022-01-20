// 静态路由配置
// 书写格式与动态路由格式一致，全部经由框架统一转换
// 比较动态路由在meta中多加入了role角色权限，为数组类型。一个菜单是否有权限显示，取决于它以及后代菜单是否有权限。
// routes 显示在左侧菜单中的路由(显示顺序在动态路由之前)
// 示例如下
import type { MenuItem } from '~/types'

export const userRoutes: Array<MenuItem> = [
  {
    name: 'home',
    path: '/home',
    meta: { title: '首页', icon: 'ep-eleme-filled', type: 'menu' },
    children: [
      {
        name: 'dashboard',
        path: '/home',
        meta: { title: '控制台', icon: 'ep-menu' },
        component: 'home',
      }, {
        name: 'userCenter',
        path: '/usercenter',
        meta: { title: '个人信息', icon: 'ep-user' },
        component: 'userCenter',
      }],
  },
  {
    name: 'vab',
    path: '/vab',
    meta: { title: '组件', icon: 'ep-takeaway-box', type: 'menu' },
    children: [{
      path: '/vab/directive',
      name: 'directive',
      meta: { title: '指令', icon: 'ep-price-tag', type: 'menu' },
      component: 'vab/directive',
    },
    {
      path: '/vab/mini',
      name: 'minivab',
      meta: { title: '原子组件', icon: 'ep-magic-stick', type: 'menu' },
    }, {
      path: '/vab/statistic',
      name: 'statistic',
      meta: { title: '统计数值', icon: 'ep-histogram', type: 'menu' },
      component: 'vab/statistic',
    }, {
      path: '/vab/form',
      name: 'vabform',
      meta: { title: 'Form 数据录入', icon: 'ep-edit', type: 'menu' },
      children: [{
        path: '/vab/tableselect',
        name: 'tableselect',
        meta: { title: '表格选择器', type: 'menu' },
        component: 'vab/tableselect',
      }, {
        path: '/vab/formtable',
        name: 'formtable',
        meta: { title: '表单表格', type: 'menu' },
        component: 'vab/formtable',
      }, {
        path: '/vab/filterbar',
        name: 'filterBar',
        meta: { title: '过滤器v2', type: 'menu' },
        component: 'vab/filterBar',
      }, {
        path: '/vab/upload',
        name: 'upload',
        meta: { title: '上传', type: 'menu' },
        component: 'vab/upload',
      }, {
        path: '/vab/iconselect',
        name: 'iconSelect',
        meta: { title: '图标选择器', type: 'menu' },
        component: 'vab/iconselect',
      }],
    }, {
      path: '/vab/contextmenu',
      name: 'contextmenu',
      meta: { title: '右键菜单', icon: 'ep:eleme', type: 'menu' },
      component: 'vab/contextmenu',
    },
    {
      path: '/vab/cropper',
      name: 'cropper',
      meta: { title: '图像剪裁', icon: 'ep:eleme', type: 'menu' },
      component: 'vab/cropper',
    }, {
      path: '/vab/dialog',
      name: 'dialogExtend',
      meta: { title: '弹窗扩展', icon: 'ep:eleme', type: 'menu' },
      component: 'vab/dialog',
    }, {
      path: '/vab/workflow',
      name: 'workflow',
      meta: { title: '工作流设计器', icon: 'ep-share', type: 'menu' },
      component: 'vab/workflow',
    }],
  },
  {
    name: 'template',
    path: '/template',
    meta: { title: '模板', icon: 'ep-files', type: 'menu' },
    children: [{
      path: '/template/blank',
      name: 'blank',
      meta: { title: '空白模板', icon: 'ep-folder', type: 'menu' },
      component: 'template/blank',
    }, {
      path: '/template/stepform',
      name: 'stepform',
      meta: { title: '分步表单', icon: 'ep-switch', type: 'menu' },
      component: 'template/stepform',
    }],
  },
  {
    name: 'setting',
    path: '/setting',
    meta: { title: '配置', icon: 'ep-setting', type: 'menu' },
    children: [{
      path: '/setting/system',
      name: 'system',
      meta: { title: '系统设置', icon: 'ep-tools', type: 'menu' },
      component: 'setting/system',
    }, {
      path: '/setting/user',
      name: 'user',
      meta: { title: '用户管理', icon: 'ep-user-filled', type: 'menu' },
      component: 'setting/user',
    }, {
      path: '/setting/role',
      name: 'role',
      meta: { title: '角色管理', icon: 'ep-notebook', type: 'menu' },
      component: 'setting/role',
    }, {
      path: '/setting/menu',
      name: 'settingMenu',
      meta: { title: '菜单管理', icon: 'ep-fold', type: 'menu' },
      component: 'setting/menu',
    }],
  },
]
