<template>
  <el-button>
    <ep-icon :icon="icon" />
    <span style="vertical-align: middle;"> <slot /> </span>
  </el-button>
</template>
<script setup lang="ts">
import { Icon } from '@iconify/vue'

defineProps<{ icon: string }>()
</script>
