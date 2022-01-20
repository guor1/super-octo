<template>
  <el-button>
    <ep-icon :icon="icon" />
  </el-button>
</template>
<script setup lang="ts">
import { Icon } from '@iconify/vue'

defineProps<{ icon: string }>()
</script>
