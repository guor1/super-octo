const DEFAULT_MENU = [
  {
    label: '1973年的弹珠玩具',
    key: 'pinball-1973',
  },
  {
    label: '寻羊冒险记',
    key: 'a-wild-sheep-chase',
  },
  {
    label: '舞，舞，舞',
    key: 'dance-dance-dance',
    children: [
      {
        type: 'group',
        label: '人物',
        key: 'people',
      },
      {
        label: '饮品',
        key: 'beverage',
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
    ],
  },
]

export default DEFAULT_MENU
