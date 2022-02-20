<template>
  <el-container>
    <el-header>
      <el-form :inline="true" :model="formInline">
        <el-form-item label="">
          <el-input v-model="formInline.user" placeholder="查询" :suffix-icon="Search">
            <template #suffix>
              <ep-icon icon="ep:search" />
            </template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">
            Query
          </el-button>
        </el-form-item>
      </el-form>
    </el-header>
    <el-main>
      222
    </el-main>
  </el-container>
</template>
<script lang="ts" setup>
import { reactive } from 'vue'

const formInline = reactive({
  user: '',
  region: '',
})

const onSubmit = () => {
}
</script>
