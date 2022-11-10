<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { menus } from '~/config/menus'
import type { AppMenuRecordRaw } from '~/types'

// 一级导航
const menuRef = ref<AppMenuRecordRaw[]>(menus)
const subMenuRef = ref<AppMenuRecordRaw[]>()
const activeNavMenu = ref('')

const isActiveNavMenu = (menuItem: AppMenuRecordRaw) => {
  return unref(activeNavMenu) === menuItem.path
}

function handleNavClick(menuItem: AppMenuRecordRaw) {
  activeNavMenu.value = menuItem.path
  subMenuRef.value = menuItem.children
}

const menuIsCollapse = ref(false)
const toggleCollapsed = () => {
}
</script>

<template>
  <section class="aminui-wrapper">
    <div class="aminui-side-split">
      <div class="aminui-side-split-top">
        <img class="w-auto h-30px" src="/img/logo-r.png">
      </div>
      <div class="adminui-side-split-scroll">
        <el-scrollbar>
          <ul>
            <li v-for="item in menuRef" :key="item.path" :class="isActiveNavMenu(item) ? 'active' : ''" @click="handleNavClick(item)">
              <el-icon v-if="item.icon">
                <Icon :icon="item.icon" />
              </el-icon>
              <p>{{ item.title }}</p>
            </li>
          </ul>
        </el-scrollbar>
      </div>
    </div>
    <div :class="menuIsCollapse ? 'aminui-side isCollapse' : 'aminui-side'">
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
