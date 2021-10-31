<template>
  <div class="flex items-center justify-between h-64px">
    <div class="n-icon-head" @click="() => $emit('update:collapsed', !collapsed)">
      <n-icon size="30">
        <ic-baseline-menu />
      </n-icon>
    </div>
    <div class="flex items-center pr-3 h-full flex-center">
      <div class="n-icon-head">
        <n-icon size="30">
          <ic-baseline-search />
        </n-icon>
      </div>
      <div class="n-icon-head">
        <n-icon size="30">
          <carbon-logo-github />
        </n-icon>
      </div>
      <!-- 个人中心 -->
      <div class="n-icon-head">
        <n-dropdown trigger="hover" :options="avatarOptions" @select="avatarSelect">
          <n-avatar :size="30" round src="src/assets/img/user1.jpg" />
        </n-dropdown>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { useDialog } from 'naive-ui'

export default defineComponent({
  name: 'PageHeader',
  props: {
    collapsed: {
      type: Boolean,
    },
  },
  setup (props) {
    const dialog = useDialog()
    // 退出登录
    const doLogout = () => {
      dialog.info({
        title: '提示',
        content: '您确定要退出登录吗',
        positiveText: '确定',
        negativeText: '取消',
        onPositiveClick: () => { },
        onNegativeClick: () => { },
      })
    }

    const avatarOptions = [
      {
        label: '个人设置',
        key: 1,
      },
      {
        label: '退出登录',
        key: 2,
      },
    ]

    // 头像下拉菜单
    const avatarSelect = (key: number) => {
      switch (key) {
        case 1:
          break
        case 2:
          doLogout()
          break
      }
    }

    return {
      avatarOptions,
      avatarSelect,
      doLogout,
    }
  },
})
</script>
