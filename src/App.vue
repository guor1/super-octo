<script setup>
import zhCn from 'element-plus/lib/locale/lang/zh-cn'
const locale = reactive(zhCn)
// https://github.com/vueuse/head
// you can use this to manipulate the document head in any components,
// they will be rendered correctly in the html results with vite-ssg
useHead({
  title: '进销存系统',
  meta: [
    { name: 'description', content: 'Opinionated Vite Starter Template' },
  ],
})
</script>

<template>
  <el-config-provider :button="{ autoInsertSpace: false }" :locale="locale">
    <router-view />
  </el-config-provider>
</template>

<style lang="scss">
@import '~/styles/style.scss';
@import '~/styles/theme/dark.scss';
</style>
