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
        { default: () => '且听风吟' },
      ),
    key: 'hear-the-wind-sing',
    icon: renderIcon('ic:baseline-construction'),
  },
  {
    label: '1973年的弹珠玩具',
    key: 'pinball-1973',
    icon: renderIcon('ic:baseline-emoji-food-beverage'),
    children: [
      {
        label: '鼠',
        key: 'rat',
      },
    ],
  },
  {
    label: '寻羊冒险记',
    key: 'a-wild-sheep-chase',
    icon: renderIcon('ic:baseline-emoji-transportation'),
  },
  {
    label: '舞，舞，舞',
    key: 'dance-dance-dance',
    icon: renderIcon('ic:baseline-coronavirus'),
    children: [
      {
        type: 'group',
        label: '人物',
        key: 'people',
        children: [
          {
            label: '叙事者',
            key: 'narrator',
          },
          {
            label: '羊男',
            key: 'sheep-man',
          },
        ],
      },
      {
        label: '饮品',
        key: 'beverage',
        children: [
          {
            label: '威士忌',
            key: 'whisky',
          },
        ],
      },
      {
        label: '食物',
        key: 'food',
        children: [
          {
            label: '三明治',
            key: 'sandwich',
          },
        ],
      },
      {
        label: '过去增多，未来减少',
        key: 'the-past-increases-the-future-recedes',
      },
    ],
  },
])
</script>
