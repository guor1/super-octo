<template>
  <el-container>
    <el-header>
      <el-page-header content="FullPage" @back="goBack" />
    </el-header>
    <el-main>
      <el-empty description="FullPageMain" />
    </el-main>
  </el-container>
</template>

<script setup lang="ts">
const router = useRouter()

function goBack () {
  router.go(-1)
}
</script>

<style>
</style>
