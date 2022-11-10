<script setup lang="ts">
import type { FormInstance } from 'element-plus'
import logoImage from '~/assets/image/logo.png'

const generateFormModel = () => {
  return {
    username: '',
    password: '',
    rememberPassword: true,
  }
}
const formModel = ref(generateFormModel())

const handleSubmit = async (formEl: FormInstance | undefined) => {
}
</script>

<template>
  <div class="background h-full bg-[#f0f2f5]">
    <div class="pt-100px">
      <el-card class="w-480px text-center m-auto" :body-style="{ paddingTop: '50px', paddingBottom: '50px', width: '480px' }">
        <img :src="logoImage" width="100" class="mb-16px">
        <el-space direction="vertical" size="large" class="w-full" :fill-ratio="80" fill>
          <div class="login-title">
            进销存管理系统
          </div>
          <el-form ref="loginForm" :model="formModel" layout="vertical" @submit="handleSubmit">
            <el-form-item field="username" hide-label required>
              <el-input v-model="formModel.username" size="large" placeholder="用户名" />
            </el-form-item>
            <el-form-item field="password" hide-label required>
              <el-input v-model="formModel.password" type="password" size="large" placeholder="密码" />
            </el-form-item>
            <el-space size="large" direction="vertical" fill class="w-full">
              <div class="flex justify-between">
                <el-checkbox :model-value="formModel.rememberPassword">
                  记住密码
                </el-checkbox>
                <el-link>忘记密码</el-link>
              </div>
              <el-button type="primary" html-type="submit" class="w-full">
                登录
              </el-button>
            </el-space>
          </el-form>
        </el-space>
      </el-card>
    </div>
  </div>
</template>

<route lang="yaml">
meta:
  layout: blank
</route>

<style scoped>
.background {
  background-image: url('~/assets/image/background.svg');
}

.login-title {
  font-weight: bold;
  font-size: 16px;
  color: #1890ff;
}
</style>
