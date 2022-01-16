<script setup lang="ts">
const props = defineProps<{ name: string }>()
const router = useRouter()
</script>

<template>
  <div>
    <p class="text-4xl">
      <icon-carbon-pedestrian class="inline-block" />
    </p>
    <p>Hi, {{ props.name }}</p>
    <p class="text-sm">
      <em>Dynamic route!</em>
    </p>

    <div>
      <el-button class="m-3 text-sm mt-8" type="primary" @click="router.back()">Back</el-button>
    </div>
  </div>
</template>
