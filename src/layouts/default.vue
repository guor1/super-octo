<script setup lang="ts">
import { Icon } from '@iconify/vue'
import useMenu from '~/config/menus'
import routes from '~pages'

// 一级导航
const side = ref('')
const menu = useMenu()
const nextMenu = ref([])
const pmenu = reactive({
  title: 'aaa',
  meta: {
    title: 'asdas',
  },
})
const active = ref('')

// 点击显示
const showMenu = () => {
  this.pmenu = route
  this.nextMenu = this.filterUrl(route.children)
  if ((!route.children || route.children.length === 0) && route.component)
    routes.router.push({ path: route.path })
}

// 转换外部链接的路由
const filterUrl = (map) => {
  const newMap = []
  map && map.forEach((item) => {
    item.meta = item.meta ? item.meta : {}
    // 处理隐藏
    if (item.meta.hidden)
      return false

    // 处理http
    if (item.meta.type === 'iframe')
      item.path = `/i/${item.name}`

    // 递归循环
    if (item.children && item.children.length > 0)
      item.children = this.filterUrl(item.children)

    newMap.push(item)
  })
  return newMap
}
</script>

<template>
  <section class="aminui-wrapper">
    <div class="aminui-side-split">
      <div class="aminui-side-split-top">
        <img class="w-auto h-30px" :title="$CONFIG.APP_NAME" src="/img/logo-r.png">
      </div>
      <div class="adminui-side-split-scroll">
        <el-scrollbar>
          <ul>
            <li
              v-for="item in menu" :key="item" :class="pmenu.path === item.path ? 'active' : ''"
              @click="showMenu(item)"
            >
              <el-icon><Icon :icon="item.meta.icon || menu" /></el-icon>
              <p>{{ item.meta.title }}</p>
            </li>
          </ul>
        </el-scrollbar>
      </div>
    </div>
    <div v-if="nextMenu.length > 0 || !pmenu.component" :class="menuIsCollapse ? 'aminui-side isCollapse' : 'aminui-side'">
      <div v-if="!menuIsCollapse" class="adminui-side-top">
        <h2>{{ pmenu.meta.title }}</h2>
      </div>
      <div class="adminui-side-scroll">
        <el-scrollbar>
          <el-menu :default-active="active" router :collapse="menuIsCollapse" :unique-opened="$CONFIG.MENU_UNIQUE_OPENED">
            <NavMenu :nav-menus="nextMenu" />
          </el-menu>
        </el-scrollbar>
      </div>
      <div class="adminui-side-bottom" @click="toggleCollapsed()">
        <ep-icon :icon="menuIsCollapse ? 'ep-expand' : 'ep-fold'" />
      </div>
    </div>
    <el-container class="aminui-body" direction="vertical">
      <div class="adminui-topbar">
        <div class="left-panel">
          <el-breadcrumb>
            <el-breadcrumb-item>
              首页
            </el-breadcrumb-item>
            <el-breadcrumb-item>控制台</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <div class="center-panel" />
        <div class="right-panel">
          <!-- <Userbar /> -->
        </div>
      </div>
      <div id="adminui-main" class="adminui-main">
        <router-view v-slot="{ Component }">
          <component :is="Component" :key="$route.fullPath" />
        </router-view>
      </div>
    </el-container>
  </section>
</template>

<style scoped>
.el-breadcrumb {margin-left: 15px;}
.el-breadcrumb .el-breadcrumb__inner .icon {font-size: 14px;margin-right: 5px;float: left;}
.breadcrumb-enter-active,.breadcrumb-leave-active {transition: all 0.3s;}
.breadcrumb-enter-from,.breadcrumb-leave-active {opacity: 0;transform: translateX(20px);}
.breadcrumb-leave-active {position: absolute;}
</style>
