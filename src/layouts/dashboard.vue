<template>
  <n-layout has-sider>
    <n-layout-sider
      show-trigger="bar"
      collapse-mode="width"
      :native-scrollbar="false"
      :collapsed="settingStore.collapsed"
      width="250"
      :bordered="true"
      class="min-h-screen"
      @collapse="settingStore.toggleCollapsed()"
      @expand="settingStore.toggleCollapsed()"
    >
      <Logo />
      <SiderMenu />
    </n-layout-sider>

    <n-layout>
      <n-layout-header>
        <PageHeader />
      </n-layout-header>

      <n-layout-content>
        <MainView />
      </n-layout-content>
      <n-layout-footer position="absolute" class="text-center h-64px p-24px" bordered>
        <Footer />
      </n-layout-footer>
    </n-layout>
  </n-layout>
</template>

<script lang="ts" setup>
import { useSettingStore } from '~/stores/setting'
const settingStore = useSettingStore()
</script>
