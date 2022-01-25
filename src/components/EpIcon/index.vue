<template>
  <el-icon>
    <Icon :icon="icon" />
  </el-icon>
</template>
<script setup>
import { Icon } from '@iconify/vue'

defineProps({
  icon: {
    type: String,
    default: 'ep:eleme',
  },
})
</script>
