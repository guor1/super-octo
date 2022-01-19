<template>
  <div v-if="navMenus.length <= 0" style="padding:20px;">
    <el-alert title="无子集菜单" center type="info" :closable="false" />
  </div>
  <template v-for="navMenu in navMenus" :key="navMenu">
    <el-menu-item v-if="!hasChildren(navMenu)" :index="navMenu.path">
      <a
        v-if="navMenu.meta && navMenu.meta.type == 'link'"
        :href="navMenu.path"
        target="_blank"
        @click.stop="() => { }"
      />
      <el-icon v-if="navMenu.meta && navMenu.meta.icon">
        <Icon :icon="navMenu.meta.icon || 'ep-menu'" />
      </el-icon>
      <template #title>
        <span>{{ navMenu.meta.title }}</span>
      </template>
    </el-menu-item>
    <el-sub-menu v-else :index="navMenu.path">
      <template #title>
        <el-icon v-if="navMenu.meta && navMenu.meta.icon">
          <Icon :icon="navMenu.meta.icon || 'ep-menu'" />
        </el-icon>
        <span>{{ navMenu.meta.title }}</span>
      </template>
      <NavMenu :nav-menus="navMenu.children" />
    </el-sub-menu>
  </template>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'
import type { MenuItem } from '~/types'
defineProps<{ navMenus: Array<MenuItem> }>()

function hasChildren (item: MenuItem) {
  return item.children && !item.children.every(item => item.meta.hidden)
}
</script>
