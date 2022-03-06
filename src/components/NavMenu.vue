<template>
  <div v-if="navMenus.length <= 0" class="p-5">
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
      <ep-icon v-if="navMenu.meta" :icon="navMenu.meta.icon" />
      <template #title>
        <span>{{ navMenu.meta.title }}</span>
      </template>
    </el-menu-item>
    <el-sub-menu v-else :index="navMenu.path">
      <template #title>
        <ep-icon v-if="navMenu.meta" :icon="navMenu.meta.icon" />
        <span>{{ navMenu.meta.title }}</span>
      </template>
      <nav-menu :nav-menus="navMenu.children" />
    </el-sub-menu>
  </template>
</template>

<script setup>
defineProps({ navMenus: Array })

function hasChildren(item) {
  return item.children && !item.children.every(item => item.meta.hidden)
}
</script>
