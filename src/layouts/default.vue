<template>
  <!-- 通栏布局 -->
  <template v-if="layout=='header'">
    <header class="adminui-header">
      <div class="adminui-header-left">
        <div class="logo-bar">
          <img class="logo" src="img/logo.png">
          <span>{{ $CONFIG.APP_NAME }}</span>
        </div>
        <ul v-if="!isMobile" class="nav">
          <li v-for="item in menu" :key="item" :class="pmenu.path==item.path?'active':''" @click="showMenu(item)">
            <el-icon><Icon :icon="item.meta.icon || menu" /></el-icon>
            <span>{{ item.meta.title }}</span>
          </li>
        </ul>
      </div>
      <div class="adminui-header-right">
        <userbar />
      </div>
    </header>
    <section class="aminui-wrapper">
      <div v-if="!isMobile && nextMenu.length>0 || !pmenu.component" :class="menuIsCollapse?'aminui-side isCollapse':'aminui-side'">
        <div v-if="!menuIsCollapse" class="adminui-side-top">
          <h2>{{ pmenu.meta.title }}</h2>
        </div>
        <div class="adminui-side-scroll">
          <el-scrollbar>
            <el-menu :default-active="active" router :collapse="menuIsCollapse" :unique-opened="$CONFIG.MENU_UNIQUE_OPENED">
              <NavMenu :nav-menus="nextMenu" />
            </el-menu>
          </el-scrollbar>
        </div>
        <div class="adminui-side-bottom" @click="$store.commit('TOGGLE_menuIsCollapse')">
          <el-icon>
            <Icon v-if="menuIsCollapse" icon="ep-expand" />
            <Icon v-else icon="ep-fold" />
          </el-icon>
        </div>
      </div>
      <div class="aminui-body el-container">
        <Topbar v-if="!isMobile" />
        <div id="adminui-main" class="adminui-main">
          <router-view v-slot="{ Component }">
            <component :is="Component" :key="$route.fullPath" />
          </router-view>
        </div>
      </div>
    </section>
  </template>

  <!-- 经典布局 -->
  <template v-else-if="layout=='menu'">
    <header class="adminui-header">
      <div class="adminui-header-left">
        <div class="logo-bar">
          <img class="logo" src="img/logo.png">
          <span>{{ $CONFIG.APP_NAME }}</span>
        </div>
      </div>
      <div class="adminui-header-right">
        <userbar />
      </div>
    </header>
    <section class="aminui-wrapper">
      <div v-if="!isMobile" :class="menuIsCollapse?'aminui-side isCollapse':'aminui-side'">
        <div class="adminui-side-scroll">
          <el-scrollbar>
            <el-menu :default-active="active" router :collapse="menuIsCollapse" :unique-opened="$CONFIG.MENU_UNIQUE_OPENED">
              <NavMenu :nav-menus="menu" />
            </el-menu>
          </el-scrollbar>
        </div>
        <div class="adminui-side-bottom" @click="$store.commit('TOGGLE_menuIsCollapse')">
          <el-icon>
            <Icon v-if="menuIsCollapse" icon="ep-expand" />
            <Icon v-else icon="ep-fold" />
          </el-icon>
        </div>
      </div>
      <div class="aminui-body el-container">
        <Topbar v-if="!isMobile" />
        <!-- <Tags v-if="!isMobile && layoutTags" /> -->
        <div id="adminui-main" class="adminui-main">
          <router-view v-slot="{ Component }">
            <component :is="Component" :key="$route.fullPath" />
          </router-view>
        </div>
      </div>
    </section>
  </template>

  <!-- 功能坞布局 -->
  <template v-else-if="layout=='dock'">
    <header class="adminui-header">
      <div class="adminui-header-left">
        <div class="logo-bar">
          <img class="logo" src="img/logo.png">
          <span>{{ $CONFIG.APP_NAME }}</span>
        </div>
      </div>
      <div class="adminui-header-right">
        <div v-if="!isMobile" class="adminui-header-menu">
          <el-menu mode="horizontal" :default-active="active" router>
            <NavMenu :nav-menus="menu" />
          </el-menu>
        </div>
        <userbar />
      </div>
    </header>
    <section class="aminui-wrapper">
      <div class="aminui-body el-container">
        <div id="adminui-main" class="adminui-main">
          <router-view v-slot="{ Component }">
            <component :is="Component" :key="$route.fullPath" />
          </router-view>
        </div>
      </div>
    </section>
  </template>

  <!-- 默认布局 -->
  <template v-else>
    <section class="aminui-wrapper">
      <div v-if="!isMobile" class="aminui-side-split">
        <div class="aminui-side-split-top">
          <router-link :to="$CONFIG.DASHBOARD_URL">
            <img class="w-auto h-30px" :title="$CONFIG.APP_NAME" src="/img/logo-r.png">
          </router-link>
        </div>
        <div class="adminui-side-split-scroll">
          <el-scrollbar>
            <ul>
              <li
                v-for="item in menu" :key="item" :class="pmenu.path==item.path?'active':''"
                @click="showMenu(item)"
              >
                <el-icon><Icon :icon="item.meta.icon || menu" /></el-icon>
                <p>{{ item.meta.title }}</p>
              </li>
            </ul>
          </el-scrollbar>
        </div>
      </div>
      <div v-if="!isMobile && nextMenu.length>0 || !pmenu.component" :class="menuIsCollapse?'aminui-side isCollapse':'aminui-side'">
        <div v-if="!menuIsCollapse" class="adminui-side-top">
          <h2>{{ pmenu.meta.title }}</h2>
        </div>
        <div class="adminui-side-scroll">
          <el-scrollbar>
            <el-menu :default-active="active" router :collapse="menuIsCollapse" :unique-opened="$CONFIG.MENU_UNIQUE_OPENED">
              <NavMenu :nav-menus="nextMenu" />
            </el-menu>
          </el-scrollbar>
        </div>
        <div class="adminui-side-bottom" @click="$store.commit('TOGGLE_menuIsCollapse')">
          <ep-icon :icon="menuIsCollapse?'ep-expand':'ep-fold'" />
        </div>
      </div>
      <el-container class="aminui-body" direction="vertical">
        <div class="adminui-topbar">
          <div class="left-panel">
            <el-breadcrumb>
              <el-breadcrumb-item>
                首页
              </el-breadcrumb-item>
              <el-breadcrumb-item>控制台</el-breadcrumb-item>
            </el-breadcrumb>
          </div>
          <div class="center-panel" />
          <div class="right-panel">
            <userbar />
          </div>
        </div>
        <div id="adminui-main" class="adminui-main">
          <router-view v-slot="{ Component }">
            <component :is="Component" :key="$route.fullPath" />
          </router-view>
        </div>
      </el-container>
    </section>
  </template>
</template>

<script>
import { Icon } from '@iconify/vue'
import Topbar from './components/topbar.vue'
import userbar from './components/userbar.vue'
import { useSettingStore } from '~/stores/setting'
import userRoutes from '~/config/route'
import routes from '~pages'

export default {
  name: 'Index',
  components: {
    Topbar,
    Icon,
    userbar,
  },
  setup() {
    const settingStore = useSettingStore()
    const settingDialog = ref(false)
    const menu = ref(userRoutes)
    const nextMenu = ref([])
    const pmenu = reactive({
      title: 'aaa',
      meta: {
        title: 'asdas',
      },
    })
    const active = ref('')

    return {
      settingDialog,
      menu,
      nextMenu,
      pmenu,
      active,
      isMobile: computed(() => settingStore.isMobile),
      layout: computed(() => settingStore.layout),
      layoutTags: computed(() => settingStore.layoutTags),
      menuIsCollapse: computed(() => settingStore.menuIsCollapse),
      settingStore,
    }
  },
  // watch: {
  //   $route () {
  //     this.showThis()
  //   },
  //   layout: {
  //     handler (val) {
  //       document.body.setAttribute('data-layout', val)
  //     },
  //     immediate: true,
  //   },
  // },
  // created () {
  // this.onLayoutResize()
  // window.addEventListener('resize', this.onLayoutResize)
  // const menu = this.$router.sc_getMenu()
  // this.menu = this.filterUrl(menu)
  // this.showThis()
  // console.log(this.$config.menu)
  // },
  methods: {
    // onLayoutResize () {
    //   this.$store.commit('SET_ismobile', document.body.clientWidth < 992)
    // },
    // 路由监听高亮
    // showThis () {
    //   this.pmenu = this.$route.meta.breadcrumb ? this.$route.meta.breadcrumb[0] : {}
    //   this.nextMenu = this.filterUrl(this.pmenu.children)
    //   this.$nextTick(() => {
    //     this.active = this.$route.meta.active || this.$route.fullPath
    //   })
    // },
    // 点击显示
    showMenu(route) {
      this.pmenu = route
      this.nextMenu = this.filterUrl(route.children)
      if ((!route.children || route.children.length === 0) && route.component)
        routes.router.push({ path: route.path })
    },
    // 转换外部链接的路由
    filterUrl(map) {
      const newMap = []
      map && map.forEach((item) => {
        item.meta = item.meta ? item.meta : {}
        // 处理隐藏
        if (item.meta.hidden)
          return false

        // 处理http
        if (item.meta.type === 'iframe')
          item.path = `/i/${item.name}`

        // 递归循环
        if (item.children && item.children.length > 0)
          item.children = this.filterUrl(item.children)

        newMap.push(item)
      })
      return newMap
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
