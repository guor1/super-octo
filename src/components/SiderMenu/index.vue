<template>
  <n-menu :options="menus" />
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { RouterLink } from 'vue-router'

function renderIcon (icon: string) {
  return () => h(Icon, {
    icon,
  }, { default: () => h(icon) })
}

const menus = reactive([
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            path: '/',
          },
        },
        { default: () => '唐门' },
      ),
    key: 'tangmen',
    icon: renderIcon('ic:baseline-construction'),
  },
  {
    label: '上三宗',
    key: 'pinball-1973',
    icon: renderIcon('ic:baseline-emoji-food-beverage'),
    children: [
      {
        label: '昊天宗',
        key: 'haotian',
      }, {
        label: '七宝琉璃宗',
        key: 'qibaoliuli',
      }, {
        label: '蓝电霸王龙宗',
        key: 'landianbawanglong',
      },
    ],
  },
  {
    label: '武魂殿',
    key: 'wuhundian',
    icon: renderIcon('ic:baseline-emoji-transportation'),
  },
])
</script>
