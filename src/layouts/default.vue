<script setup lang="ts">
import { menus } from '~/config/menus'
import type { AppMenuRecordRaw } from '~/types'
import { useAppStore } from '~/store'

// 导航菜单
const menuRef = ref<AppMenuRecordRaw[]>(menus)
// 子菜单
const subMenuRef = ref<AppMenuRecordRaw[]>()
// 活动的导航
const activeNavMenu = ref('')

const isActiveNavMenu = (menuItem: AppMenuRecordRaw) => {
  return unref(activeNavMenu) === menuItem.path
}

const router = useRouter()
// 切换导航事件
function handleNavClick(menuItem: AppMenuRecordRaw) {
  activeNavMenu.value = menuItem.path

  if (menuItem.children) {
    subMenuRef.value = menuItem.children
  }
  else {
    subMenuRef.value = []
    router.push(menuItem.path)
  }
}

const { menuIsCollapse, toggleCollapsed } = useAppStore()

onMounted(() => {
  menus.forEach((item) => {

  })
})
</script>

<template>
  <section class="aminui-wrapper">
    <div class="aminui-side-split">
      <div class="aminui-side-split-top flex justify-center items-center">
        <img class="w-auto h-30px" src="/img/logo-r.png">
      </div>
      <div class="adminui-side-split-scroll">
        <el-scrollbar>
          <ul>
            <li v-for="item in menuRef" :key="item.path" :class="isActiveNavMenu(item) ? 'active' : ''" @click="handleNavClick(item)">
              <ep-icon v-if="item.icon" :icon="item.icon" />
              <p>{{ item.title }}</p>
            </li>
          </ul>
        </el-scrollbar>
      </div>
    </div>
    <div v-if="subMenuRef && subMenuRef.length > 0" :class="menuIsCollapse ? 'aminui-side isCollapse' : 'aminui-side'">
      <div v-if="!menuIsCollapse" class="adminui-side-top">
        <h2>测试</h2>
      </div>
      <div class="adminui-side-scroll">
        <el-scrollbar>
          <el-menu router :collapse="menuIsCollapse">
            <NavMenu :nav-menus="subMenuRef" />
          </el-menu>
        </el-scrollbar>
      </div>
      <div class="adminui-side-bottom" @click="toggleCollapsed()">
        <ep-icon :icon="menuIsCollapse ? 'ic-ep-expand' : 'ic-ep-fold'" />
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
