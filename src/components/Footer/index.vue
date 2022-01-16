<script setup lang="ts">
import { isDark, toggleDark } from '~/logic'
</script>

<template>
  <nav class="text-xl">
    <button class="icon-btn mx-2 !outline-none" @click="toggleDark()">
      <icon-carbon-moon v-if="isDark" />
      <icon-carbon-sun v-else />
    </button>

    <a
      class="icon-btn mx-2"
      rel="noreferrer"
      href="https://github.com/antfu/vitesse-lite"
      target="_blank"
      title="GitHub"
    >
      <icon-carbon-logo-github />
    </a>
    <a class="icon-btn mx-2 cursor-pointer" @click="$router.push('/dashboard')">
      <icon-carbon-home />
    </a>
  </nav>
</template>
