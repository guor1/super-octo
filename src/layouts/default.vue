<template>
  <section class="aminui-wrapper">
    <div id="adminui-main" class="adminui-main">
      <!-- <router-view v-slot="{ Component }">
        <component :is="Component" :key="$route.fullPath" />
      </router-view> -->
      <router-view />
    </div>
  </section>
</template>

<style scoped>
.el-breadcrumb {margin-left: 15px;}
.el-breadcrumb .el-breadcrumb__inner .icon {font-size: 14px;margin-right: 5px;float: left;}
.breadcrumb-enter-active,.breadcrumb-leave-active {transition: all 0.3s;}
.breadcrumb-enter-from,.breadcrumb-leave-active {opacity: 0;transform: translateX(20px);}
.breadcrumb-leave-active {position: absolute;}
</style>
