<script setup lang="ts">
import type { AppMenuRecordRaw } from '~/types'
import { isExternalLink } from '~/utils'

defineProps({ navMenus: Array<AppMenuRecordRaw> })

function hasChildren(menuItem: AppMenuRecordRaw) {
  return menuItem.children
}

onMounted(() => {
})
</script>

<template>
  <div v-if="navMenus && navMenus.length <= 0" class="p-5">
    <el-alert title="无子集菜单" center type="info" :closable="false" />
  </div>
  <template v-for="navMenu in navMenus" :key="navMenu">
    <el-menu-item v-if="!hasChildren(navMenu)" :index="navMenu.path">
      <a
        v-if="isExternalLink(navMenu.path)"
        :href="navMenu.path"
        target="_blank"
        @click.stop="() => { }"
      />
      <ep-icon v-if="navMenu.icon" :icon="navMenu.icon" />
      <template #title>
        <span>{{ navMenu.title }}</span>
      </template>
    </el-menu-item>
    <el-sub-menu v-else :index="navMenu.path">
      <template #title>
        <ep-icon v-if="navMenu.icon" :icon="navMenu.icon" />
        <span>{{ navMenu.title }}</span>
      </template>
      <nav-menu :nav-menus="navMenu.children" />
    </el-sub-menu>
  </template>
</template>
