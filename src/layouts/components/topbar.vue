<template>
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
      <slot />
    </div>
  </div>
</template>
<style scoped>
.el-breadcrumb {margin-left: 15px;}
.el-breadcrumb .el-breadcrumb__inner .icon {font-size: 14px;margin-right: 5px;float: left;}
.breadcrumb-enter-active,.breadcrumb-leave-active {transition: all 0.3s;}
.breadcrumb-enter-from,.breadcrumb-leave-active {opacity: 0;transform: translateX(20px);}
.breadcrumb-leave-active {position: absolute;}
</style>
