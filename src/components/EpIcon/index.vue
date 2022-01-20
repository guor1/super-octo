<template>
  <el-icon>
    <Icon :icon="icon" />
  </el-icon>
</template>
<script setup lang="ts">
import { Icon } from '@iconify/vue'

defineProps<{ icon: string }>()
</script>
