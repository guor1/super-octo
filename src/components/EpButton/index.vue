<script setup>
import { Icon } from '@iconify/vue'

defineProps({ icon: String })
</script>

<template>
  <el-button>
    <ep-icon :icon="icon" />
    <span style="vertical-align: middle;"> <slot /> </span>
  </el-button>
</template>
