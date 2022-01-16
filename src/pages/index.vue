<script setup lang="ts">
const name = ref('')

const router = useRouter()
const go = () => {
  if (name.value)
    router.push(`/hi/${encodeURIComponent(name.value)}`)
}
</script>

<template>
  <div>
    <p class="text-4xl">
      <icon-carbon-campsite class="inline-block" />
    </p>
    <p>
      <a rel="noreferrer" href="https://github.com/antfu/vitesse-lite" target="_blank">Vitesse Lite</a>
    </p>
    <p>
      <em class="text-sm">Opinionated Vite Starter Template</em>
    </p>

    <div class="py-4" />

    <div class="flex justify-center items-center">
      <el-input v-model="name" placeholder="What's your name?" @keydown.enter="go" />
    </div>
    <div>
      <el-button class="m-3 text-sm btn" type="primary" @click="go">go</el-button>
    </div>
  </div>
</template>
<route lang="yaml">
meta:
  layout: index
</route>
