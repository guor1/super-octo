<script lang="ts" setup>
const dialog1 = ref(false)

const open1 = () => {
  dialog1.value = true
}
</script>

<template>
  <el-main>
    <el-alert title="二次封装el-dialog,加入加载中/最大化." type="success" style="margin:0 0 20px 0;" />
    <el-card shadow="never" header="内置">
      <el-button type="primary" @click="open1">
        默认
      </el-button>
    </el-card>
  </el-main>

  <sc-dialog v-model="dialog1" draggable title="提示">
    内容
    <template #footer>
      <el-button @click="dialog1 = false">
        取 消
      </el-button>
      <el-button type="primary" @click="dialog1 = false">
        确 定
      </el-button>
    </template>
  </sc-dialog>
</template>

