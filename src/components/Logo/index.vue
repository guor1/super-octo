<template>
  <div class="flex items-center justify-center h-64px overflow-hidden whitespace-nowrap">
    <img src="../../assets/img/naivelogo.svg" class="w-auto h-32px" />
    <h2 v-show="!settingStore.collapsed" class="text-18px font-bold ml-2.5">Naive UI</h2>
  </div>
</template>

<script lang="ts" setup>
import { useSettingStore } from '~/stores/setting'
const settingStore = useSettingStore()
</script>
