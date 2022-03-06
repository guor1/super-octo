<template>
  <div class="user-bar">
    <el-dropdown class="user panel-item">
      <div class="user-avatar">
        <el-avatar :size="30">
          {{ userNameF }}
        </el-avatar>
        <label>{{ userName }}</label>
        <Icon icon="ep-arrow-down" />
      </div>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item>
            个人设置
          </el-dropdown-item>
          <el-dropdown-item>
            清除缓存
          </el-dropdown-item>
          <el-dropdown-item divided>
            退出登录
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script setup>
import { Icon } from '@iconify/vue'

const userName = ref('Admin')
const userNameF = ref('Administrator')
</script>

<style scoped>
.user-bar {display: flex;align-items: center;height: 100%;}
.user-bar .panel-item {padding: 0 10px;cursor: pointer;height: 100%;display: flex;align-items: center;}
.user-bar .panel-item i {font-size: 16px;}
.user-bar .panel-item:hover {background: rgba(0, 0, 0, 0.1);}
.user-bar .user-avatar {height:49px;display: flex;align-items: center;}
.user-bar .user-avatar label {display: inline-block;margin-left:5px;font-size: 12px;cursor:pointer;}
.msg-list li {border-top:1px solid #eee;}
.msg-list li a {display: flex;padding:20px;}
.msg-list li a:hover {background: #ecf5ff;}
.msg-list__icon {width: 40px;margin-right: 15px;}
.msg-list__main {flex: 1;}
.msg-list__main h2 {font-size: 15px;font-weight: normal;color: #333;}
.msg-list__main p {font-size: 12px;color: #999;line-height: 1.8;margin-top: 5px;}
.msg-list__time {width: 100px;text-align: right;color: #999;}
[data-theme='dark'] .msg-list__main h2 {color: #d0d0d0;}
[data-theme='dark'] .msg-list li {border-top:1px solid #363636;}
[data-theme='dark'] .msg-list li a:hover {background: #383838;}
</style>
