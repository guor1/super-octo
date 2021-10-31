<script setup lang="ts">
import { darkTheme } from 'naive-ui'
import { isDark } from '~/logic'
// https://github.com/vueuse/head
// you can use this to manipulate the document head in any components,
// they will be rendered correctly in the html results with vite-ssg
useHead({
  title: 'Vitesse',
  meta: [
    { name: 'description', content: 'Opinionated Vite Starter Template' },
  ],
})
</script>

<template>
  <n-config-provider :theme="isDark ? darkTheme : undefined">
    <n-dialog-provider>
      <router-view />
    </n-dialog-provider>
  </n-config-provider>
</template>
<style lang="less">
@import "~/styles/index.less";
</style>
