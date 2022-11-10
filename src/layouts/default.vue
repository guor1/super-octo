<script setup lang="ts">
import breadcrumb from './components/breadcrumb.vue'
import { useAppStore } from '~/store/modules/appStore'

const appStore = useAppStore()
const { menuRef, subMenuRef, activeMenuRef } = storeToRefs(appStore)
const { isActiveNavMenu, handleNavClick, checkRouteAccess } = appStore
const { menuIsCollapse, toggleCollapsed } = useSetting()

const route = useRoute()
onMounted(() => {
  checkRouteAccess(route.path)
})

watch(() => route.path, () => {
  checkRouteAccess(route.path)
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
          <el-menu router :collapse="menuIsCollapse" :default-active="activeMenuRef">
            <NavMenu :nav-menus="subMenuRef" />
          </el-menu>
        </el-scrollbar>
      </div>
      <div class="adminui-side-bottom" @click="toggleCollapsed()">
        <ep-icon :icon="menuIsCollapse ? 'ic-ep:expand' : 'ic-ep:fold'" />
      </div>
    </div>
    <el-container class="aminui-body" direction="vertical">
      <div class="adminui-topbar">
        <div class="left-panel">
          <breadcrumb />
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
