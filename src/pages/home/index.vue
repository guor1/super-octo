<template>
  <div v-if="pageLoading">
    <el-main>
      <el-card shadow="never">
        <el-skeleton :rows="1" />
      </el-card>
      <el-card shadow="never" style="margin-top: 15px;">
        <el-skeleton />
      </el-card>
    </el-main>
  </div>
  <work v-if="dashboard=='1'" @on-mounted="onMounted" />
  <widgets v-else @on-mounted="onMounted" />
</template>

<script>
import { defineAsyncComponent } from 'vue'
const work = defineAsyncComponent(() => import('./work.vue'))
const widgets = defineAsyncComponent(() => import('./widgets.vue'))

export default {
  name: 'Dashboard',
  components: {
    work,
    widgets,
  },
  data () {
    return {
      pageLoading: true,
      dashboard: '0',
    }
  },
  created () {
    this.dashboard = this.$TOOL.data.get('USER_INFO').dashboard || '0'
  },
  mounted () {

  },
  methods: {
    onMounted () {
      this.pageLoading = false
    },
  },
}
</script>

<style>
</style>
