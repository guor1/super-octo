<script setup lang="ts">
import Breadcrumb from './components/Breadcrumb.vue'
import NavMenu from './components/NavMenu.vue'
import { useAppStore } from '~/store/modules/appStore'

const appStore = useAppStore()
const { navMenuRef, subMenuRef, activeSubMenuRef } = storeToRefs(appStore)
const { isActiveNavMenu, handleNavClick } = appStore
const { menuIsCollapse, toggleCollapsed } = useSetting()
</script>

<template>
  <section class="flex flex-1">
    <div class="aminui-side-split bg-[#222b45]">
      <div class="flex justify-center items-center h-49px">
        <img class="w-auto h-30px" src="/img/logo-r.png">
      </div>
      <div class="adminui-side-split-scroll">
        <el-scrollbar>
          <ul class="pl-5px pr-5px">
            <li v-for="item in navMenuRef" :key="item.path" :class="isActiveNavMenu(item) ? 'active' : ''" @click="handleNavClick(item)">
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
          <el-menu router :collapse="menuIsCollapse" :default-active="activeSubMenuRef">
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
        <div class="flex items-center">
          <Breadcrumb class="ml-15px" />
        </div>
        <div class="center-panel" />
        <div class="flex items-center" />
      </div>
      <div id="adminui-main" class="adminui-main">
        <router-view v-slot="{ Component }">
          <component :is="Component" :key="$route.fullPath" />
        </router-view>
      </div>
    </el-container>
  </section>
</template>
