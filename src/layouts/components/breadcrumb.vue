<script setup lang="ts">
import { useAppStore } from '~/store/modules/appStore'

const { matchedMenuItems } = storeToRefs(useAppStore())
</script>

<template>
  <el-breadcrumb>
    <el-breadcrumb-item v-for="item in matchedMenuItems" :key="item">
      {{ item.title }}
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>
