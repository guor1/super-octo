<template>
  <div class="adminui-topbar">
    <div class="left-panel">
      <el-breadcrumb separator-icon="el-icon-arrow-right" class="hidden-sm-and-down">
        <transition-group name="breadcrumb" mode="out-in">
          <template v-for="item in breadList" :key="item.title">
            <el-breadcrumb-item v-if="item.path!='/' && !item.meta.hiddenBreadcrumb" :key="item.meta.title">
              <el-icon v-if="item.meta.icon" class="icon">
                <Icon icon="item.meta.icon" />
              </el-icon>{{ item.meta.title }}
            </el-breadcrumb-item>
          </template>
        </transition-group>
      </el-breadcrumb>
    </div>
    <div class="center-panel" />
    <div class="right-panel">
      <slot />
    </div>
  </div>
</template>

<script>
import { Icon } from '@iconify/vue'
import routes from '~pages'
export default {
  components: {
    Icon,
  },
  data () {
    return {
      breadList: [],
    }
  },
  watch: {
    $route () {
      this.getBreadcrumb()
    },
  },
  created () {
    this.getBreadcrumb()
  },
  methods: {
    getBreadcrumb () {
      // only show routes with meta.title
      let matched = this.$route.matched.filter(item => item.meta && item.meta.title)
      const first = matched[0]

      if (!this.isDashboard(first))
        matched = [{ path: '/dashboard', meta: { title: 'Dashboard' } }].concat(matched)

      this.levelList = matched.filter(item => item.meta && item.meta.title && item.meta.breadcrumb !== false)
    },
    isDashboard (route) {
      const name = route && route.name
      if (!name)
        return false

      return name.trim().toLocaleLowerCase() === 'Dashboard'.toLocaleLowerCase()
    },
    getBreadcrumb1 () {
      const matched = this.$route.meta.breadcrumb
      this.breadList = matched
    },
  },
}
</script>

<style scoped>
.el-breadcrumb {margin-left: 15px;}
.el-breadcrumb .el-breadcrumb__inner .icon {font-size: 14px;margin-right: 5px;float: left;}
.breadcrumb-enter-active,.breadcrumb-leave-active {transition: all 0.3s;}
.breadcrumb-enter-from,.breadcrumb-leave-active {opacity: 0;transform: translateX(20px);}
.breadcrumb-leave-active {position: absolute;}
</style>
