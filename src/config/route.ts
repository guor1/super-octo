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
      },
      {
        name: 'userCenter',
        path: '/usercenter',
        meta: { title: '个人信息', icon: 'ep-user' },
        component: 'userCenter',
      }],
  }, {
    name: 'vab',
    path: '/vab',
    meta: { title: '组件', icon: 'ep-takeaway-box', type: 'menu' },
    children: [
      {
        path: '/vab/mini',
        name: 'minivab',
        meta: { title: '原子组件', icon: 'ep-magic-stick', type: 'menu' },
        component: 'vab/mini',
      },
      {
        path: '/vab/iconfont',
        name: 'iconfont',
        meta: { title: '扩展图标', icon: 'ep-orange', type: 'menu' },
        component: 'vab/iconfont',
      }, {
        path: '/vab/data',
        name: 'vabdata',
        meta: { title: 'Data 数据展示', icon: 'ep-histogram', type: 'menu' },
        children: [{
          path: '/vab/chart',
          name: 'chart',
          meta: { title: '图表 Echarts', type: 'menu' },
          component: 'vab/chart',
        }, {
          path: '/vab/statistic',
          name: 'statistic',
          meta: { title: '统计数值', type: 'menu' },
          component: 'vab/statistic',
        }, {
          path: '/vab/video',
          name: 'scvideo',
          meta: { title: '视频播放器', type: 'menu' },
          component: 'vab/video',
        }],
      }, {
        path: '/vab/form',
        name: 'vabform',
        meta: { title: 'Form 数据录入', icon: 'ep-edit', type: 'menu' },
        children: [{ path: '/vab/tableselect', name: 'tableselect', meta: { title: '表格选择器', type: 'menu' }, component: 'vab/tableselect' }, { path: '/vab/formtable', name: 'formtable', meta: { title: '表单表格', type: 'menu' }, component: 'vab/formtable' }, { path: '/vab/filterbar', name: 'filterBar', meta: { title: '过滤器v2', type: 'menu' }, component: 'vab/filterBar' }, { path: '/vab/upload', name: 'upload', meta: { title: '上传', type: 'menu' }, component: 'vab/upload' }, { path: '/vab/select', name: 'scselect', meta: { title: '异步选择器', type: 'menu' }, component: 'vab/select' }, { path: '/vab/iconselect', name: 'iconSelect', meta: { title: '图标选择器', type: 'menu' }, component: 'vab/iconselect' }, { path: '/vab/editor', name: 'editor', meta: { title: '富文本编辑器', type: 'menu' }, component: 'vab/editor' }],
      }, {
        path: '/vab/feedback',
        name: 'vabfeedback',
        meta: { title: 'Feedback 反馈', icon: 'ep-mouse', type: 'menu' },
        children: [{
          path: '/vab/drag',
          name: 'drag',
          meta: { title: '拖拽排序', type: 'menu' },
          component: 'vab/drag',
        }, {
          path: '/vab/contextmenu',
          name: 'contextmenu',
          meta: { title: '右键菜单', type: 'menu' },
          component: 'vab/contextmenu',
        }, { path: '/vab/cropper', name: 'cropper', meta: { title: '图像剪裁', type: 'menu' }, component: 'vab/cropper' }, { path: '/vab/fileselect', name: 'fileselect', meta: { title: '资源库选择器', type: 'menu' }, component: 'vab/fileselect' }, { path: '/vab/dialog', name: 'dialogExtend', meta: { title: '弹窗扩展', type: 'menu' }, component: 'vab/dialog' }],
      }, { path: '/vab/others', name: 'vabothers', meta: { title: 'Others 其他', icon: 'ep-more-filled', type: 'menu' }, children: [{ path: '/vab/print', name: 'print', meta: { title: '打印', type: 'menu' }, component: 'vab/print' }] }, { path: '/vab/workflow', name: 'workflow', meta: { title: '工作流设计器', icon: 'ep-share', type: 'menu' }, component: 'vab/workflow' }, { path: '/vab/formrender', name: 'formRender', meta: { title: '动态表单(Beta)', icon: 'ep-message-box', type: 'menu' }, component: 'vab/form' }],
  }, { name: 'template', path: '/template', meta: { title: '模板', icon: 'ep-files', type: 'menu' }, children: [{ path: '/template/blank', name: 'blank', meta: { title: '空白模板', icon: 'ep-folder', type: 'menu' }, component: 'template/blank' }, { path: '/template/chartlist', name: 'chartlist', meta: { title: '统计列表', icon: 'ep-data-analysis', type: 'menu' }, component: 'template/chartlist' }, { path: '/template/calendar', name: 'calendar', meta: { title: '日历计划', icon: 'ep-calendar', type: 'menu' }, component: 'template/calendar' }, { path: '/template/list', name: 'list', meta: { title: '详细列表', icon: 'ep-fold', type: 'menu' }, component: 'template/list' }, { path: '/template/list/save/:id?', name: 'list-save', meta: { title: '新标签', hidden: true, active: '/template/list', type: 'menu' }, component: 'template/list/save' }, { path: '/template/svgmap', name: 'svgmap', meta: { title: '地理信息', icon: 'ep-map-location', type: 'menu' }, component: 'template/svgmap' }, { path: '/template/tabinfo', name: 'tabinfo', meta: { title: '分栏明细', icon: 'ep-document', type: 'menu' }, component: 'template/tabinfo' }, { path: '/template/server', name: 'server', meta: { title: '服务器监控', icon: 'ep-cpu', type: 'menu' }, component: 'template/server' }, { path: '/template/stepform', name: 'stepform', meta: { title: '分步表单', icon: 'ep-switch', type: 'menu' }, component: 'template/stepform' }] }, { name: 'other', path: '/other', meta: { title: '其他', icon: 'ep-more-filled', type: 'menu' }, children: [{ path: '/other/directive', name: 'directive', meta: { title: '指令', icon: 'ep-price-tag', type: 'menu' }, component: 'other/directive' }, { path: '/other/viewTags', name: 'viewTags', meta: { title: '标签操作', icon: 'ep-files', type: 'menu' }, component: 'other/viewTags', children: [{ path: '/other/fullpage', name: 'fullpage', meta: { title: '整页路由', icon: 'ep-monitor', fullpage: true, type: 'menu' }, component: 'other/fullpage' }] }, { path: '/link', name: 'link', meta: { title: '外部链接', icon: 'ep-link', type: 'menu' }, children: [{ path: 'https://baidu.com', name: '百度', meta: { title: '百度', type: 'link' } }, { path: 'https://www.google.cn', name: '谷歌', meta: { title: '谷歌', type: 'link' } }] }, { path: '/iframe', name: 'Iframe', meta: { title: 'Iframe', icon: 'ep-position', type: 'menu' }, children: [{ path: 'https://v3.cn.vuejs.org', name: 'vue3', meta: { title: 'VUE 3', type: 'iframe' } }, { path: 'https://element-plus.gitee.io', name: 'elementplus', meta: { title: 'Element Plus', type: 'iframe' } }, { path: 'https://lolicode.gitee.io/scui-doc', name: 'scuidoc', meta: { title: 'SCUI文档', type: 'iframe' } }] }] }, { name: 'test', path: '/test', meta: { title: '实验室', icon: 'ep-mouse', type: 'menu' }, children: [{ path: '/test/autocode', name: 'autocode', meta: { title: '代码生成器', icon: 'sc-icon-code', type: 'menu' }, redirect: '/test/autocode/index', children: [{ path: '/test/autocode/index', name: 'autocode-index', meta: { title: '代码生成器', hidden: true, hiddenBreadcrumb: true, active: '/test/autocode', type: 'menu' }, component: 'test/autocode' }, { path: '/test/autocode/list', name: 'autocode-list', meta: { title: '列表生成器', hidden: true, active: '/test/autocode', type: 'menu' }, component: 'test/autocode/list' }] }, { path: '/test/codebug', name: 'codebug', meta: { title: '异常处理', icon: 'ant-design:bug-outlined', type: 'menu' }, component: 'test/codebug' }] }, { name: 'setting', path: '/setting', meta: { title: '配置', icon: 'ep-setting', type: 'menu' }, children: [{ path: '/setting/system', name: 'system', meta: { title: '系统设置', icon: 'ep-tools', type: 'menu' }, component: 'setting/system' }, { path: '/setting/user', name: 'user', meta: { title: '用户管理', icon: 'ep-user-filled', type: 'menu' }, component: 'setting/user' }, { path: '/setting/role', name: 'role', meta: { title: '角色管理', icon: 'ep-notebook', type: 'menu' }, component: 'setting/role' }, { path: '/setting/dic', name: 'dic', meta: { title: '字典管理', icon: 'ep-document', type: 'menu' }, component: 'setting/dic' }, { path: '/setting/table', name: 'tableSetting', meta: { title: '表格列管理', icon: 'ep-scale-to-original', type: 'menu' }, component: 'setting/table' }, { path: '/setting/menu', name: 'settingMenu', meta: { title: '菜单管理', icon: 'ep-fold', type: 'menu' }, component: 'setting/menu' }, { path: '/setting/task', name: 'task', meta: { title: '计划任务', icon: 'ep-alarm-clock', type: 'menu' }, component: 'setting/task' }, { path: '/setting/client', name: 'client', meta: { title: '应用管理', icon: 'ep-help-filled', type: 'menu' }, component: 'setting/client' }, { path: '/setting/log', name: 'log', meta: { title: '系统日志', icon: 'ep-warning', type: 'menu' }, component: 'setting/log' }] }, { path: '/other/about', name: 'about', meta: { title: '关于', icon: 'ep-info-filled', type: 'menu' }, component: 'other/about' }]
