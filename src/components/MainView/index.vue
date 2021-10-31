<template>
  <router-view>
    <template #default="{ Component, route }">
      <transition mode="out-in">
        <component :is="Component" :key="route.fullPath" />
      </transition>
    </template>
  </router-view>
</template>
