<script lang="ts" setup>
import { useFullscreen } from '@vueuse/core'

const { isFullscreen, toggle } = useFullscreen()
</script>

<template>
  <el-dialog :show-close="false" :fullscreen="isFullscreen" v-bind="$attrs">
    <template #header>
      <span class="el-dialog__title">{{ $attrs.title }}</span>
      <div class="sc-dialog__headerbtn">
        <button @click="toggle">
          <ep-icon v-if="isFullscreen" class="el-dialog__close" icon="ic-ep:bottom-left" />
          <ep-icon v-else class="el-dialog__close" icon="ic-ep:full-screen" />
        </button>
        <button>
          <ep-icon class="el-dialog__close" icon="ic-ep:close" />
        </button>
      </div>
    </template>
  </el-dialog>
</template>

<style scoped>
.sc-dialog__headerbtn {
  position: absolute;
  top: var(--el-dialog-padding-primary);
  right: var(--el-dialog-padding-primary);
}
.sc-dialog__headerbtn button {
  padding: 0;
  background: transparent;
  border: none;
  outline: none;
  cursor: pointer;
  font-size: var(--el-message-close-size,16px);
  margin-left: 15px;
  color: var(--el-color-info);
}
.sc-dialog__headerbtn button:hover {
  color: var(--el-color-primary);
}
</style>
