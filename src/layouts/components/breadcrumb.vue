<script setup lang="ts">
import { useAppStore } from '~/store/modules/appStore'

const { activeMenuListRef } = storeToRefs(useAppStore())
</script>

<template>
  <el-breadcrumb>
    <el-breadcrumb-item v-for="item in activeMenuListRef" :key="item">
      {{ item.title }}
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>
