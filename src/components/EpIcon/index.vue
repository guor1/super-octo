<script setup lang="ts">
import { Icon } from '@iconify/vue'
const props = defineProps({
  icon: {
    type: String,
    default: 'ep-eleme',
  },
})
// 是否扩展图标，扩展图标以ic-开头
const isExtIcon = props.icon.startsWith('ic-')
const extIcon = isExtIcon ? props.icon.substring(3) : props.icon
</script>

<template>
  <template v-if="icon">
    <Icon v-if="isExtIcon" :icon="extIcon" width="18" />
    <component :is="extIcon" v-else />
  </template>
</template>
